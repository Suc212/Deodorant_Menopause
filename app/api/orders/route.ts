import { promises as fs } from "fs"
import path from "path"
import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { product } from "@/lib/product"

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

async function appendOrder(order: unknown) {
  const contentDir = path.join(process.cwd(), "content")
  const ordersPath = path.join(contentDir, "orders.json")
  await fs.mkdir(contentDir, { recursive: true })

  let orders: unknown[] = []
  try {
    orders = JSON.parse(await fs.readFile(ordersPath, "utf8")) as unknown[]
  } catch {
    orders = []
  }

  orders.push(order)
  await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2), "utf8")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const orderData = orderSchema.parse(body)
    const selectedPackage = product.options.find((option) => option.id === orderData.packageId)

    if (!selectedPackage) {
      return NextResponse.json({ error: "Selected package is not available" }, { status: 400 })
    }

    const reference = `DEOS-${Date.now()}`
    await appendOrder({
      reference,
      product: product.name,
      package: selectedPackage,
      customer: orderData,
      status: "pending",
      createdAt: new Date().toISOString()
    })

    return NextResponse.json({ success: true, reference })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }

    const message = error instanceof Error ? error.message : "Internal server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}



