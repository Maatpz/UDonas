"use client"

import { useState, useEffect } from "react"
import { Menu, X, Instagram, MessageCircle, ShoppingBag } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#sobre", label: "Sobre" },
    { href: "#pecas", label: "Peças" },
    { href: "#faq", label: "FAQ" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div
              className={`text-2xl font-bold transition-colors ${
                isScrolled ? "text-primary" : "text-primary md:text-white"
              }`}
            >
              DonaS
            </div>
          </a>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative transition-colors font-medium group ${
                  isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-primary" : "bg-white"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.instagram.com/usedonaas/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-200 hover:scale-110 ${
                isScrolled ? "text-foreground hover:text-pink-500" : "text-white/80 hover:text-pink-300"
              }`}
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/5521964456231?text=Olá! Gostaria de conhecer as peças da DonaS"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-200 hover:scale-110 ${
                isScrolled ? "text-foreground hover:text-green-500" : "text-white/80 hover:text-green-300"
              }`}
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="https://shopee.com.br/usedonaas"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-200 hover:scale-110 ${
                isScrolled ? "text-foreground hover:text-orange-500" : "text-white/80 hover:text-orange-300"
              }`}
              aria-label="Shopee"
            >
              <ShoppingBag className="w-5 h-5" />
            </a>
          </div>

          
          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-6 pt-4 border-t border-border">
              <a
                href="https://www.instagram.com/usedonaas/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/5521964456231?text=Olá! Gostaria de conhecer as peças da DonaS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a
                href="https://shopee.com.br/usedonaas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-orange-500 transition-colors"
                aria-label="Shopee"
              >
                <ShoppingBag className="w-6 h-6" />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
