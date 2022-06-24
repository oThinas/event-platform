import { DefaultUi, Player, Youtube } from "@vime/react";
import { Button } from "./Button";
import { Cards } from "./Cards";
import { FooterLogo } from "./FooterLogo";
import { gql, useQuery } from "@apollo/client";

import "@vime/core/themes/default.css";
import "../styles/spinner.css";

const GET_LESSONS_BY_SLUG_QUERY = gql`
  query GetLessonBySlug ($slug: String) {
    lesson(where: {slug: $slug}) {
      title
      videoId
      description
      teacher {
        name
        bio
        avatarUrl
      }
    }
  }
`

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      name: string;
      bio: string;
      avatarUrl: string;
    }
  }
}

interface VideoProps {
  lessonSlug: string
}

export function Video(props: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSONS_BY_SLUG_QUERY, {
    variables: {
      slug: props.lessonSlug
    }
  })

  if (!data) {
    return (
      <div className="flex-1">
        <div className="spinner-container flex flex-col justify-center items-center h-full gap-6">
          <div className="loading-spinner" />
          Carregando
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[68.75rem] max-h-[50vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} key={data.lesson.videoId}/>
            <DefaultUi />
          </Player>
        </div>
      </div>
      <div className="p-8 max-w[68.75rem] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <img 
                src={data.lesson.teacher.avatarUrl} 
                alt="Foto de perfil do professor." 
                className="h-16 w-16 rounded-full border-2 border-blue-500"
              />
              <div className="leading-relaxed">
                <span className="font-bold text-2xl block">
                  {data.lesson.teacher.name}
                </span>
                <span className="text-gray-200 text-sm block">
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button variant="primary" />
            <Button variant="secondary" />
          </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          <Cards />
          <Cards isWallpaper />
        </div>
      </div>
      <footer className="border-t border-gray-500 flex justify-between m-6 pt-6 text-gray-300">
        <div className="flex items-center gap-6">
          <FooterLogo />
          <span>
            Rocketseat - Todos os direitos reservados
          </span>
        </div>
        <div>
          <a href="#">
            Políticas de privacidade
          </a>
        </div>
      </footer>
    </div>
  )
}