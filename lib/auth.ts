/**
 * SISTEMA DE AUTENTICAÇÃO JWT
 *
 * Este arquivo gerencia toda a autenticação de administradores usando JWT (JSON Web Tokens).
 * Os tokens são armazenados em cookies HTTP-only para segurança.
*/

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

// Chave de segurança para assinar e verificar os tokens
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET)

// Interface que define os dados armazenados no token JWT
export interface JWTPayload {
  adminId: string
  // email: string
}

/**
 * Cria um token JWT para o administrador
 * O token expira em 15 horas
 */
export async function createToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15h")
    .sign(SECRET_KEY)
}

/**
 * Verifica e decodifica um token JWT
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload as JWTPayload
  } catch (error) {
    return null
  }
}

/**
 * Busca o token de autenticação do cookie
 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("auth-token")?.value || null
}

/**
 * Define o token de autenticação no cookie
 * Cookie configurado como HTTP-only para segurança
 */
export async function setAuthToken(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "lax", 
    maxAge: 60 * 60 * 24,
    path: "/",
  })
}

/**
 * Remove o token de autenticação (logout)
 */
export async function clearAuthToken(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}

/**
 * Retorna os dados do administrador autenticado
  */
export async function getCurrentAdmin(): Promise<JWTPayload | null> {
  const token = await getAuthToken()
  if (!token) return null
  return await verifyToken(token)
}
