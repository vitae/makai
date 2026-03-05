import BackgroundScene from "@/components/BackgroundSceneLoader";
import ProductCard, { type Product } from "@/components/ProductCard";

const PRODUCTS: Product[] = [
  {
    id: "makai-surf-tee",
    name: "Makai Surf Tee",
    description:
      "100% organic cotton tee with hand-printed wave graphics. Ride the aloha spirit all day.",
    price: 3800,
    emoji: "🏄",
    tag: "Best Seller",
  },
  {
    id: "ocean-drift-hoodie",
    name: "Ocean Drift Hoodie",
    description:
      "Ultra-soft fleece hoodie dyed with natural ocean-inspired indigo. Built for cool Kona evenings.",
    price: 8500,
    emoji: "🌊",
    tag: "New Arrival",
  },
  {
    id: "aloha-sunscreen-spf50",
    name: "Aloha Sunscreen SPF 50",
    description:
      "Reef-safe, mineral sunscreen. Keeps skin golden without harming the coral. Smells like mango.",
    price: 2200,
    emoji: "☀️",
  },
  {
    id: "shark-fin-pendant",
    name: "Shark Fin Pendant",
    description:
      "Handcrafted sterling silver shark fin necklace. Wear the ocean wherever you go.",
    price: 5500,
    emoji: "🦈",
    tag: "Limited",
  },
  {
    id: "yin-yang-board-wax",
    name: "Yin-Yang Board Wax",
    description:
      "Premium tropical warm-water surfboard wax. Balance your ride, balance your soul.",
    price: 1200,
    emoji: "☯️",
  },
  {
    id: "sunset-lei-kit",
    name: "Sunset Lei Kit",
    description:
      "Fresh plumeria lei-making kit with dried flowers and twine. Craft authentic Hawaiian leis at home.",
    price: 2800,
    emoji: "🌺",
    tag: "Popular",
  },
];

/* ─── Decorative SVG wave divider ─── */
function WaveDivider() {
  return (
    <svg
      viewBox="0 0 1440 60"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-hidden="true"
    >
      <path
        d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
        fill="rgba(0,188,212,0.18)"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <BackgroundScene />

      <div className="relative min-h-screen px-4 pb-24">
        {/* Hero header */}
        <header className="text-center pt-16 pb-10">
          <div className="text-6xl mb-4 animate-float inline-block">🌺</div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-3 shimmer-text">
            Makai Goods Co.
          </h1>
          <p className="text-white/75 text-lg max-w-md mx-auto leading-relaxed">
            Premium beach goods with aloha spirit.{" "}
            <span className="text-yellow-300 font-semibold">
              Straight from the shore to your door. 🏄
            </span>
          </p>

          {/* Decorative icon row */}
          <div className="flex justify-center gap-6 mt-6 text-3xl opacity-70 select-none">
            <span title="Waves">🌊</span>
            <span title="Shark">🦈</span>
            <span title="Sun">🌅</span>
            <span title="Yin Yang">☯️</span>
            <span title="Palm">🌴</span>
            <span title="Flower">🌺</span>
          </div>
        </header>

        <WaveDivider />

        {/* Products grid */}
        <main className="max-w-5xl mx-auto mt-8">
          <h2 className="text-2xl font-bold text-white/90 mb-6 text-center">
            🛍️ Shop the Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center text-white/40 text-sm">
          <WaveDivider />
          <div className="mt-6 flex flex-col items-center gap-2">
            <span className="text-2xl">🌊 ☯️ 🦈</span>
            <p>© 2026 Makai Goods Co. · Aloha from Maui, HI</p>
            <p className="text-xs opacity-60">
              Payments secured by Stripe. All prices in USD.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

