"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"


export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Mostra o botão quando rolar mais de 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    
    window.addEventListener("scroll", toggleVisibility)


    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    })
  }

  return (
    <>
      {}
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg transition-all duration-300 hover:scale-110"
          size="icon"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </>
  )
}
