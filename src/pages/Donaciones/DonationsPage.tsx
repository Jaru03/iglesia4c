'use client'

import DonationIcon from "@/pages/Donaciones/DonationIcon"
import PayOnline from "@/pages/Donaciones/PayOnline"
import PayPalInfo from "@/pages/Donaciones/PayPalInfo"
import TransferInfo from "@/pages/Donaciones/TransferInfo"
import { useState } from "react"


const DonationsPage = () => {

    const [infoPay, setInfoPay] = useState<string>('')
  

  return (
    <section className="w-full min-h-screen">
      <div className="bg-[url(../../public/donaciones-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
          <h2 className="text-white text-3xl md:text-3xl-desktop z-[5] text-center">
            Donaciones
          </h2>
        </div>
      <div className="p-6 flex flex-col gap-6 justify-center items-center">
        <h2 className="text-2xl md:text-2xl-desktop text-primary-2">Donaciones</h2>

        <div className="flex flex-wrap gap-4 justify-center">
          <DonationIcon className={`${infoPay === 'PayPal' ? 'innerShadowDonationCard' : null }`} setter={setInfoPay} payPath="PayPal" imgSrc="/paypal-icon.png" text="PayPal" />
          <DonationIcon className={`${infoPay === 'Online' ? 'innerShadowDonationCard' : null }`} setter={setInfoPay} payPath="Online" imgSrc="/onlinepay-icon.png" text="Pago en línea" />
          <DonationIcon className={`${infoPay === 'Transferencia' ? 'innerShadowDonationCard' : null }`} setter={setInfoPay} payPath="Transferencia" imgSrc="/transfer-icon.png" text="Transferencia Bancaria" />
        </div>
        
          {infoPay === 'PayPal' ?<PayPalInfo/>: infoPay === 'Online'? <PayOnline/> : infoPay === 'Transferencia'? <TransferInfo/> : null }
        
      </div>
    </section>
  )
}

export default DonationsPage