'use client'

import clsx from "clsx"
import Link from "next/link";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    text: string;
    variant: 'primary' | 'hero' | 'secondary' | 'form';
    className?: string;
    url?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({ text, variant, className, url, target, onClick }: Props) => {
    const buttonClasses = twMerge(
        clsx({
            'bg-primary-3 text-white shadow-lg hover:shadow-xl hover:bg-primary-2 transform hover:scale-105 transition-all duration-200 font-semibold rounded-lg xs:px-4 xs:py-5 px-6 py-6 xs:text-xs text-sm text-center': variant === 'primary',
            'bg-transparent border-2 border-primary-3 hover:bg-primary-3 hover:text-white text-primary-3 font-semibold rounded-lg xs:px-4 xs:py-5 px-6 py-6 xs:text-xs text-sm transform hover:scale-105 transition-all duration-200': variant === 'secondary',
            'bg-transparent border-2 border-white hover:bg-white hover:text-primary-3 text-white font-semibold rounded-lg xs:px-4 xs:py-5 px-6 py-6 xs:text-xs text-sm transform hover:scale-105 transition-all duration-200': variant === 'hero',
            'bg-primary-3 text-white hover:bg-primary-2 rounded-lg xs:px-6 xs:py-5 px-8 py-6 xs:text-xs text-sm font-semibold transform hover:scale-105 transition-all duration-200': variant === 'form',
        }), className)

    if (variant === 'form') {
        return (
            <button
                onClick={onClick}
                className={`${buttonClasses} cursor-pointer flex items-center justify-center xs:text-xs text-sm md:text-base-desktop`}
            >
                {text}
            </button>
        )
    }

    if (!url) {
        return (
            <button
                onClick={onClick}
                className={`${buttonClasses} cursor-pointer flex items-center justify-center xs:text-xs text-sm md:text-base-desktop`}
            >
                {text}
            </button>
        )
    }

    return (
        <Link
            href={url}
            target={target}
            className={`${buttonClasses} flex items-center justify-center xs:text-xs text-sm md:text-base-desktop`}
        >
            {text}
        </Link>
    )
}

export default Button
