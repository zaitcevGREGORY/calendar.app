// База данных праздников
const holidays = [
  // Государственные праздники
  {
    id: "1",
    name: "Новый Год",
    month: 0, // Январь (0-11)
    day: 1,
    description: "Главный праздник года",
    type: "public",
    category: "major",
    postcardId: "1" // ID открытки для этого праздника
  },
  {
    id: "2",
    name: "День Защитника Отечества",
    month: 1, // Февраль
    day: 23,
    description: "Праздник мужества и отваги",
    type: "public",
    category: "major",
    postcardId: "2"
  },
  {
    id: "3",
    name: "Международный женский день",
    month: 2, // Март
    day: 8,
    description: "Праздник весны и женственности",
    type: "public",
    category: "major",
    postcardId: "3"
  },
  {
    id: "4",
    name: "День России",
    month: 5, // Июнь
    day: 12,
    description: "Государственный праздник Российской Федерации",
    type: "public",
    category: "major"
  },
  {
    id: "5",
    name: "День народного единства",
    month: 10, // Ноябрь
    day: 4,
    description: "Праздник единства и согласия",
    type: "public",
    category: "major"
  },
  
  // Профессиональные праздники
  {
    id: "6",
    name: "День учителя",
    month: 9, // Октябрь
    day: 5,
    description: "Праздник работников сферы образования",
    type: "professional",
    category: "medium"
  },
  {
    id: "7",
    name: "День медицинского работника",
    month: 5, // Июнь
    day: 16,
    description: "Праздник работников здравоохранения",
    type: "professional",
    category: "medium"
  },
  {
    id: "8",
    name: "День программиста",
    month: 8, // Сентябрь
    day: 13, // 256-й день года (примерно 13 сентября)
    description: "Праздник специалистов в области IT",
    type: "professional",
    category: "medium"
  },
  
  // Международные праздники
  {
    id: "9",
    name: "День святого Валентина",
    month: 1, // Февраль
    day: 14,
    description: "Праздник всех влюбленных",
    type: "international",
    category: "medium"
  },
  {
    id: "10",
    name: "Международный день защиты детей",
    month: 5, // Июнь
    day: 1,
    description: "Праздник детства и защиты прав детей",
    type: "international",
    category: "medium"
  },
  
  // Необычные праздники
  {
    id: "13",
    name: "День кошек",
    month: 2, // Март
    day: 1,
    description: "Праздник любителей кошек",
    type: "unusual",
    category: "minor"
  },
  {
    id: "14",
    name: "День смеха",
    month: 3, // Апрель
    day: 1,
    description: "День шуток и розыгрышей",
    type: "unusual",
    category: "minor"
  },
  {
    id: "15",
    name: "День космонавтики",
    month: 3, // Апрель
    day: 12,
    description: "Праздник в честь первого полета человека в космос",
    type: "public",
    category: "medium"
  }
];

/**
 * Получить все праздники
 * @returns {Array} Массив всех праздников
 */
export function getAllHolidays() {
  return holidays;
}

/**
 * Получить праздники на сегодня
 * @returns {Array} Массив праздников, которые отмечаются сегодня
 */
export function getTodayHolidays() {
  const today = new Date();
  const month = today.getMonth(); // 0-11
  const day = today.getDate();
  
  return holidays.filter(holiday => 
    holiday.month === month && holiday.day === day
  );
}

/**
 * Получить праздники на определенную дату
 * @param {Date} date - Дата для проверки
 * @returns {Array} Массив праздников на указанную дату
 */
export function getHolidaysForDate(date) {
  const month = date.getMonth(); // 0-11
  const day = date.getDate();
  
  return holidays.filter(holiday => 
    holiday.month === month && holiday.day === day
  );
}

/**
 * Получить ближайшие праздники
 * @param {number} count - Количество праздников для возврата
 * @returns {Array} Массив ближайших праздников
 */
export function getUpcomingHolidays(count = 5) {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // Создаем копию праздников с датами на текущий год
  const holidaysWithDates = holidays.map(holiday => {
    const holidayDate = new Date(currentYear, holiday.month, holiday.day);
    
    // Если праздник уже прошел в этом году, устанавливаем дату на следующий год
    if (holidayDate < today) {
      holidayDate.setFullYear(currentYear + 1);
    }
    
    return {
      ...holiday,
      date: holidayDate
    };
  });
  
  // Сортируем по дате и берем указанное количество
  return holidaysWithDates
    .sort((a, b) => a.date - b.date)
    .slice(0, count);
}

/**
 * Получить праздник по ID
 * @param {string} id - ID праздника
 * @returns {Object|null} Праздник или null, если не найден
 */
export function getHolidayById(id) {
  return holidays.find(holiday => holiday.id === id) || null;
}
