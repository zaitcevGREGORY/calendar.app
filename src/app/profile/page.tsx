"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserDate } from "@/components/CalendarWithHolidays"
import { User } from "@/lib/types"
import { ChevronLeft, Calendar, Bell, Settings, LogOut } from "lucide-react"

// Временные данные для демонстрации
const mockUser: User = {
  id: "user1",
  email: "user@example.com",
  name: "Иван Иванов",
  avatar: "/avatars/user1.jpg",
  createdAt: new Date(2023, 0, 1),
  updatedAt: new Date(2024, 3, 15),
}

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
]

export default function ProfilePage() {
  const [user, setUser] = React.useState<User>(mockUser)
  const [userDates, setUserDates] = React.useState<UserDate[]>(mockUserDates)
  const [activeTab, setActiveTab] = React.useState<"dates" | "settings">("dates")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Профиль</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Левая колонка - Информация о пользователе */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {user.name?.charAt(0) || "U"}
                  </div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    С нами с {format(user.createdAt, "d MMMM yyyy", { locale: ru })}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Настройки
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("dates")}>
                <Calendar className="h-4 w-4 mr-2" />
                Мои даты
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Уведомления
              </Button>
              <Link href="/admin" className="block w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Панель администратора
                </Button>
              </Link>
              <Button variant="destructive" className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>

          {/* Правая колонка - Содержимое вкладки */}
          <div>
            {activeTab === "dates" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Мои важные даты</h2>
                  <Link href="/">
                    <Button>
                      Добавить дату
                    </Button>
                  </Link>
                </div>

                {userDates.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userDates.map(userDate => (
                      <Card key={userDate.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{userDate.name}</CardTitle>
                            <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {userDate.type === "birthday" ? "День рождения" :
                               userDate.type === "anniversary" ? "Годовщина" :
                               userDate.type === "reminder" ? "Напоминание" : "Другое"}
                            </div>
                          </div>
                          <CardDescription>
                            {format(userDate.date, "d MMMM yyyy", { locale: ru })}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {userDate.description && (
                            <p className="text-sm text-muted-foreground">{userDate.description}</p>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Редактировать
                          </Button>
                          <Button variant="destructive" size="sm">
                            Удалить
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">
                        У вас пока нет важных дат. Добавьте их, нажав на кнопку "Добавить дату".
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Настройки профиля</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Личные данные</CardTitle>
                    <CardDescription>
                      Обновите свои личные данные
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Имя
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={user.name || ""}
                          onChange={(e) => setUser({ ...user, name: e.target.value })}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser({ ...user, email: e.target.value })}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      <Button type="button" className="w-full">
                        Сохранить изменения
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
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
}
