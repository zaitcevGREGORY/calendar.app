"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Postcard } from "@/lib/types"
import { cn } from "@/lib/utils"

// Временные данные для демонстрации
const mockPostcards: Postcard[] = [
  {
    id: "1",
    holidayId: "1",
    imageUrl: "/postcards/new-year.jpg",
    title: "С Новым Годом!",
    description: "Поздравляю с Новым Годом! Пусть этот год принесет много счастья, здоровья и радости!",
    tags: ["новый год", "зима", "праздник"]
  },
  {
    id: "2",
    holidayId: "2",
    imageUrl: "/postcards/defender.jpg",
    title: "С Днем Защитника Отечества!",
    description: "Поздравляю с Днем Защитника Отечества! Желаю мужества, силы и отваги!",
    tags: ["23 февраля", "мужской праздник"]
  },
  {
    id: "3",
    holidayId: "3",
    imageUrl: "/postcards/women-day.jpg",
    title: "С 8 Марта!",
    description: "Поздравляю с Международным женским днем! Желаю красоты, любви и весеннего настроения!",
    tags: ["8 марта", "женский праздник", "весна"]
  },
  {
    id: "4",
    userDateId: "1",
    imageUrl: "/postcards/birthday.jpg",
    title: "С Днем Рождения!",
    description: "Поздравляю с Днем Рождения! Желаю исполнения всех желаний и много радостных моментов!",
    tags: ["день рождения", "поздравление"]
  },
  {
    id: "5",
    userDateId: "2",
    imageUrl: "/postcards/anniversary.jpg",
    title: "С Годовщиной!",
    description: "Поздравляю с годовщиной! Пусть ваша любовь становится только крепче с каждым годом!",
    tags: ["годовщина", "любовь", "семья"]
  },
]

interface PostcardGalleryProps {
  holidayId?: string
  userDateId?: string
  onSelectPostcard?: (postcard: Postcard) => void
  className?: string
}

export function PostcardGallery({
  holidayId,
  userDateId,
  onSelectPostcard,
  className
}: PostcardGalleryProps) {
  // Фильтрация открыток по holidayId или userDateId
  const filteredPostcards = React.useMemo(() => {
    if (holidayId) {
      return mockPostcards.filter(postcard => postcard.holidayId === holidayId)
    }
    if (userDateId) {
      return mockPostcards.filter(postcard => postcard.userDateId === userDateId)
    }
    return mockPostcards
  }, [holidayId, userDateId])

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-xl font-semibold">Открытки</h2>
      
      {filteredPostcards.length === 0 ? (
        <p className="text-muted-foreground">Открытки не найдены</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPostcards.map(postcard => (
            <Card 
              key={postcard.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectPostcard?.(postcard)}
            >
              <div className="relative h-40 w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
                <div className="absolute bottom-2 left-2 right-2 z-20">
                  <h3 className="text-white font-medium truncate">{postcard.title}</h3>
                </div>
                {/* Заглушка для изображения, так как у нас нет реальных изображений */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">Изображение открытки</span>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{postcard.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {postcard.tags.slice(0, 2).map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {postcard.tags.length > 2 && (
                    <span className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs">
                      +{postcard.tags.length - 2}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
