import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Download, Share2, X } from 'lucide-react'

// Данные открыток
// В реальном приложении здесь будут настоящие изображения открыток
// Для добавления реальных изображений:
// 1. Загрузите изображения в папку public/images/postcards/
// 2. Используйте пути к изображениям в поле imageUrl
// 3. Изображения должны быть в формате JPG или PNG
// 4. Рекомендуемый размер изображений: 800x600 или 1200x800 пикселей
const mockPostcards = [
  {
    id: "1",
    holidayId: "1",
    imageUrl: "/images/postcards/new-year.jpg",
    title: "С Новым Годом!",
    description: "Поздравляю с Новым Годом! Пусть этот год принесет много счастья, здоровья и радости!",
    tags: ["новый год", "зима", "праздник"],
    textPosition: "center", // положение текста на открытке
    textColor: "text-white", // цвет текста
    textShadow: true // тень для текста
  },
  {
    id: "2",
    holidayId: "2",
    imageUrl: "/images/postcards/defender.jpg",
    title: "С Днем Защитника Отечества!",
    description: "Поздравляю с Днем Защитника Отечества! Желаю мужества, силы и отваги!",
    tags: ["23 февраля", "мужской праздник"],
    textPosition: "bottom", // положение текста на открытке
    textColor: "text-white", // цвет текста
    textShadow: true // тень для текста
  },
  {
    id: "3",
    holidayId: "3",
    imageUrl: "/images/postcards/women-day.jpg",
    title: "С 8 Марта!",
    description: "Поздравляю с Международным женским днем! Желаю красоты, любви и весеннего настроения!",
    tags: ["8 марта", "женский праздник", "весна"],
    textPosition: "bottom", // положение текста на открытке
    textColor: "text-white", // цвет текста
    textShadow: true // тень для текста
  },
  {
    id: "4",
    userDateId: "1",
    imageUrl: "/images/postcards/birthday.jpg",
    title: "С Днем Рождения!",
    description: "Поздравляю с Днем Рождения! Желаю исполнения всех желаний и много радостных моментов!",
    tags: ["день рождения", "поздравление"],
    textPosition: "top", // положение текста на открытке
    textColor: "text-white", // цвет текста
    textShadow: true // тень для текста
  },
  {
    id: "5",
    userDateId: "2",
    imageUrl: "/images/postcards/anniversary.jpg",
    title: "С Годовщиной!",
    description: "Поздравляю с годовщиной! Пусть ваша любовь становится только крепче с каждым годом!",
    tags: ["годовщина", "любовь", "семья"],
    textPosition: "center", // положение текста на открытке
    textColor: "text-white", // цвет текста
    textShadow: true // тень для текста
  },
]

// Функция для получения стилизованного фона открытки
function getPostcardBackground(postcardId) {
  switch(postcardId) {
    case "1": // Новый год
      return "bg-[url('/images/postcards/new-year-placeholder.jpg')] bg-cover bg-center bg-blue-100";
    case "2": // 23 февраля
      return "bg-[url('/images/postcards/defender-placeholder.jpg')] bg-cover bg-center bg-green-100";
    case "3": // 8 марта
      return "bg-[url('/images/postcards/women-day-placeholder.jpg')] bg-cover bg-center bg-pink-100";
    case "4": // День рождения
      return "bg-[url('/images/postcards/birthday-placeholder.jpg')] bg-cover bg-center bg-yellow-100";
    case "5": // Годовщина
      return "bg-[url('/images/postcards/anniversary-placeholder.jpg')] bg-cover bg-center bg-red-100";
    default:
      return "bg-gray-100";
  }
}

