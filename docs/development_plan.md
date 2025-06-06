# План разработки веб-приложения "Календарь"

## 1. Настройка проекта (1 неделя)
- [x] Инициализация проекта Next.js с TypeScript
- [x] Настройка Tailwind CSS и shadcn/ui
- [ ] Конфигурация pnpm workspace
- [x] Создание базовой структуры проекта
- [x] Настройка репозитория Git и CI/CD
- [ ] Конфигурация ESLint и Prettier

## 2. Реализация базы данных (2 неделя)
- [ ] Проектирование схемы базы данных в Supabase
- [ ] Создание таблиц:
  - users
  - holiday
  - user_date
  - postcard
  - greeting
  - user_history
  - moderation
- [ ] Настройка миграций базы данных
- [ ] Создание API для CRUD операций

## 3. Разработка бэкенда (3-4 недели)
- [x] Реализация аутентификации (локальная через localStorage)
- [x] Сервис получения данных о праздниках
- [x] Система шаблонов поздравлений
- [x] Управление открытками (галерея и просмотр)
- [x] Управление пользовательскими датами
- [x] Система отправки email через EmailJS
- [ ] Система модерации контента
- [x] Логирование и аналитика (история отправок)

## 4. Разработка фронтенда (5-7 недели)
- [x] Календарь с отображением праздников
- [x] Страница с деталями праздника
- [x] Форма добавления пользовательских дат
- [x] Генератор поздравлений
- [x] Просмотр открыток (галерея и детальный просмотр)
- [x] Функционал "Поделиться"
- [x] Система авторизации (модальное окно)
- [x] Отправка открыток на email
- [x] История отправок email
- [x] Уведомления о праздниках сегодня
- [ ] Профиль пользователя
- [ ] Интерфейс администратора

## 5. Тестирование (8 неделя)
- [ ] Модульное и интеграционное тестирование
- [ ] Сквозное тестирование
- [ ] Тестирование безопасности
- [ ] Тестирование производительности

## 6. Развертывание (9 неделя)
- [ ] Настройка Vercel
- [ ] Развертывание базы данных
- [ ] Настройка мониторинга
- [ ] Подготовка документации

## 7. Дополнительные функции (реализованы)
- [x] Полная база праздников до 2030 года (900+ праздников)
- [x] Интеграция с BonnyCards.ru для открыток
- [x] Персонализированные поздравления для каждого праздника
- [x] Демо-режим для тестирования без настройки
- [x] Диагностическая страница для отладки EmailJS
- [x] Подробная документация по настройке EmailJS
- [x] Адаптивный дизайн для всех устройств
- [x] Сохранение данных в localStorage
- [x] Автоматические уведомления о праздниках

## 8. Пост-релиз
- [ ] Мониторинг производительности
- [ ] Сбор отзывов пользователей
- [ ] Планирование обновлений
- [ ] Поддержка документации