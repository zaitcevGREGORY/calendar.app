"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Holiday, UserDate } from "@/components/CalendarWithHolidays"
import { cn } from "@/lib/utils"
import { Mail, Send, Calendar, Heart, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { sendEmailWithEmailJS, initEmailJS, EmailData } from "@/lib/emailjs"

interface EmailPostcardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  holiday?: Holiday
  userDate?: UserDate
  userEmail: string
  userName: string
  className?: string
}

// Получение открытки для праздника (с проверенными URL-ами из BonnyCards.ru)
const getPostcardForHoliday = (holiday?: Holiday, userDate?: UserDate): string => {
  if (userDate) {
    switch (userDate.type) {
      case "birthday":
        return "https://bonnycards.ru/images/birthday-woman/small/s-drwoman0229.jpg"
      case "anniversary":
        return "https://bonnycards.ru/images/i-love-you/small/s-loving0108.jpg"
      default:
        return "https://bonnycards.ru/images/wish/small/s-wish0198.jpg"
    }
  }

  if (holiday) {
    switch (holiday.name) {
      case "Новый год":
        return "https://bonnycards.ru/images/new-year/small/s-newyear0157.jpg"
      case "День защитника Отечества":
        return "https://bonnycards.ru/images/23fevralya/small/s-23fevralya0048.jpg"
      case "Международный женский день":
        return "https://bonnycards.ru/images/s-8-marta/small/s-8marta0085.jpg"
      case "День Победы":
        return "https://bonnycards.ru/images/victory/small/s-9may0066.jpg"
      case "День космонавтики":
        return "https://bonnycards.ru/images/wish/small/s-wish0198.jpg"
      case "Праздник Весны и Труда":
        return "https://bonnycards.ru/images/wish/small/s-wish0197.jpg"
      case "День программиста":
        return "https://bonnycards.ru/images/wish/small/s-wish0196.jpg"
      case "Международный день пропавших детей":
        return "https://bonnycards.ru/images/wish/small/s-wish0195.jpg"
      case "День филолога в России":
        return "https://bonnycards.ru/images/wish/small/s-wish0194.jpg"
      case "День химика":
        return "https://bonnycards.ru/images/wish/small/s-wish0193.jpg"
      case "Всемирный день футбола":
        return "https://bonnycards.ru/images/wish/small/s-wish0192.jpg"
      case "День российского предпринимательства":
        return "https://bonnycards.ru/images/wish/small/s-wish0191.jpg"
      case "Общероссийский день библиотек":
        return "https://bonnycards.ru/images/wish/small/s-wish0190.jpg"
      case "Рождество Христово":
        return "https://bonnycards.ru/images/wish/small/s-wish0189.jpg"
      case "День России":
        return "https://bonnycards.ru/images/wish/small/s-wish0188.jpg"
      case "День российского студенчества":
        return "https://bonnycards.ru/images/wish/small/s-wish0187.jpg"
      case "День снятия блокады Ленинграда":
        return "https://bonnycards.ru/images/wish/small/s-wish0186.jpg"
      case "День российской науки":
        return "https://bonnycards.ru/images/wish/small/s-wish0185.jpg"
      case "День воссоединения Крыма с Россией":
        return "https://bonnycards.ru/images/wish/small/s-wish0184.jpg"
      case "День славянской письменности и культуры":
        return "https://bonnycards.ru/images/wish/small/s-wish0183.jpg"
      case "День знаний":
        return "https://bonnycards.ru/images/wish/small/s-wish0182.jpg"
      case "День учителя":
        return "https://bonnycards.ru/images/wish/small/s-wish0181.jpg"
      case "День народного единства":
        return "https://bonnycards.ru/images/wish/small/s-wish0180.jpg"
      case "День Конституции Российской Федерации":
        return "https://bonnycards.ru/images/wish/small/s-wish0179.jpg"
      default:
        return "https://bonnycards.ru/images/wish/small/s-wish0198.jpg"
    }
  }

  return "https://bonnycards.ru/images/wish/small/s-wish0198.jpg"
}

