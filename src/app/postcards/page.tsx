"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { PostcardGallery } from "@/components/PostcardGallery"
import { PostcardDetails } from "@/components/PostcardDetails"
import { Postcard } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function PostcardsPage() {
  const searchParams = useSearchParams()
  const holidayId = searchParams.get("holidayId") || undefined
  const userDateId = searchParams.get("userDateId") || undefined
  
  const [selectedPostcard, setSelectedPostcard] = React.useState<Postcard | null>(null)

  // Обработчик выбора открытки
  const handleSelectPostcard = (postcard: Postcard) => {
    setSelectedPostcard(postcard)
  }

  // Обработчик закрытия деталей открытки
  const handleClosePostcardDetails = () => {
    setSelectedPostcard(null)
  }

  // Обработчик скачивания открытки
  const handleDownloadPostcard = (postcard: Postcard) => {
    // В реальном приложении здесь будет логика скачивания
    alert(`Скачивание открытки "${postcard.title}"`)
  }

  // Обработчик шеринга открытки
  const handleSharePostcard = (postcard: Postcard) => {
    // В реальном приложении здесь будет логика шеринга
    if (navigator.share) {
      navigator.share({
        title: postcard.title,
        text: postcard.description,
        url: window.location.href,
      })
    } else {
      alert(`Поделиться открыткой "${postcard.title}"`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Открытки</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedPostcard ? (
          <PostcardDetails
            postcard={selectedPostcard}
            onClose={handleClosePostcardDetails}
            onShare={handleSharePostcard}
            onDownload={handleDownloadPostcard}
            className="mx-auto"
          />
        ) : (
          <PostcardGallery
            holidayId={holidayId}
            userDateId={userDateId}
            onSelectPostcard={handleSelectPostcard}
          />
        )}
      </main>

      <footer className="border-t mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>© 2024 Календарь праздников. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
