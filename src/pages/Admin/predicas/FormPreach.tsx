'use client'

import Button from "@/ui/Button"
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
            <div>
                <label htmlFor="title">Título</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            
            <div>
                <label htmlFor="description">Descripción</label>
                <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            
            <div>
                <label htmlFor="file">Imagen</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    required
                />
            </div>

            {/* Mensajes de error y éxito con estilos mejorados */}
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            {success && <p style={{ color: 'green', fontWeight: 'bold' }}>{success}</p>}

            <Button variant="form" text="Enviar" url="#" />
        </form>
    )
}

export default FormPreach
