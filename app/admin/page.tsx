// import { redirect } from "next/navigation"
// import { getCurrentAdmin } from "@/lib/auth"
// import { sql } from "@/lib/db"
// import AdminDashboard from "@/components/admin-dashboard"

// export default async function AdminPage() {
//   const admin = await getCurrentAdmin()

//   if (!admin) {
//     redirect("/admin/login")
//   }

//   const products = await sql`
//     SELECT id, name, description, price, image_url, created_at, updated_at
//     FROM products
//     ORDER BY created_at DESC
//   `

//   return <AdminDashboard initialProducts={products} admin={admin} />
// }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import { redirect } from "next/navigation"
import { getCurrentAdmin } from "@/lib/auth"
import { sql } from "@/lib/db"
import AdminDashboard from "@/components/admin-dashboard"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect("/admin/login")
  }

  let products = []

  try {
    products = await sql`
      SELECT 
        id,
        name,
        description,
        price,
        image_url,
        category,
        created_at,
        updated_at
      FROM products
      ORDER BY created_at DESC
    `
  } catch (error) {
    console.error("Erro ao buscar produtos no admin")
  }

  return <AdminDashboard initialProducts={products} admin={admin} />
}
