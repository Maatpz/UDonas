import { Sparkles, Heart, Shield, Truck, Star } from "lucide-react"

export function About() {
  const values = [
    {
      icon: Star,
      title: "Qualidade",
      description: "Produtos confeccionados com excelência",
    },
    {
      icon: Sparkles,
      title: "Exclusividade",
      description: "Peças únicas e diferenciadas",
    },
    {
      icon: Heart,
      title: "Atendimento Humanizado",
      description: "Vendas personalizadas via WhatsApp",
    },
    {
      icon: Shield,
      title: "Confiança",
      description: "Trocas e devoluções garantidas",
    },
    {
      icon: Truck,
      title: "Entrega Rápida",
      description: "Enviamos para todo o Brasil",
    },
  ]

  return (
    <section id="sobre" className="py-24 bg-gradient-to-b from-violet-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-violet-200 text-2xl">✦</div>
        <div className="absolute top-40 right-20 text-violet-200 text-xl">♥</div>
        <div className="absolute bottom-32 left-1/4 text-violet-200 text-lg">✧</div>
        <div className="absolute bottom-20 right-10 text-violet-200 text-2xl">✦</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-violet-200 rounded-full px-5 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span className="text-violet-700 text-sm font-medium">Conheça nossa história</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-violet-900 mb-4 text-balance">
              Sobre a DonaS
            </h2>
            <p className="text-xl text-violet-600 text-pretty max-w-2xl mx-auto">
              Nascemos com a missão de oferecer moda feminina de alta qualidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/80 backdrop-blur-sm border border-violet-100 rounded-2xl p-8 hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-violet-900 mb-4">Missão e Propósito</h3>
              <p className="text-violet-700 leading-relaxed">
                Nascemos com a missão de oferecer moda feminina de alta qualidade, com peças que valorizam a beleza e a
                confiança de cada mulher. Acreditamos que a moda é uma forma de expressão pessoal, por isso selecionamos
                cuidadosamente cada detalhe da nossa coleção.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-violet-100 rounded-2xl p-8 hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-violet-900 mb-4">Confecção Própria</h3>
              <p className="text-violet-700 leading-relaxed">
                Garantimos qualidade desde a escolha dos tecidos até o acabamento final. Enviamos para todo o Brasil com
                segurança e rapidez. O melhor: você compra direto pelo WhatsApp, sem intermediários!
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-violet-900 text-center mb-8">Nossos Valores</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-violet-100 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-300 text-center space-y-3 group"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-semibold text-violet-900">{value.title}</h4>
                    <p className="text-sm text-violet-600 leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
