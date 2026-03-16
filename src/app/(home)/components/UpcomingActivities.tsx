'use client'
import { useEffect, useState } from "react"
import Activity from "@/components/Activity" // Asegúrate de que esta ruta sea correcta
import dayjs from "dayjs"
import { Subtitle } from "@/components/typography/Subtitle"

// Definimos la forma de los datos que vienen de tu API
interface ActivityData {
  id: number;
  title: string;
  description: string | null;
  img: string | null;
  place: string;
  hourStart: string; 
}

const UpcomingActivities = () => {
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Llamamos a tu archivo route.ts
        const response = await fetch("/api/activities")
        const data = await response.json()
        
        if (Array.isArray(data)) {
          setActivities(data)
        }
      } catch (error) {
        console.error("Error obteniendo actividades:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) {
    return null // O puedes poner un <div>Cargando...</div>
  }

  console.log(activities)

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-12">
          <Subtitle className="text-center py-10">Próximas actividades</Subtitle>

          <p className="text-gray-600 text-base xs:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            Únete a nosotros en estos próximos eventos y actividades especiales
          </p>
        </div>

        <div className="space-y-8">
          {activities.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">No hay actividades próximas programadas por el momento.</p>
            </div>
          ) : (
            activities.map((activity) => (
              <Activity
                key={activity.id}
                button={true}
                description={activity.description || "Te esperamos."}
                place={activity.place}
                // Usamos dayjs para formatear la hora (ej: 18:30)
                hour={dayjs(activity.hourStart).format('HH:mm')} 
                image={activity.img || "/images/placeholder-evento.jpg"}
                title={activity.title}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default UpcomingActivities;