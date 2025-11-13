'use client';

import Button from '@/ui/Button';
import Input from '@/ui/Input';
import axios from 'axios';
import { useRef } from 'react';

const PayOnline = () => {
    // Ref para capturar el input del monto
    const mount = useRef<HTMLInputElement | null>(null);
    const name = useRef<HTMLInputElement | null>(null);
    const typeDonative = useRef<HTMLSelectElement | null>(null);

    const handleMountPay = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (mount.current && name.current && typeDonative.current) {
            
            const dataPay = {
                "mount": (+mount.current.value * 100),
                "donant": name.current.value,
                "typeDonative": typeDonative.current.value
            };
            // Redireccionar al checkout de Stripe con los datos del pago
            axios.post("/api/checkout", dataPay).then(res => window.location.href = res.data.url).catch(err => console.log(err))
            

             
        }
    };

    return (
        <form className="w-full max-w-lg rounded-[20px] shadow-form p-6 flex flex-col justify-center items-center gap-4">
            <h2 className="text-secundary-3 text-xl md:text-xl-desktop">Pago en línea</h2>
            <Input ref={name} placeholder="Nombre" type="text" />
            <Input ref={typeDonative} type="select" />
            <Input ref={mount} placeholder="Monto del donativo" type="number" />
            <Button onClick={handleMountPay} url="" className='w-full' text="Pagar" variant="form" />
        </form>
    );
};

export default PayOnline;
