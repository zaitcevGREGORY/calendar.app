"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Mail, User, Eye, EyeOff } from "lucide-react"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogin: (userData: UserData) => void
  className?: string
}

export interface UserData {
  name: string
  email: string
  isLoggedIn: boolean
}

export function AuthModal({
  open,
  onOpenChange,
  onLogin,
  className,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = React.useState(true)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = React.useState(false)

  // Валидация email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Валидация формы
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email обязателен"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Некорректный email"
    }

    if (!isLogin && !formData.name) {
      newErrors.name = "Имя обязательно"
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен"
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов"
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Сохраняем данные пользователя в localStorage
      const userData: UserData = {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        isLoggedIn: true
      }
      
      localStorage.setItem('userData', JSON.stringify(userData))
      
      onLogin(userData)
      onOpenChange(false)
      
      // Сброс формы
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      })
      setErrors({})
      
    } catch (error) {
      setErrors({ general: "Произошла ошибка. Попробуйте снова." })
    } finally {
      setIsLoading(false)
    }
  }

  // Обработка изменения полей
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Очищаем ошибку для поля при изменении
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isLogin ? "Вход в аккаунт" : "Регистрация"}
          </DialogTitle>
          <DialogDescription>
            {isLogin 
              ? "Войдите в свой аккаунт, чтобы получать открытки на почту"
              : "Создайте аккаунт, чтобы получать открытки на почту"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Поле Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.email && "border-red-500"
                )}
                placeholder="your@email.com"
                required
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Поле Имя (только для регистрации) */}
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Имя
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    errors.name && "border-red-500"
                  )}
                  placeholder="Ваше имя"
                  required={!isLogin}
                />
              </div>
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
          )}

          {/* Поле Пароль */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Пароль
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.password && "border-red-500"
                )}
                placeholder="Минимум 6 символов"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Подтверждение пароля (только для регистрации) */}
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Подтвердите пароль
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.confirmPassword && "border-red-500"
                )}
                placeholder="Повторите пароль"
                required={!isLogin}
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* Общая ошибка */}
          {errors.general && (
            <p className="text-sm text-red-500 text-center">{errors.general}</p>
          )}

          {/* Кнопки */}
          <div className="space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Загрузка..." : (isLogin ? "Войти" : "Зарегистрироваться")}
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary underline"
              >
                {isLogin 
                  ? "Нет аккаунта? Зарегистрируйтесь"
                  : "Уже есть аккаунт? Войдите"
                }
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
