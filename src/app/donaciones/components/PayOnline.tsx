'use client';

import Button from '@/ui/Button';
import Input from '@/ui/Input';
import axios from 'axios';
import { useRef, useState } from 'react';
import { CreditCard, User, DollarSign, Loader2 } from 'lucide-react';

const PayOnline = () => {
    const mount = useRef<HTMLInputElement | null>(null);
    const name = useRef<HTMLInputElement | null>(null);
    const typeDonative = useRef<HTMLSelectElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleMountPay = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!mount.current?.value || !name.current?.value || !typeDonative.current?.value) {
            alert('Por favor, completa todos los campos');
            return;
        }

        if (parseFloat(mount.current.value) <= 0) {
            alert('El monto debe ser mayor a 0');
            return;
        }

        setIsLoading(true);

        try {
            const dataPay = {
                "mount": (+mount.current.value * 100),
                "donant": name.current.value,
                "typeDonative": typeDonative.current.value
            };

            const res = await axios.post("/api/checkout", dataPay);
            window.location.href = res.data.url;
        } catch (err) {
            console.error('Error al procesar el pago:', err);
            alert('Error al procesar el pago. Por favor, inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-3 to-primary-2 p-6 text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">Pago en Línea</h2>
                <p className="text-white/90 text-sm mt-1">Pago seguro con Stripe</p>
            </div>

            {/* Form */}
            <form className="p-8 space-y-6">
               

                {/* Donation Type Field */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <DollarSign className="w-4 h-4" />
                        Tipo de Donativo
                    </label>
                    <Input
                        ref={typeDonative}
                        type="select"
                        className="w-full"
                    />
                </div>

                {/* Amount Field */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <DollarSign className="w-4 h-4" />
                        Monto (€)
                    </label>
                    <Input
                        ref={mount}
                        placeholder="0.00"
                        type="number"
                        className="w-full"
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleMountPay}
                    disabled={isLoading}
                    className="w-full bg-primary-3 hover:bg-primary-3-hover text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Procesando...
                        </>
                    ) : (
                        "Realizar Pago"
                    )}
                </button>

                {/* Security Notice */}
                <div className="text-center text-xs text-gray-500 mt-4">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        Conexión segura SSL
                    </div>
                    <p>Tus datos están protegidos</p>
                </div>
            </form>
        </div>
    );
};

export default PayOnline;
