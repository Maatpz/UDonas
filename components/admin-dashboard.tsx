"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, LogOut } from "lucide-react"
import type { JWTPayload } from "@/lib/auth"

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
}

interface AdminDashboardProps {
  initialProducts: Product[]
  admin: JWTPayload
}

export default function AdminDashboard({ initialProducts, admin }: AdminDashboardProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image_url: "",
    description: "",
    category: "",
  })

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || "Upload failed")
      }

      const data = await response.json()
      setFormData((prev) => ({ ...prev, image_url: data.url }))
    } catch (error) {
      console.error("Error uploading image:", error)
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      alert(
        `Erro ao fazer upload da imagem: ${errorMessage}\n\nDica: Você pode usar uma URL de imagem direta (ex: https://exemplo.com/imagem.jpg)`,
      )
    } finally {
      setUploadingImage(false)
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: Number.parseFloat(formData.price),
          image_url: formData.image_url,
          description: formData.description || null,
          category: formData.category || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || "Falha ao adicionar produto")
      }

      const { product } = await response.json()
      setProducts([product, ...products])
      setFormData({ name: "", price: "", image_url: "", description: "", category: "" })
      setIsAddDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error adding product:", error)
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      alert(`Erro ao adicionar produto: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    setIsLoading(true)

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: Number.parseFloat(formData.price),
          image_url: formData.image_url,
          description: formData.description || null,
          category: formData.category || null, 
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || "Falha ao atualizar produto")
      }

      const { product } = await response.json()
      setProducts(products.map((p) => (p.id === editingProduct.id ? product : p)))
      setFormData({ name: "", price: "", image_url: "", description: "", category: "" })
      setEditingProduct(null)
      setIsEditDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error updating product:", error)
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      alert(`Erro ao atualizar produto: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || "Falha ao deletar produto")
      }

      setProducts(products.filter((p) => p.id !== id))
      router.refresh()
    } catch (error) {
      console.error("Error deleting product:", error)
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      alert(`Erro ao excluir produto: ${errorMessage}`)
    }
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image_url: product.image_url,
      description: product.description || "",
      category: product.category || "", 
    })
    setIsEditDialogOpen(true)
  }

  const getCategoryLabel = (category: string | null) => {
    if (!category) return null
    const found = CATEGORY_OPTIONS.find((c) => c.value === category)
    return found ? found.label : category
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-purple-600">Painel Administrativo</h1>
            <p className="text-sm text-gray-600">{admin.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Produtos ({products.length})</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4" />
                Adicionar Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Produto</DialogTitle>
                <DialogDescription>Preencha os dados do novo produto</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Imagem</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                  </div>
                  <div className="text-sm text-gray-600">Ou use uma URL de imagem:</div>
                  <Input
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                  {formData.image_url && (
                    <img
                      src={formData.image_url || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isLoading || uploadingImage}
                >
                  {isLoading ? "Adicionando..." : "Adicionar Produto"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader className="p-0">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
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
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 bg-transparent"
                    onClick={() => openEditDialog(product)}
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Produto</DialogTitle>
              <DialogDescription>Atualize os dados do produto</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditProduct} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome do Produto</Label>
                <Input
                  id="edit-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Preço (R$)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Imagem</Label>
                <div className="flex gap-2">
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </div>
                <div className="text-sm text-gray-600">Ou use uma URL de imagem:</div>
                <Input
                  placeholder="https://exemplo.com/imagem.jpg"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
                {formData.image_url && (
                  <img
                    src={formData.image_url || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isLoading || uploadingImage}
              >
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
