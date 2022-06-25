import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Sidebar } from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { ArrowRight, List } from "phosphor-react";
import { FooterLogo } from "../components/FooterLogo";

export function Event() {
  const { slug } = useParams<{ slug: string }>()
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <div className="flex flex-1 flex-col">
          { slug ? 
            <Video lessonSlug={slug} /> 
            : (
              <div className="flex-1 flex flex-col justify-center items-center h-[38.6875rem] bg-blur bg-cover">
                <span className="text-2xl text-gray-300 flex gap-4 xl:hidden px-4">
                  Clique em <span className="text-blue-500"><List size={32} /></span>
                </span>
                <span className="text-2xl text-gray-300 flex gap-4 xl:hidden px-4">
                  e escolha uma aula
                </span>
                <span className="text-2xl text-gray-300 gap-4 hidden xl:flex">
                  Escolha uma aula ao lado <span className="text-blue-500"><ArrowRight size={32} /></span>
                </span> 
              </div>
            )
          }
          <footer className="border-t border-gray-500 bg-gray-900 flex flex-col md:flex-row justify-between items-center gap-6 p-6 text-gray-300 w-full">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <FooterLogo />
              <span>
                Rocketseat - Todos os direitos reservados
              </span>
            </div>
            <div>
              <a href="https://www.rocketseat.com.br/privacy">
                Políticas de privacidade
              </a>
            </div>
          </footer>
        </div>
        <Sidebar />
      </main>
    </div>
  )
}