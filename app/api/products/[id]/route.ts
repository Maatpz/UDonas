import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getCurrentAdmin } from "@/lib/auth"

// ==============================
// GET
// ==============================
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params

    const result = await sql`
      SELECT 
        id,
        name,
        description,
        price,
        image_url,
        category,
        active,
        sizes,
        colors,
        shopee_url,
        created_at,
        updated_at
      FROM products
      WHERE id = ${id}
        AND active = true
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ product: result[0] })
  } catch (error) {
    console.error("Get product error:", error)
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
    return NextResponse.json(
      {
        error: "Erro ao buscar produto",
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}

// ==============================
// PUT
// ==============================
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Não autenticado. Faça login novamente." }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const {
      name,
      description,
      price,
      image_url,
      category,
      active,
      sizes,
      colors,
      shopee_url,
    } = body

    console.log("[API] Update product:", id)

    // 🔒 Validações básicas
    if (!name || !price) {
      return NextResponse.json({ error: "Nome e preço são obrigatórios" }, { status: 400 })
    }

    const priceNum = Number.parseFloat(price)
    if (isNaN(priceNum) || priceNum < 0) {
      return NextResponse.json({ error: "Preço inválido" }, { status: 400 })
    }

    // 🔗 Validação Shopee URL
    if (shopee_url && !shopee_url.startsWith("https://shopee")) {
      return NextResponse.json(
        { error: "URL da Shopee inválida" },
        { status: 400 }
      )
    }

    const sizesArray =
      Array.isArray(sizes) && sizes.length > 0 ? sizes : ["Único"]

    const colorsArray =
      Array.isArray(colors) ? colors : []

    const result = await sql`
      UPDATE products
      SET 
        name = ${name},
        description = ${description || ""},
        price = ${priceNum},
        image_url = ${image_url || "/placeholder.svg?height=400&width=300"},
        category = ${category || null},
        active = ${active !== undefined ? active : true},
        sizes = ${sizesArray},
        colors = ${colorsArray},
        shopee_url = ${shopee_url || null},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING 
        id,
        name,
        description,
        price,
        image_url,
        category,
        active,
        sizes,
        colors,
        shopee_url,
        created_at,
        updated_at
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      product: result[0],
    })
  } catch (error) {
    console.error("Update product error:", error)
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
    return NextResponse.json(
      {
        error: "Erro ao atualizar produto",
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}

// ==============================
// DELETE
// ==============================
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Não autenticado. Faça login novamente." }, { status: 401 })
    }

    const { id } = await params

    const result = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete product error:", error)
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
    return NextResponse.json(
      {
        error: "Erro ao deletar produto",
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}
