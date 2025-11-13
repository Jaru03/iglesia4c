'use client' 

import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { motion } from "motion/react" // 👈 Asegúrate de que el import sea de 'framer-motion' si usas sus props

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

    const isSelected = className?.includes('innerShadowDonationCard')

    // 2. Define la transición para suavizar el cambio
    // 💡 VALORES AJUSTADOS PARA MÁS SUAVISADAD

    // 3. Define los estados de la animación
    const animationVariants = {
        // Estado por defecto (No seleccionado)
        rest: { 
            scale: 1, 
            boxShadow: '1px 10px 4px 0px rgba(0, 0, 0, 0.15)'
        },
        // Estado seleccionado (Hundido)
        selected: { 
            scale: 0.98,
            boxShadow: 'inset 1px 5px 4px 0 rgba(0, 0, 0, 0.15)'
        },
        // Estado al hacer click (para que se "presione" al tocar)
        tap: { 
            scale: 0.95,
        }
    }

    const cardStyles = twMerge("rounded-lg w-[260px] h-[160px] flex justify-center transition-all", className)

    return (
        <motion.article 
            onClick={handleClick} 
            className={cardStyles}
            
            // FRAMER MOTION PROPS:
            variants={animationVariants}
            initial="rest"
            animate={isSelected ? "selected" : "rest"}
            whileTap="tap"
            // 👇 APLICAMOS LA TRANSICIÓN DEFINIDA
            transition={{
        type: "spring",
        stiffness: 200, // Bajamos la rigidez de 500 a 200
        damping: 35,    // Subimos el amortiguamiento de 30 a 35
        restDelta: 0.001
    }
} 
        >
            <div className="flex flex-col transition-all cursor-pointer items-center justify-center gap-2 w-full h-full">
                <Image src={imgSrc} width={150} height={150} alt="Icono de donación" className="max-w-[70px] max-h-[80px]" />
                <p className="text-base md:text-base-desktop font-semibold">{text}</p>
            </div> 
        </motion.article>
    )
}

export default DonationIcon