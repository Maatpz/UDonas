import { neon } from "@neondatabase/serverless"

const DATABASE_URL = process.env.NEON_DATABASE_URL

if (!DATABASE_URL) {
  throw new Error("NEON_DATABASE_URL não está definida nas variáveis de ambiente")
}

const sql = neon(DATABASE_URL)

export { sql }
