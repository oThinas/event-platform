import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Sidebar } from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { ArrowRight } from "phosphor-react";

export function Event() {
  const { slug } = useParams<{ slug: string }>()
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        { slug ? 
          <Video lessonSlug={slug}/> 
          : (
            <div className="flex-1 flex justify-center items-center h-[38.6875rem]">
              <span className="text-2xl text-gray-300 flex gap-4">
                Escolha uma aula ao lado <ArrowRight size={32} />
              </span> 
            </div>
          )
        }
        <Sidebar />
      </main>
    </div>
  )
}