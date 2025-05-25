"use client"

import * as React from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UserDate } from "@/components/CalendarWithHolidays"
import { cn } from "@/lib/utils"

interface AddUserDateFormProps {
  onAddUserDate?: (userDate: Omit<UserDate, "id" | "userId">) => void
  className?: string
}

export function AddUserDateForm({
  onAddUserDate,
  className,
}: AddUserDateFormProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [type, setType] = React.useState<UserDate["type"]>("birthday")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !name) return

    onAddUserDate?.({
      date,
      name,
      description,
      type,
    })

    // Сбрасываем форму
    setName("")
    setDescription("")
    setType("birthday")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>Добавить важную дату</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить важную дату</DialogTitle>
          <DialogDescription>
            Добавьте день рождения, годовщину или другую важную для вас дату.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="date" className="text-sm font-medium">
                Дата
              </label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ru}
                className="border rounded-md p-3"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Название
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="День рождения Ивана"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Описание (необязательно)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Добавьте описание..."
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="type" className="text-sm font-medium">
                Тип
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as UserDate["type"])}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="birthday">День рождения</option>
                <option value="anniversary">Годовщина</option>
                <option value="reminder">Напоминание</option>
                <option value="other">Другое</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Сохранить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
