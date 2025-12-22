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
    name: "Blusa Ciganinha",
    description: "Blusa ciganinha delicada e feminina",
    price: 65,
    image_url: "/off-shoulder-top.jpg",
    category: "blusa",
  },
  {
    id: 6,
    name: "Body Renda",
    description: "Body de renda sensual e elegante",
    price: 75,
    image_url: "/lace-bodysuit.jpg",
    category: "body",
  },
]

// // GET all products
// export async function GET() {
//   try {
//     const products = await sql`
//       SELECT id, name, description, price, image_url, category, created_at, updated_at
//       FROM products
//       ORDER BY created_at DESC
//     `

//     return NextResponse.json({ products, useFallback: false })
//   } catch (error: any) {
//     if (error?.code === "42P01" || error?.message?.includes("does not exist")) {
//       return NextResponse.json({ products: FALLBACK_PRODUCTS, useFallback: true })
//     }

//     console.error("Get products error:", error)
//     return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 })
//   }
// }

// // POST create product
// export async function POST(request: NextRequest) {
//   try {
    
//     const admin = await getCurrentAdmin()
//     if (!admin) {
//       return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
//     }

//     const { name, description, price, image_url, category } = await request.json()

    
//     if (!name || !price) {
//       return NextResponse.json({ error: "Nome e preço são obrigatórios" }, { status: 400 })
//     }

//     const result = await sql`
//       INSERT INTO products (name, description, price, image_url, category)
//       VALUES (${name}, ${description || ""}, ${price}, ${image_url || "/placeholder.svg?height=400&width=300"}, ${category || null})
//       RETURNING id, name, description, price, image_url, category, created_at, updated_at
//     `

//     return NextResponse.json({
//       success: true,
//       product: result[0],
//     })
//   } catch (error) {
//     console.error(" Create product error:", error)
//     return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 })
//   }
// }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export async function GET() {
  try {
    const products = await sql`
      SELECT id, name, description, price, image_url, category
      FROM products
      ORDER BY created_at DESC
    `
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { name, description, price, image_url, category } = await request.json()

    if (
      typeof name !== "string" ||
      name.trim().length < 3 ||
      typeof price !== "number" ||
      price <= 0
    ) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO products (name, description, price, image_url, category)
      VALUES (${name}, ${description ?? null}, ${price}, ${image_url ?? null}, ${category ?? null})
      RETURNING *
    `

    return NextResponse.json({ product: result[0] })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 })
  }
}
