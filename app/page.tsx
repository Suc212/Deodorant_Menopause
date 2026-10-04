"use client"

import React from "react"
import { ArrowRight, Minus, Plus } from "lucide-react"
import OrderForm from "@/components/order-form"
import { benefits, formatPrice, ingredientDetails, product, relatedProducts, reviews, steps } from "@/lib/product"
import { Button } from "@/components/ui/button"

function scrollToOrderForm() {
  document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" })
}

function Icon({ type = "bottle" }: { type?: string }) {
  if (type === "jar") return <svg viewBox="0 0 100 70"><rect x="4" y="2" width="92" height="20" rx="4" fill="#c3cbc2"/><rect x="4" y="22" width="92" height="46" rx="8" fill="#2f5a34"/></svg>
  if (type === "roll") return <svg viewBox="0 0 60 150"><rect x="14" y="2" width="32" height="32" rx="7" fill="#c3cbc2"/><rect x="20" y="32" width="20" height="10" fill="#aab4a9"/><rect x="6" y="40" width="48" height="108" rx="18" fill="#2f5a34"/><rect x="6" y="40" width="13" height="108" rx="7" fill="#3c6e41" opacity=".6"/></svg>
  return <svg viewBox="0 0 60 190"><rect x="6" y="2" width="48" height="52" rx="10" fill="#c3cbc2"/><rect x="6" y="40" width="48" height="8" fill="#aab4a9"/><rect x="4" y="54" width="52" height="132" rx="8" fill="#2f5a34"/><rect x="4" y="54" width="14" height="132" rx="7" fill="#3c6e41" opacity=".6"/><rect x="26" y="84" width="2" height="60" fill="#dce8d8" opacity=".7"/></svg>
}

function Logo() {
  return <a className="logo" href="#top">{product.brand}<small>{product.tagline}</small></a>
}

function Header() {
  return <nav><Logo/><ul><li><a href="#benefits">Why it works</a></li><li><a href="#how">How to take it</a></li><li><a href="#reviews">Reviews</a></li></ul><div className="navr"><a href="#order-form">Order</a></div></nav>
}

function Gallery() {
  const [active, setActive] = React.useState(0)
  return <div className="gallery"><div className="stage product-photo"><img src={product.images[active]} alt={`${product.name} product image ${active + 1}`} /></div><div className="thumbs">{product.images.map((image, i)=><button key={image} aria-label={`Image ${i+1}`} aria-pressed={active===i} onClick={()=>setActive(i)}><img src={image} alt="" /></button>)}</div></div>
}

function BuyBox({ selectedPackageId, onPackageChange }: { selectedPackageId: string; onPackageChange: (packageId: string) => void }) {
  const [qty, setQty] = React.useState(1)
  const [tab, setTab] = React.useState(0)
  const activeOption = product.options.find((item) => item.id === selectedPackageId) ?? product.options[0]
  return <div className="buy"><span className="badge">{product.badge}</span><h1>{product.name}</h1><div className="sub"><span>{product.category}</span><span>Size: {product.size}</span><span className="stars">{product.rating}/5</span></div><div className="priceRow"><span className="price">{formatPrice(activeOption.price)}</span><span>{product.paymentNote}</span></div><div className="pill">{product.popularity}</div><p className="lede">{product.description}</p><div className="mini">Amount and package</div><div className="qty"><button onClick={()=>setQty(Math.max(1, qty-1))} aria-label="Decrease"><Minus size={16}/></button><span>{qty}</span><button onClick={()=>setQty(qty+1)} aria-label="Increase"><Plus size={16}/></button><small>Formula: {product.scent}</small></div>{product.options.map(o=><label className="opt" key={o.id}><span><input type="radio" checked={selectedPackageId===o.id} onChange={()=>onPackageChange(o.id)}/>{o.detail}</span><b>{formatPrice(o.price)}</b></label>)}<Button onClick={scrollToOrderForm}>Order Deos</Button><div className="tabs">{product.tabs.map((t,i)=><button key={t[0]} aria-selected={tab===i} onClick={()=>setTab(i)}>{t[0]}</button>)}</div><div className="panel"><p>{product.tabs[tab][1]}</p></div></div>
}

