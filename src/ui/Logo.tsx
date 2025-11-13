import clsx from "clsx"
import MyIcon from '../../public/logo-4c.svg'

interface Props {
    variant: 'primary' | 'white' | 'black';
}

const Logo = ({ variant }: Props) => {

    const logos = clsx({
        'none': variant === 'primary',
        'text-white': variant === 'white',
        'text-black': variant === 'black',
    })

    return (
        <MyIcon className={` ${logos}`} />
    )
}

export default Logo