import { PurchaseProvider, ProductHero, ProductOrderSection, StickyOrderBar } from "@/components/product-purchase"
import { formatPrice, rehabHelperGloveProduct as product } from "@/lib/product"
const benefits = [
  ["Assisted hand movement", "Supports gentle opening and closing practice for fingers that feel weak, stiff or difficult to control."],
  ["Simple home routine", "Designed for short daily sessions at home, so hand exercise feels less complicated and easier to repeat."],
  ["Adjustable support", "The glove-style design helps keep the hand supported while straps are adjusted for a comfortable fit."]
]

const steps = [
  ["Wear", "Place the Rehab Helper Glove on the hand that needs support and adjust the fit gently."],
  ["Practice", "Use short guided sessions for finger extension, grip practice and slow mobility work."],
  ["Repeat", "Build a consistent daily routine while following the advice of your physiotherapist or healthcare provider."]
]

const details = [
  ["Finger mobility support", "Built to help users practice controlled finger movement without needing bulky equipment."],
  ["Grip confidence", "Useful for people who want extra support while practicing simple grip and release motions."],
  ["Caregiver friendly", "Easy to understand, easy to adjust and practical for assisted routines at home."]
]

const reviews = [
  ["It helped my dad stay consistent with his hand exercises because the routine finally felt simple enough to do at home.", "Kojo, Accra", "5/5"],
  ["My mum struggles with stiffness, and the glove gave us a more organised way to support her hand practice every morning.", "Efe, Tema", "4.5/5"],
  ["I like that it is not complicated. It made my grip practice feel less frustrating and easier to repeat.", "Yaw, Kumasi", "5/5"]
]

const supportPoints = [
  ["Recovery needs repetition", "Hand mobility usually improves through consistent, guided practice. A helper glove gives structure to that routine."],
  ["Small movements matter", "Opening the fingers, practicing grip and repeating comfortable motions can help a person regain confidence in everyday tasks."],
  ["Use it with professional advice", "This product is a support aid. It works best as part of a rehab plan from a physiotherapist, clinician or trained caregiver."]
]

function Logo() {
  return <a className="logo" href="#top">{product.brand}<small>{product.tagline}</small></a>
}

function Header() {
  return <nav><Logo/><ul><li><a href="#benefits">Benefits</a></li><li><a href="#how">How it works</a></li><li><a href="#reviews">Reviews</a></li></ul><div className="navr"><a href="#order-form">Order</a></div></nav>
}

function Benefits(){ return <section id="benefits"><h2>Why people use the Rehab Helper Glove</h2><div className="benefits">{benefits.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section> }
function Problem(){ return <section className="story-section"><div className="story-intro"><h2>Hand recovery is easier when the routine is clear</h2><p>Weak grip, stiff fingers and reduced hand control can make ordinary tasks feel difficult. The Rehab Helper Glove gives people and caregivers a simple way to support repeated hand movement practice at home.</p></div><div className="story-grid">{supportPoints.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section> }
function How(){ return <section id="how"><div className="split"><div className="ph image-ph"><img loading="lazy" decoding="async" src="/rehab-helper-glove.svg" alt="Rehab Helper Glove illustration" /></div><div><h2>Your daily routine, in three steps</h2><ol className="steps">{steps.map(([title,text])=><li key={title}><b>{title}</b>{text}</li>)}</ol></div></div></section> }
function Details(){ return <section><div className="split"><div><h2>What it helps you practice</h2><p>The glove is made for guided support during hand mobility work, especially when a person needs help making practice feel steady and repeatable.</p><div className="ingredient-list">{details.map(([title,text])=><div key={title}><b>{title}</b><p>{text}</p></div>)}</div><a className="more" href="#order-form">Order the glove</a></div><div className="ph image-ph"><img loading="lazy" decoding="async" src="/rehab-helper-glove.svg" alt="Adjustable hand rehabilitation glove" /></div></div></section> }
function Offer(){ return <section className="solution-section"><div><h2>A practical buy for home rehab support</h2><p>The Rehab Helper Glove is a focused tool for families, caregivers and individuals who want a clear hand exercise aid without a complicated setup.</p><p>Choose one glove to start, or select a multi-glove package when more than one person, caregiver station or therapy location needs support.</p><a className="more" href="#order-form">Choose your package</a></div><div className="solution-points">{product.options.map((option)=><article key={option.id}><h3>{option.label}</h3><p>{option.detail} for {formatPrice(option.price)}.</p></article>)}</div></section> }
function Reviews(){ return <section id="reviews"><h2>Customer experiences</h2><div className="quotes">{reviews.map(([quote,name,stars])=><figure key={quote}><blockquote>{quote}</blockquote><div className="stars">{stars}</div><figcaption>{name}</figcaption></figure>)}</div></section> }
function Footer(){ const links=["Rehab Helper Glove","Single glove","Two glove offer","Family support pack","Delivery"]; return <><footer><div><a className="logo" href="#top">Korretdeals<small>All the best deals in one store</small></a></div><div><h4>Shop</h4><ul>{links.map(l=><li key={l}>{l}</li>)}</ul></div></footer><div className="legal"><span>(c) Korretdeals</span><span><a href="#privacy">Privacy</a><a href="#terms">Terms</a></span></div></> }

export default function RehabHelperGloveLanding(){ return <PurchaseProvider product={product}><div className="page rehab-page"><Header/><ProductHero/><Benefits/><Problem/><How/><Details/><Offer/><Reviews/><ProductOrderSection/><Footer/></div><StickyOrderBar/></PurchaseProvider> }