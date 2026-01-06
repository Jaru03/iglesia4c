'use client'

import Button from "@/ui/Button"
import Input from "@/ui/Input"
import Textarea from "@/ui/Textarea"
import { useRef, useState } from "react"

const FormPreach = () => {
    // Estado para los campos del formulario
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    // Estado para manejar mensajes de error y éxito
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    // Referencia al formulario para poder resetearlo
    const formPreach = useRef<HTMLFormElement>(null)

    // Función que maneja el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validar que todos los campos estén completos
        if (!file || !title.trim() || !description.trim()) {
            setError("Por favor, completa todos los campos.")
            return
        }

        // Limpiar mensajes previos
        setError(null)
        setSuccess(null)
        
        // Crear un FormData para enviar al servidor
        const formData = new FormData()
        formData.append('image', file)
        formData.append('title', title)
        formData.append('description', description)

        try {
            // Enviar la solicitud al servidor
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Error al subir la predicación.")
            }

            // Si la respuesta es exitosa
            const data = await response.json()
            setSuccess("¡Predicación subida correctamente!")
            console.log("Respuesta del servidor:", data)

            // Limpiar campos de entrada
            setTitle('')
            setDescription('')
            setFile(null)
            formPreach.current?.reset()
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Error desconocido."
            setError(errorMessage)
        }
    }

    return (
        <form ref={formPreach} onSubmit={handleSubmit} noValidate>
            <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <Input
                    type="text"
                    name="title"
                    placeholder="Introduce el título de la predicación"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            
            <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <Textarea
                    name="description"
                    placeholder="Introduce la descripción de la predicación"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    required
                />
            </div>
            
            <div className="mb-6">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">Imagen</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    required
                    className="w-full px-4 py-3 text-base transition-all duration-200 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-3 focus:ring-4 focus:ring-primary-3/10 focus:outline-none hover:border-gray-300 hover:shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-3 file:text-white hover:file:bg-primary-4"
                />
            </div>

            {/* Mensajes de error y éxito con estilos mejorados */}
            {error && <p className="text-red-600 font-bold text-sm">{error}</p>}
            {success && <p className="text-green-600 font-bold text-sm">{success}</p>}

            <Button variant="form" text="Enviar" url="#" />
        </form>
    )
}

export default FormPreach
