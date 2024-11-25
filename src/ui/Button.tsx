import clsx from "clsx"
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
    text: string;
    variant: 'primary' | 'hero' | 'secundary' | 'form';
    className?: string;
    href?: string;
}

const Button = ({ text, variant, className, href}: Props) => {
    const buttonClasses = twMerge(
        clsx({
            'bg-primary-3 text-white shadow-2xl': variant === 'primary',
            'bg-transparent border border-[3px] border-secundary-2 rounded-md text-secundary-2 font-semibold': variant === 'secundary',
            'bg-transparent border border-[3px] border-white rounded-md text-white font-semibold': variant === 'hero',
            'bg-primary-3 text-white rounded-[20px] px-10 font-semibold': variant === 'form',
        }), className)

    return (
        <>
        {
            variant === 'form' ?
            <button className={`${buttonClasses} p-2 cursor-pointer flex items-center justify-center text-base max-w-[370px]`}>{text}</button>
            :
            <Link href={`/` + href} className={`${buttonClasses} p-2 cursor-pointer flex items-center justify-center text-base max-w-[370px]`}>
            {text}
            </Link>
        }
        </>
    )
}

export default Button