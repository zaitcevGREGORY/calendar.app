import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Страница не найдена</h2>
        <p className="text-muted-foreground">
          Извините, страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Link href="/">
          <Button className="mt-4">
            <Home className="mr-2 h-4 w-4" />
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  )
}
