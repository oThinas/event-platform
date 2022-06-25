import { gql, useQuery } from "@apollo/client";
import { X, List } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lesson } from "./Lesson";

const GET_LESSONS_QUERY = gql`
  query {
  lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
    id
    lessonType
    availableAt
    slug
    title
  }
}
`

interface GetLessonQueryResponse {
  lessons: {
    id: string;
    title: string;
    slug: string;
    availableAt: string;
    lessonType: 'live' | 'class'
  }[]
}

export function Sidebar() {
  const navigate = useNavigate()
  const { data } = useQuery<GetLessonQueryResponse>(GET_LESSONS_QUERY)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <>
      <div className="absolute top-6 right-5 z-50 xl:hidden flex items-center gap-2">
        {isMenuOpen ? (
          <X
            size={24}
            className='text-blue-500 cursor-pointer'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        ) : (
          <List 
            size={24}
            className='text-blue-500 cursor-pointer'
            onClick={() => {
              setIsMenuOpen(!isMenuOpen)
              navigate('/event')
            }}
          />
        ) 
        }
      </div>
      <aside 
        className={`xl:block xl:relative xl:w-[21.75rem] bg-gray-700 p-6 border-l border-gray-600
          ${isMenuOpen && 'block w-full min-h-[100vh] absolute z-50'}
          ${!isMenuOpen && 'hidden'}
        `}
      >
        <h2 className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
          Cronograma de aulas
        </h2>
        <div className="flex flex-col gap-8">
          {data?.lessons.map(lesson => {
            return(
              <Lesson
                closeMenu={() => setIsMenuOpen(!isMenuOpen)}
                key={lesson.id}
                title={lesson.title}
                slug={lesson.slug}
                availableAt={new Date(lesson.availableAt)}
                lessonType={lesson.lessonType}
              />
            )
          })}
        </div>
      </aside>
    </>
  )
}