"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Holiday, UserDate } from "@/components/CalendarWithHolidays"
import { cn } from "@/lib/utils"

interface GreetingGeneratorProps {
  holiday?: Holiday
  userDate?: UserDate
  onClose?: () => void
  onShare?: (greeting: string) => void
  className?: string
}

export function GreetingGenerator({
  holiday,
  userDate,
  onClose,
  onShare,
  className,
}: GreetingGeneratorProps) {
  const [greeting, setGreeting] = React.useState<string>("")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>("")
  const [customName, setCustomName] = React.useState<string>("")

  // Шаблоны поздравлений
  const templates = {
    birthday: [
      "С днем рождения, {name}! Желаю тебе счастья, здоровья и всего самого наилучшего!",
      "Поздравляю с днем рождения, {name}! Пусть этот день принесет тебе радость и исполнение желаний!",
      "С днем рождения, {name}! Желаю тебе успехов во всех начинаниях и много радостных моментов!",
    ],
    anniversary: [
      "Поздравляю с годовщиной, {name}! Пусть ваша любовь становится только крепче с каждым годом!",
      "С годовщиной, {name}! Желаю вам долгих лет счастья и благополучия!",
      "Поздравляю с годовщиной, {name}! Пусть ваша жизнь будет наполнена любовью и взаимопониманием!",
    ],
    national: [
      "Поздравляю с праздником {name}! Пусть этот день принесет радость и хорошее настроение!",
      "С праздником {name}! Желаю отличного настроения и ярких впечатлений!",
      "Поздравляю с {name}! Пусть этот день будет наполнен радостью и весельем!",
    ],
    international: [
      "Поздравляю с международным праздником {name}! Пусть этот день объединяет людей во всем мире!",
      "С международным днем {name}! Желаю мира и благополучия!",
      "Поздравляю с {name}! Пусть этот международный праздник принесет радость и вдохновение!",
    ],
    religious: [
      "Поздравляю с праздником {name}! Пусть вера приносит силу и утешение!",
      "С праздником {name}! Желаю духовного благополучия и мира в душе!",
      "Поздравляю с {name}! Пусть этот светлый праздник принесет благословение и радость!",
    ],
    professional: [
      "Поздравляю с профессиональным праздником {name}! Желаю успехов в работе и профессионального роста!",
      "С днем {name}! Желаю достижения новых профессиональных высот!",
      "Поздравляю с {name}! Пусть ваш труд всегда приносит удовлетворение и достойное вознаграждение!",
    ],
    other: [
      "Поздравляю с {name}! Желаю отличного настроения и ярких впечатлений!",
      "С праздником {name}! Пусть этот день будет особенным!",
      "Поздравляю с {name}! Желаю всего самого наилучшего!",
    ],
  }

  // Функция для генерации поздравления
  const generateGreeting = () => {
    setIsGenerating(true)
    
    setTimeout(() => {
      let templateType: keyof typeof templates = "other"
      let name = ""
      
      if (holiday) {
        templateType = holiday.type as keyof typeof templates
        name = holiday.name
      } else if (userDate) {
        if (userDate.type === "birthday") {
          templateType = "birthday"
        } else if (userDate.type === "anniversary") {
          templateType = "anniversary"
        } else {
          templateType = "other"
        }
        name = customName || userDate.name
      }
      
      // Выбираем случайный шаблон из соответствующей категории
      const templateOptions = templates[templateType] || templates.other
      const randomTemplate = templateOptions[Math.floor(Math.random() * templateOptions.length)]
      
      // Заменяем {name} на имя праздника или пользовательской даты
      const generatedGreeting = randomTemplate.replace("{name}", name)
      
      setGreeting(generatedGreeting)
      setSelectedTemplate(generatedGreeting)
      setIsGenerating(false)
    }, 1000)
  }

  // Генерируем поздравление при первой загрузке компонента
  React.useEffect(() => {
    generateGreeting()
  }, [])

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle>Генератор поздравлений</CardTitle>
        <CardDescription>
          {holiday 
            ? `Создайте поздравление для праздника "${holiday.name}"`
            : userDate 
              ? `Создайте поздравление для "${userDate.name}"`
              : "Создайте поздравление"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {userDate?.type === "birthday" && (
          <div className="grid gap-2">
            <label htmlFor="customName" className="text-sm font-medium">
              Имя (необязательно)
            </label>
            <input
              id="customName"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Введите имя получателя"
            />
          </div>
        )}
        <div className="grid gap-2">
          <label htmlFor="greeting" className="text-sm font-medium">
            Поздравление
          </label>
          <textarea
            id="greeting"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Ваше поздравление появится здесь..."
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
          <Button 
            variant="outline" 
            onClick={generateGreeting}
            disabled={isGenerating}
          >
            {isGenerating ? "Генерация..." : "Сгенерировать еще"}
          </Button>
        </div>
        <Button onClick={() => onShare?.(greeting)}>
          Поделиться
        </Button>
      </CardFooter>
    </Card>
  )
}
