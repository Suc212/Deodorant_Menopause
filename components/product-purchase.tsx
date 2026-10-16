"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import OrderForm from "@/components/order-form"
import { Button } from "@/components/ui/button"
import { formatPrice, type ProductData } from "@/lib/product"

type PurchaseState = { product: ProductData; selectedPackageId: string; onPackageChange: (id: string) => void }
const PurchaseContext = createContext<PurchaseState | null>(null)

export function PurchaseProvider({ product, children }: { product: ProductData; children: ReactNode }) {
  const [selectedPackageId, onPackageChange] = useState(product.options[0].id)
  return <PurchaseContext.Provider value={{ product, selectedPackageId, onPackageChange }}>{children}</PurchaseContext.Provider>
}

function usePurchase() {
  const state = useContext(PurchaseContext)
  if (!state) throw new Error("Purchase controls require PurchaseProvider")
  return state
}

function scrollToOrderForm() {
  document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" })
}

export function ProductHero() {
  const { product, selectedPackageId, onPackageChange } = usePurchase()
  const [active, setActive] = useState(0)
  const [tab, setTab] = useState(0)
  const activeOption = product.options.find(option => option.id === selectedPackageId) ?? product.options[0]
  return <header className="hero" id="top">
    <div className="gallery">
      <div className="stage product-photo">
        <img src={product.images[active]} alt={`${product.name} product image ${active + 1}`} fetchPriority="high" loading="eager" decoding="async" />
      </div>
      <div className="thumbs">{product.images.map((image, i) =>
        <button type="button" key={`${image}-${i}`} aria-label={`Image ${i + 1}`} aria-pressed={active === i} onClick={() => setActive(i)}>
          <img src={image.replace(/\.avif$/, ".thumb.avif")} alt="" width={192} height={192} loading="lazy" decoding="async" fetchPriority="low" />
        </button>
      )}</div>
    </div>
    <div className="buy">
      <span className="badge">{product.badge}</span><h1>{product.name}</h1>
      <div className="sub"><span>{product.category}</span><span>Size: {product.size}</span><span className="stars" aria-label={`${product.rating} out of 5 stars`}>★★★★★ {product.rating}/5</span></div>
      <div className="priceRow"><span className="price">{formatPrice(activeOption.price)}</span><span>{product.paymentNote}</span></div>
      <div className="pill">{product.popularity}</div><p className="lede">{product.description}</p>
      <div className="mini">Choose your package</div>
      {product.options.map(option => <label className="opt" key={option.id}><span><input type="radio" name={`${product.id}-package`} checked={selectedPackageId === option.id} onChange={() => onPackageChange(option.id)} />{option.detail}</span><b>{formatPrice(option.price)}</b></label>)}
      <Button type="button" onClick={scrollToOrderForm}>Order {product.name}</Button>
      <div className="tabs">{product.tabs.map(([title], i) => <button type="button" key={title} aria-selected={tab === i} onClick={() => setTab(i)}>{title}</button>)}</div>
      <div className="panel"><p>{product.tabs[tab][1]}</p></div>
    </div>
  </header>
}

export function ProductOrderSection() {
  const { product, selectedPackageId, onPackageChange } = usePurchase()
  return <section id="order-form" className="order-section">
    <div className="order-copy"><h2>Complete your {product.name} order</h2><p>Choose your package and enter your delivery details. We will confirm before shipping.</p></div>
    <OrderForm productData={product} selectedPackageId={selectedPackageId} onPackageChange={onPackageChange} />
  </section>
}

export function StickyOrderBar() {
  const { product } = usePurchase()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const heroCta = document.querySelector('.buy .fill')
    const form = document.getElementById('order-form')
    if (!heroCta || !form || !window.IntersectionObserver) return
    let heroCtaVisible = true
    let formVisible = false
    const update = () => setShow(!heroCtaVisible && !formVisible)
    const heroObserver = new IntersectionObserver(([entry]) => { heroCtaVisible = entry.isIntersecting; update() }, { rootMargin: '0px 0px -80px 0px' })
    const formObserver = new IntersectionObserver(([entry]) => { formVisible = entry.isIntersecting; update() }, { rootMargin: '0px 0px -120px 0px', threshold: .08 })
    heroObserver.observe(heroCta)
    formObserver.observe(form)
    return () => { heroObserver.disconnect(); formObserver.disconnect() }
  }, [])
  return <div className={show ? 'bar show' : 'bar'}><div>From<b>{formatPrice(product.price)}</b></div><Button type="button" onClick={scrollToOrderForm}>Order {product.name}</Button></div>
}
