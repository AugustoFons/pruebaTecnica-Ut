'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import Cards from "./Cards"

const CACHE_KEY = 'marvelCharacters';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

const ListCards = () => {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showSelect, setShowSelect] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [createdCharacters, setCreatedCharacters] = useState([]);

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
        };
        fetchCharacters();
    }, []);

    const handleCreate = () => {
        setShowSelect(true)
    };

    const handleSelect = (e) => {
        const character = characters.find(ch => ch.id == (e.target.value))
        setSelectedCharacter(character)
        if (character) {
            setCreatedCharacters(prev => [...prev, character]);
            setShowSelect(false);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
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

            {showSelect && (
                <select onChange={handleSelect}>
                    <option value="">Seleccione un personaje</option>
                    {characters.map(character => (
                        <option key={character.id} value={character.id}>
                            {character.name}
                        </option>
                    ))}
                </select>
            )}

                <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                    {createdCharacters.map(character => (
                        <Cards key={character.id} character={character} />
                    ))}                
                </div>  

{/*             <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                    {characters.map(character => (
                        <Cards key={character.id} character={character} />
                    ))}
            </div> */}
        </>
    )
}

export default ListCards