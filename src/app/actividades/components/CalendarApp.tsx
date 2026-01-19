'use client'

import Activity from "@/components/Activity"
import dayjs from "dayjs"
import 'dayjs/locale/es'
import { useMemo, useState, useEffect } from "react"
import { Calendar, dayjsLocalizer, ToolbarProps } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { events as rawEvents } from "@/mocks/activities"
import {
  CalendarDays,
  Clock,
  MapPin,
  X
} from "lucide-react"

// Initialize dayjs locale
dayjs.locale('es')
const localizer = dayjsLocalizer(dayjs)

interface EventInterface {
  title: string
  start: Date
  end: Date
  index: number
  img: string
  description: string
  place: string
}

/* ───────────────── TOOLBAR PERSONALIZADA ───────────────── */
const CustomToolbar = ({ label, onNavigate }: ToolbarProps<EventInterface, object>) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate('PREV')}
          className="p-2 rounded-lg border hover:bg-primary-3 hover:text-white transition"
        >
          ◀
        </button>

        <button
          onClick={() => onNavigate('TODAY')}
          className="px-4 py-2 rounded-lg bg-primary-3 text-white font-medium hover:bg-primary-2 transition"
        >
          Hoy
        </button>

        <button
          onClick={() => onNavigate('NEXT')}
          className="p-2 rounded-lg border hover:bg-primary-3 hover:text-white transition"
        >
          ▶
        </button>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-800 capitalize">
        {label}
      </h2>
    </div>
  )
}


