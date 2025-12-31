"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

const CATEGORY_OPTIONS = [
  { value: "vestido", label: "Vestido" },
  { value: "saia", label: "Saia" },
  { value: "blusa", label: "Blusa" },
  { value: "body", label: "Body" },
  { value: "calcinha", label: "Calcinha" },
  { value: "conjunto", label: "Conjunto" },
  { value: "calca", label: "Calça" },
  { value: "short", label: "Short" },
  { value: "macaquinho", label: "Macaquinho" },
  { value: "cropped", label: "Cropped" },
]

interface Product {
  id: string
  name: string
  price: number
  image_url: string
  description: string | null
  category: string | null
  active: boolean
}

interface ProductCardProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  onToggleActive: (id: string, currentActive: boolean) => void
}

export function ProductCard({ product, onEdit, onDelete, onToggleActive }: ProductCardProps) {
  const getCategoryLabel = (category: string | null) => {
    if (!category) return null
    const found = CATEGORY_OPTIONS.find((c) => c.value === category)
    return found ? found.label : category
  }

  return (
    <Card className={!product.active ? "opacity-60 border-gray-300" : ""}>
      {/* Card individual de produto com imagem, informações e ações */}
      <CardHeader className="p-0 relative">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2">
          {product.active ? (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">Ativo</span>
          ) : (
            <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">Inativo</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-1">{product.name}</CardTitle>
        {product.category && (
          <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full mb-2">
            {getCategoryLabel(product.category)}
          </span>
        )}
        <CardDescription className="mb-4">{product.description}</CardDescription>
        <p className="text-xl font-bold text-purple-600 mb-4">R$ {Number(product.price).toFixed(2)}</p>

        {/* Botões de ação: Ativar/Desativar, Editar, Excluir */}
        <div className="flex gap-2 mb-2">
          <Button
            variant="outline"
            size="sm"
            className={`flex-1 gap-2 ${product.active ? "bg-gray-100" : "bg-green-50 border-green-300 text-green-700 hover:bg-green-100"}`}
            onClick={() => onToggleActive(product.id, product.active)}
          >
            {product.active ? "Desativar" : "Ativar"}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent" onClick={() => onEdit(product)}>
            <Pencil className="h-4 w-4" />
            Editar
          </Button>
          <Button variant="destructive" size="sm" className="flex-1 gap-2" onClick={() => onDelete(product.id)}>
            <Trash2 className="h-4 w-4" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
