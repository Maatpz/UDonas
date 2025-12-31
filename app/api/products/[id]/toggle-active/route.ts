import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getCurrentAdmin } from "@/lib/auth"

// active status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const result = await sql`
      UPDATE products
      SET active = NOT active, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, name, active
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      product: result[0],
      message: result[0].active
        ? "Produto ativado com sucesso"
        : "Produto desativado com sucesso",
    })
  } catch (error) {
    console.error("Toggle active error:", error)
    return NextResponse.json(
      { error: "Erro ao alterar status do produto" },
      { status: 500 }
    )
  }
}

