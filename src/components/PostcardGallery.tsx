"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Holiday, UserDate } from "@/components/CalendarWithHolidays"
import { cn } from "@/lib/utils"
import { Download, Share2, RefreshCw, X, Search } from "lucide-react"

interface PostcardGalleryProps {
  holiday?: Holiday
  userDate?: UserDate
  onClose?: () => void
  onShare?: (postcardUrl: string) => void
  className?: string
}

// База данных проверенных открыток с реальными URL-ами с BonnyCards.ru
const verifiedPostcards = {
  // 8 марта - проверенные URL-ы
  "s-8-marta": [
    "https://bonnycards.ru/images/s-8-marta/small/s-8marta0085.jpg",
    "https://bonnycards.ru/images/s-8-marta/small/s-8marta0086.jpg",
    "https://bonnycards.ru/images/s-8-marta/small/s-8marta0087.jpg",
    "https://bonnycards.ru/images/s-8-marta/small/s-8marta0088.jpg",
    "https://bonnycards.ru/images/s-8-marta/small/s-8marta0089.jpg",
    "https://bonnycards.ru/images/s-8-marta/small/s-8marta0090.jpg",
    "https://bonnycards.ru/images/s-8-marta/small/s-8marta0091.jpg",
    "https://bonnycards.ru/images/s-8-marta/small/s-8marta0092.jpg",
    "https://bonnycards.ru/images/s-8-marta/small/s-8marta0093.jpg",
    "https://bonnycards.ru/images/s-8-marta/small/s-8marta0094.jpg",
    "https://bonnycards.ru/images/s-8-marta/small/s-8marta0095.jpg",
    "https://bonnycards.ru/images/s-8-marta/small/s-8marta0096.jpg",
  ],

  // День рождения - женщинам и мужчинам
  "birthday": [
    "https://bonnycards.ru/images/birthday-woman/small/s-drwoman0288.jpg",
    "https://bonnycards.ru/images/birthday-woman/small/s-drwoman0229.jpg",
    "https://bonnycards.ru/images/birthday-woman/small/s-drwoman0179.jpg",
    "https://bonnycards.ru/images/birthday-woman/small/s-drwoman0252.jpg",
    "https://bonnycards.ru/images/birthday-woman/small/s-drwoman0216.jpg",
    "https://bonnycards.ru/images/birthday-woman/small/s-drwoman0197.jpg",
    "https://bonnycards.ru/images/birthday-woman/small/s-drwoman0195.jpg",
    "https://bonnycards.ru/images/birthday-woman/small/s-drwoman0249.jpg",
    "https://bonnycards.ru/images/birthday-man/small/s-drman0198.jpg",
    "https://bonnycards.ru/images/birthday-man/small/s-drman0162.jpg",
    "https://bonnycards.ru/images/birthday-man/small/s-drman0155.jpg",
    "https://bonnycards.ru/images/birthday-man/small/s-drman0161.jpg",
  ],

  // Новый год - правильные URL-ы
  "new-year": [
    "https://bonnycards.ru/images/new-year/small/s-newyear0157.jpg",
    "https://bonnycards.ru/images/new-year/small/s-newyear0156.jpg",
    "https://bonnycards.ru/images/new-year/small/s-newyear0155.jpg",
    "https://bonnycards.ru/images/new-year/small/s-newyear0154.jpg",
    "https://bonnycards.ru/images/new-year/small/s-newyear0153.jpg",
    "https://bonnycards.ru/images/new-year/small/s-newyear0162.jpg",
    "https://bonnycards.ru/images/new-year/small/s-newyear0152.jpg",
    "https://bonnycards.ru/images/new-year/small/s-newyear0151.jpg",
    "https://bonnycards.ru/images/new-year/small/s-newyear0145.jpg",
    "https://bonnycards.ru/images/new-year/small/s-newyear0161.jpg",
    "https://bonnycards.ru/images/new-year/small/s-newyear0137.jpg",
    "https://bonnycards.ru/images/new-year/small/s-newyear0136.jpg",
  ],

  // 23 февраля - правильные URL-ы
  "23fevralya": [
    "https://bonnycards.ru/images/23fevralya/small/s-23fevralya0048.jpg",
    "https://bonnycards.ru/images/23fevralya/small/s-23fevralya0064.jpg",
    "https://bonnycards.ru/images/23fevralya/small/s-23fevralya0053.jpg",
    "https://bonnycards.ru/images/23fevralya/small/s-23fevralya0066.jpg",
    "https://bonnycards.ru/images/23fevralya/small/s-23fevralya0065.jpg",
    "https://bonnycards.ru/images/23fevralya/small/s-23fevralya0063.jpg",
    "https://bonnycards.ru/images/23fevralya/small/s-23fevralya0062.jpg",
    "https://bonnycards.ru/images/23fevralya/small/s-23fevralya0061.jpg",
    "https://bonnycards.ru/images/23fevralya/small/s-23fevralya0060.jpg",
    "https://bonnycards.ru/images/23fevralya/small/s-23fevralya0059.jpg",
  ],

  // День Победы - правильные URL-ы
  "victory": [
    "https://bonnycards.ru/images/victory/small/s-9may0066.jpg",
    "https://bonnycards.ru/images/victory/small/s-9may0065.jpg",
    "https://bonnycards.ru/images/victory/small/s-9may0064.jpg",
    "https://bonnycards.ru/images/victory/small/s-9may0063.jpg",
    "https://bonnycards.ru/images/victory/small/s-9may0062.jpg",
    "https://bonnycards.ru/images/victory/small/s-9may0061.jpg",
    "https://bonnycards.ru/images/victory/small/s-9may0060.jpg",
    "https://bonnycards.ru/images/victory/small/s-9may0059.jpg",
    "https://bonnycards.ru/images/victory/small/s-9may0058.jpg",
    "https://bonnycards.ru/images/victory/small/s-9may0057.jpg",
  ],

  // Спасибо - проверенные URL-ы
  "spasibo": [
    "https://bonnycards.ru/images/spasibo/small/s-spasibo0072.jpg",
    "https://bonnycards.ru/images/spasibo/small/s-spasibo0071.jpg",
    "https://bonnycards.ru/images/spasibo/small/s-spasibo0070.jpg",
    "https://bonnycards.ru/images/spasibo/small/s-spasibo0069.jpg",
    "https://bonnycards.ru/images/spasibo/small/s-spasibo0068.jpg",
    "https://bonnycards.ru/images/spasibo/small/s-spasibo0067.jpg",
    "https://bonnycards.ru/images/spasibo/small/s-spasibo0066.jpg",
    "https://bonnycards.ru/images/spasibo/small/s-spasibo0065.jpg",
    "https://bonnycards.ru/images/spasibo/small/s-spasibo0064.jpg",
    "https://bonnycards.ru/images/spasibo/small/s-spasibo0063.jpg",
  ],

  // Любовь - проверенные URL-ы
  "love": [
    "https://bonnycards.ru/images/i-love-you/small/s-loving0108.jpg",
    "https://bonnycards.ru/images/i-love-you/small/s-loving0107.jpg",
    "https://bonnycards.ru/images/i-love-you/small/s-loving0106.jpg",
    "https://bonnycards.ru/images/i-love-you/small/s-loving0105.jpg",
    "https://bonnycards.ru/images/i-love-you/small/s-loving0104.jpg",
    "https://bonnycards.ru/images/i-love-you/small/s-loving0103.jpg",
    "https://bonnycards.ru/images/i-love-you/small/s-loving0102.jpg",
    "https://bonnycards.ru/images/i-love-you/small/s-loving0101.jpg",
  ],

  // Общие пожелания - проверенные URL-ы (fallback)
  "wish": [
    "https://bonnycards.ru/images/wish/small/s-wish0198.jpg",
    "https://bonnycards.ru/images/wish/small/s-wish0197.jpg",
    "https://bonnycards.ru/images/wish/small/s-wish0196.jpg",
    "https://bonnycards.ru/images/wish/small/s-wish0195.jpg",
    "https://bonnycards.ru/images/wish/small/s-wish0194.jpg",
    "https://bonnycards.ru/images/wish/small/s-wish0193.jpg",
    "https://bonnycards.ru/images/wish/small/s-wish0192.jpg",
    "https://bonnycards.ru/images/wish/small/s-wish0191.jpg",
    "https://bonnycards.ru/images/wish/small/s-wish0190.jpg",
    "https://bonnycards.ru/images/wish/small/s-wish0189.jpg",
  ]
}

