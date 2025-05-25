// EmailJS конфигурация для отправки email
// Для работы нужно зарегистрироваться на https://www.emailjs.com/

// EmailJS ключи
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_a7kx879', // Ваш Service ID
  TEMPLATE_ID: 'template_6q514ax', // Новый простой шаблон
  PUBLIC_KEY: 'dDVSkr1sptkdTxwuc', // Ваш Public Key
}

// Интерфейс для данных email
export interface EmailData {
  to_email: string
  to_name: string
  subject: string
  message: string
  postcard_url: string
  event_name: string
  event_date?: string
}

// Функция отправки email через EmailJS
export const sendEmailWithEmailJS = async (emailData: EmailData): Promise<boolean> => {
  try {
    console.log('🚀 Начинаем отправку email с ключами:', {
      SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
      TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
      PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 5) + '...'
    })

    // Проверяем, загружен ли EmailJS
    if (typeof window === 'undefined' || !window.emailjs) {
      console.error('❌ EmailJS не загружен')
      throw new Error('EmailJS не загружен. Обновите страницу и попробуйте снова.')
    }

    console.log('✅ EmailJS загружен, подготавливаем параметры...')

    // Подготавливаем параметры для шаблона
    const templateParams = {
      to_email: emailData.to_email,
      to_name: emailData.to_name,
      subject: emailData.subject,
      message: emailData.message,
      postcard_url: emailData.postcard_url,
      event_name: emailData.event_name,
      event_date: emailData.event_date || '',
      from_name: 'Календарь праздников',
      reply_to: 'noreply@calendar-app.ru'
    }

    console.log('📧 Параметры для отправки:', templateParams)

    // Реальная отправка email
    console.log('📤 Отправляем email через EmailJS...')
    const result = await window.emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    )

    console.log('✅ Email отправлен успешно! Результат:', result)

    // Сохраняем успешную отправку
    const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]')
    sentEmails.push({
      ...emailData,
      timestamp: new Date().toISOString(),
      status: 'sent',
      emailjs_result: result
    })
    localStorage.setItem('sentEmails', JSON.stringify(sentEmails))

    return true

  } catch (error) {
    console.error('❌ Ошибка отправки email:', error)

    // Детальная информация об ошибке
    if (error instanceof Error) {
      console.error('Сообщение ошибки:', error.message)
      console.error('Стек ошибки:', error.stack)
    }

    // Сохраняем ошибку для анализа
    if (typeof window !== 'undefined') {
      const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]')
      sentEmails.push({
        ...emailData,
        timestamp: new Date().toISOString(),
        status: 'error',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      })
      localStorage.setItem('sentEmails', JSON.stringify(sentEmails))
    }

    return false
  }
}

// Функция инициализации EmailJS
export const initEmailJS = () => {
  if (typeof window !== 'undefined') {
    console.log('🔧 Инициализация EmailJS...')

    if (window.emailjs) {
      console.log('✅ EmailJS найден, инициализируем с ключом:', EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 5) + '...')
      window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
      console.log('✅ EmailJS успешно инициализирован!')
    } else {
      console.error('❌ EmailJS не найден в window объекте')
      console.log('Попробуем загрузить EmailJS через несколько секунд...')

      // Попробуем еще раз через 2 секунды
      setTimeout(() => {
        if (window.emailjs) {
          console.log('✅ EmailJS загружен с задержкой, инициализируем...')
          window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
          console.log('✅ EmailJS успешно инициализирован с задержкой!')
        } else {
          console.error('❌ EmailJS так и не загрузился')
        }
      }, 2000)
    }
  }
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
