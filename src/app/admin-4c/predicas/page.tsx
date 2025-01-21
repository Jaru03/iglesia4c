'use client'

import FormPreach from "@/pages/Admin/predicas/FormPreach"
import { PreachInfo } from "@/types/PreachInfo"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"

const Page = () => {

    const [button, setButton] = useState<boolean>(false)
    const [response, setResponse] = useState<PreachInfo[]>()
    const [preachUpdate, setPreachUpdate] = useState<PreachInfo>()
    const [preachSelectUpdate, setPreachSelectUpdate] = useState<number>()
    const [preachSelectDelete, setPreachSelectDelete] = useState<number>()

    console.log(preachUpdate)

    const handleButton = () => {
        setButton(!button)
    }

    const handleDelete = ():void => {
        console.log(preachSelectDelete)
        axios.delete(`/api/preachings/${preachSelectDelete}`)
        .then(res =>(console.log(res.data)))
        .catch(err => console.log(err))
    }

    const handleUpdate = ():void => {    
        setButton(true)
        const updatePreach = response?.filter((preach: { id: number }) => preach.id === preachSelectUpdate)
        setPreachUpdate(updatePreach && updatePreach[0])
    }

    useEffect(() => {
        axios.get('/api/preachings').then(res => setResponse(res.data)).catch(err => console.log(err))
    }, [])

    useEffect(() => {
      if(preachSelectUpdate !== undefined){
        handleUpdate()
        setPreachSelectUpdate(undefined)
      }

      if(preachSelectDelete !== undefined){
        handleDelete()
        setPreachSelectDelete(undefined)
      }
    }, [preachSelectUpdate, preachSelectDelete])
    
    console.log(response)

    return (
        <section className="min-h-screen">
            <div className="p-6 pt-24 h-full relative items-center md:pt-32">

                <h2 className="text-2xl text-center text-primary">Predicas</h2>
                {
                    button ? <FormPreach /> : null
                }

                <div className="flex justify-center items-center gap-8" >
                    {
                        response?.map((preach: PreachInfo) => (
                            <article key={preach.id} className="min-w-60 min-h-72 max-w-40">
                                <Image alt={preach.title} src={preach.img} width={1000} height={1000} />
                                <h3 className="text-xl md:text-base-desktop-desktop text-center text-primary-2">{preach.title}</h3>
                                <div className='flex justify-center gap-4'>
                                    <span onClick={() => setPreachSelectUpdate(preach.id)} className="cursor-pointer py-2 px-4 rounded-lg bg-primary-3 text-white">Update</span>
                                    <span onClick={() => setPreachSelectDelete(preach.id)} className="cursor-pointer py-2 px-4 rounded-lg bg-red-600 text-white">Delete </span>
                                </div>
                            </article>
                        ))
                    }
                </div>

                <div onClick={handleButton} className="text-white cursor-pointer bg-primary-2 rounded-full py-4 fixed text-base md:text-base-desktop bottom-10 right-10 px-6 self-end">+</div>

            </div>
        </section>
    )
}

export default Page