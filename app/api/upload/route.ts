// import { put } from "@vercel/blob"
// import { type NextRequest, NextResponse } from "next/server"

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData()
//     const file = formData.get("file") as File

//     if (!file) {
//       return NextResponse.json({ error: "Nenhum arquivo fornecido" }, { status: 400 })
//     }

//     if (!process.env.BLOB_READ_WRITE_TOKEN) {
//       return NextResponse.json(
//         {
//           error: "Configuração de upload não disponível. Configure BLOB_READ_WRITE_TOKEN nas variáveis de ambiente.",
//           details:
//             "Para desenvolvimento local, você pode usar URLs de imagens diretas (ex: https://exemplo.com/imagem.jpg)",
//         },
//         { status: 503 },
//       )
//     }

//     // Upload to Vercel Blob
//     const blob = await put(file.name, file, {
//       access: "public",
//     })

//     return NextResponse.json({
//       url: blob.url,
//       filename: file.name,
//       size: file.size,
//       type: file.type,
//     })
//   } catch (error) {
//     console.error("Upload error:", error)
//     const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
//     return NextResponse.json(
//       {
//         error: "Falha no upload da imagem",
//         details: errorMessage,
//       },
//       { status: 500 },
//     )
//   }
// }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { getCurrentAdmin } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Arquivo inválido" }, { status: 400 })
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    const MAX_SIZE = 5 * 1024 * 1024

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Tipo de arquivo não permitido" }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Arquivo muito grande (máx. 5MB)" }, { status: 400 })
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Upload não configurado" }, { status: 503 })
    }

    const filename = `${crypto.randomUUID()}-${file.name}`
    const blob = await put(filename, file, { access: "public" })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Falha no upload" }, { status: 500 })
  }
}


