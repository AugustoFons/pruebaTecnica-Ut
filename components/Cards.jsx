'use client'
import Image from "next/image";
import { useState } from "react";

const Cards = ({ character, createdCharacters, setCreatedCharacters }) => {
    const [showForm, setShowForm] = useState(false) // alternar vista entre formulario de edicion y tarjeta
    const [editedCharacter, setEditedCharacter] = useState(character); // almacena el personaje que se edita actualmente

    // activa el modo de edición
    const handleEdit = () => { 
        setShowForm(true);
    };

    const handleSaveEdit = () => {
        // remplaza el personaje editado
        const updatedCharacters = createdCharacters.map(ch => 
            ch.id === editedCharacter.id ? editedCharacter : ch
        );
        // actualiza la lista y la guarda en local storage
        setCreatedCharacters(updatedCharacters);
        localStorage.setItem('createdCharacters', JSON.stringify(updatedCharacters));
        setShowForm(false);
    }; 

    // eliminar personaje
    const handleDelete = () => {
        const filterCharacter = createdCharacters.filter(ch => ch.id != character.id)
        setCreatedCharacters(filterCharacter)
        localStorage.setItem('createdCharacters', JSON.stringify(filterCharacter));
    }
    return (
        <>
        {!showForm && (
            <div
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                >
                <Image
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={`${character.name} Thumbnail`}
                    width={300}
                    height={500}
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] max-h-[200px] min-h-[200px] object-cover"
                    unoptimized
                    />
                <h2 className={`mb-1 mt-2 text-xl font-semibold`}>
                    {character.name}{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        <button className="relative top-[5px] left-2" onClick={() => handleEdit(character.id)}>
                            <Image
                                src="/edit.svg"
                                alt="editar"
                                width={29}
                                height={29}
                                />
                        </button>
                        <button className="relative top-[6px] left-4" onClick={() => handleDelete(character.id)}>
                            <Image
                                src="/remove.svg"
                                alt="editar"
                                width={30}
                                height={30}
                                />
                        </button>
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    {character.description !== "" && character.description}
                    {character.description == "" && <p>Descripción no disponible</p>}
                </p>
            </div>
        )}

        {showForm && (
            <div
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                >
                <h2 className={`mb-1 mt-2 text-xl font-semibold`}>
                    Editar personaje
                </h2>
                <label htmlFor="name" className="block text-lg font-medium text-white mb-1">Nombre:</label>
                <input 
                    type="text" 
                    id="name"
                    value={editedCharacter.name} 
                    onChange={(e) => setEditedCharacter({...editedCharacter, name: e.target.value})}
                    className="block w-full px-3 py-2 text-white bg-transparent font-bold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-600 focus:border-slate-500 sm:text-sm"
                    />

                <label htmlFor="descrip" className="block text-lg font-medium text-white mb-1">Descripción:</label>
                <input 
                    type="text" 
                    id="descrip"
                    value={editedCharacter.description} 
                    onChange={(e) => setEditedCharacter({...editedCharacter, description: e.target.value})}
                    className="block w-full px-3 py-2 text-white bg-transparent font-bold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-600 focus:border-slate-500 sm:text-sm"
                    />

                <label htmlFor="url-img" className="block text-lg font-medium text-white mb-1">URL imagen:</label>
                <input 
                    type="text"
                    id="url-img"
                    value={`${editedCharacter.thumbnail.path || ''}.${editedCharacter.thumbnail.extension || ''}`} 
                    onChange={(e) => {
                        const value = e.target.value;
                        const lastDotIndex = value.lastIndexOf('.'); /* lastDotIndex guarda la posición del ultimo punto para separar el path de la imagen, de la extension, respetando la estructura de la api de marvel */
                        const path = lastDotIndex !== -1 ? value.substring(0, lastDotIndex) : value;
                        const extension = lastDotIndex !== -1 ? value.substring(lastDotIndex + 1) : '';
                        setEditedCharacter(prevState => ({
                            ...prevState,
                            thumbnail: {
                                ...prevState.thumbnail,
                                path,
                                extension
                            }
                        }));
                    }}                    
                    className="block w-full px-3 py-2 text-white bg-transparent font-bold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-600 focus:border-slate-500 sm:text-sm"
                    />
                <button 
                    onClick={handleSaveEdit}
                    className="border-2 border-white rounded-sm my-5 py-3 px-4 bg-transparent hover:bg-black font-bold mx-auto block"
                    >
                    Guardar
                </button>
            </div>
        )}
        </>
    )
}

export default Cards