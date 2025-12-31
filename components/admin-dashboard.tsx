"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, LogOut } from "lucide-react"
import type { JWTPayload } from "@/lib/auth"
import { StatsCard } from "@/components/admin/stats-card"
import { CategoryFilter } from "@/components/admin/category-filter"
import { ProductCard } from "@/components/admin/product-card"
import { ProductFormFields } from "@/components/admin/product-form-fields"

interface Product {
  id: string
  name: string
  price: number
  image_url: string
  description: string | null
  category: string | null
  active: boolean
  sizes: string[]
  colors: string[]
  shopee_url: string | null 
}

interface AdminDashboardProps {
  initialProducts: Product[]
  admin: JWTPayload
}

export default function AdminDashboard({ initialProducts, admin }: AdminDashboardProps) {
  
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [dailyViews, setDailyViews] = useState<number>(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
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
    active: true,
    sizes: ["Único"],
    colors: [] as string[],
    shopee_url: "", 
  })

  const [colorInput, setColorInput] = useState("")

  // Funções de autenticação e navegação
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Funções de gerenciamento de imagens
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
      alert(`Erro ao fazer upload da imagem: ${errorMessage}`)
    } finally {
      setUploadingImage(false)
    }
  }

  // Funções de CRUD de produtos
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
          active: formData.active,
          sizes: formData.sizes,
          colors: formData.colors,
          shopee_url: formData.shopee_url || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || "Failed to add product")
      }

      const { product } = await response.json()
      setProducts([product, ...products])
      setFormData({
        name: "",
        price: "",
        image_url: "",
        description: "",
        category: "",
        active: true,
        sizes: ["Único"],
        colors: [],
        shopee_url: "", 
      })
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
          active: formData.active,
          sizes: formData.sizes,
          colors: formData.colors,
          shopee_url: formData.shopee_url || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || "Failed to update product")
      }

      const { product } = await response.json()

      setProducts(products.map((p) => (p.id === editingProduct.id ? product : p)))
      setFormData({
        name: "",
        price: "",
        image_url: "",
        description: "",
        category: "",
        active: true,
        sizes: ["Único"],
        colors: [],
        shopee_url: "",
      })
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
        throw new Error(errorData.error || "Failed to delete product")
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
      active: product.active,
      sizes: product.sizes || ["Único"],
      colors: product.colors || [],
      shopee_url: product.shopee_url || "",
    })
    setIsEditDialogOpen(true)
  }

  const fetchProducts = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1]

      const response = await fetch("/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const response = await fetch(`/api/products/${id}/toggle-active`, {
        method: "PATCH",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to toggle product status")
      }

      const data = await response.json()
      const { product, message } = data

      setProducts(products.map((p) => (p.id === id ? { ...p, active: product.active } : p)))
      alert(message)
      await fetchProducts()
    } catch (error) {
      console.error("Error toggling product status:", error)
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      alert(`Erro: ${errorMessage}`)
    }
  }

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") return true
    if (selectedCategory === "uncategorized") return !product.category
    return product.category === selectedCategory
  })

  // Funções de gerenciamento de tamanhos e cores
  const removeSize = (size: string) => {
    setFormData({ ...formData, sizes: formData.sizes.filter((s) => s !== size) })
  }

  const handleSizeSelect = (size: string) => {
    if (size === "Único") {
      setFormData({ ...formData, sizes: ["Único"] })
    } else {
      const newSizes = formData.sizes.filter((s) => s !== "Único")
      if (newSizes.includes(size)) {
        setFormData({ ...formData, sizes: newSizes.filter((s) => s !== size) })
      } else {
        setFormData({ ...formData, sizes: [...newSizes, size] })
      }
    }
  }

  const addColor = () => {
    if (colorInput && !formData.colors.includes(colorInput)) {
      setFormData({ ...formData, colors: [...formData.colors, colorInput] })
      setColorInput("")
    }
  }

  const removeColor = (color: string) => {
    setFormData({ ...formData, colors: formData.colors.filter((c) => c !== color) })
  }


  useEffect(() => {
    const fetchDailyViews = async () => {
      try {
        const response = await fetch("/api/page-views")
        if (response.ok) {
          const data = await response.json()
          setDailyViews(data.count)
        }
      } catch (error) {
        console.error("Error fetching daily views:", error)
      }
    }

    fetchDailyViews()
    const interval = setInterval(fetchDailyViews, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header do painel admin */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <a
              href="/"
              className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors cursor-pointer"
            >
              Painel Administrativo
            </a>
            <p className="text-sm text-gray-600">{admin.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Card de estatísticas de visitas */}
        <div className="mb-6">
          <StatsCard dailyViews={dailyViews} />
        </div>

    
        <div className="mb-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            products={products}
            onCategoryChange={setSelectedCategory}
          />
        </div>

       
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Produtos ({filteredProducts.length}
            {selectedCategory !== "all" && ` de ${products.length}`})
          </h2>
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
              {/* Formulário de adicionar produto */}
              <form onSubmit={handleAddProduct} className="space-y-4">
                <ProductFormFields
                  formData={formData}
                  setFormData={setFormData}
                  handleImageUpload={handleImageUpload}
                  uploadingImage={uploadingImage}
                  colorInput={colorInput}
                  setColorInput={setColorInput}
                  handleSizeSelect={handleSizeSelect}
                  removeSize={removeSize}
                  addColor={addColor}
                  removeColor={removeColor}
                />
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

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={openEditDialog}
              onDelete={handleDeleteProduct}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>

  
        {filteredProducts.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-500">
              Nenhum produto encontrado nesta categoria.
              {selectedCategory !== "all" && (
                <Button
                  variant="link"
                  onClick={() => setSelectedCategory("all")}
                  className="text-purple-600 hover:text-purple-700"
                >
                  Ver todos os produtos
                </Button>
              )}
            </p>
          </Card>
        )}


        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Produto</DialogTitle>
              <DialogDescription>Atualize os dados do produto</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditProduct} className="space-y-4">
              <ProductFormFields
                formData={formData}
                setFormData={setFormData}
                handleImageUpload={handleImageUpload}
                uploadingImage={uploadingImage}
                colorInput={colorInput}
                setColorInput={setColorInput}
                handleSizeSelect={handleSizeSelect}
                removeSize={removeSize}
                addColor={addColor}
                removeColor={removeColor}
              />
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
