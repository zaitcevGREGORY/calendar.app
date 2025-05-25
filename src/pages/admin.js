import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Check, X, AlertTriangle, Users, Calendar, Image, MessageSquare, Mail } from 'lucide-react'

// Временные данные для модерации
const mockModerations = [
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
]

// Временные данные для пользовательских дат на модерации
const mockUserDatesForModeration = [
  {
    id: "3",
    userId: "user2",
    date: new Date(2024, 5, 20),
    name: "День рождения компании",
    description: "Корпоративное мероприятие",
    type: "other",
  },
]

// Временные данные для поздравлений на модерации
const mockGreetingsForModeration = [
  {
    id: "5",
    text: "Поздравляю с днем рождения! Желаю счастья, здоровья и всего самого наилучшего!",
    author: "user2",
  },
]

// Временные данные для пользователей
const mockUsers = [
  {
    id: "user1",
    name: "Иван Иванов",
    email: "ivan@example.com",
    createdAt: new Date(2023, 0, 15),
  },
  {
    id: "user2",
    name: "Мария Петрова",
    email: "maria@example.com",
    createdAt: new Date(2023, 2, 10),
  },
  {
    id: "user3",
    name: "Алексей Сидоров",
    email: "alex@example.com",
    createdAt: new Date(2023, 5, 5),
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('moderation')
  const [pendingModerations, setPendingModerations] = useState(mockModerations)
  const [emailMessage, setEmailMessage] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [emailSent, setEmailSent] = useState(false)
  
  // Обработчик одобрения модерации
  const handleApprove = (moderation) => {
    setPendingModerations(pendingModerations.filter(m => m.id !== moderation.id))
    alert(`Одобрено: ${moderation.entityType} с ID ${moderation.entityId}`)
  }
  
  // Обработчик отклонения модерации
  const handleReject = (moderation) => {
    setPendingModerations(pendingModerations.filter(m => m.id !== moderation.id))
    alert(`Отклонено: ${moderation.entityType} с ID ${moderation.entityId}`)
  }
  
  // Получение данных сущности по типу и ID
  const getEntityData = (entityType, entityId) => {
    if (entityType === "userDate") {
      return mockUserDatesForModeration.find(ud => ud.id === entityId)
    } else if (entityType === "greeting") {
      return mockGreetingsForModeration.find(g => g.id === entityId)
    }
    return null
  }
  
  // Обработчик выбора пользователя для рассылки
  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }
  
  // Обработчик отправки email
  const handleSendEmail = (e) => {
    e.preventDefault()
    // В реальном приложении здесь был бы запрос к API для отправки email
    console.log('Отправка email:', { 
      subject: emailSubject, 
      message: emailMessage, 
      users: selectedUsers.map(id => mockUsers.find(u => u.id === id)) 
    })
    setEmailSent(true)
    
    // Сбросить форму через 3 секунды
    setTimeout(() => {
      setEmailSent(false)
      setEmailSubject('')
      setEmailMessage('')
      setSelectedUsers([])
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
            <h1 className="text-2xl font-bold">Панель администратора</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Левая колонка - Навигация */}
          <div className="space-y-4">
            <button 
              onClick={() => setActiveTab('moderation')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'moderation' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
            >
              <AlertTriangle className="h-4 w-4" />
              Модерация
              {pendingModerations.length > 0 && (
                <span className="ml-auto bg-red-500 text-white rounded-full h-5 min-w-5 px-1 flex items-center justify-center text-xs">
                  {pendingModerations.length}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'users' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
            >
              <Users className="h-4 w-4" />
              Пользователи
            </button>
            
            <button 
              onClick={() => setActiveTab('holidays')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'holidays' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
            >
              <Calendar className="h-4 w-4" />
              Праздники
            </button>
            
            <button 
              onClick={() => setActiveTab('postcards')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'postcards' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
            >
              <Image className="h-4 w-4" />
              Открытки
            </button>
            
            <button 
              onClick={() => setActiveTab('greetings')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'greetings' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
            >
              <MessageSquare className="h-4 w-4" />
              Поздравления
            </button>
            
            <button 
              onClick={() => setActiveTab('email')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'email' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
            >
              <Mail className="h-4 w-4" />
              Рассылка
            </button>
          </div>
          
          {/* Правая колонка - Содержимое */}
          <div className="bg-white rounded-lg border p-6">
            {activeTab === 'moderation' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Модерация контента</h2>
                
                {pendingModerations.length > 0 ? (
                  <div className="space-y-6">
                    {pendingModerations.map(moderation => {
                      const entity = getEntityData(moderation.entityType, moderation.entityId)
                      
                      return (
                        <div key={moderation.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-medium">
                                {moderation.entityType === "userDate" ? "Пользовательская дата" : "Поздравление"}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Создано: {moderation.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                              На модерации
                            </span>
                          </div>
                          
                          {moderation.entityType === "userDate" && entity && (
                            <div className="space-y-2 mb-4">
                              <p><strong>Название:</strong> {entity.name}</p>
                              <p><strong>Дата:</strong> {entity.date.toLocaleDateString()}</p>
                              <p><strong>Описание:</strong> {entity.description || "Нет описания"}</p>
                              <p><strong>Тип:</strong> {entity.type}</p>
                            </div>
                          )}
                          
                          {moderation.entityType === "greeting" && entity && (
                            <div className="space-y-2 mb-4">
                              <p><strong>Текст:</strong> {entity.text}</p>
                              <p><strong>Автор:</strong> {entity.author || "Аноним"}</p>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleReject(moderation)}
                              className="px-4 py-2 border text-red-500 rounded-md hover:bg-red-50 flex items-center gap-2"
                            >
                              <X className="h-4 w-4" />
                              Отклонить
                            </button>
                            <button 
                              onClick={() => handleApprove(moderation)}
                              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2"
                            >
                              <Check className="h-4 w-4" />
                              Одобрить
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Нет контента, требующего модерации
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Управление пользователями</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Имя</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Дата регистрации</th>
                        <th className="px-4 py-2 text-left">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map(user => (
                        <tr key={user.id} className="border-t">
                          <td className="px-4 py-2">{user.name}</td>
                          <td className="px-4 py-2">{user.email}</td>
                          <td className="px-4 py-2">{user.createdAt.toLocaleDateString()}</td>
                          <td className="px-4 py-2">
                            <div className="flex gap-2">
                              <button className="px-2 py-1 text-xs border rounded hover:bg-gray-50">
                                Редактировать
                              </button>
                              <button className="px-2 py-1 text-xs border text-red-500 rounded hover:bg-red-50">
                                Блокировать
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'email' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Рассылка email</h2>
                
                {emailSent && (
                  <div className="mb-6 p-3 bg-green-100 text-green-800 rounded-md">
                    Email успешно отправлен {selectedUsers.length} пользователям!
                  </div>
                )}
                
                <form onSubmit={handleSendEmail}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Выберите получателей
                      </label>
                      <div className="border rounded-md p-4 max-h-40 overflow-y-auto">
                        {mockUsers.map(user => (
                          <div key={user.id} className="flex items-center mb-2 last:mb-0">
                            <input
                              type="checkbox"
                              id={`user-${user.id}`}
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => handleUserSelect(user.id)}
                              className="mr-2"
                            />
                            <label htmlFor={`user-${user.id}`} className="text-sm">
                              {user.name} ({user.email})
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Выбрано пользователей: {selectedUsers.length}
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Тема письма
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Введите тему письма"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Текст сообщения
                      </label>
                      <textarea
                        id="message"
                        value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md min-h-[150px]"
                        placeholder="Введите текст сообщения"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={selectedUsers.length === 0}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Отправить
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {(activeTab === 'holidays' || activeTab === 'postcards' || activeTab === 'greetings') && (
              <div className="text-center py-8 text-muted-foreground">
                Раздел находится в разработке
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
