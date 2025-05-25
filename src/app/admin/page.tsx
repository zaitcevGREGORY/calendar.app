"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserDate, Holiday } from "@/components/CalendarWithHolidays"
import { User, Moderation } from "@/lib/types"
import { ChevronLeft, Check, X, AlertTriangle, Users, Calendar as CalendarIcon, Image, MessageSquare } from "lucide-react"

// Временные данные для демонстрации
const mockModerations: Moderation[] = [
  {
    id: "1",
    entityType: "userDate",
    entityId: "3",
    status: "pending",
    createdAt: new Date(2024, 4, 15),
    updatedAt: new Date(2024, 4, 15),
  },
  {
    id: "2",
    entityType: "greeting",
    entityId: "5",
    status: "pending",
    createdAt: new Date(2024, 4, 14),
    updatedAt: new Date(2024, 4, 14),
  },
  {
    id: "3",
    entityType: "userDate",
    entityId: "7",
    status: "approved",
    moderatorId: "admin1",
    createdAt: new Date(2024, 4, 10),
    updatedAt: new Date(2024, 4, 12),
  },
  {
    id: "4",
    entityType: "greeting",
    entityId: "2",
    status: "rejected",
    reason: "Неприемлемый контент",
    moderatorId: "admin1",
    createdAt: new Date(2024, 4, 8),
    updatedAt: new Date(2024, 4, 9),
  },
]

// Временные данные для пользовательских дат на модерации
const mockUserDatesForModeration: UserDate[] = [
  {
    id: "3",
    userId: "user2",
    date: new Date(2024, 5, 20),
    name: "День рождения компании",
    description: "Корпоративное мероприятие",
    type: "other",
  },
  {
    id: "7",
    userId: "user3",
    date: new Date(2024, 7, 5),
    name: "Юбилей свадьбы родителей",
    description: "30 лет вместе",
    type: "anniversary",
  },
]

// Временные данные для поздравлений на модерации
const mockGreetingsForModeration: { id: string; text: string; author?: string }[] = [
  {
    id: "5",
    text: "Поздравляю с днем рождения! Желаю счастья, здоровья и всего самого наилучшего!",
    author: "user2",
  },
  {
    id: "2",
    text: "С Новым Годом! Пусть этот год принесет много радости и успехов!",
    author: "user1",
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState<"moderation" | "users" | "holidays" | "postcards" | "greetings">("moderation")
  const [pendingModerations, setPendingModerations] = React.useState<Moderation[]>(
    mockModerations.filter(m => m.status === "pending")
  )

  // Обработчик одобрения модерации
  const handleApprove = (moderation: Moderation) => {
    setPendingModerations(pendingModerations.filter(m => m.id !== moderation.id))
    alert(`Одобрено: ${moderation.entityType} с ID ${moderation.entityId}`)
  }

  // Обработчик отклонения модерации
  const handleReject = (moderation: Moderation) => {
    setPendingModerations(pendingModerations.filter(m => m.id !== moderation.id))
    alert(`Отклонено: ${moderation.entityType} с ID ${moderation.entityId}`)
  }

  // Получение данных сущности по типу и ID
  const getEntityData = (entityType: "userDate" | "greeting", entityId: string) => {
    if (entityType === "userDate") {
      return mockUserDatesForModeration.find(ud => ud.id === entityId)
    } else if (entityType === "greeting") {
      return mockGreetingsForModeration.find(g => g.id === entityId)
    }
    return null
  }

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
            <h1 className="text-2xl font-bold">Панель администратора</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Левая колонка - Навигация */}
          <div className="space-y-4">
            <Button 
              variant={activeTab === "moderation" ? "default" : "outline"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("moderation")}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Модерация
              {pendingModerations.length > 0 && (
                <span className="ml-auto bg-destructive text-destructive-foreground rounded-full h-5 min-w-5 px-1 flex items-center justify-center text-xs">
                  {pendingModerations.length}
                </span>
              )}
            </Button>
            <Button 
              variant={activeTab === "users" ? "default" : "outline"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="h-4 w-4 mr-2" />
              Пользователи
            </Button>
            <Button 
              variant={activeTab === "holidays" ? "default" : "outline"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("holidays")}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Праздники
            </Button>
            <Button 
              variant={activeTab === "postcards" ? "default" : "outline"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("postcards")}
            >
              <Image className="h-4 w-4 mr-2" />
              Открытки
            </Button>
            <Button 
              variant={activeTab === "greetings" ? "default" : "outline"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("greetings")}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Поздравления
            </Button>
          </div>

          {/* Правая колонка - Содержимое вкладки */}
          <div>
            {activeTab === "moderation" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Модерация контента</h2>
                
                {pendingModerations.length > 0 ? (
                  <div className="space-y-4">
                    {pendingModerations.map(moderation => {
                      const entity = getEntityData(moderation.entityType, moderation.entityId)
                      
                      return (
                        <Card key={moderation.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle>
                                {moderation.entityType === "userDate" ? "Пользовательская дата" : "Поздравление"}
                              </CardTitle>
                              <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500">
                                На модерации
                              </div>
                            </div>
                            <CardDescription>
                              Создано: {format(moderation.createdAt, "d MMMM yyyy", { locale: ru })}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            {moderation.entityType === "userDate" && entity && (
                              <div className="space-y-2">
                                <p><strong>Название:</strong> {(entity as UserDate).name}</p>
                                <p><strong>Дата:</strong> {format((entity as UserDate).date, "d MMMM yyyy", { locale: ru })}</p>
                                <p><strong>Описание:</strong> {(entity as UserDate).description || "Нет описания"}</p>
                                <p><strong>Тип:</strong> {(entity as UserDate).type}</p>
                              </div>
                            )}
                            {moderation.entityType === "greeting" && entity && (
                              <div className="space-y-2">
                                <p><strong>Текст:</strong> {(entity as { text: string }).text}</p>
                                <p><strong>Автор:</strong> {(entity as { author?: string }).author || "Аноним"}</p>
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              onClick={() => handleReject(moderation)}
                              className="text-destructive"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Отклонить
                            </Button>
                            <Button 
                              variant="default" 
                              onClick={() => handleApprove(moderation)}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Одобрить
                            </Button>
                          </CardFooter>
                        </Card>
                      )
                    })}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">
                        Нет контента, требующего модерации.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            
            {activeTab === "users" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Управление пользователями</h2>
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      Здесь будет список пользователей и функции управления ими.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "holidays" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Управление праздниками</h2>
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      Здесь будет список праздников и функции управления ими.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "postcards" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Управление открытками</h2>
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      Здесь будет список открыток и функции управления ими.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "greetings" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Управление поздравлениями</h2>
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      Здесь будет список поздравлений и функции управления ими.
                    </p>
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