// База данных тем для поиска открыток (только с реальными открытками)
const postcardThemes = [
  // Основные праздники (с реальными открытками)
  { keywords: ["новый год", "новогодние", "елка", "дед мороз", "снегурочка", "2025"], category: "new-year", folderName: "new-year", prefix: "ny", name: "Новый год" },
  { keywords: ["23 февраля", "защитник отечества", "мужской день", "армия", "военные", "солдат"], category: "23fevralya", folderName: "23fevralya", prefix: "23f", name: "23 февраля" },
  { keywords: ["8 марта", "женский день", "мамин день", "цветы", "тюльпаны", "розы", "женщине"], category: "s-8-marta", folderName: "s-8-marta", prefix: "s-8marta", name: "8 марта" },
  { keywords: ["день победы", "9 мая", "победа", "ветераны", "война", "георгиевская лента"], category: "victory", folderName: "victory", prefix: "victory", name: "День Победы" },
  { keywords: ["день рождения", "рождение", "именины", "др", "birthday"], category: "birthday", folderName: "birthday", prefix: "birthday", name: "День рождения" },

  // Дополнительные темы (с реальными открытками)
  { keywords: ["спасибо", "благодарность", "признательность", "благодарю"], category: "spasibo", folderName: "spasibo", prefix: "spasibo", name: "Спасибо" },
  { keywords: ["любовь", "валентинка", "14 февраля", "сердце", "романтика", "люблю"], category: "love", folderName: "love", prefix: "loving", name: "Любовь" },
]

