import { CaretRight, FileArrowDown, Image } from "phosphor-react";

interface CardsProps {
  isWallpaper?: boolean
}


export function Cards(props: CardsProps) {
  if (props.isWallpaper) {
    return (
      <a href="#"
        className="bg-gray-700 rounded overflow-hidden min-h-[8.375rem] flex justify-between items-stretch gap-6 hover:bg-gray-600 transition-colors"
      >
        <div className="flex gap-6">
          <div className="bg-green-700 h-full p-6 flex items-center">
            <Image size={40} />
          </div>
          <div className="py-6 leading-relaxed">
            <h2 className="text-2xl">
              Wallpapers exclusivos
            </h2>
            <p className="text-sm text-gray-200 mt-2">
              Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
            </p>
          </div>
        </div>
        <div className="h-full p-6 flex items-center">
          <CaretRight size={24}/>
        </div>
      </a>
    )
  }
  return (
    <a href="#"
      className="bg-gray-700 rounded overflow-hidden min-h-[8.375rem] flex justify-between items-stretch gap-6 hover:bg-gray-600 transition-colors"
    >
      <div className="flex gap-6">
        <div className="bg-green-700 h-full p-6 flex items-center">
          <FileArrowDown size={40} />
        </div>
        <div className="py-6 leading-relaxed">
          <h2 className="text-2xl">
            Material Complementar
          </h2>
          <p className="text-sm text-gray-200 mt-2">
            Acesse o material complementar para acelerar o seu desenvolvimento
          </p>
        </div>
      </div>
      <div className="h-full p-6 flex items-center">
        <CaretRight size={24}/>
      </div>
    </a>
  )
}