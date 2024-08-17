
import Image from "next/image";

const Cards = ({ character }) => {
    return (
        <>
            <a
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={`${character.name} Thumbnail`}
                    width={300}
                    height={500}
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] max-h-[200px] min-h-[200px] object-cover"
                    />
                <h2 className={`mb-1 mt-2 text-xl font-semibold`}>
                    {character.name}{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    {character.description !== "" && character.description}
                    {character.description == "" && <p>Descripción no disponible</p>}
                </p>
            </a>
        </>
    )
}

export default Cards