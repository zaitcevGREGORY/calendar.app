"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Holiday } from "@/components/CalendarWithHolidays"
import { cn } from "@/lib/utils"
import { Image } from "lucide-react"

interface HolidayDetailsProps {
  holiday: Holiday
  onClose?: () => void
  onShare?: (holiday: Holiday) => void
  className?: string
}

export function HolidayDetails({
  holiday,
  onClose,
  onShare,
  className,
}: HolidayDetailsProps) {
  // Функция для получения цвета в зависимости от типа праздника
  const getTypeColor = (type: Holiday["type"]) => {
    switch (type) {
      case "national":
        return "bg-primary/10 text-primary"
      case "international":
        return "bg-blue-500/10 text-blue-500"
      case "religious":
        return "bg-purple-500/10 text-purple-500"
      case "professional":
        return "bg-green-500/10 text-green-500"
      case "custom":
        return "bg-orange-500/10 text-orange-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  // Функция для получения названия типа праздника
  const getTypeName = (type: Holiday["type"]) => {
    switch (type) {
      case "national":
        return "Национальный"
      case "international":
        return "Международный"
      case "religious":
        return "Религиозный"
      case "professional":
        return "Профессиональный"
      case "custom":
        return "Пользовательский"
      default:
        return "Другой"
    }
  }

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{holiday.name}</CardTitle>
          <div className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", getTypeColor(holiday.type))}>
            {getTypeName(holiday.type)}
          </div>
        </div>
        <CardDescription>
          {format(holiday.date, "d MMMM yyyy", { locale: ru })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {holiday.description && <p className="text-sm text-muted-foreground">{holiday.description}</p>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Закрыть
        </Button>
        <div className="flex gap-2">
          <Link href={`/postcards?holidayId=${holiday.id}`}>
            <Button variant="outline" size="icon" title="Открытки">
              <Image className="h-4 w-4" />
            </Button>
          </Link>
          <Button onClick={() => onShare?.(holiday)}>
            Поделиться
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
