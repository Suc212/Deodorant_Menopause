import Link from "next/link"
import MetaPixel from "@/components/meta-pixel"

export const metadata = {
  title: "Order Confirmed | Korretdeals",
  description: "Your Korretdeals order has been received."
}

type SuccessPageProps = {
  searchParams?: Promise<{ reference?: string; product?: string }>
}

function getProductPath(productName: string) {
  return productName.toLowerCase().includes("rehab") ? "/rehab-helper-glove" : "/deos"
}

function getOrderAgainPath(productName: string) {
  return `${getProductPath(productName)}#order-form`
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams
  const reference = params?.reference
  const productName = params?.product || "your product"

  return (
    <>
      <MetaPixel />
      <main className="success-page">
      <section className="success-panel">
        <a className="logo" href="/">Korretdeals<small>All the best deals in one store</small></a>
        <div className="success-mark">OK</div>
        <h1>Order received</h1>
        <p>
          Thank you for ordering {productName}. We have received your order and will contact you on WhatsApp or phone within 24-48 hours to confirm your delivery details.
        </p>
        {reference ? <p className="order-reference">Reference: <strong>{reference}</strong></p> : null}
        <div className="success-actions">
          <Link className="btn fill" href={getProductPath(productName)}>Back to product</Link>
          <Link className="btn line" href={getOrderAgainPath(productName)}>Place another order</Link>
        </div>
      </section>
      </main>
    </>
  )
}