// Генерация персонализированного поздравительного текста
const generateGreetingText = (holiday?: Holiday, userDate?: UserDate, userName?: string): string => {
  const name = userName || "Дорогой друг"

  if (userDate) {
    switch (userDate.type) {
      case "birthday":
        return `Дорогой ${name}!\n\n🎂 Поздравляем с днем рождения "${userDate.name}"!\n\nЖелаем счастья, здоровья, исполнения всех желаний и множества радостных моментов в новом году жизни!\n\nПусть каждый день приносит улыбки и новые достижения!\n\nС наилучшими пожеланиями,\n💝 Календарь праздников`
      case "anniversary":
        return `Дорогой ${name}!\n\n💕 Поздравляем с годовщиной "${userDate.name}"!\n\nПусть ваша любовь становится только крепче с каждым годом, а совместный путь будет полон счастья и взаимопонимания!\n\nЖелаем вам долгих лет вместе!\n\nС наилучшими пожеланиями,\n💝 Календарь праздников`
      default:
        return `Дорогой ${name}!\n\n✨ Поздравляем с важной датой "${userDate.name}"!\n\nЖелаем всего самого наилучшего и пусть этот день принесет много радости!\n\nС наилучшими пожеланиями,\n💝 Календарь праздников`
    }
  }

  if (holiday) {
    const holidayDate = format(holiday.date, "d MMMM", { locale: ru })

    switch (holiday.name) {
      case "Новый год":
        return `Дорогой ${name}!\n\n🎄 Поздравляем с Новым годом!\n\nПусть новый год принесет вам счастье, здоровье, успех и исполнение всех заветных желаний! Пусть каждый день будет полон радости и новых возможностей!\n\n✨ Желаем волшебного настроения и незабываемых моментов!\n\nС наилучшими пожеланиями,\n🎁 Календарь праздников`

      case "День защитника Отечества":
        return `Дорогой ${name}!\n\n🎖️ Поздравляем с Днем защитника Отечества!\n\nЖелаем крепкого здоровья, мужества, силы духа и благополучия! Пусть мир и спокойствие всегда царят в вашем доме!\n\n💪 Спасибо за вашу надежность и защиту!\n\nС наилучшими пожеланиями,\n🇷🇺 Календарь праздников`

      case "Международный женский день":
        return `Дорогая ${name}!\n\n🌸 Поздравляем с Международным женским днем!\n\nЖелаем вам красоты, нежности, любви и счастья! Пусть каждый день дарит улыбки, а жизнь будет полна ярких красок и приятных сюрпризов!\n\n💐 Вы прекрасны и неповторимы!\n\nС наилучшими пожеланиями,\n🌹 Календарь праздников`

      case "День Победы":
        return `Дорогой ${name}!\n\n🏆 Поздравляем с Днем Победы!\n\nВ этот священный день мы помним подвиг наших героев и благодарим за мир над головой. Желаем вам крепкого здоровья, счастья и мирного неба!\n\n🕊️ Пусть память о великой Победе вдохновляет на новые свершения!\n\nС глубоким уважением,\n🌟 Календарь праздников`

      case "День космонавтики":
        return `Дорогой ${name}!\n\n🚀 Поздравляем с Днем космонавтики!\n\nПусть ваши мечты будут такими же безграничными, как космос, а цели - такими же достижимыми, как звезды! Желаем новых открытий и покорения новых высот!\n\n⭐ Стремитесь к звездам!\n\nС наилучшими пожеланиями,\n🌌 Календарь праздников`

      case "Праздник Весны и Труда":
        return `Дорогой ${name}!\n\n🌱 Поздравляем с Праздником Весны и Труда!\n\nПусть весна принесет обновление и вдохновение, а ваш труд всегда приносит радость и достойные плоды! Желаем успехов во всех начинаниях!\n\n🌿 Пусть каждый день будет продуктивным и радостным!\n\nС наилучшими пожеланиями,\n🌻 Календарь праздников`

      case "День программиста":
        return `Дорогой ${name}!\n\n💻 Поздравляем с Днем программиста!\n\nЖелаем вам чистого кода, быстрых алгоритмов и минимума багов! Пусть ваши проекты всегда компилируются с первого раза, а идеи воплощаются в элегантные решения!\n\n⚡ Код - это поэзия логики!\n\nС наилучшими пожеланиями,\n🚀 Календарь праздников`

      case "Международный день пропавших детей":
        return `Дорогой ${name}!\n\n💙 Сегодня Международный день пропавших детей.\n\nВ этот день мы вспоминаем о важности защиты детей и поддержки семей. Пусть каждый ребенок будет в безопасности, а каждая семья - счастливой и полной!\n\n🌸 Символ дня - синяя незабудка, как напоминание о том, что мы не забываем.\n\nС наилучшими пожеланиями,\n💝 Календарь праздников`

      case "День филолога в России":
        return `Дорогой ${name}!\n\n📚 Поздравляем с Днем филолога!\n\nЖелаем вам вдохновения в изучении языка и литературы, новых открытий в мире слов и смыслов! Пусть каждая страница приносит радость, а каждое слово - новое понимание!\n\n✨ Язык - это душа народа!\n\nС наилучшими пожеланиями,\n📖 Календарь праздников`

      case "День химика":
        return `Дорогой ${name}!\n\n🧪 Поздравляем с Днем химика!\n\nЖелаем успешных экспериментов, точных формул и безопасных реакций! Пусть ваши исследования приносят пользу людям, а открытия меняют мир к лучшему!\n\n⚗️ Химия - это магия, объясненная наукой!\n\nС наилучшими пожеланиями,\n🔬 Календарь праздников`

      case "Всемирный день футбола":
        return `Дорогой ${name}!\n\n⚽ Поздравляем с Всемирным днем футбола!\n\nПусть ваша команда всегда побеждает, голы летят точно в цель, а игра приносит радость и эмоции! Футбол объединяет людей по всему миру!\n\n🏆 Игра, которая покорила планету!\n\nС наилучшими пожеланиями,\n🌍 Календарь праздников`

      case "День российского предпринимательства":
        return `Дорогой ${name}!\n\n💼 Поздравляем с Днем российского предпринимательства!\n\nЖелаем успешных проектов, прибыльных сделок и процветания бизнеса! Пусть ваши идеи воплощаются в жизнь, а предприятия развиваются и растут!\n\n📈 Предпринимательство - двигатель экономики!\n\nС наилучшими пожеланиями,\n🚀 Календарь праздников`

      case "Общероссийский день библиотек":
        return `Дорогой ${name}!\n\n📚 Поздравляем с Днем библиотек!\n\nЖелаем, чтобы книги всегда были вашими верными спутниками, а библиотеки - местом вдохновения и знаний! Пусть каждая прочитанная страница обогащает душу!\n\n📖 Библиотека - храм знаний!\n\nС наилучшими пожеланиями,\n🏛️ Календарь праздников`

      case "Рождество Христово":
        return `Дорогой ${name}!\n\n🎄 Поздравляем с Рождеством Христовым!\n\nПусть этот светлый праздник принесет в ваш дом мир, любовь и радость! Желаем крепкого здоровья, семейного счастья и благополучия!\n\n⭐ Рождественская звезда освещает путь к добру!\n\nС Рождеством Христовым,\n🕊️ Календарь праздников`

      case "День России":
        return `Дорогой ${name}!\n\n🇷🇺 Поздравляем с Днем России!\n\nЖелаем нашей великой стране процветания, а всем россиянам - мира, счастья и благополучия! Пусть Россия всегда остается сильной и единой!\n\n🏛️ Горжусь своей страной!\n\nС наилучшими пожеланиями,\n🌟 Календарь праздников`

      case "День российского студенчества":
        return `Дорогой ${name}!\n\n🎓 Поздравляем с Днем российского студенчества!\n\nЖелаем успехов в учебе, интересных открытий и ярких студенческих лет! Пусть знания станут вашей силой, а дружба - опорой!\n\n📚 Студенческие годы - лучшие годы!\n\nС наилучшими пожеланиями,\n⭐ Календарь праздников`

      case "День снятия блокады Ленинграда":
        return `Дорогой ${name}!\n\n🕊️ День снятия блокады Ленинграда!\n\nВ этот день мы помним героизм и мужество ленинградцев, которые выстояли в тяжелейших условиях. Вечная память героям и слава защитникам города!\n\n🌟 Никто не забыт, ничто не забыто!\n\nС глубоким уважением,\n🏛️ Календарь праздников`

      case "День российской науки":
        return `Дорогой ${name}!\n\n🔬 Поздравляем с Днем российской науки!\n\nЖелаем новых открытий, научных прорывов и вдохновения в исследованиях! Пусть ваши труды приносят пользу человечеству!\n\n⚗️ Наука - двигатель прогресса!\n\nС наилучшими пожеланиями,\n🚀 Календарь праздников`

      case "День воссоединения Крыма с Россией":
        return `Дорогой ${name}!\n\n🇷🇺 Поздравляем с Днем воссоединения Крыма с Россией!\n\nЭтот день стал историческим для нашей страны. Желаем единства, мира и процветания всем регионам России!\n\n🌊 Крым наш!\n\nС наилучшими пожеланиями,\n🏛️ Календарь праздников`

      case "День славянской письменности и культуры":
        return `Дорогой ${name}!\n\n📜 Поздравляем с Днем славянской письменности и культуры!\n\nВ этот день мы чтим память святых Кирилла и Мефодия, создателей славянской азбуки. Пусть наша культура и язык процветают!\n\n✍️ Слово - великая сила!\n\nС наилучшими пожеланиями,\n📖 Календарь праздников`

      case "День знаний":
        return `Дорогой ${name}!\n\n🎒 Поздравляем с Днем знаний!\n\nПусть новый учебный год принесет интересные открытия, новые знания и верных друзей! Желаем успехов в учебе и творческих достижений!\n\n📚 Знание - сила!\n\nС наилучшими пожеланиями,\n🌟 Календарь праздников`

      case "День учителя":
        return `Дорогой ${name}!\n\n👩‍🏫 Поздравляем с Днем учителя!\n\nСпасибо за ваш благородный труд, терпение и мудрость! Желаем здоровья, вдохновения и благодарных учеников!\n\n📝 Учитель - профессия от Бога!\n\nС наилучшими пожеланиями,\n🍎 Календарь праздников`

      case "День народного единства":
        return `Дорогой ${name}!\n\n🤝 Поздравляем с Днем народного единства!\n\nПусть этот день напоминает о силе единства и сплоченности нашего народа! Желаем мира, согласия и процветания России!\n\n🇷🇺 В единстве наша сила!\n\nС наилучшими пожеланиями,\n🌟 Календарь праздников`

      case "День Конституции Российской Федерации":
        return `Дорогой ${name}!\n\n⚖️ Поздравляем с Днем Конституции РФ!\n\nОсновной закон нашей страны гарантирует права и свободы каждого гражданина. Желаем справедливости, законности и процветания России!\n\n📜 Конституция - основа государства!\n\nС наилучшими пожеланиями,\n🏛️ Календарь праздников`

      default:
        return `Дорогой ${name}!\n\n🎉 Поздравляем с праздником "${holiday.name}"!\n\nСегодня, ${holidayDate}, мы отмечаем этот замечательный день. ${holiday.description || ""}\n\nЖелаем вам радости, счастья и хорошего настроения!\n\nС наилучшими пожеланиями,\n💝 Календарь праздников`
    }
  }

  return `Дорогой ${name}!\n\n🎉 Поздравляем с праздником!\n\nЖелаем всего самого наилучшего!\n\nС наилучшими пожеланиями,\n💝 Календарь праздников`
}

