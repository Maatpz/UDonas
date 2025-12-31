import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { createToken, setAuthToken } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Valida se email e senha foram fornecidos
    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    try {
      // Busca o administrador no banco de dados pelo email

      // const result = await sql`
      //   SELECT id, email, password_hash, name 
      //   FROM admins 
      //   WHERE email = ${email}
      // `
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      const normalizedEmail = email.trim().toLowerCase()

      const result = await sql`
      SELECT id, email, password_hash, name
      FROM admins
      WHERE email = ${normalizedEmail}
      `

    
      if (result.length === 0) {
        return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 })
      }

      const admin = result[0]

      // Verifica se a senha está correta usando bcrypt
      const isValidPassword = await bcrypt.compare(password, admin.password_hash)

      if (!isValidPassword) {
        return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 })
      }

      // Cria token JWT com os dados do admin
      const token = await createToken({
        adminId: admin.id,
        email: admin.email,
      })

      // Define o cookie com o token
      await setAuthToken(token)

      return NextResponse.json({
        success: true,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
      })
    } catch (dbError: any) {
    
      if (dbError.message && dbError.message.includes('relation "admins" does not exist')) {
        return NextResponse.json(
          {
            error: "DATABASE_NOT_CONFIGURED",
            message: "Banco de dados não configurado.",
          },
          { status: 503 },
        )
      }
      throw dbError
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 })
  }
}
