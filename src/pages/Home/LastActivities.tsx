'use client'

import Image from 'next/image'
import React from 'react'
import { Happy_Monkey } from 'next/font/google'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules'

interface Slider {
  key: number
  title: string
  image: string
}

const happyMonkey = Happy_Monkey({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
})

const LastActivities = () => {

  const slider: Slider[] = [
    { key: 1, title: "Santa Cena", image: "/santaCena.jpg" },
    { key: 2, title: "Servicio General", image: "https://northeurope1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=189650&inputFormat=JPG&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!qkVAv_d9eEORzOi6HGc0mbFK-gZ4BnxIsDur6JgFDxCJc5aMsBcQRbdoa6jM30n0%2Fitems%2F01FTC37OLT5I45RZPAHNEYJOADRBFFDLTE%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJiZjQwNDVhYS03ZGY3LTQzNzgtOTFjYy1lOGJhMWM2NzM0OTkiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzQwODYyODAwIn0.6A_voHlSPUR3f3gIgMGhNFJa-nnM3D_EkKomimQNNnimGgA6pttfnmfECcgDWpQ_xNCgrKScWSk0T95rQg-m-gZbvbV7K4hqZPZjjaSQjA_xG1yJQDwtyagZG41TagOhmlIoWItpQ2E0Y9hsb8iFytkmgPwSbBG3F7n3ZY__rlvqo5GuEUCR_s7OwB9v-KCXhawKrAZiqskLW37FUT1bz1J5xnAtF4LPBOdesHMQQ-LJFZyFisJNC_SiacoFxGyqO9OZHTLlPp1AQxAk2I0hje18vIcKCauRmMEOfRrwtMFi67CfIqZbrxjBwpLgwtwD6_XI-1Y9bd_wGBnbQ49NsTv-5C79kL8S2FuVIAvBfbBKzxppEjJzyzfIXNz46iknwMBB7AzJEx6ZljkBPsC0azWsOExhSmN5Qd_2Acq0QczIevFGV9Z67Rga83I63P2YL9iaSQ8Xau_oCaJlZyp32DonUFTWlRhnPei8zv9JNco.6zG7VV71fIh6RBcwURtwZ4MDyi1acI_XwCGvvfNmUVs%26version%3DPublished&cb=63876175493&encodeFailures=1&width=1366&height=549" },
    { key: 3, title: "Servicio General", image: "https://northeurope1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=189650&inputFormat=png&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!qkVAv_d9eEORzOi6HGc0mbFK-gZ4BnxIsDur6JgFDxCJc5aMsBcQRbdoa6jM30n0%2Fitems%2F01FTC37OOUGRSLKZVCQJALH6XACPACKXO2%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJiZjQwNDVhYS03ZGY3LTQzNzgtOTFjYy1lOGJhMWM2NzM0OTkiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzQwODYyODAwIn0.Ikhe43-F-bk4atC3GpIL-Zkdf1y9aDTWFMgmCzs_s4lpxkONfBU5ZTevIIzUItTyLWbVZQwLgbhFhqipNFN2KEtSq8dJgxwMlx4e9cEAbXUIiZPeH2KfrrNRRtIvq-T49v2edCvDcKfe0z9fESimIDaujy9GjfwWPiNw-7p3IrzRvWwA8Ivm_reHyv7aPSgZHwYenVVt4EQt5gLF23ALOyXGl8HWvN8yeGpQ6oZ5z1F6ricgNe0NaYOYrjJxa7ee5HeW8JYv8CNJn4z5s_S42jdsvR4Y40Zc7KgJZsJX2xhqrgGT982d-j0xmFGgjp9s7ex3X8e-r8XoSxa1R3y506Bzh6aa_HdMdJITTMP9OdZaRG81sEigP5G9We1gsO2hCExbTUJucEz64-r5mGEsfmGExA2xg9i9_OfIM7M57IRgGv0ad4diHeMQZrIdIcgWb4MD3jYcIqH5tErzp6CqpkpiU3pQ17fkNQB22A9C9l0.aUu6JNcpMfL-LVk6nA_gT8gi96l8Tpn7aPQCkBq-wic%26version%3DPublished&cb=63876177061&encodeFailures=1&width=1365&height=548" },
  ]

  return (
    <section>
      <div className='p-6'>
        <h2 className='text-primary-2 text-2xl md:text-2xl-desktop text-center py-10'>Últimas Actividades</h2>


        <Swiper navigation={true} pagination={true} modules={[Pagination, Navigation]} className="mySwiper shadow-form  mb-20 p-10 max-w-[500px]">

          {slider.map((slider) => (

            <SwiperSlide key={slider.key}>
              <Image width={1000} height={1000} src={slider.image} alt='Image 1' className='w-full h-full min-w-[230px] p-4 xl:p-6 object-contain max-h-[80vh]' />

              <h3 className={`text-xl md:text-xl-desktop py-5 pt-3 sm:pb-8 text-center ${happyMonkey.className}`}>{slider.title}</h3>
            </SwiperSlide>
          ))
          }
        </Swiper>
      </div>
    </section>
  )
}

export default LastActivities