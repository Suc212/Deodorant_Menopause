import Link from "next/link"

export const metadata = {
  title: "Order Confirmed | Deos",
  description: "Your Deos order has been received."
}

type SuccessPageProps = {
  searchParams?: Promise<{ reference?: string }>
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams
  const reference = params?.reference

  return (
    <main className="success-page">
      <section className="success-panel">
        <a className="logo" href="/">Korretdeals<small>All the best deals in one store</small></a>
        <div className="success-mark">OK</div>
        <h1>Order received</h1>
        <p>
          Thank you for ordering Deos. We have received your order and will contact you on WhatsApp or phone within 24-48 hours to confirm your delivery details.
        </p>
        {reference ? <p className="order-reference">Reference: <strong>{reference}</strong></p> : null}
        <div className="success-actions">
          <Link className="btn fill" href="/">Back to Deos</Link>
          <Link className="btn line" href="/#order-form">Place another order</Link>
        </div>
      </section>
    </main>
  )
}