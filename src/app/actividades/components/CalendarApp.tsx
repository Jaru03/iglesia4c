'use client'

import { useState, useMemo, useEffect } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewWeek,
  viewMonthGrid,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'
import 'temporal-polyfill/global'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Title } from '@/components/typography/Title'

// IMPORTANTE: Esto define lo que TypeScript espera recibir
// Usamos "any" en los eventos para evitar conflictos estrictos con la librería externa
interface CalendarAppProps {
  activities?: any[];
}

dayjs.locale('es')

export default function CalendarApp({ activities = [] }: CalendarAppProps) {
  const [currentView, setCurrentView] = useState<'week' | 'month'>('month')
  const [isCalendarReady, setIsCalendarReady] = useState(false)
  const [dateLabel, setDateLabel] = useState('')

  const eventsService = useState(() => createEventsServicePlugin())[0]
  const calendarControls = useState(() => createCalendarControlsPlugin())[0]
  const eventModal = useState(() => createEventModalPlugin())[0]

  // AQUÍ ESTÁ LA CORRECCIÓN CLAVE 🔧
  // Volvemos a crear objetos "Temporal" en lugar de strings simples
  const events = useMemo(() => {
    return activities.map((act: any) => {
      // Usamos dayjs solo para sacar los números (año, mes, día...)
      const start = dayjs(act.hour_start)
      const end = dayjs(act.hour_end)
      
      return {
        id: String(act.id),
        title: act.title,
        // TypeScript quiere esto: ZonedDateTime
        start: Temporal.ZonedDateTime.from({
          year: start.year(),
          month: start.month() + 1, // dayjs cuenta meses desde 0, Temporal desde 1
          day: start.date(),
          hour: start.hour(),
          minute: start.minute(),
          timeZone: 'Europe/Madrid',
        }),
        end: Temporal.ZonedDateTime.from({
          year: end.year(),
          month: end.month() + 1,
          day: end.date(),
          hour: end.hour(),
          minute: end.minute(),
          timeZone: 'Europe/Madrid',
        }),
        location: act.place,
        description: act.description,
        calendarId: 'default',
      }
    })
  }, [activities])

  const updateDateLabel = () => {
    try {
      const date = calendarControls.getDate()
      // Convertimos a string para formatear el título del mes
      const label = dayjs(date.toString()).format('MMMM YYYY')
      setDateLabel(label)
    } catch (e) {}
  }

  const calendar = useCalendarApp({
    views: [createViewWeek(), viewMonthGrid],
    events: events, 
    plugins: [eventsService, calendarControls, eventModal],
    locale: 'es-ES',
    firstDayOfWeek: 1, 
    defaultView: viewMonthGrid.name,
    callbacks: {
      onRender() {
        setIsCalendarReady(true)
        updateDateLabel()
      },
      onRangeUpdate() {
        updateDateLabel()
      }
    },
  })

  // Efecto para recargar si los datos llegan tarde
  useEffect(() => {
    if (eventsService) {
      eventsService.getAll()
    }
  }, [events, eventsService])

  // Lógica de navegación ORIGINAL (la que funciona con Temporal)
  const handlePrev = () => {
    if (!isCalendarReady) return
    try {
      const current = calendarControls.getDate() as any
      if (currentView === 'month') {
        calendarControls.setDate(current.subtract({ months: 1 }))
      } else {
        calendarControls.setDate(current.subtract({ weeks: 1 }))
      }
      updateDateLabel()
    } catch (e) {
      console.warn('Error navegando:', e)
    }
  }

  const handleNext = () => {
    if (!isCalendarReady) return
    try {
      const current = calendarControls.getDate() as any
      if (currentView === 'month') {
        calendarControls.setDate(current.add({ months: 1 }))
      } else {
        calendarControls.setDate(current.add({ weeks: 1 }))
      }
      updateDateLabel()
    } catch (e) {
      console.warn('Error navegando:', e)
    }
  }

  const handleToday = () => {
    if (!isCalendarReady) return
    const today = Temporal.Now.plainDateISO()
    calendarControls.setDate(today)
    updateDateLabel()
  }

  const handleViewChange = (view: 'week' | 'month') => {
    setCurrentView(view)
    if (view === 'month') {
      calendarControls.setView(viewMonthGrid.name)
    } else {
      calendarControls.setView('week')
    }
    updateDateLabel()
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      <div className="text-center mb-6 md:mb-10">
        <Title className="mb-3 md:mb-4 text-2xl md:text-3xl">Calendario de Actividades</Title>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
          Consulta todas nuestras actividades y haz clic en un evento para ver los detalles.
        </p>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-3 md:p-4 bg-gray-50 border-b border-gray-100">
          <div className="flex flex-wrap flex-col md:flex-row items-center justify-center md:justify-between gap-3">
            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={!isCalendarReady}
                className="h-8 md:h-9 px-2 md:px-3 text-sm bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                onClick={handleToday}
                disabled={!isCalendarReady}
                className="h-8 md:h-9 px-3 md:px-4 text-sm font-medium bg-white"
              >
                Hoy
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={!isCalendarReady}
                className="h-8 md:h-9 px-2 md:px-3 text-sm bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <h2 className="text-base md:text-xl font-bold text-gray-800 capitalize w-full text-center order-first md:order-none md:w-auto md:text-left">
              {dateLabel || 'Cargando...'}
            </h2>

            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant={currentView === 'month' ? 'default' : 'outline'}
                onClick={() => handleViewChange('month')}
                disabled={!isCalendarReady}
                size="sm"
                className={`h-8 md:h-9 px-3 md:px-4 text-sm ${currentView === 'month' ? 'bg-slate-900 text-white' : 'bg-white'}`}
              >
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" />
                Mes
              </Button>
              <Button
                variant={currentView === 'week' ? 'default' : 'outline'}
                onClick={() => handleViewChange('week')}
                disabled={!isCalendarReady}
                size="sm"
                className={`h-8 md:h-9 px-3 md:px-4 text-sm ${currentView === 'week' ? 'bg-slate-900 text-white' : 'bg-white'}`}
              >
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" />
                Semana
              </Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-auto -mx-2 md:mx-0 px-2 md:px-0 bg-white">
          <ScheduleXCalendar 
            calendarApp={calendar}
          />
        </div>
      </div>
    </div>
  )
}