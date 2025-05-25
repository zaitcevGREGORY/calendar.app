import React, { useState } from 'react'
import Link from 'next/link'
import { Calendar, Gift, User, Settings, Mail } from 'lucide-react'

// Данные о праздниках
const allHolidays = [
  // Государственные праздники
  {
    id: "1",
    name: "Новый Год",
    date: new Date(2024, 11, 31),
    description: "Главный праздник года",
    type: "public",
    category: "major"
  },
  {
    id: "2",
    name: "День Защитника Отечества",
    date: new Date(2024, 1, 23),
    description: "Праздник мужества и отваги",
    type: "public",
    category: "major"
  },
  {
    id: "3",
    name: "Международный женский день",
    date: new Date(2024, 2, 8),
    description: "Праздник весны и женственности",
    type: "public",
    category: "major"
  },
  {
    id: "4",
    name: "День России",
    date: new Date(2024, 5, 12),
    description: "Государственный праздник Российской Федерации",
    type: "public",
    category: "major"
  },
  {
    id: "5",
    name: "День народного единства",
    date: new Date(2024, 10, 4),
    description: "Праздник единства и согласия",
    type: "public",
    category: "major"
  },

  // Профессиональные праздники
  {
    id: "6",
    name: "День учителя",
    date: new Date(2024, 9, 5),
    description: "Праздник работников сферы образования",
    type: "professional",
    category: "medium"
  },
  {
    id: "7",
    name: "День медицинского работника",
    date: new Date(2024, 5, 16),
    description: "Праздник работников здравоохранения",
    type: "professional",
    category: "medium"
  },
  {
    id: "8",
    name: "День программиста",
    date: new Date(2024, 8, 13),
    description: "Праздник специалистов в области IT",
    type: "professional",
    category: "medium"
  },

  // Международные праздники
  {
    id: "9",
    name: "День святого Валентина",
    date: new Date(2024, 1, 14),
    description: "Праздник всех влюбленных",
    type: "international",
    category: "medium"
  },
  {
    id: "10",
    name: "Международный день защиты детей",
    date: new Date(2024, 5, 1),
    description: "Праздник детства и защиты прав детей",
    type: "international",
    category: "medium"
  },

  // Народные и религиозные праздники
  {
    id: "11",
    name: "Масленица",
    date: new Date(2024, 2, 2),
    description: "Народный праздник проводов зимы",
    type: "folk",
    category: "medium"
  },
  {
    id: "12",
    name: "Пасха",
    date: new Date(2024, 4, 5),
    description: "Главный православный праздник",
    type: "religious",
    category: "major"
  },

  // Необычные праздники
  {
    id: "13",
    name: "День кошек",
    date: new Date(2024, 2, 1),
    description: "Праздник любителей кошек",
    type: "unusual",
    category: "minor"
  },
  {
    id: "14",
    name: "День смеха",
    date: new Date(2024, 3, 1),
    description: "День шуток и розыгрышей",
    type: "unusual",
    category: "minor"
  },
  {
    id: "15",
    name: "День космонавтики",
    date: new Date(2024, 3, 12),
    description: "Праздник в честь первого полета человека в космос",
    type: "public",
    category: "medium"
  }
]

// Получаем ближайшие праздники (сортировка по дате)
const upcomingHolidays = [...allHolidays]
  .sort((a, b) => {
    // Получаем даты праздников относительно текущего года
    const today = new Date()
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)

    // Устанавливаем текущий год
    aDate.setFullYear(today.getFullYear())
    bDate.setFullYear(today.getFullYear())

    // Если праздник уже прошел в этом году, добавляем год
    if (aDate < today) aDate.setFullYear(today.getFullYear() + 1)
    if (bDate < today) bDate.setFullYear(today.getFullYear() + 1)

    // Сортируем по дате
    return aDate - bDate
  })
  .slice(0, 5) // Берем только 5 ближайших праздников

export default function Home() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Обработчик подписки на рассылку
  const handleSubscribe = (e) => {
    e.preventDefault()
    // В реальном приложении здесь был бы запрос к API для подписки
    console.log('Подписка на рассылку:', email)
    setSubscribed(true)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Календарь праздников</h1>
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <button className="p-2 rounded-full hover:bg-gray-100" title="Профиль">
                <User className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Главный баннер */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Не пропустите важные даты</h2>
            <p className="text-lg mb-6">
              Календарь праздников поможет вам не забыть о важных датах и создать красивые поздравления для ваших близких.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/postcards">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Открытки и поздравления
                </button>
              </Link>
              <Link href="/profile">
                <button className="px-6 py-3 border rounded-md hover:bg-gray-50 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Мои важные даты
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
          {/* Левая колонка - Ближайшие праздники */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Ближайшие праздники</h2>

            <div className="space-y-4">
              {upcomingHolidays.map(holiday => (
                <div key={holiday.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{holiday.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {holiday.date.toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {holiday.type === "public" ? "Государственный" : "Другой"}
                    </span>
                  </div>
                  <p className="text-sm mt-2">{holiday.description}</p>
                  <div className="flex gap-2 mt-4">
                    <Link href={`/postcards?holidayId=${holiday.id}`}>
                      <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 flex items-center gap-1">
                        <Gift className="h-3 w-3" />
                        Выбрать открытку
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/calendar">
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                  Посмотреть все праздники
                </button>
              </Link>
            </div>
          </div>

          {/* Правая колонка - Боковая панель */}
          <div className="space-y-8">
            {/* Блок подписки */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Подписка на уведомления</h3>

              {subscribed ? (
                <div className="p-3 bg-green-100 text-green-800 rounded-md">
                  Спасибо за подписку! Мы будем отправлять вам уведомления о праздниках.
                </div>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <p className="text-sm text-muted-foreground mb-4">
                    Получайте уведомления о предстоящих праздниках и важных датах
                  </p>
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Введите ваш email"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center justify-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Подписаться
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Блок с ссылками */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Полезные ссылки</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/profile" className="text-primary hover:underline flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Мой профиль
                  </Link>
                </li>
                <li>
                  <Link href="/postcards" className="text-primary hover:underline flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    Галерея открыток
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-primary hover:underline flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Панель администратора
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">© 2024 Календарь праздников. Все права защищены.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                О нас
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
