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
    { key: 1, title: "Conferencia de Mujeres", image: "https://northeurope1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=189650&inputFormat=jpeg&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!qkVAv_d9eEORzOi6HGc0mbFK-gZ4BnxIsDur6JgFDxCJc5aMsBcQRbdoa6jM30n0%2Fitems%2F01FTC37OOSK4UBEGJQOVGKGR7IR36X6VZT%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJiZjQwNDVhYS03ZGY3LTQzNzgtOTFjYy1lOGJhMWM2NzM0OTkiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzQ0NzQwMDAwIn0.PGQVEzVt8uyszyouhKvLr_5mO2a2uQeOfjQq2ccEotCOroLQHnV6UcJoqZjwqY4x_ebGmB0ww41g7-FrzoArLoXTqGW67yUasdmD2PQTvwYRtrVQAuDRdz1cgnEBr023IqQdTyMmHvcQRXgIxkGnVb5jhUZv9qM1I6Mo5blMwHw_FHvN_0RfQrYu441V7030Rx4aAlGRmnqUuS5mtPaBS4MDTYzGK8FOv_jBAijFgcZ0bt2vQX1WRWp9zEE8IPp5Nm5lIuM1ElU9G7P8-QjzlYfrYjMo_WcZukbvh_sPXu2XJsSZ85gCfxc4r8ZfOw2Fp1ghJ7dTPjjBze1pkrVLQGpGjr5VOcJyIdFl_pgZ40wwJ5zA65pf7OQ-Ksr3rvBaL5J4QzQOQVQikWJEbYeQ6zyyH-8sj9rDhxyB98MSl22h_PGQA_QFLRrXfoq1c2m6ui7lG8bDrJuCMIaGm0gPWLHtQ8ODFq8Tz4LqW10-bLE.qPK--T-csKThTrlOLhpKqhcVbWUxPCbAmgUUxcuLGUo%26version%3DPublished&cb=63879291083&encodeFailures=1&width=732&height=549&action=Access" },
    { key: 2, title: "Servicio General", image: "https://northeurope1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=189650&inputFormat=jpg&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!qkVAv_d9eEORzOi6HGc0mbFK-gZ4BnxIsDur6JgFDxCJc5aMsBcQRbdoa6jM30n0%2Fitems%2F01FTC37OLTWFEO5WDA2JDZ6QXVS72P4PME%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJiZjQwNDVhYS03ZGY3LTQzNzgtOTFjYy1lOGJhMWM2NzM0OTkiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzQ0NzQwMDAwIn0.3mjxUzNlkTV5OUE1zPDPXYvrZ2PUjAbvg6-7tUMPl6ekKBLz7OcqM-85AvG08C2jcj9sJT_KRw6dQdV7bmZVRRdQuWrVm5uxAjoCRqAvkmIBdQokMBwSE9SAoLbw7HuqbHVJEUscebXI4eAFwTCwrp65qzzA3Vgn_a7OMysLQbesUTTcd6Ybje92l5_8GrVdxaJLNy4UWffFxlX80mM2LKhW2RvZdNcPu5jXtg9-BcCDYR9osH_blMO79I-zPml8f8yE4IFpBgdfkhkiRwP2CTR0kk9E0lezCFZ5RBvtafbh7O8A-t6thabiz_rbBIlzEsEHbuzMdynvX_0G-iDk78QYVas_7UWgN8VZxQzLaAgMDruNFn4tTDRXv5RryhfnlSSbQjPWbh11p_MVH-SAvsGPyvYK1UgpCZCLoMAZzNVxLsiOE3O2ccJfVRd_fQ6UEizolIXzxppOEDbTKo5JBwWCM2Ha_sLfxd0YQ2kD5GQ.buJaR9BjGX5AEONIoJ5ZxgVZRh6DT02gs4FT2Vn_0Xc%26version%3DPublished&cb=63878093320&encodeFailures=1&width=366&height=549" },
    { key: 3, title: "Servicio General", image: "https://northeurope1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=189650&inputFormat=jpg&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!qkVAv_d9eEORzOi6HGc0mbFK-gZ4BnxIsDur6JgFDxCJc5aMsBcQRbdoa6jM30n0%2Fitems%2F01FTC37OI5ZKXZAH535FFYBYJ5H6XMS3FJ%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJiZjQwNDVhYS03ZGY3LTQzNzgtOTFjYy1lOGJhMWM2NzM0OTkiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzQ0NzQwMDAwIn0.INWyt7fraEg013YB9yjyERne2IDZgiQIze8QPUtHoXF0Lio1EfogSfuNHtrie9VYCKpZjqM6Jfbs2dHnFv5bhZvllesl7KBsuwOw8XVIhMJhICCpnqXvSYSs-Kcb_LQRSjP4deS3hDSDCPBNLVlr8CDDAHTVx-bTV4acHBV_n5EJO58BNQ2dw2PvBqNmHnB6CUGp099PbOFsNI7g7QsVDYuU2MS7Y6rQva7KuT6iQcdFFP1seLyJiw-Lt-WBRCn5CZ52qiS2y0IQZEIXuOHRBFkAPbwlcpAcVnGtKShf9y5PbHKU5ktlp2ceMtRp3EP6yzk7G6e2HYdRN558ksoTuQcuJSS_vJu0H3T8zSqEhTMIRGxgChBx5pvW4sYvUVx4H5yyESVcni7ZschLEyHz6rtw3jv4JjMjGyQ3mP9PKZzTIFqfLvIGNoXWnlCfgWrv9COOf3ZY9MI9ZKQ7iAzlZ_8GSk8DsCigLwAqHKHxhfA.tUkxBV3Q45HpZ2e-YNMFRP9MfOl1Ea7z-NV6unW926c%26version%3DPublished&cb=63878093916&encodeFailures=1&width=411&height=549" },
  ]

  return (
    <section>
      <div className='p-6'>
        <h2 className='text-primary-2 text-2xl md:text-2xl-desktop text-center py-10'>Últimas Actividades</h2>


        <Swiper navigation={true} pagination={true} modules={[Pagination, Navigation]} className="mySwiper shadow-form  mb-20 p-10 max-w-[500px]">

          {slider.map((slider) => (

            <SwiperSlide key={slider.key}>
              <Image width={1000} height={1000} src={slider.image} alt='Image 1' className='w-full h-full min-w-[230px] p-4 xl:p-6 object-contain max-h-[500px]' />

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