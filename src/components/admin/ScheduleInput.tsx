"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Schedule = {
  day: string;
  time: string;
  name: string;
};

type ScheduleInputProps = {
  schedules?: Schedule[];
  onChange?: (schedules: Schedule[]) => void;
  name?: string;
  defaultValue?: string[];
};

const DAYS = [
  { value: "LUNES", label: "Lunes" },
  { value: "MARTES", label: "Martes" },
  { value: "MIERCOLES", label: "Miércoles" },
  { value: "JUEVES", label: "Jueves" },
  { value: "VIERNES", label: "Viernes" },
  { value: "SABADO", label: "Sábado" },
  { value: "DOMINGO", label: "Domingo" },
];

export function ScheduleInput({ schedules = [], onChange, name, defaultValue = [] }: ScheduleInputProps) {
  const [items, setItems] = useState<Schedule[]>(schedules);

  useEffect(() => {
    if (defaultValue.length > 0 && schedules.length === 0) {
      const parsed = defaultValue.map((s) => {
        const [day, time, name = ""] = s.split("|");
        return { day, time, name };
      });
      setItems(parsed);
    }
  }, [defaultValue, schedules.length]);

  const handleAdd = () => {
    const newItems = [...items, { day: "DOMINGO", time: "10:00", name: "" }];
    setItems(newItems);
    onChange?.(newItems);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange?.(newItems);
  };

  const handleChange = (index: number, field: keyof Schedule, value: string) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(newItems);
    onChange?.(newItems);
  };

  return (
    <div className="space-y-3">
      {items.map((schedule, index) => (
        <div key={index} className="flex items-center gap-2">
          <Select
            value={schedule.day}
            onValueChange={(value) => handleChange(index, "day", value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DAYS.map((day) => (
                <SelectItem key={day.value} value={day.value}>
                  {day.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="time"
            value={schedule.time}
            onChange={(e) => handleChange(index, "time", e.target.value)}
            className="w-[120px]"
          />
          <Input
            type="text"
            value={schedule.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            placeholder="Nombre del culto (ej. Culto General)"
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleRemove(index)}
            className="text-red-500 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAdd}
        className="gap-1"
      >
        <Plus className="h-4 w-4" />
        Añadir horario
      </Button>
      {name && items.map((item, index) => (
        <input key={index} type="hidden" name={name} value={`${item.day}|${item.time}|${item.name}`} />
      ))}
    </div>
  );
}
