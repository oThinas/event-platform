import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Sidebar } from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { ArrowRight } from "phosphor-react";
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
              <div className="flex-1 flex justify-center items-center h-[38.6875rem] bg-blur bg-cover">
                <span className="text-2xl text-gray-300 flex gap-4">
                  Escolha uma aula ao lado <ArrowRight size={32} />
                </span> 
              </div>
            )
          }
          <footer className="border-t border-gray-500 flex justify-between m-6 pt-6 text-gray-300">
            <div className="flex items-center gap-6">
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