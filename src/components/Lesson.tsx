import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link } from 'react-router-dom';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  lessonType: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
  const isLessonAvaliable = isPast(props.availableAt)
  const availableDateFormatted = format(props.availableAt, "EE' • 'dd' de 'MMMM' • 'HH'h'mm", { locale: ptBR })
  
  
  return (
    <div>
      <time 
        dateTime={props.availableAt.toString()}
        className="text-gray-300 block first-letter:capitalize"
      >
        {availableDateFormatted}
      </time>
      <div className="rounded border border-gray-500 p-4 mt-2 hover:border-green-500">
        <Link to={`/event/lesson/${props.slug}`} className="lesson-card">
          <header className="flex items-center justify-between">
            {isLessonAvaliable ? (
              <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
                <CheckCircle size={20}/>
                Conteúdo liberado
              </span>
            ) : (
              <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                <Lock size={20} />
                Em breve
              </span>
            )}
            <span className="text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold">
              {props.lessonType === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
            </span>
          </header>
          <strong className="text-gray-200 mt-5 block">
            {props.title}
          </strong>
        </Link>
      </div>
    </div>
  )
}