export default function PostcardsPage() {
  const [selectedPostcard, setSelectedPostcard] = useState(null)
  const [emailToSend, setEmailToSend] = useState('')
  const [showSendForm, setShowSendForm] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)

  // Обработчик выбора открытки
  const handleSelectPostcard = (postcard) => {
    setSelectedPostcard(postcard)
    setShowSendForm(false)
    setSendSuccess(false)
  }

  // Обработчик закрытия деталей открытки
  const handleClosePostcardDetails = () => {
    setSelectedPostcard(null)
  }

  // Обработчик скачивания открытки
  const handleDownloadPostcard = (postcard) => {
    // В реальном приложении здесь будет логика скачивания
    alert(`Скачивание открытки "${postcard.title}"`)
  }

  // Обработчик шеринга открытки
  const handleSharePostcard = (postcard) => {
    // В реальном приложении здесь будет логика шеринга
    if (navigator.share) {
      navigator.share({
        title: postcard.title,
        text: postcard.description,
        url: window.location.href,
      })
    } else {
      setShowSendForm(true)
    }
  }

  // Обработчик отправки открытки по email
  const handleSendPostcard = (e) => {
    e.preventDefault()

    // В реальном приложении здесь был бы запрос к API для отправки открытки
    // Имитация отправки запроса к API
    console.log('Отправка открытки:', {
      postcard: selectedPostcard,
      email: emailToSend,
      date: new Date().toISOString(),
      message: `Отправлена открытка "${selectedPostcard.title}" на адрес ${emailToSend}`
    })

    // Показываем сообщение об успешной отправке
    setSendSuccess(true)
    setShowSendForm(false)

    // Сбросить форму
    setEmailToSend('')

    // В реальном приложении здесь был бы код для сохранения истории отправленных открыток
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
            <h1 className="text-2xl font-bold">Открытки</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedPostcard ? (
          <div className="max-w-2xl mx-auto">
            {/* Детали открытки */}
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="relative">
                <div className="w-full h-[500px] relative">
                  {/* Стилизованная заглушка для изображения открытки */}
                  <div className={`absolute inset-0 ${getPostcardBackground(selectedPostcard.id)}`}>
                    {/* Здесь будет реальное изображение открытки */}
                  </div>

                  {/* Текст поздравления на открытке */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-${selectedPostcard.textPosition === 'top' ? 'start' : selectedPostcard.textPosition === 'bottom' ? 'end' : 'center'} p-8 text-center`}>
                    <h2 className={`text-4xl font-bold mb-4 ${selectedPostcard.textColor} ${selectedPostcard.textShadow ? 'drop-shadow-lg' : ''}`}>{selectedPostcard.title}</h2>
                    <p className={`text-xl ${selectedPostcard.textColor} ${selectedPostcard.textShadow ? 'drop-shadow-md' : ''}`}>{selectedPostcard.description}</p>
                  </div>
                </div>
                <button
                  onClick={handleClosePostcardDetails}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{selectedPostcard.title}</h2>
                <p className="text-muted-foreground mb-4">{selectedPostcard.description}</p>

                <div className="flex flex-wrap gap-1 mb-6">
                  {selectedPostcard.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {sendSuccess && (
                  <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md flex items-start">
                    <div className="mr-2 mt-0.5">✅</div>
                    <div>
                      <p className="font-medium">Открытка успешно отправлена!</p>
                      <p className="text-sm mt-1">Получатель скоро получит ваше поздравление на указанный email.</p>
                    </div>
                  </div>
                )}

                {showSendForm ? (
                  <form onSubmit={handleSendPostcard} className="mb-4">
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email получателя
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={emailToSend}
                        onChange={(e) => setEmailToSend(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Введите email получателя"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowSendForm(false)}
                        className="px-4 py-2 border rounded-md hover:bg-gray-50"
                      >
                        Отмена
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                      >
                        Отправить
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownloadPostcard(selectedPostcard)}
                      className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Скачать
                    </button>
                    <button
                      onClick={() => handleSharePostcard(selectedPostcard)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      Поделиться
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-6">Галерея открыток</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockPostcards.map(postcard => (
                <div
                  key={postcard.id}
                  className="bg-white rounded-lg border overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectPostcard(postcard)}
                >
                  <div className="relative h-40 w-full">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
                    <div className="absolute bottom-2 left-2 right-2 z-20">
                      <h3 className="text-white font-medium truncate">{postcard.title}</h3>
                    </div>
                    {/* Стилизованная заглушка для изображения открытки */}
                    <div className={`h-40 w-full ${getPostcardBackground(postcard.id)}`}>
                      {/* Здесь будет реальное изображение открытки */}
                    </div>
                  </div>

                  <div className="p-3">
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>© 2024 Календарь праздников. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
