'use client'
import Activity from "@/components/Activity"
import dayjs from "dayjs"
import { useState } from "react"
import { Calendar, dayjsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"

interface EventInterface {
  title: string,
  start: Date,
  end: Date,
  index: number
  img: string,
  description: string
  place: string,
}

function CalendarApp() {

  const localizer = dayjsLocalizer(dayjs)

  const [eventSelect, setEventSelect] = useState<EventInterface | null>(null)

  const events:EventInterface[] = [
    {
      title: "Aniversario de 4C",
      start: dayjs('2025-02-08T18:00:00').toDate(),
      end: dayjs('2025-02-08T20:00:00').toDate(),
      description: "¡11 años de fidelidad de Dios! Acompáñanos este 8 de febrero con el Pastor Juan Carlos Escobar, presidente de las ADE. ¡Te esperamos!",
      index: 1,
      img: '/undecimoAniversario.jpeg',
      place: "Auditorio 4C Parla, Calle Londres 58, Parla",
    },
    {
      title: "Retiro de Semana Santa",
      start: dayjs('2025-04-28T10:00:00').toDate(),
      end: dayjs('2025-04-28T12:00:00').toDate(),
      index: 2,
      img: '/retiroFamiliarSemanaSanta.jpeg',
      description: "Del 17 al 19 de abril, vive un tiempo de conexión espiritual y familiar. Fortalezcamos nuestra fe, renovemos nuestro compromiso con Dios y disfrutemos juntos momentos especiales.",
      place: "Auditorio 4C Parla, Calle Londres 58, Parla",
    },
  ]

  const eventComponent = ({ event }: { event: EventInterface }) => {
    const handleClick = () => {
      console.log(event)
      setEventSelect(event)
    }

    return (
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        {event.title}
      </div>
    )
  }

  const componentes = {
    event: eventComponent
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <Calendar
        localizer={localizer}
        events={events}
        views={['month', "week", "day"]}
        min={dayjs('2024-11-01T10:00:00').toDate()}
        components={componentes}
        style={{
          height: "400px",
          width: "100%",
          maxWidth: "800px"
        }}
      />


      {
        eventSelect && (
          <div className="py-6">
            <h3 className="text-2xl md:text-2xl-desktop text-center py-5  text-primary-3">Evento Seleccionado</h3>
            <Activity button={false} description={eventSelect.description}
              hour={dayjs((eventSelect.start).toString()).format('HH:mm')} image={eventSelect.img} place="Plaza Castilla" title={eventSelect.title} />
          </div>
        )
      }

    </div>
  )
}

export default CalendarApp