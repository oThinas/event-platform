import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  lessonType: 'live' | 'class';
  closeMenu: () => void
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>()

  const isLessonAvaliable = isPast(props.availableAt)
  const availableDateFormatted = format(props.availableAt, "EE' • 'dd' de 'MMMM' • 'HH'h'mm", { locale: ptBR })
  
  const isActiveLesson = slug === props.slug
  
  return (
    <div>
      <time 
        dateTime={props.availableAt.toString()}
        className="text-gray-300 block first-letter:capitalize"
      >
        {availableDateFormatted}
      </time>
      <div
        onClick={props.closeMenu}
        className={`relative rounded border border-gray-500 p-4 mt-2  transition-all group-hover:border-green-500 group-hover:border-opacity-70 
          ${isActiveLesson
              ? `bg-green-500 before:absolute before:content-[' '] before:w-4 before:h-4
                before:top-[calc(50%-8px)] before:-left-2 before:bg-green-500
                before:rotate-45 before:rounded-sm`
              : 'group-hover:bg-gray-900 group-hover:bg-opacity-40'
          }
          ${!isLessonAvaliable && 'cursor-not-allowed'}
        `}
      >
        <Link 
          to={`${isLessonAvaliable && `/event/lesson/${props.slug}`}`}
          className={`lesson-card
            ${!isLessonAvaliable && 'pointer-events-none'}
          `}
        >
          <header className="flex items-center justify-between">
            {isLessonAvaliable ? (
              <span 
                className={`text-sm text-blue-500 font-medium flex items-center gap-2 
                  ${isActiveLesson && 'text-white'}
                `}
              >
                <CheckCircle size={20}/>
                Conteúdo liberado
              </span>
            ) : (
              <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                <Lock size={20} />
                Em breve
              </span>
            )}
            <span 
              className={`text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold
                ${isActiveLesson && 'border-white'}
              `}
            >
              {props.lessonType === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
            </span>
          </header>
          <strong 
            className={`text-gray-200 mt-5 block 
              ${isActiveLesson && 'text-white'}
            `}
          >
            {props.title}
          </strong>
        </Link>
      </div>
    </div>
  )
}