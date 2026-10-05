import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { formatPrice, product } from "@/lib/product"

const orderSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Delivery address is required"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(1, "Phone number is required"),
  whatsapp: z.string().min(1, "WhatsApp number is required"),
  packageId: z.string().min(1, "Package is required"),
  notes: z.string().optional()
})

type OrderData = z.infer<typeof orderSchema>

type SavedOrder = {
  reference: string
  product: string
  package: (typeof product.options)[number]
  customer: OrderData
  status: "pending"
  createdAt: string
  databaseId?: string
}

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { timestampValue: string }
  | { mapValue: { fields: FirestoreFields } }

type FirestoreFields = Record<string, FirestoreValue>

function getFetchErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return "fetch failed"
  }

  const cause = error.cause
  if (cause && typeof cause === "object") {
    const details = cause as { code?: string; message?: string; errno?: string; syscall?: string; hostname?: string }
    const parts = [details.code, details.message, details.errno, details.syscall, details.hostname].filter(Boolean)

    if (parts.length > 0) {
      return `${error.message} (${parts.join("; ")})`
    }
  }

  return error.message
}
function escapeHtml(value: string | undefined) {
  return (value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function getRecipients() {
  return (process.env.ORDER_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean)
}

function requireEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is not set`)
  }

  return value
}

function getFirebaseConfig() {
  return {
    apiKey: process.env.FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || ""
  }
}

function buildFirestoreFields(order: SavedOrder): FirestoreFields {
  return {
    reference: { stringValue: order.reference },
    product: { stringValue: order.product },
    status: { stringValue: order.status },
    createdAt: { timestampValue: order.createdAt },
    package: {
      mapValue: {
        fields: {
          id: { stringValue: order.package.id },
          label: { stringValue: order.package.label },
          detail: { stringValue: order.package.detail },
          price: { integerValue: String(order.package.price) }
        }
      }
    },
    customer: {
      mapValue: {
        fields: {
          firstName: { stringValue: order.customer.firstName },
          lastName: { stringValue: order.customer.lastName },
          address: { stringValue: order.customer.address },
          email: { stringValue: order.customer.email || "" },
          phone: { stringValue: order.customer.phone },
          whatsapp: { stringValue: order.customer.whatsapp },
          notes: { stringValue: order.customer.notes || "" },
          packageId: { stringValue: order.customer.packageId }
        }
      }
    }
  }
}

function buildOrderEmailHtml(order: SavedOrder) {
  const customerName = `${order.customer.firstName} ${order.customer.lastName}`.trim()

  return `
    <h2>New Deos Order Received</h2>
    <h3>Order Summary</h3>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(customerName)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(order.customer.phone)}</li>
      <li><strong>WhatsApp:</strong> ${escapeHtml(order.customer.whatsapp)}</li>
      <li><strong>Email:</strong> ${escapeHtml(order.customer.email || "Not provided")}</li>
      <li><strong>Address:</strong> ${escapeHtml(order.customer.address)}</li>
      <li><strong>Product:</strong> ${escapeHtml(order.product)}</li>
      <li><strong>Package:</strong> ${escapeHtml(order.package.detail)}</li>
      <li><strong>Price:</strong> ${escapeHtml(formatPrice(order.package.price))}</li>
      <li><strong>Notes:</strong> ${escapeHtml(order.customer.notes || "None")}</li>
      <li><strong>Order Time:</strong> ${escapeHtml(new Date(order.createdAt).toLocaleString("en-GB", { timeZone: "Africa/Accra" }))}</li>
      <li><strong>Order Reference:</strong> ${escapeHtml(order.reference)}</li>
    </ul>
  `
}

async function saveOrderToFirestore(order: SavedOrder) {
  const { apiKey, projectId } = getFirebaseConfig()

  if (!apiKey || !projectId) {
    throw new Error("Firebase API key and project ID are required")
  }

  const documentId = encodeURIComponent(order.reference)
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/orders?documentId=${documentId}&key=${encodeURIComponent(apiKey)}`
  let response: Response
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: buildFirestoreFields(order) })
    })
  } catch (error) {
    const message = getFetchErrorMessage(error)
    throw new Error(`Could not reach Firestore while saving the order: ${message}`)
  }
  const result = await response.json().catch(() => null)

  if (!response.ok) {
    const message = result?.error?.message || "Failed to save order to Firestore"
    throw new Error(message)
  }

  return result?.name as string | undefined
}

async function sendOrderNotification(order: SavedOrder) {
  const apiKey = requireEnv("RESEND_API_KEY")
  const recipients = getRecipients()
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

  if (recipients.length === 0) {
    throw new Error("ORDER_NOTIFICATION_EMAIL or ADMIN_EMAIL is not set")
  }

  let response: Response
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: recipients,
        subject: `New Deos order: ${order.reference}`,
        html: buildOrderEmailHtml(order)
      })
    })
  } catch (error) {
    const message = getFetchErrorMessage(error)
    throw new Error(`Could not reach Resend while sending the order email: ${message}`)
  }

  const result = await response.json().catch(() => null)

  if (!response.ok) {
    const message = result?.message || result?.error || "Failed to send email notification"
    throw new Error(message)
  }

  return result
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const orderData = orderSchema.parse(body)
    const selectedPackage = product.options.find((option) => option.id === orderData.packageId)

    if (!selectedPackage) {
      return NextResponse.json({ error: "Selected package is not available" }, { status: 400 })
    }

    const order: SavedOrder = {
      reference: `DEOS-${Date.now()}`,
      product: product.name,
      package: selectedPackage,
      customer: orderData,
      status: "pending",
      createdAt: new Date().toISOString()
    }

    order.databaseId = await saveOrderToFirestore(order)
    await sendOrderNotification(order)

    return NextResponse.json({ success: true, reference: order.reference })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }

    console.error("Order submission failed:", error)
    const message = error instanceof Error ? error.message : "Internal server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}