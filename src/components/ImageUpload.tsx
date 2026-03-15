"use client"

import * as React from "react"
import { XIcon, ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  onFileSelect?: (file: File | null) => void
  onImageUrl?: (url: string) => void
  accept?: string
  maxSizeMb?: number
  className?: string
  defaultImage?: string
}

function ImageUpload({
  onFileSelect,
  onImageUrl,
  accept = "image/png,image/jpeg,image/webp",
  maxSizeMb = 5,
  className,
  defaultImage,
}: ImageUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(defaultImage || null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  function validate(file: File): string | null {
    const validTypes = accept.split(",").map((t) => t.trim())
    if (!validTypes.includes(file.type)) {
      return "Formato no permitido. Usa PNG, JPG o WEBP."
    }
    if (file.size > maxSizeMb * 1024 * 1024) {
      return `El archivo excede ${maxSizeMb}MB.`
    }
    return null
  }

  function handleFile(file: File) {
    const validationError = validate(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setSelectedFile(file)

    // show local preview
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)

    onFileSelect?.(file)
    onImageUrl?.("")
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleRemove() {
    setPreview(null)
    setError(null)
    setSelectedFile(null)
    onFileSelect?.(null)
    onImageUrl?.("")
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {preview ? (
        <div className="relative overflow-hidden rounded-lg border border-border">
          <img
            src={preview}
            alt="Vista previa"
            className="h-40 w-full object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2"
            onClick={handleRemove}
          >
            <XIcon className="size-4" />
            <span className="sr-only">Eliminar imagen</span>
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "flex h-40 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-muted-foreground/40 hover:bg-accent/50",
          )}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <ImageIcon className="size-5 text-muted-foreground" />
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-sm font-medium text-foreground">
              Arrastra una imagen o haz clic
            </span>
            <span className="text-xs text-muted-foreground">
              PNG, JPG o WEBP (max {maxSizeMb}MB)
            </span>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="sr-only"
        tabIndex={-1}
      />

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

export default ImageUpload
