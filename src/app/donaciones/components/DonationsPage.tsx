'use client'

import DonationIcon from "@/app/donaciones/components/DonationIcon"
import PayOnline from "@/app/donaciones/components/PayOnline"
import PayPalInfo from "@/app/donaciones/components/PayPalInfo"
import TransferInfo from "@/app/donaciones/components/TransferInfo"
import { useState } from "react"
import { HeroTitle } from "@/components/typography/HeroTitle"
import { Title } from "@/components/typography/Title"


const DonationsPage = () => {

    const [infoPay, setInfoPay] = useState<string>('')


  return (
    <section className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[url(../../public/donaciones-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            
            <HeroTitle title="Donaciones" size="large" />
            
          </div>

          

          
        </div>
      </div>

      {/* Donation Methods Section */}
      <div className="py-16 px-6 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Title>Formas de Donar</Title>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Selecciona el método de pago que más te convenga. Todas las donaciones son seguras y confidenciales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 justify-items-center mb-12">
            <DonationIcon
              className={`${infoPay === 'PayPal' ? 'ring-4 ring-primary-3 shadow-2xl scale-105' : 'hover:scale-105'}`}
              setter={setInfoPay}
              payPath="PayPal"
              imgSrc="/paypal-icon.png"
              text="PayPal"
            />
            <DonationIcon
              className={`${infoPay === 'Online' ? 'ring-4 ring-primary-3 shadow-2xl scale-105' : 'hover:scale-105'}`}
              setter={setInfoPay}
              payPath="Online"
              imgSrc="/onlinepay-icon.png"
              text="Pago en línea"
            />
            <DonationIcon
              className={`${infoPay === 'Transferencia' ? 'ring-4 ring-primary-3 shadow-2xl scale-105' : 'hover:scale-105'}`}
              setter={setInfoPay}
              payPath="Transferencia"
              imgSrc="/transfer-icon.png"
              text="Transferencia Bancaria"
            />
          </div>

          {/* Payment Form Section */}
          {infoPay && (
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                {infoPay === 'PayPal' && <PayPalInfo/>}
                {infoPay === 'Online' && <PayOnline/>}
                {infoPay === 'Transferencia' && <TransferInfo/>}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DonationsPage