// Функция поиска тем по ключевым словам
const searchThemes = (query: string) => {
  if (!query.trim()) return []

  const searchQuery = query.toLowerCase().trim()

  // Сначала ищем точные совпадения
  const exactMatches = postcardThemes.filter(theme =>
    theme.keywords.some(keyword => keyword === searchQuery) ||
    theme.name.toLowerCase() === searchQuery
  )

  // Затем ищем частичные совпадения
  const partialMatches = postcardThemes.filter(theme =>
    !exactMatches.includes(theme) && (
      theme.keywords.some(keyword =>
        keyword.includes(searchQuery) || searchQuery.includes(keyword)
      ) || theme.name.toLowerCase().includes(searchQuery)
    )
  )

  // Возвращаем сначала точные, потом частичные совпадения
  return [...exactMatches, ...partialMatches].slice(0, 8) // Ограничиваем до 8 результатов
}

// Маппинг праздников на категории BonnyCards.ru
const getPostcardCategory = (holiday?: Holiday, userDate?: UserDate): { category: string; folderName: string; prefix: string } => {
  if (userDate) {
    switch (userDate.type) {
      case "birthday":
        return { category: "birthday", folderName: "birthday", prefix: "birthday" }
      case "anniversary":
        return { category: "godovshchina-svadby", folderName: "godovshchina-svadby", prefix: "wedding" }
      default:
        return { category: "wish", folderName: "wish", prefix: "wish" }
    }
  }

  if (holiday) {
    switch (holiday.name) {
      case "Новый год":
        return { category: "new-year", folderName: "new-year", prefix: "newyear" }
      case "День защитника Отечества":
        return { category: "23fevralya", folderName: "23fevralya", prefix: "23f" }
      case "Международный женский день":
        return { category: "s-8-marta", folderName: "s-8-marta", prefix: "8m" }
      case "День космонавтики":
        return { category: "den-kosmonavtiki", folderName: "den-kosmonavtiki", prefix: "kosmos" }
      case "Праздник Весны и Труда":
        return { category: "1maya", folderName: "1maya", prefix: "1may" }
      case "День Победы":
        return { category: "victory", folderName: "victory", prefix: "victory" }
      case "День России":
        return { category: "den-rossii", folderName: "den-rossii", prefix: "den-rossii" }
      case "Рождество Христово":
        return { category: "rozhdestvo", folderName: "rozhdestvo", prefix: "rozhdestvo" }
      case "Пасха":
        return { category: "pasha", folderName: "pasha", prefix: "pasha" }
      case "Масленица":
        return { category: "maslenica", folderName: "maslenica", prefix: "maslenica" }
      case "День учителя":
        return { category: "s-dnem-uchitelya", folderName: "s-dnem-uchitelya", prefix: "teacher" }
      case "День матери":
        return { category: "den-materi", folderName: "den-materi", prefix: "mama" }
      case "День отца":
        return { category: "den-otca", folderName: "den-otca", prefix: "papa" }
      default:
        return { category: "wish", folderName: "wish", prefix: "wish" }
    }
  }

  return { category: "wish", folderName: "wish", prefix: "wish" }
}

