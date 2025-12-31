import { Instagram, Mail, MapPin, Phone, MessageCircle, Heart } from "lucide-react"
import Link from "next/link"

function ShopeeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C8.69 2 6 4.69 6 8v1H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-2V8c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4v1H8V8c0-2.21 1.79-4 4-4zm0 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
    </svg>
  )
}

export function Footer() {
  const navLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#sobre", label: "Sobre" },
    { href: "#pecas", label: "Peças" },
     {href: "#faq", label: "FAQ" }
  ]

  return (
    <footer className="bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
            
            <div>
              <h3 className="font-bold text-2xl mb-2 flex items-center gap-2">
                Donas <Heart className="w-5 h-5 text-pink-300 fill-pink-300" />
              </h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Moda feminina que celebra sua essência única. Peças exclusivas escolhidas com muito amor para você
                arrasar!
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/usedonaas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-pink-500 hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contato@donas.com.br"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-primary transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/5521964456231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-green-500 hover:text-white transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="https://shopee.com.br/usedonaas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#EE4D2D] hover:text-white transition-all duration-300"
                  aria-label="Shopee"
                >
                  <ShopeeIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-white/50 rounded-full" />
                Navegação
              </h3>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

           
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-white/50 rounded-full" />
                Contato
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <a
                    href="https://wa.me/5521964456231"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                  >
                    <Phone className="w-5 h-5 text-white/60 group-hover:text-white" />
                    <div>
                      <span className="text-xs text-white/60 block">WhatsApp</span>
                      <span className="text-sm">(21) 99999-9999</span>
                    </div>
                  </a>
                </div>
                <div>
                  <a
                    href="mailto:contato@donas.com.br"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-white/60 group-hover:text-white" />
                    <div>
                      <span className="text-xs text-white/60 block">E-mail</span>
                      <span className="text-sm">contato@donas.com.br</span>
                    </div>
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="w-5 h-5 text-white/60" />
                  <div>
                    <span className="text-xs text-white/60 block">Localização</span>
                    <span className="text-sm">São Gonçalo, RJ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-white/70 flex items-center gap-1">
                © 2025 Use Donas. Feito com <Heart className="w-4 h-4 text-pink-300 fill-pink-300" /> para você
              </p>
              <div className="flex items-center gap-6">
                {/* <Link href="/privacidade" className="text-white/70 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
                <Link href="/termos" className="text-white/70 hover:text-white transition-colors">
                  Termos de Uso
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