export function EmailPostcardModal({
  open,
  onOpenChange,
  holiday,
  userDate,
  userEmail,
  userName,
  className,
}: EmailPostcardModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [emailSent, setEmailSent] = React.useState(false)
  const [customMessage, setCustomMessage] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  const eventName = holiday?.name || userDate?.name || "праздник"
  const postcardUrl = getPostcardForHoliday(holiday, userDate)
  const defaultGreeting = generateGreetingText(holiday, userDate, userName)

  // Инициализация EmailJS при монтировании компонента
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      initEmailJS()
    }
  }, [])

  // Реальная отправка email через EmailJS
  const sendEmail = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Проверяем, доступен ли EmailJS
      if (typeof window === 'undefined' || !window.emailjs) {
        throw new Error('EmailJS не загружен. Попробуйте обновить страницу.')
      }

      // Подготавливаем данные для отправки
      const emailData: EmailData = {
        to_email: userEmail,
        to_name: userName,
        subject: `Поздравление с ${eventName}`,
        message: customMessage || defaultGreeting,
        postcard_url: postcardUrl,
        event_name: eventName,
        event_date: holiday ? format(holiday.date, "d MMMM yyyy", { locale: ru }) :
                   userDate ? format(userDate.date, "d MMMM yyyy", { locale: ru }) : undefined
      }

      // Отправляем email
      const success = await sendEmailWithEmailJS(emailData)

      if (success) {
        setEmailSent(true)

        // Автоматически закрываем модал через 3 секунды
        setTimeout(() => {
          onOpenChange(false)
          setEmailSent(false)
          setCustomMessage("")
          setError(null)
        }, 3000)
      } else {
        throw new Error('Не удалось отправить email. Проверьте настройки EmailJS.')
      }

    } catch (error) {
      console.error("Ошибка отправки email:", error)
      setError(error instanceof Error ? error.message : 'Произошла ошибка при отправке email')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setEmailSent(false)
    setCustomMessage("")
    setError(null)
  }

  if (emailSent) {
    // Проверяем, настроен ли EmailJS
    const isConfigured = !window.location.href.includes('localhost') ||
                        (typeof window !== 'undefined' &&
                         localStorage.getItem('sentEmails')?.includes('"status":"sent"'))

    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-lg font-semibold mb-2">
              {isConfigured ? "Открытка отправлена!" : "🎭 Демо: Открытка готова к отправке!"}
            </DialogTitle>
            <DialogDescription className="space-y-3">
              {isConfigured ? (
                <>
                  <p>Поздравительная открытка с праздником "{eventName}" была успешно отправлена!</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <Mail className="h-4 w-4" />
                    <span>На ваш email: <strong>{userEmail}</strong></span>
                  </div>
                </>
              ) : (
                <>
                  <p>Открытка с праздником "{eventName}" подготовлена и готова к отправке!</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                    <div className="flex items-center gap-2 text-blue-800 mb-2">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium">Демо-режим</span>
                    </div>
                    <p className="text-blue-700">
                      Для реальной отправки email настройте EmailJS согласно инструкции в файле EMAILJS_SETUP.md
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                    <Mail className="h-4 w-4" />
                    <span>Получатель: <strong>{userEmail}</strong></span>
                  </div>
                </>
              )}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Отправить открытку на почту
          </DialogTitle>
          <DialogDescription>
            Отправим красивую открытку с поздравлением на email из вашего аккаунта
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Информация о получателе */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Отправим на ваш email:</span>
              </div>
              <div className="ml-auto">
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Из аккаунта
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-green-700">
                  {userName?.charAt(0).toUpperCase() || "П"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">{userName}</p>
                <p className="text-xs text-green-600">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Информация о празднике */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              {userDate ? (
                <Heart className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Calendar className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-sm font-medium">Событие:</span>
            </div>
            <p className="text-sm font-medium">{eventName}</p>
            {holiday && (
              <p className="text-xs text-muted-foreground mt-1">
                {format(holiday.date, "d MMMM yyyy", { locale: ru })}
              </p>
            )}
            {userDate && (
              <p className="text-xs text-muted-foreground mt-1">
                {format(userDate.date, "d MMMM yyyy", { locale: ru })}
              </p>
            )}
          </div>

          {/* Превью открытки */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Открытка:</label>
            <div className="aspect-[3/4] max-w-[200px] mx-auto overflow-hidden rounded-lg border">
              <img
                src={postcardUrl}
                alt={`Открытка для ${eventName}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Текст поздравления */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Текст поздравления:
            </label>
            <textarea
              id="message"
              value={customMessage || defaultGreeting}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Введите ваше поздравление..."
            />
          </div>
        </div>

        {/* Отображение ошибок */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">Ошибка отправки</span>
            </div>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <div className="mt-3 text-xs text-red-600">
              💡 <strong>Подсказка:</strong> Для работы email нужно настроить EmailJS.
              <br />Пока что функция работает в демо-режиме.
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleClose}>
            Отмена
          </Button>
          <Button onClick={sendEmail} disabled={isLoading}>
            {isLoading ? (
              <>
                <Mail className="h-4 w-4 mr-2 animate-pulse" />
                Отправляем...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Отправить открытку
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
