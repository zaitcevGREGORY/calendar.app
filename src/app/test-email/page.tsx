"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EMAILJS_CONFIG } from "@/lib/emailjs"

export default function TestEmailPage() {
  const [status, setStatus] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [logs, setLogs] = React.useState<string[]>([])

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
    console.log(message)
  }

  const testEmailJS = async () => {
    setIsLoading(true)
    setLogs([])
    setStatus("")

    try {
      addLog("🔧 Начинаем тестирование EmailJS...")

      // Проверяем конфигурацию
      addLog(`📋 Конфигурация:`)
      addLog(`   SERVICE_ID: ${EMAILJS_CONFIG.SERVICE_ID}`)
      addLog(`   TEMPLATE_ID: ${EMAILJS_CONFIG.TEMPLATE_ID}`)
      addLog(`   PUBLIC_KEY: ${EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 8)}...`)

      // Проверяем загрузку EmailJS
      if (typeof window === 'undefined') {
        throw new Error("Window объект недоступен")
      }

      addLog("🌐 Window объект доступен")

      if (!window.emailjs) {
        addLog("❌ EmailJS не найден в window")
        addLog("⏳ Ждем загрузки EmailJS...")

        // Ждем до 5 секунд
        let attempts = 0
        while (!window.emailjs && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100))
          attempts++
        }

        if (!window.emailjs) {
          throw new Error("EmailJS не загрузился за 5 секунд")
        }
      }

      addLog("✅ EmailJS найден в window")

      // Инициализируем EmailJS
      addLog("🔧 Инициализируем EmailJS...")
      window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
      addLog("✅ EmailJS инициализирован")

      // Подготавливаем минимальные тестовые данные
      const testData = {
        to_name: "Тест",
        message: "Тестовое сообщение"
      }

      addLog("📧 Подготовлены минимальные тестовые данные:")
      addLog(`   Имя: ${testData.to_name}`)
      addLog(`   Сообщение: ${testData.message}`)

      // Отправляем тестовый email
      addLog("📤 Отправляем тестовый email...")

      const result = await window.emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        testData,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      addLog("✅ Email отправлен успешно!")
      addLog(`📊 Результат: ${JSON.stringify(result)}`)
      setStatus("✅ Тест прошел успешно! Email отправлен.")

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка"
      addLog(`❌ Ошибка: ${errorMessage}`)
      setStatus(`❌ Тест не прошел: ${errorMessage}`)

      if (error instanceof Error && error.stack) {
        addLog(`📋 Стек ошибки: ${error.stack}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const clearLogs = () => {
    setLogs([])
    setStatus("")
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🧪 Тестирование EmailJS</CardTitle>
            <CardDescription>
              Диагностика отправки email с вашими ключами
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                onClick={testEmailJS}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "🔄 Тестируем..." : "🚀 Запустить тест"}
              </Button>
              <Button
                onClick={clearLogs}
                variant="outline"
                disabled={isLoading}
              >
                🗑️ Очистить логи
              </Button>
              <Button
                onClick={() => window.location.href = "/"}
                variant="outline"
              >
                ← Назад к календарю
              </Button>
            </div>

            {status && (
              <div className={`p-4 rounded-lg ${
                status.includes("✅")
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}>
                <strong>{status}</strong>
              </div>
            )}
          </CardContent>
        </Card>

        {logs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>📋 Логи тестирования</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>📋 Текущая конфигурация</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-sm">
              <div><strong>SERVICE_ID:</strong> {EMAILJS_CONFIG.SERVICE_ID}</div>
              <div><strong>TEMPLATE_ID:</strong> {EMAILJS_CONFIG.TEMPLATE_ID}</div>
              <div><strong>PUBLIC_KEY:</strong> {EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 10)}...</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>💡 Что проверяет этот тест</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ Загрузка EmailJS библиотеки</li>
              <li>✅ Правильность ваших ключей</li>
              <li>✅ Инициализация EmailJS</li>
              <li>✅ Отправка тестового email</li>
              <li>✅ Обработка ошибок</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Типы для window.emailjs
declare global {
  interface Window {
    emailjs: {
      init: (publicKey: string) => void
      send: (serviceId: string, templateId: string, templateParams: any, publicKey: string) => Promise<any>
    }
  }
}
