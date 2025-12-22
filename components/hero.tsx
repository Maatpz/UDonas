"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Heart, Star, ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)",
      }}
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stars */}
        <Sparkles className="absolute top-24 left-8 w-6 h-6 text-white/30" />
        <Sparkles className="absolute top-1/3 left-16 w-5 h-5 text-white/20" />
        <Sparkles className="absolute bottom-32 left-12 w-4 h-4 text-white/25" />
        <Sparkles className="absolute top-40 right-1/4 w-4 h-4 text-white/20" />
        <Sparkles className="absolute bottom-40 right-12 w-6 h-6 text-white/25" />

        {/* Hearts */}
        <Heart className="absolute top-28 right-20 w-8 h-8 text-white/20 fill-white/10" />
        <Heart className="absolute top-1/3 right-12 w-6 h-6 text-white/15 fill-white/10" />
        <Heart className="absolute bottom-48 left-1/4 w-5 h-5 text-white/20 fill-white/10" />

        {/* Stars  */}
        <Star className="absolute bottom-24 left-8 w-5 h-5 text-white/20" />
        <Star className="absolute top-1/2 left-6 w-4 h-4 text-white/15" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Moda que é a sua cara</span>
          </div>

         
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-white tracking-tight leading-tight">
            Vista o que te faz brilhar
          </h1>

         
          <p className="text-lg md:text-xl text-white/90 font-normal max-w-2xl mx-auto leading-relaxed">
            Peças incríveis, preços que cabem no bolso e um estilo único que só você tem. Bora arrasar?
          </p>

          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-700 hover:bg-white/90 text-base px-8 py-6 rounded-full font-medium shadow-lg transition-all hover:scale-105"
            >
              <a href="#pecas" className="flex items-center gap-2">
                Explorar Looks
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-purple-600/80 hover:bg-purple-600 text-white text-base px-8 py-6 rounded-full font-medium shadow-lg transition-all hover:scale-105 border border-white/20"
            >
              <a
                href="https://wa.me/5521964456231?text=Oi! Vi o site e quero saber mais sobre as peças!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current" />
                Quero Comprar
              </a>
            </Button>
          </div>

          
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              <Star className="w-4 h-4" />
              <span>Entrega Rápida</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              <Heart className="w-4 h-4 fill-current" />
              <span>Peças Exclusivas</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Preços Incríveis</span>
            </div>
          </div>

          
          <div className="pt-6">
            <a
              href="https://www.instagram.com/usedonaas/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="font-semibold">@usedonaas</span>
              <span className="text-white/70">| Segue lá!</span>
            </a>
          </div>

          {/* Scroll indicador */}
          <div className="pt-12">
            <a
              href="#sobre"
              className="inline-flex flex-col items-center text-white/60 hover:text-white transition-colors group"
            >
              <span className="text-sm font-medium mb-2">Role para baixo</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
