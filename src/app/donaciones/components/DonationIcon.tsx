'use client'

import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { motion } from "motion/react"
import { CheckCircle } from "lucide-react"

interface Props {
    text: string
    imgSrc: string
    setter: React.Dispatch<React.SetStateAction<string>>
    payPath: 'PayPal' | 'Transferencia' | 'Online'
    className?: string
}

const DonationIcon = ({ text, imgSrc, setter, payPath, className }: Props) => {

    const handleClick = () => {
        setter(payPath)
    }

    const isSelected = className?.includes('ring-4')

    const animationVariants = {
        rest: {
            scale: 1,
            y: 0,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        },
        selected: {
            scale: 1.05,
            y: -8,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        },
        hover: {
            scale: 1.02,
            y: -4,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        },
        tap: {
            scale: 0.98,
            y: 2
        }
    }

    const cardStyles = twMerge(
        "relative rounded-2xl w-[280px] h-[180px] bg-white border-2 border-gray-200 flex justify-center items-center transition-all duration-300 overflow-hidden group cursor-pointer",
        className
    )

    return (
        <motion.article
            onClick={handleClick}
            className={cardStyles}
            variants={animationVariants}
            initial="rest"
            animate={isSelected ? "selected" : "rest"}
            whileHover="hover"
            whileTap="tap"
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                restDelta: 0.001
            }}
        >
            {/* Background gradient for selected state */}
            {isSelected && (
                <div className="absolute inset-0 bg-linear-to-br from-primary-3/10 to-primary-2/10"></div>
            )}

            {/* Selection indicator */}
            {isSelected && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-primary-3 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                </div>
            )}

            <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-6 relative z-10">
                <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-300">
                    <Image
                        src={imgSrc}
                        width={150}
                        height={150}
                        alt={`Icono de ${text}`}
                        className="max-w-[50px] max-h-[50px] object-contain"
                        suppressHydrationWarning
                    />
                </div>

                <div className="text-center">
                    <p className={`text-lg font-semibold transition-colors duration-300 ${
                        isSelected ? 'text-primary-3' : 'text-gray-800 group-hover:text-primary-3'
                    }`}>
                        {text}
                    </p>
                    {isSelected && (
                        <p className="text-sm text-primary-3/80 mt-1 font-medium">
                            Seleccionado
                        </p>
                    )}
                </div>
            </div>

            {/* Hover effect border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-3/30 transition-all duration-300"></div>
        </motion.article>
    )
}

export default DonationIcon
