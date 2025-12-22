import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getCurrentAdmin } from "@/lib/auth"

// GET single product
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const result = await sql`
      SELECT id, name, description, price, image_url, category, created_at, updated_at
      FROM products
      WHERE id = ${id}
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

// PUT update product
// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
    
//     const admin = await getCurrentAdmin()
//     if (!admin) {
//       return NextResponse.json({ error: "Não autenticado. Faça login novamente." }, { status: 401 })
//     }

//     const { id } = params
//     const { name, description, price, image_url, category } = await request.json()

    
//     if (!name || !price) {
//       return NextResponse.json({ error: "Nome e preço são obrigatórios" }, { status: 400 })
//     }

//     const priceNum = Number.parseFloat(price)
//     if (isNaN(priceNum) || priceNum < 0) {
//       return NextResponse.json({ error: "Preço inválido" }, { status: 400 })
//     }

//     const result = await sql`
//       UPDATE products
//       SET 
//         name = ${name},
//         description = ${description || ""},
//         price = ${priceNum},
//         image_url = ${image_url || "/placeholder.svg?height=400&width=300"},
//         category = ${category || null},
//         updated_at = NOW()
//       WHERE id = ${id}
//       RETURNING id, name, description, price, image_url, category, created_at, updated_at
//     `

//     if (result.length === 0) {
//       return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
//     }

//     return NextResponse.json({
//       success: true,
//       product: result[0],
//     })
//   } catch (error) {
//     console.error("Update product error:", error)
//     const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
//     return NextResponse.json(
//       {
//         error: "Erro ao atualizar produto",
//         details: errorMessage,
//       },
//       { status: 500 },
//     )
//   }
// }
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { id } = params
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
      UPDATE products
      SET
        name = ${name},
        description = ${description ?? null},
        price = ${price},
        image_url = ${image_url ?? null},
        category = ${category ?? null},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ product: result[0] })
  } catch (error) {
    console.error("Update product error:", error)
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 })
  }
}



// DELETE product 
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
  
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Não autenticado. Faça login novamente." }, { status: 401 })
    }

    const { id } = params

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


