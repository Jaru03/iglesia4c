'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { Play, YoutubeIcon } from "lucide-react"
import { Subtitle } from "@/components/typography/Subtitle"
import { useEffect, useState } from "react"

interface PreachData {
    title: string;
    description: string | null;
    img: string | null;
    urlVideo: string;
}

const RecentPreach = () => {
    const [preach, setPreach] = useState<PreachData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLatestPreach = async () => {
            try {
                const response = await fetch("/api/latest-preach")
                const data = await response.json()

                if (Array.isArray(data) && data.length > 0) {
                    const video = data[0];
                    setPreach({
                        title: video.title,
                        description: null,
                        img: video.thumbnail,
                        urlVideo: video.link,
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

    const descriptionText = preach?.description
        ? (preach.description.length > 150 ? preach.description.substring(0, 150) + "..." : preach.description)
        : "Entra a nuestro canal de YouTube para ver nuestra última predica.";

    return (
        <section className="bg-secondary">
            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <Subtitle className="text-center py-10">Prédicas más recientes</Subtitle>

                <motion.article
                    initial={{ opacity: 0, x: -100, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8 items-center"
                >
                    {/* IMAGEN */}
                    <div className="relative aspect-video rounded-xl shadow-lg overflow-hidden bg-gray-800 group cursor-pointer">
                        {loading ? (
                            <div className="w-full h-full animate-pulse bg-gray-700" />
                        ) : (
                            <Link href={preach?.urlVideo ?? 'https://www.youtube.com/@casasdediosmadrid'} target="_blank">
                                <motion.div
                                    className="w-full h-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {preach?.img ? (
                                        <>
                                            <Image
                                                width={1000}
                                                height={1000}
                                                src={preach.img}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                alt={preach.title}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                                                <Play className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform" />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white">
                                            <Play className="w-12 h-12 opacity-50" />
                                        </div>
                                    )}
                                </motion.div>
                            </Link>
                        )}
                    </div>

                    {/* TEXTO */}
                    <div className="h-full flex flex-col justify-evenly">
                        {loading ? (
                            <div className="space-y-4">
                                <div className="h-7 w-3/4 rounded-md bg-gray-700 animate-pulse" />
                                <div className="h-4 w-full rounded-md bg-gray-700 animate-pulse" />
                                <div className="h-4 w-5/6 rounded-md bg-gray-700 animate-pulse" />
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="h-10 rounded-md bg-gray-700 animate-pulse" />
                                    <div className="h-10 rounded-md bg-gray-700 animate-pulse" />
                                </div>
                            </div>
                        ) : (
                            <motion.div
                                className="flex flex-col gap-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-primary-3 text-center md:text-left">
                                    {preach?.title ?? 'Bienvenido a Casa de Dios'}
                                </h3>
                                <p className="text-base md:text-lg text-muted-foreground text-center md:text-left">
                                    {descriptionText}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Button asChild className="w-full" variant="default">
                                        <Link href={preach?.urlVideo ?? 'https://www.youtube.com/@casasdediosmadrid'} target="_blank">
                                            <Play className="w-4 h-4 mr-2" />
                                            Ver Prédica
                                        </Link>
                                    </Button>
                                    <Button asChild className="w-full" variant="outline">
                                        <Link href='https://www.youtube.com/@casasdediosmadrid/streams' target="_blank">
                                            <YoutubeIcon className="w-4 h-4 mr-2" />
                                            Más Prédicas
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.article>
            </div>
        </section>
    )
}

export default RecentPreach;