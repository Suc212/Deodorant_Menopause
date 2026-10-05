import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { allProducts, formatPrice } from "@/lib/product"

export const metadata = {
  title: "Korretdeals | All the best deals in one store",
  description: "Shop available wellness and lifestyle products from Korretdeals."
}

export default function HomePage() {
  const featuredProduct = allProducts[0]

  return (
    <main className="site-page">
      <nav className="site-nav">
        <Link className="logo" href="/">
          Korretdeals
          <small>All the best deals in one store</small>
        </Link>
        <div className="site-nav-actions">
          <a href="#products">Products</a>
        </div>
      </nav>

      <section className="site-hero">
        <div className="site-hero-copy">
          <span className="badge">Now available</span>
          <h1>Korretdeals</h1>
          <p>
            A simple shop for carefully selected products, clear offers and easy ordering.
            Browse what is available now and order directly from each product page.
          </p>
        </div>
        <Link className="hero-product" href={`/${featuredProduct.slug}`} aria-label={`View ${featuredProduct.name} product page`}>
          <img src={featuredProduct.images[0]} alt={featuredProduct.name} />
          <div>
            <span>{featuredProduct.category}</span>
            <strong>{featuredProduct.name}</strong>
          </div>
        </Link>
      </section>

      <section id="products" className="product-listing">
        <div className="section-head">
          <span>Shop</span>
          <h2>Available products</h2>
        </div>

        <div className="shop-grid">
          {allProducts.map((item) => {
            const startingOffer = item.options[0]

            return (
              <article className="shop-card" key={item.id}>
                <Link className="shop-card-image" href={`/${item.slug}`}>
                  <img src={item.images[0]} alt={item.name} />
                </Link>
                <div className="shop-card-body">
                  <div className="shop-card-meta">
                    <span>{item.category}</span>
                    <span>{item.size}</span>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.listingDescription}</p>
                  <div className="shop-card-offer">
                    <span>From</span>
                    <strong>{formatPrice(startingOffer.price)}</strong>
                    <small>{startingOffer.label}</small>
                  </div>
                  <Link className="btn fill" href={`/${item.slug}`}>
                    View product <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <footer className="site-footer">
        <Link className="logo" href="/">
          Korretdeals
          <small>All the best deals in one store</small>
        </Link>
      </footer>
    </main>
  )
}