function Hero({ selectedPackageId, onPackageChange }: { selectedPackageId: string; onPackageChange: (packageId: string) => void }){ return <header className="hero" id="top"><Gallery/><BuyBox selectedPackageId={selectedPackageId} onPackageChange={onPackageChange}/></header> }
function Benefits(){ return <section id="benefits"><h2>Why women in menopause choose it</h2><div className="benefits">{benefits.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section> }
function How(){ return <section id="how"><div className="split"><div className="ph image-ph"><img src="/Twin Deos Bottles on Wet Tropical Leaf.png" alt="Twin Deos bottles on wet tropical leaf" /></div><div><h2>Your daily routine, in three steps</h2><ol className="steps">{steps.map(([title,text])=><li key={title}><b>{title}</b>{text}</li>)}</ol></div></div></section> }
function Ingredients(){ return <section><div className="split"><div><h2>What goes inside each pill</h2><p>Deos uses a simple plant-forward formula built around internal freshness, daily digestive comfort and confidence during perimenopause and menopause.</p><div className="ingredient-list">{ingredientDetails.map(([title,text])=><div key={title}><b>{title}</b><p>{text}</p></div>)}</div><button className="more" onClick={scrollToOrderForm}>Order this formula</button></div><div className="ph image-ph"><img src="/Falling Green Capsules and Fresh Herbs.png" alt="Falling green capsules and fresh herbs" /></div></div></section> }
function Reviews(){ return <section id="reviews"><h2>Reviews from women in this phase</h2><div className="quotes">{reviews.map(([quote,name,stars])=><figure key={quote}><blockquote>{quote}</blockquote><div className="stars">{stars}</div><figcaption>{name}</figcaption></figure>)}</div></section> }
function Related(){ return <section><div className="head"><h2>You might also like</h2><div className="arrows"><button>Previous</button><button>Next</button></div></div><div className="cards">{relatedProducts.map(([name,price,original,type])=><article className="card" key={name}><div className="img"><Icon type={type}/></div><div>{name}<br/>{original ? <s>{formatPrice(original)}</s> : null}<b>{formatPrice(price)}</b><br/><span className="stars">4.5/5</span></div></article>)}</div><button className="more center" onClick={scrollToOrderForm}>Order Deos <ArrowRight size={15}/></button></section> }
function OrderSection({ selectedPackageId, onPackageChange }: { selectedPackageId: string; onPackageChange: (packageId: string) => void }){ return <section id="order-form" className="order-section"><div className="order-copy"><h2>Complete your Deos order</h2><p>Choose your bottle package and enter your delivery details. We will confirm before shipping.</p></div><OrderForm selectedPackageId={selectedPackageId} onPackageChange={onPackageChange}/></section> }
function Footer(){ const links=["Deos capsules","Single bottle","Two bottle offer","Three bottle offer","Delivery"]; return <><footer><div><a className="logo" href="#top">Korretdeals<small>Natural body freshness</small></a></div><div><h4>Shop</h4><ul>{links.map(l=><li key={l}>{l}</li>)}</ul></div></footer><div className="legal"><span>Â© Korretdeals</span><span><a href="#privacy">Privacy</a><a href="#terms">Terms</a></span></div></> }
function Sticky(){ const [show,setShow]=React.useState(false); React.useEffect(()=>{const target=document.querySelector('.buy .fill'); if(!target || !window.IntersectionObserver){setShow(true);return} const obs=new IntersectionObserver(([e])=>setShow(!e.isIntersecting),{rootMargin:'0px 0px -80px 0px'}); obs.observe(target); return()=>obs.disconnect()},[]); return <div className={show?'bar show':'bar'}><div>From<b>{formatPrice(product.price)}</b></div><Button onClick={scrollToOrderForm}>Order Deos</Button></div> }

export default function LandingPage(){ const [selectedPackageId, setSelectedPackageId] = React.useState(product.options[0].id); return <><div className="page"><Header/><Hero selectedPackageId={selectedPackageId} onPackageChange={setSelectedPackageId}/><Benefits/><How/><Ingredients/><Reviews/>{/* Related section kept available but deactivated. Render <Related/> here when needed. */}<OrderSection selectedPackageId={selectedPackageId} onPackageChange={setSelectedPackageId}/><Footer/></div><Sticky/></> }



