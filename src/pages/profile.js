import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Calendar, Bell, Settings, LogOut, Save } from 'lucide-react'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [name, setName] = useState('Пользователь')
  const [email, setEmail] = useState('user@example.com')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [savedMessage, setSavedMessage] = useState('')

  // Обработчик сохранения данных профиля
  const handleSaveProfile = (e) => {
    e.preventDefault()
    // В реальном приложении здесь был бы запрос к API для сохранения данных
    console.log('Сохранение профиля:', { name, email, notificationsEnabled })
    setSavedMessage('Данные профиля успешно сохранены!')

    // Скрыть сообщение через 3 секунды
    setTimeout(() => {
      setSavedMessage('')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5" />
              </button>
            </Link>
            <h1 className="text-2xl font-bold">Профиль</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Левая колонка - Навигация */}
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {name.charAt(0) || 'П'}
              </div>
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-muted-foreground">{email}</p>
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
            >
              <Settings className="h-4 w-4" />
              Настройки профиля
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'notifications' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
            >
              <Bell className="h-4 w-4" />
              Уведомления
            </button>

            <button
              onClick={() => setActiveTab('dates')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'dates' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
            >
              <Calendar className="h-4 w-4" />
              Мои даты
            </button>

            <Link href="/admin">
              <button className="w-full text-left px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100">
                <Settings className="h-4 w-4" />
                Панель администратора
              </button>
            </Link>

            <button className="w-full text-left px-4 py-2 rounded-md flex items-center gap-2 bg-red-500 text-white hover:bg-red-600">
              <LogOut className="h-4 w-4" />
              Выйти
            </button>
          </div>

          {/* Правая колонка - Содержимое */}
          <div className="bg-white rounded-lg border p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Настройки профиля</h2>

                {savedMessage && (
                  <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
                    {savedMessage}
                  </div>
                )}

                <form onSubmit={handleSaveProfile}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Имя
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Введите ваше имя"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email для получения открыток и поздравлений
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Введите ваш email"
                        required
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        На этот адрес будут отправляться открытки и поздравления
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Сохранить изменения
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Настройки уведомлений</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Получать уведомления по email</h3>
                      <p className="text-sm text-muted-foreground">
                        Получать уведомления о праздниках и важных датах
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationsEnabled}
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Напоминания о днях рождения</h3>
                      <p className="text-sm text-muted-foreground">
                        Получать напоминания о днях рождения за 3 дня
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={true} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Напоминания о праздниках</h3>
                      <p className="text-sm text-muted-foreground">
                        Получать напоминания о праздниках за 1 день
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={true} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dates' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Мои важные даты</h2>

                <div className="flex justify-between items-center mb-4">
                  <p className="text-muted-foreground">Всего дат: 2</p>
                  <Link href="/">
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                      Добавить дату
                    </button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">День рождения Ивана</h3>
                        <p className="text-sm text-muted-foreground">15 июля 2024</p>
                      </div>
                      <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs">
                        День рождения
                      </span>
                    </div>
                    <p className="text-sm mt-2">Не забыть купить подарок!</p>
                    <div className="flex gap-2 mt-4">
                      <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">
                        Редактировать
                      </button>
                      <button className="px-3 py-1 border rounded-md text-sm text-red-500 hover:bg-red-50">
                        Удалить
                      </button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Годовщина свадьбы</h3>
                        <p className="text-sm text-muted-foreground">1 сентября 2024</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Годовщина
                      </span>
                    </div>
                    <p className="text-sm mt-2">5 лет вместе</p>
                    <div className="flex gap-2 mt-4">
                      <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">
                        Редактировать
                      </button>
                      <button className="px-3 py-1 border rounded-md text-sm text-red-500 hover:bg-red-50">
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
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
