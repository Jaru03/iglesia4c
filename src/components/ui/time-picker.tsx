"use client"

import * as React from "react"
import { ClockIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  name?: string
  required?: boolean
  minuteStep?: number
}

function TimePicker({
  value,
  onChange,
  placeholder = "Seleccionar hora",
  disabled = false,
  className,
  name,
  required = false,
  minuteStep = 5,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from(
    { length: Math.floor(60 / minuteStep) },
    (_, i) => i * minuteStep,
  )

  const selectedHour = value ? parseInt(value.split(":")[0], 10) : null
  const selectedMinute = value ? parseInt(value.split(":")[1], 10) : null

  const hourRef = React.useRef<HTMLDivElement>(null)
  const minuteRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        if (selectedHour !== null && hourRef.current) {
          const el = hourRef.current.querySelector(
            `[data-hour="${selectedHour}"]`,
          )
          el?.scrollIntoView({ block: "center" })
        }
        if (selectedMinute !== null && minuteRef.current) {
          const el = minuteRef.current.querySelector(
            `[data-minute="${selectedMinute}"]`,
          )
          el?.scrollIntoView({ block: "center" })
        }
      })
    }
  }, [open, selectedHour, selectedMinute])

  function handleHourClick(hour: number) {
    const m = selectedMinute !== null ? selectedMinute : 0
    const timeStr = `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")}`
    onChange?.(timeStr)
  }

  function handleMinuteClick(minute: number) {
    const h = selectedHour !== null ? selectedHour : 0
    const timeStr = `${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    onChange?.(timeStr)
  }

  const displayValue = value
    ? `${String(selectedHour).padStart(2, "0")}:${String(selectedMinute).padStart(2, "0")}`
    : null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {name && (
        <input type="hidden" name={name} value={value ?? ""} required={required} />
      )}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "h-9 w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <ClockIcon className="size-4 text-muted-foreground" />
          {displayValue ? (
            <span>{displayValue} hrs</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex divide-x divide-border">
          {/* Hours column */}
          <ScrollArea className="h-56">
            <div ref={hourRef} className="flex flex-col p-1">
              <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                Hora
              </div>
              {hours.map((hour) => (
                <button
                  key={hour}
                  data-hour={hour}
                  type="button"
                  onClick={() => handleHourClick(hour)}
                  className={cn(
                    "flex h-8 w-14 items-center justify-center rounded-md text-sm transition-colors",
                    selectedHour === hour
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {String(hour).padStart(2, "0")}
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Minutes column */}
          <ScrollArea className="h-56">
            <div ref={minuteRef} className="flex flex-col p-1">
              <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                Min
              </div>
              {minutes.map((minute) => (
                <button
                  key={minute}
                  data-minute={minute}
                  type="button"
                  onClick={() => handleMinuteClick(minute)}
                  className={cn(
                    "flex h-8 w-14 items-center justify-center rounded-md text-sm transition-colors",
                    selectedMinute === minute
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {String(minute).padStart(2, "0")}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { TimePicker }
export type { TimePickerProps }
