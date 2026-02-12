'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { Play, Youtube } from "lucide-react"
import { Subtitle } from "@/components/typography/Subtitle"
import { useEffect, useState } from "react"

// Estructura de los datos que vamos a manejar
interface PreachData {
    title: string;
    description: string | null;
    img: string | null;
    urlVideo: string;
}

const RecentPreach = () => {
    const [preach, setPreach] = useState<PreachData | null>(null)
    const [loading, setLoading] = useState(true)

    // DATOS POR DEFECTO (Por si falla la API o está cargando)
    const defaultPreach: PreachData = {
        title: 'Bienvenido a Casa de Dios',
        description: 'Visita nuestro canal de YouTube para ver todos nuestros mensajes y adoración. Dios tiene una palabra para ti.',
        img: '/laLocuraDeUnRey.jpeg', // Asegúrate de que esta imagen exista en /public
        urlVideo: 'https://www.youtube.com/@casasdediosmadrid'
    };

    useEffect(() => {
        const fetchLatestPreach = async () => {
            try {
                // Llamamos a tu API (asegúrate de haber creado el archivo route.ts que hablamos antes)
                const response = await fetch("/api/latest-preach")
                const data = await response.json()

                if (data.items && data.items.length > 0) {
                    const video = data.items[0];
                    const snippet = video.snippet;
                    
                    // Transformamos los datos de YouTube al formato limpio de tu diseño
                    setPreach({
                        title: snippet.title,
                        description: snippet.description,
                        img: snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
                        urlVideo: `https://www.youtube.com/watch?v=${video.id.videoId}`
                    })
                }
            } catch (err) {
                console.error("Error obteniendo la última prédica:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchLatestPreach()
    }, [])

    // Usamos la prédica encontrada O la de defecto
    const currentPreach = preach || defaultPreach

    // Lógica para cortar el texto si es muy largo
    const descriptionText = currentPreach.description
        ? (currentPreach.description.length > 150 ? currentPreach.description.substring(0, 150) + "..." : currentPreach.description)
        : "Entra a nuestro canal de YouTube para ver nuestra última predica.";

    return (
        <section className="bg-secondary" suppressHydrationWarning>
            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <Subtitle className="text-center py-10">Prédicas más recientes</Subtitle>
                
                <motion.article
                    initial={{ opacity: 0, x: -100, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8 items-center"
                >
                    {/* --- COLUMNA 1: IMAGEN / VIDEO --- */}
                    <div className="relative aspect-video rounded-xl shadow-lg overflow-hidden bg-black group cursor-pointer">
                        <Link href={currentPreach.urlVideo} target="_blank">
                            {currentPreach.img ? (
                                <>
                                    <Image 
                                        width={1000} 
                                        height={1000} 
                                        src={currentPreach.img} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                        alt={currentPreach.title}
                                    />
                                    {/* Overlay de Play al pasar el mouse */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                                        <Play className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform" />
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                                    <Play className="w-12 h-12 opacity-50" />
                                </div>
                            )}
                        </Link>
                    </div>

                    {/* --- COLUMNA 2: TEXTO Y BOTONES --- */}
                    <div className="h-full flex flex-col justify-evenly">
                        <h3 className="text-xl md:text-2xl font-bold text-primary-3 text-center md:text-left mt-4 md:mt-0">
                            {loading ? "Cargando..." : currentPreach.title}
                        </h3>
                        
                        <p className="text-base md:text-lg py-4 text-muted-foreground text-center md:text-left">
                            {descriptionText}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button asChild className="w-full" variant="default" size="default">
                                <Link href={currentPreach.urlVideo} target="_blank">
                                    <Play className="w-4 h-4 mr-2" />
                                    Ver Prédica
                                </Link>
                            </Button>
                            <Button asChild className="w-full" variant="outline" size="default">
                                <Link href='https://www.youtube.com/@casasdediosmadrid/streams' target="_blank">
                                    <Youtube className="w-4 h-4 mr-2" />
                                    Más Prédicas
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.article>
            </div>
        </section>
    )
}

export default RecentPreach;