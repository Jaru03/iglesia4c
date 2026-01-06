'use client'
import Button from "@/ui/Button"
import Image from "next/image"
import {motion} from "motion/react"
import { useEffect, useState } from "react"

interface YouTubeVideo {
  id: { videoId: string }
  snippet: {
    title: string
    description: string
    thumbnails: {
      default: { url: string }
      medium: { url: string }
      high: { url: string }
    }
  }
}

const RecentPreach = () => {
    const [video, setVideo] = useState<YouTubeVideo | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const fetchLatestPreach = async () => {
            try {
                const response = await fetch("/api/latest-preach")
                const data = await response.json()
                if (data.items && data.items.length > 0) {
                    setVideo(data.items[0])
                }
            } catch (err) {
                console.error("Error fetching preach:", err)
            }
        }
        fetchLatestPreach()
    }, [])

    const defaultPreach = {
        id: { videoId: 'BMi26MN1QWQ' },
        snippet: {
            title: 'La Locura De Un Rey',
            description: '"La locura de un rey" explora dos episodios impactantes en la vida de Saúl y David.',
            thumbnails: {
                default: { url: '/laLocuraDeUnRey.jpeg' },
                medium: { url: '/laLocuraDeUnRey.jpeg' },
                high: { url: '/laLocuraDeUnRey.jpeg' }
            }
        }
    }

    const currentVideo = video || defaultPreach
    const videoId = currentVideo.id.videoId
    const thumbnail = currentVideo.snippet.thumbnails.high?.url || currentVideo.snippet.thumbnails.default?.url
    const link = `https://www.youtube.com/watch?v=${videoId}`

    if (!mounted) {
        return (
            <section className="bg-secondary">
                <div className="max-w-7xl mx-auto p-4 md:p-8">
                    <h2 className="text-2xl md:text-2xl-desktop text-primary-3 text-center py-10">Prédicas más recientes</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="w-full h-full bg-gray-200 animate-pulse" />
                        <div className="h-full flex flex-col justify-evenly">
                            <div className="h-8 bg-gray-200 animate-pulse mx-auto w-2/3" />
                            <div className="h-4 bg-gray-200 animate-pulse w-full" />
                            <div className="h-4 bg-gray-200 animate-pulse w-3/4" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="h-12 bg-gray-200 animate-pulse" />
                                <div className="h-12 bg-gray-200 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="bg-secondary" suppressHydrationWarning>
            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <h2 className="text-2xl md:text-2xl-desktop text-primary-3 text-center py-10">Prédicas más recientes</h2>
                <motion.article
                    initial={{
                        opacity: 0,
                        x: -100,
                        scale: 0.8,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                    }}
                    transition={{
                        duration: 1.5,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    viewport={{
                        once:true
                    }}
                    className="grid md:grid-cols-2 gap-8"
                    suppressHydrationWarning>
                    <Image 
                        width={1000} 
                        height={1000} 
                        src={thumbnail} 
                        className="w-full h-full object-cover" 
                        alt={currentVideo.snippet.title}
                        suppressHydrationWarning
                    />
                    <div className="h-full flex flex-col justify-evenly">
                        <h3 className="text-primary-3 text-xl md:text-xl-desktop text-center">{currentVideo.snippet.title}</h3>
                        <p className="text-base md:text-base-desktop py-4">Entra a nuestro canal de YouTube para ver nuestra última predica, será completamente de bendición para tu vida.                    </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button className="w-full" target="_blank" url='https://www.youtube.com/@casasdediosmadrid/streams' text={'Más Prédicas'} variant="primary" />
                            <Button className="w-full" target="_blank" url={link} text={'Ver Prédica'} variant="primary" />
                        </div>
                    </div>
                </motion.article>
            </div>
        </section>
    )
}

export default RecentPreach
