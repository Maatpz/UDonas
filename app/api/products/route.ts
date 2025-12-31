import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getCurrentAdmin } from "@/lib/auth"

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Vestido Elegante",
    description: "Vestido roxo elegante perfeito para ocasiões especiais",
    price: 120,
    image_url: "/elegant-purple-dress.jpg",
    category: "vestido",
    active: true,
    sizes: ["P", "M", "G"],
    colors: ["Roxo", "Preto"],
    shopee_url: null,
  },
  {
    id: 2,
    name: "Saia Jeans",
    description: "Saia jeans moderna e versátil",
    price: 80,
    image_url: "/denim-skirt.png",
    category: "saia",
    active: true,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Azul"],
    shopee_url: null,
  },
  {
    id: 3,
    name: "Vestido Casual",
    description: "Vestido casual confortável para o dia a dia",
    price: 95,
    image_url: "/casual-dress.jpg",
    category: "vestido",
    active: true,
    sizes: ["Único"],
    colors: ["Branco", "Bege"],
    shopee_url: null,
  },
  {
    id: 4,
    name: "Saia Midi",
    description: "Saia midi elegante e sofisticada",
    price: 110,
    image_url: "/midi-skirt.jpg",
    category: "saia",
    active: true,
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Marrom"],
    shopee_url: null,
  },
  {
    id: 5,
    name: "Blusa Ciganinha",
    description: "Blusa ciganinha delicada e feminina",
    price: 65,
    image_url: "/off-shoulder-top.jpg",
    category: "blusa",
    active: true,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco", "Rosa", "Azul"],
    shopee_url: null,
  },
  {
    id: 6,
    name: "Body Renda",
    description: "Body de renda sensual e elegante",
    price: 75,
    image_url: "/lace-bodysuit.jpg",
    category: "body",
    active: true,
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Vermelho"],
    shopee_url: null,
  },
]

// GET
export async function GET(request: NextRequest) {
  try {
    const isAdmin = request.headers.get("authorization") !== null

    let products
    if (isAdmin) {
      products = await sql`
        SELECT id, name, description, price, image_url, category, active, sizes, colors, shopee_url, created_at, updated_at
        FROM products
        ORDER BY created_at DESC
      `
    } else {
      products = await sql`
        SELECT id, name, description, price, image_url, category, sizes, colors, shopee_url, created_at, updated_at
        FROM products
        WHERE active = true
        ORDER BY created_at DESC
      `
    }

    return NextResponse.json({ products, useFallback: false })
  } catch (error: any) {
    console.error("Get products database error:", error)

    if (error?.code === "42P01" || error?.message?.includes("does not exist")) {
      return NextResponse.json({ products: FALLBACK_PRODUCTS, useFallback: true })
    }

    return NextResponse.json({
      products: FALLBACK_PRODUCTS,
      useFallback: true,
      error: "Erro ao conectar ao banco de dados",
    })
  }
}

// POST 
export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const { name, description, price, image_url, category, sizes, colors, shopee_url } = await request.json()

    if (!name || !price) {
      return NextResponse.json({ error: "Nome e preço são obrigatórios" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO products (name, description, price, image_url, category, active, sizes, colors, shopee_url)
      VALUES (
        ${name}, 
        ${description || ""}, 
        ${price}, 
        ${image_url || "/placeholder.svg?height=400&width=300"}, 
        ${category || null},
        true,
        ${sizes || ["Único"]},
        ${colors || []},
        ${shopee_url || null}
      )
      RETURNING id, name, description, price, image_url, category, active, sizes, colors, shopee_url, created_at, updated_at
    `

    return NextResponse.json({
      success: true,
      product: result[0],
    })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 })
  }
}
