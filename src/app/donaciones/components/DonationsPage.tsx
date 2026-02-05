'use client'
import { SpinningTextLabel } from "@/components/SpinningTextLabel"

import PayOnline from "@/app/donaciones/components/PayOnline"
import PayPalInfo from "@/app/donaciones/components/PayPalInfo"
import TransferInfo from "@/app/donaciones/components/TransferInfo"
import { HeroTitle } from "@/components/typography/HeroTitle"
import { Title } from "@/components/typography/Title"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, CreditCard, Building2 } from "lucide-react"
import { SpinningText } from "@/components/ui/spinning-text"

const DonationsPage = () => {
  return (
    <section className="w-full min-h-screen">
      <div className="relative bg-[url(../../public/donaciones-banner.jpg)] h-[100vh] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <HeroTitle title="Donaciones" size="large" />
        </div>

        <SpinningTextLabel />
      </div>

      <div className="py-16 px-6 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Title>Formas de Donar</Title>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
              Selecciona el método de pago que más te convenga. Todas las donaciones son seguras y confidenciales.
            </p>
          </div>

          <Tabs defaultValue="PayPal" className="w-full">
            <TabsList variant="line" className="grid w-full grid-cols-3 gap-4 mb-8">
              <TabsTrigger
                value="PayPal"
                className="flex items-center gap-2 data-[state=active]:text-primary-3"
              >
                <Wallet className="w-5 h-5" />
                PayPal
              </TabsTrigger>

              <TabsTrigger
                value="Online"
                className="flex items-center gap-2 data-[state=active]:text-primary-3"
              >
                <CreditCard className="w-5 h-5" />
                Pago en línea
              </TabsTrigger>

              <TabsTrigger
                value="Transferencia"
                className="flex items-center gap-2 data-[state=active]:text-primary-3"
              >
                <Building2 className="w-5 h-5" />
                Transferencia
              </TabsTrigger>
            </TabsList>

            <TabsContent value="PayPal">
              <PayPalInfo />
            </TabsContent>

            <TabsContent value="Online">
              <PayOnline />
            </TabsContent>

            <TabsContent value="Transferencia">
              <TransferInfo />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default DonationsPage
