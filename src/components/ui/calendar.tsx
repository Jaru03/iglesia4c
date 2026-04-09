"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type View = "days" | "months" | "years";

const MONTHS = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

const WEEKDAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  disabled?: (date: Date) => boolean;
}

function Calendar({
  selected,
  onSelect,
  className,
  disabled,
}: CalendarProps) {
  const [view, setView] = React.useState<View>("days");
  const [displayMonth, setDisplayMonth] = React.useState<Date>(
    selected ?? new Date()
  );

  const [yearRangeStart, setYearRangeStart] = React.useState(() => {
    const currentYear = displayMonth.getFullYear();
    return Math.floor(currentYear / 12) * 12;
  });

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const today = new Date();

  const handleYearSelect = (year: number) => {
    const newDate = new Date(displayMonth);
    newDate.setFullYear(year);
    setDisplayMonth(newDate);
    setView("months");
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(monthIndex);
    setDisplayMonth(newDate);
    setView("days");
  };

  const handleCaptionClick = () => {
    if (view === "days") {
      setView("months");
    } else if (view === "months") {
      setYearRangeStart(Math.floor(displayMonth.getFullYear() / 12) * 12);
      setView("years");
    }
  };

  const navigateYearRange = (direction: "prev" | "next") => {
    setYearRangeStart((prev) => (direction === "prev" ? prev - 12 : prev + 12));
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(displayMonth);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setDisplayMonth(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Previous month days
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthDays - i));
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isOutsideMonth = (date: Date) => {
    return date.getMonth() !== displayMonth.getMonth();
  };

  const handleDaySelect = (date: Date) => {
    if (disabled?.(date)) return;
    onSelect?.(date);
  };

  const years = Array.from({ length: 12 }, (_, i) => yearRangeStart + i);
  const days = getDaysInMonth(displayMonth);

  // Years View
  if (view === "years") {
    return (
      <div className={cn("p-3 w-[280px]", className)}>
        <div className="flex justify-center pt-1 relative items-center mb-4">
          <button
            type="button"
            onClick={() => navigateYearRange("prev")}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setView("days")}
            className="text-sm font-medium hover:underline"
          >
            {yearRangeStart} - {yearRangeStart + 11}
          </button>
          <button
            type="button"
            onClick={() => navigateYearRange("next")}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => handleYearSelect(year)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-full font-normal",
                year === displayMonth.getFullYear() &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                year === currentYear &&
                  year !== displayMonth.getFullYear() &&
                  "bg-accent text-accent-foreground"
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Months View
  if (view === "months") {
    return (
      <div className={cn("p-3 w-[280px]", className)}>
        <div className="flex justify-center pt-1 relative items-center mb-4">
          <button
            type="button"
            onClick={() => {
              const newDate = new Date(displayMonth);
              newDate.setFullYear(displayMonth.getFullYear() - 1);
              setDisplayMonth(newDate);
            }}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleCaptionClick}
            className="text-sm font-medium hover:underline"
          >
            {displayMonth.getFullYear()}
          </button>
          <button
            type="button"
            onClick={() => {
              const newDate = new Date(displayMonth);
              newDate.setFullYear(displayMonth.getFullYear() + 1);
              setDisplayMonth(newDate);
            }}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {MONTHS.map((month, index) => (
            <button
              key={month}
              type="button"
              onClick={() => handleMonthSelect(index)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-full font-normal",
                index === displayMonth.getMonth() &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                index === currentMonth &&
                  displayMonth.getFullYear() === currentYear &&
                  index !== displayMonth.getMonth() &&
                  "bg-accent text-accent-foreground"
              )}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Days View
  return (
    <div className={cn("p-3 w-[280px]", className)}>
      <div className="flex justify-center pt-1 relative items-center mb-4">
        <button
          type="button"
          onClick={() => navigateMonth("prev")}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleCaptionClick}
          className="text-sm font-medium hover:underline capitalize"
        >
          {displayMonth.toLocaleDateString("es", {
            month: "long",
            year: "numeric",
          })}
        </button>
        <button
          type="button"
          onClick={() => navigateMonth("next")}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="h-9 w-9 text-center text-[0.8rem] font-normal text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((date, index) => {
          if (!date) return <div key={index} className="h-9 w-9" />;

          const isSelected = selected && isSameDay(date, selected);
          const isToday = isSameDay(date, today);
          const isOutside = isOutsideMonth(date);
          const isDisabled = disabled?.(date);

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleDaySelect(date)}
              disabled={isDisabled}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-9 p-0 font-normal",
                isSelected &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                isToday && !isSelected && "bg-accent text-accent-foreground",
                isOutside && "text-muted-foreground opacity-50",
                isDisabled && "text-muted-foreground opacity-50 cursor-not-allowed"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { Calendar };
export type { CalendarProps };
