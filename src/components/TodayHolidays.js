import React, { useState } from 'react';
import Link from 'next/link';
import { Gift, Send } from 'lucide-react';
import { getTodayHolidays } from '../services/holidayService';
import { sendPostcard, getPostcardsForHoliday } from '../services/postcardService';

export default function TodayHolidays({ userEmail }) {
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);
  
  // Получаем праздники на сегодня
  const todayHolidays = getTodayHolidays();
  
  // Если сегодня нет праздников, не отображаем компонент
  if (todayHolidays.length === 0) {
    return null;
  }
  
  // Обработчик отправки открытки
  const handleSendPostcard = async (holidayId) => {
    if (!userEmail) {
      alert('Для отправки открытки необходимо указать email в профиле');
      return;
    }
    
    setSending(true);
    
    try {
      // Получаем открытки для праздника
      const postcards = getPostcardsForHoliday(holidayId);
      
      if (postcards.length > 0) {
        // Отправляем первую открытку из списка
        const result = await sendPostcard(postcards[0].id, userEmail);
        setSendResult(result);
      } else {
        setSendResult({ success: false, message: 'Открытки для этого праздника не найдены' });
      }
    } catch (error) {
      setSendResult({ success: false, message: 'Ошибка при отправке открытки' });
    } finally {
      setSending(false);
    }
  };
  
  return (
    <div className="bg-primary/10 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Сегодняшние праздники</h2>
      
      {sendResult && (
        <div className={`mb-4 p-3 rounded-md ${sendResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {sendResult.message}
        </div>
      )}
      
      <div className="space-y-4">
        {todayHolidays.map(holiday => (
          <div key={holiday.id} className="bg-white rounded-lg border p-4">
            <h3 className="font-medium">{holiday.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{holiday.description}</p>
            
            <div className="flex gap-2 mt-4">
              <Link href={`/postcards?holidayId=${holiday.id}`}>
                <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 flex items-center gap-1">
                  <Gift className="h-3 w-3" />
                  Выбрать открытку
                </button>
              </Link>
              
              <button 
                onClick={() => handleSendPostcard(holiday.id)}
                disabled={sending}
                className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 flex items-center gap-1 disabled:opacity-50"
              >
                <Send className="h-3 w-3" />
                {sending ? 'Отправка...' : 'Отправить открытку'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
