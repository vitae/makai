import { useState } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Shop from './components/Shop'
import Customs from './components/Customs'
import Connect from './components/Connect'
import BuyModal from './components/BuyModal'

export default function App() {
  const [modalProduct, setModalProduct] = useState(null)

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main>
        <section id="home">
          <Hero onShopNow={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="shop">
          <Shop onBuyNow={setModalProduct} />
        </section>

        <section id="customs">
          <Customs />
        </section>

        <section id="connect">
          <Connect />
        </section>
      </main>

      {modalProduct && (
        <BuyModal product={modalProduct} onClose={() => setModalProduct(null)} />
      )}
    </div>
  )
}