// Получение проверенных открыток для категории
const getVerifiedPostcards = (folderName: string): string[] => {
  return verifiedPostcards[folderName as keyof typeof verifiedPostcards] || verifiedPostcards.wish
}

// Компонент отдельной открытки
interface PostcardItemProps {
  url: string
  index: number
  eventName: string
  onShare: (url: string) => void
}

const PostcardItem: React.FC<PostcardItemProps> = ({ url, index, eventName, onShare }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)
  const [retryCount, setRetryCount] = React.useState(0)

  const downloadPostcard = async () => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `postcard-${eventName}-${index}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Ошибка при скачивании открытки:', error)
    }
  }

  // Обработчик ошибки с попыткой повторной загрузки
  const handleImageError = () => {
    if (retryCount < 2) {
      setRetryCount(prev => prev + 1)
      setImageLoaded(false)
      // Небольшая задержка перед повторной попыткой
      setTimeout(() => {
        const img = new Image()
        img.onload = () => setImageLoaded(true)
        img.onerror = () => setImageError(true)
        img.src = url
      }, 1000)
    } else {
      setImageError(true)
    }
  }

  if (imageError) {
    return null // Не показываем открытки, которые не загрузились
  }

  return (
    <div className="relative group">
      <div className="aspect-[3/4] overflow-hidden rounded-md border bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
        <img
          src={url}
          alt={`Открытка ${index} для ${eventName}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />

        {/* Overlay с кнопками при наведении */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={downloadPostcard}>
            <Download className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={() => onShare(url)}>
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="text-xs text-center text-muted-foreground mt-1">
        #{index}
      </div>
    </div>
  )
}

