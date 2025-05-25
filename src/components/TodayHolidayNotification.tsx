"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Holiday } from "@/components/CalendarWithHolidays"
import { cn } from "@/lib/utils"
import { Calendar, Mail, X } from "lucide-react"
import { format, isToday } from "date-fns"
import { ru } from "date-fns/locale"

interface TodayHolidayNotificationProps {
  holidays: Holiday[]
  onSendEmail?: (holiday: Holiday) => void
  onClose?: () => void
  className?: string
}

export function TodayHolidayNotification({
  holidays,
  onSendEmail,
  onClose,
  className,
}: TodayHolidayNotificationProps) {
  // Фильтруем праздники на сегодня
  const todayHolidays = holidays.filter(holiday => isToday(holiday.date))

  // Если нет праздников на сегодня, не показываем уведомление
  if (todayHolidays.length === 0) {
    return null
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto border-primary/20 bg-primary/5", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Сегодня праздник!</CardTitle>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>
          {format(new Date(), "d MMMM yyyy", { locale: ru })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {todayHolidays.map((holiday) => (
          <div key={holiday.id} className="space-y-3">
            <div>
              <h3 className="font-semibold text-primary">{holiday.name}</h3>
              {holiday.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {holiday.description}
                </p>
              )}
            </div>

            {onSendEmail && (
              <Button
                onClick={() => onSendEmail(holiday)}
                className="w-full"
                size="sm"
              >
                <Mail className="h-4 w-4 mr-2" />
                Получить открытку на почту
              </Button>
            )}
          </div>
        ))}

        {todayHolidays.length > 1 && (
          <div className="text-xs text-center text-muted-foreground pt-2 border-t">
            Сегодня отмечается {todayHolidays.length} праздника
          </div>
        )}
      </CardContent>
    </Card>
  )
}
