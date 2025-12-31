import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Products } from "@/components/products"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageViewTracker } from "@/components/page-view-tracker"


export default function Home() {
  return (
    <main className="min-h-screen">
      <PageViewTracker />
      <Header />
      <Hero />
      <About />
      <Products />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
