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
}

function CalendarApp() {

  const localizer = dayjsLocalizer(dayjs)

  const [eventSelect, setEventSelect] = useState<EventInterface | null>(null)

  const events:EventInterface[] = [
    {
      title: "Culto de Mujeres",
      start: dayjs('2024-11-27T17:00:00').toDate(),
      end: dayjs('2024-11-27T18:00:00').toDate(),
      index: 1
    },
    {
      title: "Culto Especial",
      start: dayjs('2024-11-28T17:00:00').toDate(),
      end: dayjs('2024-11-28T18:00:00').toDate(),
      index: 2
    },
    {
      title: "Culto de niños",
      start: dayjs('2024-11-29T17:00:00').toDate(),
      end: dayjs('2024-11-29T18:00:00').toDate(),
      index: 3
    },
    {
      title: "Culto de navidad",
      start: dayjs('2024-11-30T17:00:00').toDate(),
      end: dayjs('2024-11-30T18:00:00').toDate(),
      index: 4
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
    <div className='max-w-[800px] sm:mx-auto'>
      <Calendar
        localizer={localizer}
        events={events}
        views={['month', "week", "day"]}
        min={dayjs('2024-11-01T10:00:00').toDate()}
        components={componentes}
        style={{
          height: "700px",
          width: "100%"
        }}
      />


      {
        eventSelect && (
          <div className="py-6">
            <h3 className="text-xl text-center  text-primary-3">Evento Seleccionado</h3>
            <Activity button={false} description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
              hour={dayjs((eventSelect.start).toString()).format('HH:mm')} image="/cultomujeres.png" place="Plaza Castilla" title={eventSelect.title} />
          </div>
        )
      }

    </div>
  )
}

export default CalendarApp