export function PostcardGallery({
  holiday,
  userDate,
  onClose,
  onShare,
  className,
}: PostcardGalleryProps) {
  const [displayCount, setDisplayCount] = React.useState(20) // Начинаем с 20 открыток
  const [isLoadingMore, setIsLoadingMore] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<typeof postcardThemes>([])
  const [selectedTheme, setSelectedTheme] = React.useState<typeof postcardThemes[0] | null>(null)

  // Определяем текущую категорию (из праздника/даты или из поиска)
  const currentCategory = selectedTheme || getPostcardCategory(holiday, userDate)
  const { category, folderName, prefix } = currentCategory
  const eventName = selectedTheme?.name || holiday?.name || userDate?.name || "событие"

  // Получаем проверенные открытки для текущей категории
  const availablePostcards = React.useMemo(() => {
    return getVerifiedPostcards(folderName)
  }, [folderName])

  // Отображаемые открытки (ограничиваем количество)
  const displayedPostcards = React.useMemo(() => {
    return availablePostcards.slice(0, displayCount)
  }, [availablePostcards, displayCount])

  const loadMorePostcards = async () => {
    if (displayCount >= availablePostcards.length) return // Больше нечего загружать

    setIsLoadingMore(true)
    // Имитируем небольшую задержку для лучшего UX
    await new Promise(resolve => setTimeout(resolve, 500))
    setDisplayCount(prev => Math.min(prev + 10, availablePostcards.length)) // Добавляем по 10 открыток за раз
    setIsLoadingMore(false)
  }

  const handleShare = (url: string) => {
    onShare?.(url)
  }

  // Обработчик поиска
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = searchThemes(query)
      setSearchResults(results)
    } else {
      setSearchResults([])
      setSelectedTheme(null)
    }
  }

  // Обработчик выбора темы
  const handleSelectTheme = (theme: typeof postcardThemes[0]) => {
    setSelectedTheme(theme)
    setSearchResults([])
    setSearchQuery("")
    setDisplayCount(20) // Сбрасываем счетчик при смене темы
  }

  // Обработчик сброса поиска
  const handleClearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setSelectedTheme(null)
    setDisplayCount(20)
  }

  return (
    <Card className={cn("w-full max-w-4xl mx-auto max-h-[80vh] overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-lg">Открытки для "{eventName}"</CardTitle>
            <CardDescription className="text-sm">
              Выберите понравившуюся открытку с BonnyCards.ru
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Поисковая строка */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск открыток по теме (например: день рождения, новый год, любовь...)"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Результаты поиска */}
          {searchQuery && searchResults.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Найденные темы:</div>
              <div className="flex flex-wrap gap-2">
                {searchResults.map((theme) => (
                  <Button
                    key={theme.category}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectTheme(theme)}
                    className="text-xs"
                  >
                    {theme.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Сообщение когда поиск не дал результатов */}
          {searchQuery && searchResults.length === 0 && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                По запросу "{searchQuery}" ничего не найдено
              </div>
              <div className="text-xs text-muted-foreground">
                Попробуйте: день рождения, новый год, 8 марта, любовь, спасибо
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSelectTheme(postcardThemes[postcardThemes.length - 1])}
                className="text-xs"
              >
                Показать общие поздравления
              </Button>
            </div>
          )}

          {/* Кнопка сброса поиска */}
          {selectedTheme && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Показаны открытки: {selectedTheme.name}
              </span>
              <Button variant="ghost" size="sm" onClick={handleClearSearch}>
                <X className="h-3 w-3 mr-1" />
                Сбросить
              </Button>
            </div>
          )}

          {/* Популярные темы */}
          {!selectedTheme && searchResults.length === 0 && !searchQuery && (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Популярные темы:</div>
              <div className="flex flex-wrap gap-2">
                {postcardThemes.map((theme) => (
                  <Button
                    key={theme.category}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleSelectTheme(theme)}
                    className="text-xs"
                  >
                    {theme.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="max-h-[60vh] overflow-y-auto">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
          {displayedPostcards.map((url, index) => (
            <PostcardItem
              key={url}
              url={url}
              index={index + 1}
              eventName={eventName}
              onShare={handleShare}
            />
          ))}
        </div>

        {/* Сообщение если открытки не найдены */}
        {availablePostcards.length === 0 && (
          <div className="text-center py-8">
            <div className="text-muted-foreground mb-2">
              Открытки для этой темы временно недоступны
            </div>
            <Button variant="outline" size="sm" onClick={handleClearSearch}>
              Попробовать другую тему
            </Button>
          </div>
        )}

        <div className="text-center pt-2 space-y-2">
          <div className="text-xs text-muted-foreground">
            Показано открыток: {displayedPostcards.length} из {availablePostcards.length}
          </div>
          {displayCount < availablePostcards.length && (
            <Button
              variant="outline"
              size="sm"
              onClick={loadMorePostcards}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                  Загружаем...
                </>
              ) : (
                `Загрузить ещё (+${Math.min(10, availablePostcards.length - displayCount)})`
              )}
            </Button>
          )}
        </div>

        <div className="text-xs text-center text-muted-foreground mt-2">
          Источник: BonnyCards.ru
        </div>
      </CardContent>
    </Card>
  )
}
