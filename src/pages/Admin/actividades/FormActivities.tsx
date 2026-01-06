'use client'

import Button from "@/ui/Button"
import { useRef, useState } from "react"

const FormActivities = () => {
    // Estado para los campos del formulario
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [place, setPlace] = useState<string>('')
    const [hourStart, setHourStart] = useState<string>('')
    const [hourEnd, setHourEnd] = useState<string>('')

    // Estado para manejar mensajes de error y éxito
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    // Referencia al formulario para poder resetearlo
    const formPreach = useRef<HTMLFormElement | null>(null)

    // Función que maneja el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validar que todos los campos estén completos
        if (!file || !title || !description) {
            setError("Por favor, completa todos los campos.")
            return
        }

        // Limpiar cualquier error previo
        setError('')
        
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

            // Verificar si la respuesta es exitosa
            if (response.ok) {
                await response.json()
                setSuccess("¡Predicación subida correctamente!")

                // Limpiar campos de entrada
                setTitle('')  // Limpiar el campo title
                setDescription('')  // Limpiar el campo description
                setFile(null)  // Limpiar el archivo
                formPreach.current?.reset()  // Limpiar el formulario
            } else {
                setError("Error al subir la predicación.")
            }
        } catch (err) {
            console.error(err)
            setError("Hubo un error al intentar enviar el formulario.")
        }
    }

    return (
        <form ref={formPreach} onSubmit={handleSubmit}>
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
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="place">Lugar</label>
                <input
                    type="text"
                    name="place"
                    id="place"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="hourStart">Hora de Inicio</label>
                <input
                    type="text"
                    name="hourStart"
                    id="hourStart"
                    value={hourStart}
                    onChange={(e) => setHourStart(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="hourEnd">Hora de Fin</label>
                <input
                    type="text"
                    name="hourEnd"
                    id="hourEnd"
                    value={hourEnd}
                    onChange={(e) => setHourEnd(e.target.value)}
                    required
                />
            </div>
            
            <div>
                <label htmlFor="file">Imagen</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    required
                />
            </div>

            {/* Mostrar mensaje de error si existe */}
            {error && <p className="text-red-600 font-semibold text-sm">{error}</p>}

            {/* Mostrar mensaje de éxito si se envió correctamente */}
            {success && <p className="text-green-600 font-semibold text-sm">{success}</p>}

            <Button variant="form" text="Enviar" url="" />
        </form>
    )
}

export default FormActivities
