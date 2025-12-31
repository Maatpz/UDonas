import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"


const RESET_INTERVAL_MINUTES = 0

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.NEON_DATABASE_URL!)

    const forwarded = request.headers.get("x-forwarded-for")
    const ip =
      forwarded?.split(",")[0] ??
      request.headers.get("x-real-ip") ??
      crypto.randomUUID()

    const userAgent = request.headers.get("user-agent") || "unknown"

    const timeCondition =
      RESET_INTERVAL_MINUTES > 0
        ? `visited_at >= NOW() - INTERVAL '${RESET_INTERVAL_MINUTES} minutes'`
        : `visited_at >= CURRENT_DATE`

    const existingVisit = await sql`
      SELECT 1
      FROM page_views
      WHERE user_ip = ${ip}
        AND user_agent = ${userAgent}
        AND ${sql.unsafe(timeCondition)}
      LIMIT 1
    `

    if (existingVisit.length === 0) {
      await sql`
        INSERT INTO page_views (user_ip, user_agent)
        VALUES (${ip}, ${userAgent})
      `
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error recording page view:", error)
    return NextResponse.json({ error: "Failed to record page view" }, { status: 500 })
  }
}


export async function GET() {
  try {
    const sql = neon(process.env.NEON_DATABASE_URL!)

    const timeCondition =
      RESET_INTERVAL_MINUTES > 0
        ? `visited_at >= NOW() - INTERVAL '${RESET_INTERVAL_MINUTES} minutes'`
        : `visited_at >= CURRENT_DATE`

    const result = await sql`
      SELECT COUNT(DISTINCT (user_ip, user_agent)) as count
      FROM page_views
      WHERE ${sql.unsafe(timeCondition)}
    `

    const count = result[0]?.count || 0

    return NextResponse.json({
      count: Number(count),
      resetMode: RESET_INTERVAL_MINUTES > 0 ? `${RESET_INTERVAL_MINUTES} minutos` : "meia-noite",
    })
  } catch (error) {
    console.error("Error fetching page views:", error)
    return NextResponse.json({ error: "Failed to fetch page views", count: 0 }, { status: 500 })
  }
}
