'use client'
import Spinner from "./Spinner"
import { useEffect, useState } from "react"
import axios from "axios"
import Cards from "./Cards"

// configurcion para guardar la solitud a la API por 24hs en local storage
const CACHE_KEY = 'marvelCharacters';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;
const CREATED_CHARACTERS_KEY = 'createdCharacters';

const ListCards = () => {
    const [characters, setCharacters] = useState([]) // estado para actualizar la lista de personajes
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showSelect, setShowSelect] = useState(false); // alterna la vista entre el selector para crear personajes y el boton de crear
    const [createdCharacters, setCreatedCharacters] = useState([]); // guarda los personajes creados

    // guardar personajes creados en localStorage
    const saveToLocalStorage = (characters) => {
        localStorage.setItem(CREATED_CHARACTERS_KEY, JSON.stringify(characters));
    };

    useEffect(() => {
        const fetchCharacters = async () => {
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cacheTime = localStorage.getItem(`${CACHE_KEY}_timestamp`);
            const isCacheValid = cacheTime && (Date.now() - cacheTime < CACHE_EXPIRY);

            if (cachedData && isCacheValid) {
                setCharacters(JSON.parse(cachedData));
                setLoading(false);
            } else {
                try {
                    const response = await axios.get('/api/marvel');
                    setCharacters(response.data);
                    localStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
                    localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now());
                    setLoading(false);
                } catch (err) {
                    setError('Error fetching characters');
                    setLoading(false);
                }
            }
        }
            const loadCreatedCharacters = () => {
                const savedCharacters = localStorage.getItem(CREATED_CHARACTERS_KEY);
                if (savedCharacters) {
                    setCreatedCharacters(JSON.parse(savedCharacters));
                }
            };
        fetchCharacters();
        loadCreatedCharacters();
    }, []);


    const handleCreate = () => {
        setShowSelect(true)
    };

    // Al seleccionar un personaje este se guarda en createdCharacters y en el local storage para mostrarlo como tarjeta
    const handleSelect = (e) => {
        const character = characters.find(ch => ch.id == (e.target.value))
        if (character) {
            setCreatedCharacters([...createdCharacters, character]);
            saveToLocalStorage(createdCharacters);
            setShowSelect(false);
        }
    }

    if (loading) return <Spinner />;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col items-center justify-center">
            {!showSelect && (
            <div className="px-8 flex justify-center">
                <button
                    onClick={handleCreate}
                    className="group rounded-lg border px-6 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex"
                    >
                    <p className="text-2xl font-semibold flex items-center">
                        Crear Personaje
                        <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-6xl ml-3 mb-[7px]">
                        +
                        </span>
                    </p>
                </button>
            </div>
            )}

            {showSelect && (
                <select onChange={handleSelect}     
                className="group rounded-lg bg-transparent w-80 border px-6 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex"
                size={10}
                >
                    <option value="" className="text-white text-bold bg-gray-900 p-1 m-1 cursor-pointer scroll">
                        Seleccione un personaje
                    </option>
                    {characters.map(character => (
                        <option key={character.id} value={character.id} className="text-white text-bold hover:bg-gray-900 p-1 m-1 cursor-pointer scroll">
                            {character.name}
                        </option>
                    ))}
                </select>
            )}

            <div className="mb-32 my-12 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                {createdCharacters.map(character => (
                    <Cards 
                        key={character.id} 
                        character={character} 
                        setCreatedCharacters={setCreatedCharacters}
                        createdCharacters={createdCharacters}
                    />
                ))}                
            </div>  
        </div>
    )
}

export default ListCards