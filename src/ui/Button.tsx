'use client'

import clsx from "clsx"
import Link from "next/link";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    text: string;
    variant: 'primary' | 'hero' | 'secundary' | 'form';
    className?: string;
    url: string
    target?: '_blank' | '_self' | '_parent' | '_top';
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({ text, variant, className, url, target, onClick }: Props) => {
    const buttonClasses = twMerge(
        clsx({
            'bg-primary-3 text-white shadow-2xl': variant === 'primary',
            'bg-transparent border hover:bg-[#5C69724D] border-[3px] border-secundary-2 rounded-md text-secundary-2 font-semibold': variant === 'secundary',
            'bg-transparent border hover:bg-[#ffffff4D] border-[3px] border-white rounded-md text-white font-semibold': variant === 'hero',
            'bg-primary-3 text-white hover:bg-primary-3-hover rounded-[3px] px-10 font-semibold': variant === 'form',
        }), className)

    return (
        <>
            {
                variant === 'form' ?
                    <button onClick={onClick} className={`${buttonClasses} p-2 cursor-pointer flex items-center justify-center transition-all text-base md:text-base-desktop`}>{text}</button>
                    :
                    <Link href={url} target={target} className={`${buttonClasses} p-2 hover:scale-105  transition-all cursor-pointer flex items-center justify-center text-base md:text-base-desktop`}>
                        {text}
                    </Link>
            }
        </>
    )
}

export default Button