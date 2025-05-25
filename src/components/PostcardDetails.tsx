"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Postcard } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Download, Share2 } from "lucide-react"

interface PostcardDetailsProps {
  postcard: Postcard
  onClose?: () => void
  onShare?: (postcard: Postcard) => void
  onDownload?: (postcard: Postcard) => void
  className?: string
}

export function PostcardDetails({
  postcard,
  onClose,
  onShare,
  onDownload,
  className
}: PostcardDetailsProps) {
  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle>{postcard.title}</CardTitle>
        <CardDescription>
          Открытка для особого случая
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-60 w-full rounded-md overflow-hidden">
          {/* Заглушка для изображения, так как у нас нет реальных изображений */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <span className="text-primary-foreground font-medium">Изображение открытки</span>
          </div>
        </div>
        
        {postcard.description && (
          <div>
            <h3 className="text-sm font-medium mb-1">Описание</h3>
            <p className="text-sm text-muted-foreground">{postcard.description}</p>
          </div>
        )}
        
        <div>
          <h3 className="text-sm font-medium mb-1">Теги</h3>
          <div className="flex flex-wrap gap-1">
            {postcard.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Закрыть
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onShare?.(postcard)}
            title="Поделиться"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="default"
            onClick={() => onDownload?.(postcard)}
          >
            <Download className="h-4 w-4 mr-2" />
            Скачать
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
