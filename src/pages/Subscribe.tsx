import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FooterLogo } from "../components/FooterLogo";
import { HeaderLogo } from "../components/HeaderLogo";

import CodeImg from '../assets/code.png'

const CREAT_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
  }
`

export function Subscribe() {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [createSubscriber, { loading }] = useMutation(CREAT_SUBSCRIBER_MUTATION)
  const [isEmailAlreadySubmited, setIsEmailAlreadySubmited] = useState(false)
  function handleSubscribe (event: FormEvent) {
    event?.preventDefault()
    createSubscriber({
      variables: {
        name,
        email
      }
    }).then(
      () => navigate('/event'),
      () => setIsEmailAlreadySubmited(true)
    )
  }
  
  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div 
        className="flex flex-col gap-8 xl:flex-row items-center justify-between mt-20 xl:w-[75.9375rem]"
      >
        <div className="flex flex-col items-center xl:items-start max-w-[40rem] text-center sm:text-left p-6">
          <HeaderLogo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, 
            com <strong className="text-blue-500">ReactJS</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded min-w-[22.5rem]">
          <h2 className="text-2xl block mb-6">
            Inscreva-se gratuitamente
          </h2>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input 
              type="text" 
              placeholder="Seu nome completo"
              className="bg-gray-900 rounded px-5 h-14 focus-visible:outline focus-visible:outline-green-500
              hover:outline-1 hover:outline hover:outline-green-500"
              onChange={event => setName(event.target.value)}
            />
            <input 
              type="email" 
              placeholder="Digite seu e-mail"
              className={`bg-gray-900 rounded px-5 h-14 focus-visible:outline focus-visible:outline-green-500
              ${!isEmailAlreadySubmited && 'hover:outline-1 hover:outline hover:outline-green-500'} 
              ${isEmailAlreadySubmited && 'outline-red-500 outline outline-1'}`}
              onChange={event => setEmail(event.target.value)}
            />
            {isEmailAlreadySubmited && (
              <span className="text-red-500">
                Email já cadastrado
              </span>
            )}
            <button 
              type="submit" 
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors 
              disabled:opacity-50"
              disabled={loading}
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src={CodeImg} alt="Tela de desenvolvimento no Visual Studio Code" 
        className="mt-10 h-auto w-auto"
      />
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
  )
}