'use client'
import Activity from "@/components/Activity"
import dayjs from "dayjs"
import { useState } from "react"
import { Calendar, dayjsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { events } from "@/mocks/activities"

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
    <div className='w-full flex flex-col items-center max-w-7xl mx-auto justify-center'>
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
              hour={dayjs((eventSelect.start).toString()).format('HH:mm')} image={eventSelect.img} place={eventSelect.place} title={eventSelect.title} />
          </div>
        )
      }

    </div>
  )
}

export default CalendarApp