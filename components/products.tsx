"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingBag, Sparkles } from "lucide-react"

interface Product {
  id: number
  name: string
  description?: string
  price: number
  image_url: string
  category?: string
}

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "vestido", label: "Vestidos" },
  { id: "saia", label: "Saias" },
  { id: "blusa", label: "Blusas" },
  { id: "body", label: "Bodies" },
  { id: "calcinha", label: "Calcinhas" },
  { id: "conjunto", label: "Conjuntos" },
  { id: "calca", label: "Calças" },
  { id: "short", label: "Shorts" },
  { id: "macaquinho", label: "Macaquinhos" },
]

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Vestido Elegante",
    description: "Vestido roxo elegante perfeito para ocasiões especiais",
    price: 120,
    image_url: "/elegant-purple-dress.jpg",
    category: "vestido",
  },
  {
    id: 2,
    name: "Saia Jeans",
    description: "Saia jeans moderna e versátil",
    price: 80,
    image_url: "/denim-skirt.png",
    category: "saia",
  },
  {
    id: 3,
    name: "Vestido Casual",
    description: "Vestido casual confortável para o dia a dia",
    price: 95,
    image_url: "/casual-dress.jpg",
    category: "vestido",
  },
  {
    id: 4,
    name: "Saia Midi",
    description: "Saia midi elegante e sofisticada",
    price: 110,
    image_url: "/midi-skirt.jpg",
    category: "saia",
  },
  {
    id: 5,
    name: "Vestido Longo",
    description: "Vestido longo para eventos especiais",
    price: 180,
    image_url: "/long-evening-dress.jpg",
    category: "vestido",
  },
  {
    id: 6,
    name: "Short Saia",
    description: "Short saia prático e estiloso",
    price: 75,
    image_url: "/skort-shorts.jpg",
    category: "short",
  },
  {
    id: 7,
    name: "Conjunto Cropped",
    description: "Conjunto cropped moderno e confortável",
    price: 150,
    image_url: "/cropped-set.jpg",
    category: "conjunto",
  },
  {
    id: 8,
    name: "Calça Pantalona",
    description: "Calça pantalona elegante e versátil",
    price: 130,
    image_url: "/wide-leg-pants.png",
    category: "calca",
  },
  {
    id: 9,
    name: "Blusa Ciganinha",
    description: "Blusa ciganinha delicada e feminina",
    price: 65,
    image_url: "/off-shoulder-top.jpg",
    category: "blusa",
  },
  {
    id: 10,
    name: "Saia Lápis",
    description: "Saia lápis clássica e elegante",
    price: 90,
    image_url: "/pencil-skirt.jpg",
    category: "saia",
  },
  {
    id: 11,
    name: "Macaquinho",
    description: "Macaquinho prático e estiloso",
    price: 145,
    image_url: "/romper.jpg",
    category: "macaquinho",
  },
  {
    id: 12,
    name: "Body Renda",
    description: "Body de renda sensual e elegante",
    price: 85,
    image_url: "/short-dress.jpg",
    category: "body",
  },
]

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [useFallback, setUseFallback] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("todos")

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()

        if (data.products) {
          setProducts(data.products)
          setUseFallback(data.useFallback || false)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter((product) => product.category?.toLowerCase() === selectedCategory.toLowerCase())

  const availableCategories = CATEGORIES.filter(
    (cat) => cat.id === "todos" || products.some((p) => p.category?.toLowerCase() === cat.id.toLowerCase()),
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const getWhatsAppLink = (productName: string, price: number) => {
    const message = `Olá! Tenho interesse no produto: ${productName} - ${formatPrice(price)}`
    return `https://wa.me/5521964456231?text=${encodeURIComponent(message)}`
  }

  if (loading) {
    return (
      <section id="pecas" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 text-violet-600">
                <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xl">Carregando produtos</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!products || products.length === 0) {
    return (
      <section id="pecas" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-violet-900 mb-4 text-balance">
                Coleção Exclusiva DonaS
              </h2>
              <p className="text-xl text-violet-600 text-pretty max-w-2xl mx-auto">
                Em breve novos produtos disponíveis
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="pecas" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-8 text-violet-100 text-3xl">✦</div>
        <div className="absolute top-1/3 right-12 text-violet-100 text-2xl">♥</div>
        <div className="absolute bottom-40 left-1/3 text-violet-100 text-xl">✧</div>
        <div className="absolute bottom-20 right-20 text-violet-100 text-3xl">✦</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-full px-5 py-2 mb-6">
              <ShoppingBag className="w-4 h-4 text-violet-500" />
              <span className="text-violet-700 text-sm font-medium">Nossa coleção</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-violet-900 mb-4 text-balance">
              Coleção Exclusiva DonaS
            </h2>
            <p className="text-xl text-violet-600 text-pretty max-w-2xl mx-auto">
              Peças únicas que combinam elegância, conforto e sofisticação
            </p>
            {useFallback && (
              <p className="text-sm text-violet-600 mt-4 bg-violet-50 border border-violet-200 px-4 py-2 rounded-full inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Produtos de demonstração. Acesse{" "}
                <a href="/setup" className="underline font-semibold hover:text-violet-800">
                  configuração
                </a>{" "}
                para adicionar produtos.
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {availableCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                  ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25"
                      : "bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 hover:border-violet-300"
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-violet-600 text-lg">Nenhum produto encontrado nesta categoria.</p>
              <button
                onClick={() => setSelectedCategory("todos")}
                className="mt-4 text-violet-700 underline hover:text-violet-900 font-medium"
              >
                Ver todos os produtos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-violet-100 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100/50 transition-all duration-300 rounded-2xl flex flex-col"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4] overflow-hidden bg-violet-50">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {product.category && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 backdrop-blur-sm text-violet-700 text-xs font-medium px-3 py-1 rounded-full capitalize">
                            {product.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start p-5 bg-white flex-grow">
                    <div className="w-full flex-grow">
                      <h3 className="font-semibold text-lg text-violet-900 group-hover:text-violet-700 transition-colors">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-violet-600 mb-2 line-clamp-2 min-h-[40px]">{product.description}</p>
                      )}
                    </div>
                    <div className="w-full mt-auto pt-2">
                      <p className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-3">
                        {formatPrice(Number(product.price))}
                      </p>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl py-5 font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
                      >
                        <a
                          href={getWhatsAppLink(product.name, Number(product.price))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Comprar via WhatsApp
                        </a>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
