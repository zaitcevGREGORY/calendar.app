"use client"

import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold">Календарь праздников</h1>
        <p className="text-muted-foreground">
          Простая тестовая страница
        </p>
        <div className="flex flex-col gap-2 mt-4">
          <Link href="/profile" className="text-primary hover:underline">
            Профиль
          </Link>
          <Link href="/postcards" className="text-primary hover:underline">
            Открытки
          </Link>
          <Link href="/admin" className="text-primary hover:underline">
            Админ-панель
          </Link>
        </div>
      </div>
    </div>
  )
}
