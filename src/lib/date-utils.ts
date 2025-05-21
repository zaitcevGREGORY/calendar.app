import { format, isToday, isTomorrow, isYesterday, addDays, differenceInDays, differenceInYears } from "date-fns"
import { ru } from "date-fns/locale"

/**
 * Форматирует дату в локализованную строку
 */
export function formatDate(date: Date, formatStr: string = "d MMMM yyyy"): string {
  return format(date, formatStr, { locale: ru })
}

/**
 * Возвращает относительную строку для даты (сегодня, завтра, вчера или дата)
 */
export function getRelativeDate(date: Date): string {
  if (isToday(date)) {
    return "Сегодня"
  } else if (isTomorrow(date)) {
    return "Завтра"
  } else if (isYesterday(date)) {
    return "Вчера"
  } else {
    return formatDate(date)
  }
}

/**
 * Возвращает количество дней до даты
 */
export function getDaysUntil(date: Date): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)
  return differenceInDays(date, today)
}

/**
 * Возвращает строку с информацией о том, сколько дней осталось до даты
 */
export function getDaysUntilString(date: Date): string {
  const daysUntil = getDaysUntil(date)
  
  if (daysUntil === 0) {
    return "Сегодня"
  } else if (daysUntil === 1) {
    return "Завтра"
  } else if (daysUntil > 1) {
    return `Через ${daysUntil} ${getDayWord(daysUntil)}`
  } else if (daysUntil === -1) {
    return "Вчера"
  } else {
    return `${Math.abs(daysUntil)} ${getDayWord(Math.abs(daysUntil))} назад`
  }
}

/**
 * Возвращает правильное склонение слова "день" в зависимости от числа
 */
export function getDayWord(days: number): string {
  const lastDigit = days % 10
  const lastTwoDigits = days % 100
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "дней"
  } else if (lastDigit === 1) {
    return "день"
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return "дня"
  } else {
    return "дней"
  }
}

/**
 * Возвращает возраст в годах на основе даты рождения
 */
export function getAge(birthDate: Date): number {
  return differenceInYears(new Date(), birthDate)
}

/**
 * Возвращает строку с информацией о возрасте
 */
export function getAgeString(birthDate: Date): string {
  const age = getAge(birthDate)
  return `${age} ${getYearWord(age)}`
}

/**
 * Возвращает правильное склонение слова "год" в зависимости от числа
 */
export function getYearWord(years: number): string {
  const lastDigit = years % 10
  const lastTwoDigits = years % 100
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "лет"
  } else if (lastDigit === 1) {
    return "год"
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return "года"
  } else {
    return "лет"
  }
}

/**
 * Возвращает ближайшие праздники и важные даты
 */
export function getUpcomingDates<T extends { date: Date }>(dates: T[], limit: number = 5): T[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return dates
    .filter(item => {
      const itemDate = new Date(item.date)
      itemDate.setHours(0, 0, 0, 0)
      return itemDate >= today
    })
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    })
    .slice(0, limit)
}
