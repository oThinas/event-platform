import { gql, useQuery } from "@apollo/client"
import { DiscordLogo, Lightning } from "phosphor-react"

const GET_LESSON_CHALLENGE_QUARY = gql `
  query GetLessonChallenge($slug: String) {
    lesson(where: {slug: $slug}) {
      challenge {
        url
      }
    }
  }
`

interface GetLessonChallengeResponse {
  lesson: {
    challenge: {
      url: string
    }
  }
}

interface ButtonProps {
  variant: 'primary' | 'secondary'
  lessonSlug: string
}

export function Button(props: ButtonProps) {
  const { data } = useQuery<GetLessonChallengeResponse>(GET_LESSON_CHALLENGE_QUARY, {
    variables: {
      slug: props.lessonSlug
    }
  })

  if (props.variant === 'primary') {
    return (
      <a 
        href="https://discord.com/invite/rocketseat"
        className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center 
        hover:bg-green-700 transition-colors"
      >
        <DiscordLogo size={24}/>
        Comunidade do Discord
      </a>
    )
  }
  return (
    <a 
      href={data?.lesson.challenge.url}
      className="p-4 text-sm border border-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center
      hover:bg-blue-500 hover:text-gray-900 transition-colors"
    >
      <Lightning size={24}/>
      Acesse o desafio
    </a>
  )
}