// База данных открыток
const postcards = [
  {
    id: "1",
    holidayId: "1",
    imageUrl: "/images/postcards/new-year.jpg",
    title: "С Новым Годом!",
    description: "Поздравляю с Новым Годом! Пусть этот год принесет много счастья, здоровья и радости!",
    tags: ["новый год", "зима", "праздник"],
    textPosition: "center",
    textColor: "text-white",
    textShadow: true
  },
  {
    id: "2",
    holidayId: "2",
    imageUrl: "/images/postcards/defender.jpg",
    title: "С Днем Защитника Отечества!",
    description: "Поздравляю с Днем Защитника Отечества! Желаю мужества, силы и отваги!",
    tags: ["23 февраля", "мужской праздник"],
    textPosition: "bottom",
    textColor: "text-white",
    textShadow: true
  },
  {
    id: "3",
    holidayId: "3",
    imageUrl: "/images/postcards/women-day.jpg",
    title: "С 8 Марта!",
    description: "Поздравляю с Международным женским днем! Желаю красоты, любви и весеннего настроения!",
    tags: ["8 марта", "женский праздник", "весна"],
    textPosition: "bottom",
    textColor: "text-white",
    textShadow: true
  },
  {
    id: "4",
    userDateId: "1",
    imageUrl: "/images/postcards/birthday.jpg",
    title: "С Днем Рождения!",
    description: "Поздравляю с Днем Рождения! Желаю исполнения всех желаний и много радостных моментов!",
    tags: ["день рождения", "поздравление"],
    textPosition: "top",
    textColor: "text-white",
    textShadow: true
  },
  {
    id: "5",
    userDateId: "2",
    imageUrl: "/images/postcards/anniversary.jpg",
    title: "С Годовщиной!",
    description: "Поздравляю с годовщиной! Пусть ваша любовь становится только крепче с каждым годом!",
    tags: ["годовщина", "любовь", "семья"],
    textPosition: "center",
    textColor: "text-white",
    textShadow: true
  },
];

/**
 * Получить все открытки
 * @returns {Array} Массив всех открыток
 */
export function getAllPostcards() {
  return postcards;
}

/**
 * Получить открытку по ID
 * @param {string} id - ID открытки
 * @returns {Object|null} Открытка или null, если не найдена
 */
export function getPostcardById(id) {
  return postcards.find(postcard => postcard.id === id) || null;
}

/**
 * Получить открытки для праздника
 * @param {string} holidayId - ID праздника
 * @returns {Array} Массив открыток для указанного праздника
 */
export function getPostcardsForHoliday(holidayId) {
  return postcards.filter(postcard => postcard.holidayId === holidayId);
}

/**
 * Отправить открытку по email
 * @param {string} postcardId - ID открытки
 * @param {string} email - Email получателя
 * @param {string} message - Дополнительное сообщение
 * @returns {Promise} Промис с результатом отправки
 */
export async function sendPostcard(postcardId, email, message = '') {
  // В реальном приложении здесь был бы запрос к API для отправки открытки
  console.log('Отправка открытки:', { postcardId, email, message, date: new Date().toISOString() });
  
  // Имитация задержки запроса
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Открытка успешно отправлена' });
    }, 1000);
  });
}

/**
 * Отправить открытки для сегодняшних праздников
 * @param {Array} holidays - Массив праздников
 * @param {string} email - Email получателя
 * @returns {Promise} Промис с результатом отправки
 */
export async function sendPostcardsForTodayHolidays(holidays, email) {
  const results = [];
  
  for (const holiday of holidays) {
    if (holiday.postcardId) {
      const postcard = getPostcardById(holiday.postcardId);
      if (postcard) {
        const message = `Автоматическая отправка открытки для праздника: ${holiday.name}`;
        const result = await sendPostcard(postcard.id, email, message);
        results.push({
          holiday: holiday.name,
          result
        });
      }
    }
  }
  
  return results;
}
