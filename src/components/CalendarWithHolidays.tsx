"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { cn } from "@/lib/utils"

// Типы для праздников
export interface Holiday {
  id: string
  date: Date
  name: string
  description?: string
  type: "national" | "international" | "religious" | "professional" | "custom"
  icon?: string
}

// Типы для пользовательских дат
export interface UserDate {
  id: string
  userId: string
  date: Date
  name: string
  description?: string
  type: "birthday" | "anniversary" | "reminder" | "other"
  icon?: string
}

interface CalendarWithHolidaysProps {
  holidays?: Holiday[]
  userDates?: UserDate[]
  onDateSelect?: (date: Date) => void
  onHolidaySelect?: (holiday: Holiday) => void
  onUserDateSelect?: (userDate: UserDate) => void
  className?: string
}

export function CalendarWithHolidays({
  holidays = [],
  userDates = [],
  onDateSelect,
  onHolidaySelect,
  onUserDateSelect,
  className,
}: CalendarWithHolidaysProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())

  // Обработчик выбора даты
  const handleSelect = (date: Date | undefined) => {
    if (!date) return
    setSelectedDate(date)
    onDateSelect?.(date)

    // Проверяем, есть ли праздники на выбранную дату
    const selectedHoliday = holidays.find(
      (holiday) => format(holiday.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    )
    if (selectedHoliday) {
      onHolidaySelect?.(selectedHoliday)
    }

    // Проверяем, есть ли пользовательские даты на выбранную дату
    const selectedUserDate = userDates.find(
      (userDate) => format(userDate.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    )
    if (selectedUserDate) {
      onUserDateSelect?.(selectedUserDate)
    }
  }

  // Функция для отображения дополнительного контента в ячейке календаря
  const renderDayContent = (day: Date) => {
    const formattedDay = format(day, "yyyy-MM-dd")

    // Находим праздники на текущий день
    const dayHolidays = holidays.filter(
      (holiday) => format(holiday.date, "yyyy-MM-dd") === formattedDay
    )

    // Находим пользовательские даты на текущий день
    const dayUserDates = userDates.filter(
      (userDate) => format(userDate.date, "yyyy-MM-dd") === formattedDay
    )

    // Если есть праздники или пользовательские даты, отображаем индикаторы
    if (dayHolidays.length > 0 || dayUserDates.length > 0) {
      return (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-0.5 pb-0.5">
          {dayHolidays.length > 0 && (
            <div className="size-1.5 rounded-full bg-primary" title={dayHolidays[0].name} />
          )}
          {dayUserDates.length > 0 && (
            <div className="size-1.5 rounded-full bg-red-500" title={dayUserDates[0].name} />
          )}
        </div>
      )
    }

    return null
  }

  return (
    <div className={cn("relative", className)}>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        locale={ru}
        modifiers={{
          holiday: (date) => {
            const formattedDate = format(date, "yyyy-MM-dd")
            const hasHoliday = holidays.some(holiday =>
              format(holiday.date, "yyyy-MM-dd") === formattedDate
            )
            const hasUserDate = userDates.some(userDate =>
              format(userDate.date, "yyyy-MM-dd") === formattedDate
            )
            return hasHoliday && !hasUserDate // Только праздники
          },
          userDate: (date) => {
            const formattedDate = format(date, "yyyy-MM-dd")
            const hasHoliday = holidays.some(holiday =>
              format(holiday.date, "yyyy-MM-dd") === formattedDate
            )
            const hasUserDate = userDates.some(userDate =>
              format(userDate.date, "yyyy-MM-dd") === formattedDate
            )
            return hasUserDate && !hasHoliday // Только пользовательские даты
          },
          both: (date) => {
            const formattedDate = format(date, "yyyy-MM-dd")
            const hasHoliday = holidays.some(holiday =>
              format(holiday.date, "yyyy-MM-dd") === formattedDate
            )
            const hasUserDate = userDates.some(userDate =>
              format(userDate.date, "yyyy-MM-dd") === formattedDate
            )
            return hasHoliday && hasUserDate // И праздники, и пользовательские даты
          }
        }}
        modifiersClassNames={{
          holiday: "border-b-2 border-primary bg-primary/10",
          userDate: "border-b-2 border-red-500 bg-red-50 text-red-700",
          both: "border-b-2 border-red-500 bg-gradient-to-r from-red-50 to-primary/10 text-red-700 font-semibold"
        }}
        components={{
          DayContent: ({ date }) => (
            <div className="relative flex h-full w-full items-center justify-center">
              {date.getDate()}
              {renderDayContent(date)}
            </div>
          ),
        }}
      />
    </div>
  )
}
