import ListCards from "@/components/ListCards";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-20 p-5 pb-3 ">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="flex py-0 place-items-center before:absolute before:h-[200px] before:w-[380px] before:-translate-x-1/3 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[100px] after:w-[220px] after:translate-x-1/4 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-700 before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[#ff0101] after:dark:opacity-40 before:lg:h-[260px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/marv.png"
          alt="Next.js Logo"
          width={150}
          height={50}
          quality={80}
          priority={true}
        />
      </div>
        <div className="fixed bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <p className="fixed text-center left-0 bottom-0 flex w-full justify-center border-t border-gray-300 bg-gradient-to-t from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Prueba Tecnica - Uteam Front <br />
            Por Fons Augusto
          </p>
        </div>
      </div>

      <ListCards/>
    </main>
  );
}
