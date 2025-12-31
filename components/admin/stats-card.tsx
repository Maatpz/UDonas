"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Eye } from "lucide-react"

interface StatsCardProps {
  dailyViews: number
}

export function StatsCard({ dailyViews }: StatsCardProps) {
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <Eye className="h-6 w-6" />
          </div>
          <div>
         
            <p className="text-sm font-medium opacity-90">Total de Acessos do Dia</p>
            <p className="text-3xl font-bold">{dailyViews} visitas</p>
            <p className="text-xs opacity-75 mt-1">Hoje: {new Date().toLocaleDateString("pt-BR")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
