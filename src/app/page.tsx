"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarWithHolidays, Holiday, UserDate } from "@/components/CalendarWithHolidays"
import { HolidayDetails } from "@/components/HolidayDetails"
import { UserDateDetails } from "@/components/UserDateDetails"
import { AddUserDateForm } from "@/components/AddUserDateForm"
import { GreetingGenerator } from "@/components/GreetingGenerator"
import { getRelativeDate, getDaysUntilString } from "@/lib/date-utils"
import { Button } from "@/components/ui/button"

// Временные данные для демонстрации
const mockHolidays: Holiday[] = [
  {
    id: "1",
    date: new Date(2024, 0, 1),
    name: "Новый год",
    description: "Новый год — главный календарный праздник, наступающий в момент перехода с последнего дня текущего года в первый день следующего года.",
    type: "national",
  },
  {
    id: "2",
    date: new Date(2024, 1, 23),
    name: "День защитника Отечества",
    description: "День защитника Отечества — праздник, отмечаемый 23 февраля в России, Белоруссии, Киргизии и Таджикистане.",
    type: "national",
  },
  {
    id: "3",
    date: new Date(2024, 2, 8),
    name: "Международный женский день",
    description: "Международный женский день — праздник, который отмечается ежегодно 8 марта в ряде стран.",
    type: "international",
  },
  {
    id: "4",
    date: new Date(2024, 3, 12),
    name: "День космонавтики",
    description: "День космонавтики — памятная дата, отмечаемая 12 апреля, установленная в ознаменование первого полёта человека в космос.",
    type: "national",
  },
  {
    id: "5",
    date: new Date(2024, 4, 1),
    name: "Праздник Весны и Труда",
    description: "Праздник Весны и Труда — отмечается во многих странах мира 1 мая.",
    type: "national",
  },
  {
    id: "6",
    date: new Date(2024, 4, 9),
    name: "День Победы",
    description: "День Победы — праздник победы Красной Армии и советского народа над нацистской Германией в Великой Отечественной войне 1941—1945 годов.",
    type: "national",
  },
];

const mockUserDates: UserDate[] = [
  {
    id: "1",
    userId: "user1",
    date: new Date(2024, 6, 15),
    name: "День рождения Ивана",
    description: "Не забыть купить подарок!",
    type: "birthday",
  },
  {
    id: "2",
    userId: "user1",
    date: new Date(2024, 8, 1),
    name: "Годовщина свадьбы",
    description: "5 лет вместе",
    type: "anniversary",
  },
];

export default function Home() {
  const [selectedHoliday, setSelectedHoliday] = React.useState<Holiday | null>(null)
  const [selectedUserDate, setSelectedUserDate] = React.useState<UserDate | null>(null)
  const [showGreetingGenerator, setShowGreetingGenerator] = React.useState(false)
  const [userDates, setUserDates] = React.useState<UserDate[]>(mockUserDates)

  // Обработчик выбора праздника
  const handleHolidaySelect = (holiday: Holiday) => {
    setSelectedHoliday(holiday)
    setSelectedUserDate(null)
  }

  // Обработчик выбора пользовательской даты
  const handleUserDateSelect = (userDate: UserDate) => {
    setSelectedUserDate(userDate)
    setSelectedHoliday(null)
  }

  // Обработчик добавления пользовательской даты
  const handleAddUserDate = (newUserDate: Omit<UserDate, "id" | "userId">) => {
    const userDate: UserDate = {
      ...newUserDate,
      id: `user-date-${Date.now()}`,
      userId: "user1", // В реальном приложении здесь будет ID текущего пользователя
    }
    setUserDates([...userDates, userDate])
  }

  // Обработчик удаления пользовательской даты
  const handleDeleteUserDate = (userDate: UserDate) => {
    setUserDates(userDates.filter(date => date.id !== userDate.id))
    setSelectedUserDate(null)
  }

  // Обработчик для кнопки "Поделиться"
  const handleShare = (item: Holiday | UserDate | string) => {
    if (typeof item === "string") {
      // Поделиться поздравлением
      alert(`Поздравление скопировано в буфер обмена: ${item}`)
    } else if ("type" in item && (item.type === "birthday" || item.type === "anniversary")) {
      // Поделиться пользовательской датой
      alert(`Поделиться пользовательской датой: ${item.name}`)
    } else {
      // Поделиться праздником
      alert(`Поделиться праздником: ${item.name}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Календарь праздников</h1>
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                <span className="sr-only">Профиль</span>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  П
                </div>
              </Button>
            </Link>
            <AddUserDateForm onAddUserDate={handleAddUserDate} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        {/* Левая колонка - Календарь */}
        <div className="space-y-6">
          <CalendarWithHolidays
            holidays={mockHolidays}
            userDates={userDates}
            onHolidaySelect={handleHolidaySelect}
            onUserDateSelect={handleUserDateSelect}
            className="rounded-lg border shadow-sm"
          />

          {/* Детали праздника или пользовательской даты */}
          {selectedHoliday && (
            <HolidayDetails
              holiday={selectedHoliday}
              onClose={() => setSelectedHoliday(null)}
              onShare={handleShare}
            />
          )}

          {selectedUserDate && (
            <UserDateDetails
              userDate={selectedUserDate}
              onClose={() => setSelectedUserDate(null)}
              onEdit={() => alert("Редактирование пользовательской даты")}
              onDelete={handleDeleteUserDate}
              onShare={handleShare}
            />
          )}

          {/* Генератор поздравлений */}
          {showGreetingGenerator && (
            <GreetingGenerator
              holiday={selectedHoliday || undefined}
              userDate={selectedUserDate || undefined}
              onClose={() => setShowGreetingGenerator(false)}
              onShare={handleShare}
            />
          )}
        </div>

        {/* Правая колонка - Ближайшие праздники и важные даты */}
        <div className="space-y-6">
          <div className="rounded-lg border shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">Ближайшие праздники</h2>
            <ul className="space-y-3">
              {mockHolidays
                .filter(holiday => holiday.date >= new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 5)
                .map(holiday => (
                  <li key={holiday.id} className="flex justify-between items-center">
                    <button
                      onClick={() => handleHolidaySelect(holiday)}
                      className="text-left hover:underline"
                    >
                      {holiday.name}
                    </button>
                    <span className="text-sm text-muted-foreground">
                      {getDaysUntilString(holiday.date)}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="rounded-lg border shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">Мои важные даты</h2>
            {userDates.length > 0 ? (
              <ul className="space-y-3">
                {userDates
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map(userDate => (
                    <li key={userDate.id} className="flex justify-between items-center">
                      <button
                        onClick={() => handleUserDateSelect(userDate)}
                        className="text-left hover:underline"
                      >
                        {userDate.name}
                      </button>
                      <span className="text-sm text-muted-foreground">
                        {getDaysUntilString(userDate.date)}
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                У вас пока нет важных дат. Добавьте их, нажав на кнопку "Добавить важную дату".
              </p>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setShowGreetingGenerator(true)}
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Создать поздравление
            </button>

            <Link href="/postcards" className="block">
              <Button variant="outline" className="w-full">
                Просмотр открыток
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>© 2024 Календарь праздников. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
