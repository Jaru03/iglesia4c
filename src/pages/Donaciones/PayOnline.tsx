import Button from '@/ui/Button'
import Input from '@/ui/Input'

const PayOnline = () => {
    return (
        <form className="w-full max-w-[812px] rounded-[20px] shadow-form p-6 flex flex-col justify-center items-center gap-4">
            <h2 className='text-secundary-3 text-xl md:text-xl-desktop'>Pago en línea</h2>
            <Input placeholder='Nombre' type='text' />
            <Input placeholder='Numero de tarjeta' type='text' />
            <Input placeholder='Concepto' type='text' />
            <div className='flex w-full gap-2'>
                <Input placeholder='CVV' type='text' />
                <Input placeholder='Fecha de vencimiento' type='text' />
            </div>
            <Button url='' text='Pagar' variant='form' />
        </form>
    )
}

export default PayOnline