"use client"

import * as React from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserDate } from "@/components/CalendarWithHolidays"
import { cn } from "@/lib/utils"

interface UserDateDetailsProps {
  userDate: UserDate
  onClose?: () => void
  onEdit?: (userDate: UserDate) => void
  onDelete?: (userDate: UserDate) => void
  onShare?: (userDate: UserDate) => void
  className?: string
}

export function UserDateDetails({
  userDate,
  onClose,
  onEdit,
  onDelete,
  onShare,
  className,
}: UserDateDetailsProps) {
  // Функция для получения цвета в зависимости от типа даты
  const getTypeColor = (type: UserDate["type"]) => {
    switch (type) {
      case "birthday":
        return "bg-pink-500/10 text-pink-500"
      case "anniversary":
        return "bg-blue-500/10 text-blue-500"
      case "reminder":
        return "bg-yellow-500/10 text-yellow-500"
      case "other":
        return "bg-purple-500/10 text-purple-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  // Функция для получения названия типа даты
  const getTypeName = (type: UserDate["type"]) => {
    switch (type) {
      case "birthday":
        return "День рождения"
      case "anniversary":
        return "Годовщина"
      case "reminder":
        return "Напоминание"
      case "other":
        return "Другое"
      default:
        return "Другое"
    }
  }

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{userDate.name}</CardTitle>
          <div className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", getTypeColor(userDate.type))}>
            {getTypeName(userDate.type)}
          </div>
        </div>
        <CardDescription>
          {format(userDate.date, "d MMMM yyyy", { locale: ru })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {userDate.description && <p className="text-sm text-muted-foreground">{userDate.description}</p>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
          <Button variant="outline" onClick={() => onEdit?.(userDate)}>
            Редактировать
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" onClick={() => onDelete?.(userDate)}>
            Удалить
          </Button>
          <Button onClick={() => onShare?.(userDate)}>
            Поделиться
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
