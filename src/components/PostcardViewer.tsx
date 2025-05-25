"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Holiday, UserDate } from "@/components/CalendarWithHolidays"
import { cn } from "@/lib/utils"
import { Download, Share2, RefreshCw } from "lucide-react"

interface PostcardViewerProps {
  holiday?: Holiday
  userDate?: UserDate
  onClose?: () => void
  onShare?: (postcardUrl: string) => void
  className?: string
}

// Маппинг типов праздников на категории BonnyCards.ru
const getPostcardCategory = (holiday?: Holiday, userDate?: UserDate): string => {
  if (userDate) {
    switch (userDate.type) {
      case "birthday":
        return "birthday"
      case "anniversary":
        return "godovshchina-svadby"
      default:
        return "wish"
    }
  }

  if (holiday) {
    switch (holiday.name) {
      case "Новый год":
        return "new-year"
      case "День защитника Отечества":
        return "23fevralya"
      case "Международный женский день":
        return "s-8-marta"
      case "День космонавтики":
        return "den-kosmonavtiki"
      case "Праздник Весны и Труда":
        return "1maya"
      case "День Победы":
        return "victory"
      case "День России":
        return "den-rossii"
      case "Рождество Христово":
        return "rozhdestvo"
      case "Пасха":
        return "pasha"
      case "Масленица":
        return "maslenica"
      case "День учителя":
        return "s-dnem-uchitelya"
      case "День матери":
        return "den-materi"
      case "День отца":
        return "den-otca"
      default:
        return "wish"
    }
  }

  return "wish"
}

// Генерация URL открытки с BonnyCards.ru
const generatePostcardUrl = (category: string, index: number = 1): string => {
  const baseUrl = "https://bonnycards.ru/images"
  const imageNumber = String(index).padStart(4, '0')

  // Маппинг категорий на пути к изображениям (основано на реальной структуре сайта)
  const categoryPaths: Record<string, string> = {
    "birthday": `birthday/birthday${imageNumber}.jpg`,
    "new-year": `new-year/newyear${imageNumber}.jpg`,
    "23fevralya": `23fevralya/23f${imageNumber}.jpg`,
    "s-8-marta": `s-8-marta/8m${imageNumber}.jpg`,
    "den-kosmonavtiki": `den-kosmonavtiki/kosmos${imageNumber}.jpg`,
    "1maya": `1maya/1may${imageNumber}.jpg`,
    "victory": `victory/victory${imageNumber}.jpg`,
    "den-rossii": `den-rossii/den-rossii${imageNumber}.jpg`,
    "rozhdestvo": `rozhdestvo/rozhdestvo${imageNumber}.jpg`,
    "pasha": `pasha/pasha${imageNumber}.jpg`,
    "maslenica": `maslenica/maslenica${imageNumber}.jpg`,
    "s-dnem-uchitelya": `s-dnem-uchitelya/teacher${imageNumber}.jpg`,
    "den-materi": `den-materi/mama${imageNumber}.jpg`,
    "den-otca": `den-otca/papa${imageNumber}.jpg`,
    "godovshchina-svadby": `godovshchina-svadby/wedding${imageNumber}.jpg`,
    "wish": `wish/wish${imageNumber}.jpg`
  }

  const imagePath = categoryPaths[category] || categoryPaths["wish"]
  return `${baseUrl}/${imagePath}`
}

export function PostcardViewer({
  holiday,
  userDate,
  onClose,
  onShare,
  className,
}: PostcardViewerProps) {
  const [currentPostcardIndex, setCurrentPostcardIndex] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  const category = getPostcardCategory(holiday, userDate)
  const postcardUrl = generatePostcardUrl(category, currentPostcardIndex)

  // Функция для загрузки следующей открытки
  const loadNextPostcard = () => {
    setIsLoading(true)
    setImageError(false)
    setCurrentPostcardIndex(prev => prev + 1)
  }

  // Функция для скачивания открытки
  const downloadPostcard = async () => {
    try {
      const response = await fetch(postcardUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `postcard-${category}-${currentPostcardIndex}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Ошибка при скачивании открытки:', error)
    }
  }

  // Обработчик ошибки загрузки изображения
  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  // Обработчик успешной загрузки изображения
  const handleImageLoad = () => {
    setIsLoading(false)
    setImageError(false)
  }

  const eventName = holiday?.name || userDate?.name || "событие"

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle>Праздничная открытка</CardTitle>
        <CardDescription>
          Открытка для "{eventName}"
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border bg-muted">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {imageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <div className="text-muted-foreground mb-2">
                Не удалось загрузить открытку
              </div>
              <Button variant="outline" size="sm" onClick={loadNextPostcard}>
                Попробовать другую
              </Button>
            </div>
          ) : (
            <img
              src={postcardUrl}
              alt={`Открытка для ${eventName}`}
              className="h-full w-full object-cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          )}
        </div>
        <div className="text-sm text-muted-foreground text-center">
          Открытка #{currentPostcardIndex} • Источник: BonnyCards.ru
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
          <Button variant="outline" onClick={loadNextPostcard} disabled={isLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Другая открытка
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={downloadPostcard}>
            <Download className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={() => onShare?.(postcardUrl)}>
            <Share2 className="h-4 w-4 mr-2" />
            Поделиться
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
