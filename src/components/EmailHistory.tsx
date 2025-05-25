"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, Clock, Eye, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

interface EmailHistoryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SentEmail {
  to_email: string
  to_name: string
  subject: string
  message: string
  postcard_url: string
  event_name: string
  event_date?: string
  timestamp: string
  status: 'demo' | 'sent'
  emailjs_result?: any
}

export function EmailHistory({ open, onOpenChange }: EmailHistoryProps) {
  const [sentEmails, setSentEmails] = React.useState<SentEmail[]>([])
  const [selectedEmail, setSelectedEmail] = React.useState<SentEmail | null>(null)

  // Загружаем историю отправок
  React.useEffect(() => {
    if (open) {
      const emails = JSON.parse(localStorage.getItem('sentEmails') || '[]')
      setSentEmails(emails.reverse()) // Показываем новые сначала
    }
  }, [open])

  // Очистка истории
  const clearHistory = () => {
    localStorage.removeItem('sentEmails')
    setSentEmails([])
  }

  // Просмотр деталей email
  const viewEmail = (email: SentEmail) => {
    setSelectedEmail(email)
  }

  if (selectedEmail) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Детали отправки
            </DialogTitle>
            <DialogDescription>
              Подробная информация об отправленной открытке
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Статус */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${selectedEmail.status === 'sent' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
              <span className="text-sm font-medium">
                {selectedEmail.status === 'sent' ? '✅ Отправлено' : '🎭 Демо-режим'}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                {format(new Date(selectedEmail.timestamp), "d MMMM yyyy, HH:mm", { locale: ru })}
              </span>
            </div>

            {/* Получатель */}
            <div className="bg-muted/50 rounded-lg p-3">
              <h4 className="text-sm font-medium mb-2">Получатель:</h4>
              <p className="text-sm"><strong>{selectedEmail.to_name}</strong></p>
              <p className="text-xs text-muted-foreground">{selectedEmail.to_email}</p>
            </div>

            {/* Событие */}
            <div className="bg-muted/50 rounded-lg p-3">
              <h4 className="text-sm font-medium mb-2">Событие:</h4>
              <p className="text-sm font-medium">{selectedEmail.event_name}</p>
              {selectedEmail.event_date && (
                <p className="text-xs text-muted-foreground">{selectedEmail.event_date}</p>
              )}
            </div>

            {/* Открытка */}
            <div className="bg-muted/50 rounded-lg p-3">
              <h4 className="text-sm font-medium mb-2">Открытка:</h4>
              <div className="aspect-[3/4] max-w-[200px] mx-auto overflow-hidden rounded-lg border">
                <img
                  src={selectedEmail.postcard_url}
                  alt={`Открытка для ${selectedEmail.event_name}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Сообщение */}
            <div className="bg-muted/50 rounded-lg p-3">
              <h4 className="text-sm font-medium mb-2">Текст поздравления:</h4>
              <div className="text-xs text-muted-foreground whitespace-pre-line max-h-32 overflow-y-auto">
                {selectedEmail.message}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setSelectedEmail(null)}>
              ← Назад к списку
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Закрыть
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            История отправок
          </DialogTitle>
          <DialogDescription>
            Все отправленные открытки и поздравления
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {sentEmails.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Пока нет отправленных открыток</p>
              <p className="text-xs text-muted-foreground mt-2">
                Отправьте первую открытку, и она появится здесь
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Всего отправок: {sentEmails.length}
                </p>
                <Button variant="outline" size="sm" onClick={clearHistory}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Очистить историю
                </Button>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {sentEmails.map((email, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${email.status === 'sent' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{email.event_name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        Для: {email.to_name} ({email.to_email})
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(email.timestamp), "d MMM yyyy, HH:mm", { locale: ru })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        email.status === 'sent' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {email.status === 'sent' ? 'Отправлено' : 'Демо'}
                      </span>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewEmail(email)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
