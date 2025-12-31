"use client"

import { useEffect } from "react"

export function PageViewTracker() {
  useEffect(() => {
    // Evita registrar múltiplas vezes na mesma sessão
    const hasViewed = sessionStorage.getItem("page_viewed")

    if (hasViewed) return

    sessionStorage.setItem("page_viewed", "true")

    const recordPageView = async () => {
      try {
        await fetch("/api/page-views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: window.location.pathname,
          }),
        })
      } catch (error) {
        console.error("Failed to record page view:", error)
      }
    }

    recordPageView()
  }, [])

  return null
}
