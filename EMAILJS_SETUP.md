# 📧 Настройка EmailJS для отправки открыток

## 🚀 Быстрая настройка (5 минут)

### Шаг 1: Регистрация на EmailJS
1. Перейдите на https://www.emailjs.com/
2. Нажмите "Sign Up" и создайте аккаунт
3. Подтвердите email

### Шаг 2: Создание Email Service
1. В панели управления нажмите "Add New Service"
2. Выберите ваш email провайдер (Gmail, Outlook, Yahoo и т.д.)
3. Следуйте инструкциям для подключения
4. Скопируйте **Service ID** (например: `service_abc123`)

### Шаг 3: Создание Email Template
1. Перейдите в раздел "Email Templates"
2. Нажмите "Create New Template"
3. Используйте этот шаблон:

```html
Тема: {{subject}}

Привет {{to_name}}!

{{message}}

---
Открытка: {{postcard_url}}
Событие: {{event_name}}
Дата: {{event_date}}

С наилучшими пожеланиями,
{{from_name}}
```

4. Скопируйте **Template ID** (например: `template_xyz789`)

### Шаг 4: Получение Public Key
1. Перейдите в "Account" → "General"
2. Скопируйте **Public Key** (например: `user_abc123xyz`)

### Шаг 5: Обновление конфигурации
Откройте файл `src/lib/emailjs.ts` и замените демо-ключи:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'ваш_service_id',     // Замените на ваш Service ID
  TEMPLATE_ID: 'ваш_template_id',   // Замените на ваш Template ID  
  PUBLIC_KEY: 'ваш_public_key',     // Замените на ваш Public Key
}
```

## ✅ Проверка работы

1. Перезапустите приложение
2. Войдите в аккаунт в календаре
3. Нажмите "Отправить открытку на почту"
4. Заполните форму и нажмите "Отправить"
5. Проверьте почту (включая спам)

## 🔧 Устранение проблем

### Ошибка "EmailJS не загружен"
- Обновите страницу
- Проверьте интернет-соединение
- Убедитесь, что CDN скрипт загружается

### Email не приходит
- Проверьте спам-папку
- Убедитесь, что Service ID, Template ID и Public Key правильные
- Проверьте настройки email провайдера в EmailJS

### Ошибка отправки
- Проверьте лимиты EmailJS (200 email/месяц на бесплатном плане)
- Убедитесь, что email template содержит все нужные переменные

## 📊 Лимиты бесплатного плана

- ✅ 200 email в месяц
- ✅ Неограниченное количество шаблонов
- ✅ Базовая аналитика
- ✅ Поддержка всех популярных email провайдеров

## 🎯 Готово!

После настройки пользователи смогут получать настоящие email с открытками и поздравлениями! 🎉

---

**Нужна помощь?** 
- Документация EmailJS: https://www.emailjs.com/docs/
- Примеры шаблонов: https://www.emailjs.com/docs/examples/