/* ───────────────── EVENTO EN CALENDARIO ───────────────── */
const EventComponent = ({ event }: { event: EventInterface }) => (
  <div className="group relative px-3 py-2 rounded-xl bg-gradient-to-r from-primary-3 to-primary-2 text-white text-xs font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer border border-white/20 overflow-hidden">
    {/* Subtle shine effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

    <div className="relative z-10 flex items-center gap-1">
      <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
      <span className="truncate">{event.title}</span>
    </div>
  </div>
)

export default function CalendarApp() {
  const [eventSelect, setEventSelect] = useState<EventInterface | null>(null)
  const [calendarHeight, setCalendarHeight] = useState(700)

  const events: EventInterface[] = useMemo(() => {
    return rawEvents.map((event: any) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }))
  }, [])

  useEffect(() => {
    const updateHeight = () => {
      setCalendarHeight(window.innerWidth < 768 ? 500 : 700)
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto  sm:px-6 py-6 md:py-10">
      {/* HEADER */}
      <div className="text-center mb-6 md:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-3 mb-4">
          Calendario de Actividades
        </h1>

        <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto px-4">
          Consulta todas nuestras actividades y haz clic en un evento para ver los detalles.
        </p>
      </div>

      {/* CALENDAR */}
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-gray-100 overflow-hidden mb-6 md:mb-10">
        <div className="p-4 md:p-8 calendar-modern">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={['month', 'week', 'day']}
            defaultView="month"
            defaultDate={new Date()}
            components={{
              toolbar: CustomToolbar,
              event: EventComponent,
            }}
            onSelectEvent={(event) => setEventSelect(event as EventInterface)}
            style={{ height: calendarHeight }}
            className="text-sm md:text-base"
          />

          <style jsx>{`
            .calendar-modern :global(.rbc-calendar) {
              font-family: inherit;
              background: transparent;
            }

            .calendar-modern :global(.rbc-header) {
              background: #3b63a8;
              color: white;
              font-weight: 700;
              padding: 16px 12px;
              border: none;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              font-size: 13px;
            }

            .calendar-modern :global(.rbc-today) {
              background-color: #fef3c7 !important;
              position: relative;
            }

            .calendar-modern :global(.rbc-today)::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border: 2px solid #f59e0b;
              border-radius: 8px;
              pointer-events: none;
            }

            .calendar-modern :global(.rbc-off-range-bg) {
              background-color: #f8fafc !important;
            }

            .calendar-modern :global(.rbc-date-cell) {
              padding: 12px 8px;
              text-align: center;
              font-weight: 600;
              color: #374151;
              transition: all 0.2s ease;
            }

            .calendar-modern :global(.rbc-date-cell:hover) {
              background-color: #f1f5f9;
              border-radius: 8px;
            }

            .calendar-modern :global(.rbc-date-cell > a) {
              color: #374151;
              font-weight: 700;
              font-size: 16px;
              transition: color 0.2s ease;
            }

            .calendar-modern :global(.rbc-date-cell.rbc-now > a) {
              color: #dc2626;
              background: linear-gradient(135deg, #fca5a5 0%, #dc2626 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }

            .calendar-modern :global(.rbc-month-view) {
              border-radius: 16px;
              overflow: hidden;
              border: 1px solid #e2e8f0;
            }

            .calendar-modern :global(.rbc-month-row) {
              border-bottom: 1px solid #e2e8f0;
            }

            .calendar-modern :global(.rbc-month-row:last-child) {
              border-bottom: none;
            }

            .calendar-modern :global(.rbc-day-bg) {
              border-right: 1px solid #e2e8f0;
              transition: background-color 0.2s ease;
            }

            .calendar-modern :global(.rbc-day-bg:hover) {
              background-color: #f8fafc !important;
            }

            .calendar-modern :global(.rbc-day-bg:last-child) {
              border-right: none;
            }

            .calendar-modern :global(.rbc-toolbar) {
              flex-wrap: wrap;
              gap: 12px;
              margin-bottom: 32px;
              padding: 20px 24px;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              border-radius: 16px;
              border: 1px solid #e2e8f0;
            }

            .calendar-modern :global(.rbc-toolbar button) {
              background: white;
              border: 2px solid #e2e8f0;
              color: #475569;
              font-weight: 600;
              padding: 10px 16px;
              border-radius: 12px;
              transition: all 0.2s ease;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }

            .calendar-modern :global(.rbc-toolbar button:hover) {
              background: #3b82f6;
              border-color: #3b82f6;
              color: white;
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }

            .calendar-modern :global(.rbc-toolbar button.rbc-active) {
              background: #1e40af;
              border-color: #1e40af;
              color: white;
              box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
            }

            .calendar-modern :global(.rbc-toolbar-label) {
              font-size: 28px;
              font-weight: 800;
              color: #1e293b;
              margin: 0 20px;
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }

            .calendar-modern :global(.rbc-event) {
              border-radius: 12px;
              border: none;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .calendar-modern :global(.rbc-event:hover) {
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            }

            /* Week and Day view improvements */
            .calendar-modern :global(.rbc-time-view) {
              border-radius: 16px;
              overflow: hidden;
            }

            .calendar-modern :global(.rbc-time-header) {
              background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
              color: white;
              font-weight: 700;
            }

            .calendar-modern :global(.rbc-time-header-content) {
              border-bottom: 2px solid rgba(255, 255, 255, 0.2);
            }

            .calendar-modern :global(.rbc-time-slot) {
              border-top: 1px solid #e2e8f0;
            }

            .calendar-modern :global(.rbc-current-time-indicator) {
              background-color: #dc2626;
              height: 2px;
            }
          `}</style>
        </div>
      </div>

      {/* EVENTO SELECCIONADO */}
      {eventSelect && (
        <div className="bg-white md:bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border md:border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500 mx-4 md:mx-0">
          {/* Header with enhanced design */}
          <div className="relative bg-gradient-to-br from-primary-3 via-primary-2 to-primary-3 p-6 md:p-8 text-white overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 right-2 w-20 h-20 border-2 border-white/30 rounded-full"></div>
              <div className="absolute bottom-2 left-2 w-16 h-16 border-2 border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white/40 rounded-full"></div>
            </div>

            <button
              onClick={() => setEventSelect(null)}
              className="absolute z-40 top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 hover:scale-110 shadow-lg"
            >
              <X size={16} className="md:w-[18px] md:h-[18px]" />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <CalendarDays className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                    {eventSelect.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">Evento seleccionado</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Clock size={16} className="md:w-[18px] md:h-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wide">Horario</p>
                    <p className="font-semibold text-sm md:text-base">{dayjs(eventSelect.start).format('HH:mm')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <MapPin size={16} className="md:w-[18px] md:h-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wide">Lugar</p>
                    <p className="font-semibold text-sm">{eventSelect.place}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <CalendarDays size={16} className="md:w-[18px] md:h-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wide">Fecha</p>
                    <p className="font-semibold text-sm">{dayjs(eventSelect.start).format('DD/MM/YYYY')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <Activity
              button={false}
              title={eventSelect.title}
              description={eventSelect.description}
              hour={dayjs(eventSelect.start).format('HH:mm')}
              image={eventSelect.img}
              place={eventSelect.place}
            />
          </div>
        </div>
      )}
    </div>
  )
}
