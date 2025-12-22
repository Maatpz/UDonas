"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "Como faço para comprar?",
    answer:
      'Basta clicar no botão "Comprar via WhatsApp" no produto desejado. Você será redirecionado para uma conversa com nossa equipe, onde poderá tirar dúvidas, escolher tamanho, cor e combinar a entrega.',
  },
  {
    question: "Quais são as formas de pagamento?",
    answer:
      "Aceitamos Pix (instantâneo), Cartão de Crédito, Boleto e Transferência Bancária. Todos os detalhes serão combinados via WhatsApp de acordo com sua preferência.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer:
      "O prazo varia de acordo com a região. Em média, 3 a 7 dias úteis após a confirmação do pagamento. Enviamos por transportadora confiável e você recebe com segurança.",
  },
  {
    question: "Posso trocar ou devolver o produto?",
    answer:
      "Sim! Aceitamos trocas e devoluções dentro de 7 dias após o recebimento. Se o produto chegar com defeito ou não for o esperado, entre em contato pelo WhatsApp que resolvemos rapidinho!",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white to-violet-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-16 text-violet-200 text-2xl">✦</div>
        <div className="absolute top-1/2 left-8 text-violet-200 text-xl">♥</div>
        <div className="absolute bottom-24 right-1/4 text-violet-200 text-lg">✧</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-violet-200 rounded-full px-5 py-2 mb-6">
              <HelpCircle className="w-4 h-4 text-violet-500" />
              <span className="text-violet-700 text-sm font-medium">Tire suas dúvidas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-violet-900 mb-4 text-balance">
              Dúvidas Frequentes
            </h2>
            <p className="text-xl text-violet-600 text-pretty">
              Tudo o que você precisa saber sobre nossas peças e atendimento
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-violet-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-violet-50/50 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-violet-900 pr-4">{faq.question}</h3>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 text-white" />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="p-6 pt-0 text-violet-700 leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
