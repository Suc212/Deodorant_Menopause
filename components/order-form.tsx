"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { formatPrice, product, type ProductData } from "@/lib/product"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type FormDataState = {
  firstName: string
  lastName: string
  address: string
  email: string
  phone: string
  whatsapp: string
  notes: string
}

const initialFormData: FormDataState = {
  firstName: "",
  lastName: "",
  address: "",
  email: "",
  phone: "+233",
  whatsapp: "+233",
  notes: ""
}

type OrderFormProps = {
  selectedPackageId: string
  onPackageChange: (packageId: string) => void
  productData?: ProductData
}

export default function OrderForm({ selectedPackageId, onPackageChange, productData = product }: OrderFormProps) {
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const selectedPackage = useMemo(
    () => productData.options.find((option) => option.id === selectedPackageId) ?? productData.options[0],
    [productData, selectedPackageId]
  )

  const handleInputChange = (field: keyof FormDataState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, productId: productData.id, packageId: selectedPackageId })
      })
      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(result?.error ?? "There was an error submitting your order.")
      }

      router.push(`/success?reference=${encodeURIComponent(result?.reference ?? "")}&product=${encodeURIComponent(productData.name)}`)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "There was an error submitting your order.")
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <Card>
      <CardHeader>
        <CardTitle>{productData.name}</CardTitle>
        <p>We will contact you within 24-48 hours to confirm your order and delivery details.</p>
      </CardHeader>
      <CardContent>
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="field-grid two">
            <div className="field-group">
              <Label htmlFor="firstName">First name *</Label>
              <Input id="firstName" value={formData.firstName} onChange={(event) => handleInputChange("firstName", event.target.value)} required />
            </div>
            <div className="field-group">
              <Label htmlFor="lastName">Last name *</Label>
              <Input id="lastName" value={formData.lastName} onChange={(event) => handleInputChange("lastName", event.target.value)} required />
            </div>
          </div>

          <div className="field-group">
            <Label htmlFor="address">Delivery address *</Label>
            <Input id="address" value={formData.address} onChange={(event) => handleInputChange("address", event.target.value)} required />
          </div>

          <div className="field-grid two">
            <div className="field-group">
              <Label htmlFor="phone">Phone number *</Label>
              <Input id="phone" value={formData.phone} onChange={(event) => handleInputChange("phone", event.target.value)} required />
            </div>
            <div className="field-group">
              <Label htmlFor="whatsapp">WhatsApp number *</Label>
              <Input id="whatsapp" value={formData.whatsapp} onChange={(event) => handleInputChange("whatsapp", event.target.value)} required />
            </div>
          </div>

          <div className="field-group">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={(event) => handleInputChange("email", event.target.value)} />
          </div>

          <div className="field-group">
            <Label htmlFor="packageId">Package *</Label>
            <select id="packageId" className="field-control" value={selectedPackageId} onChange={(event) => onPackageChange(event.target.value)} required>
              {productData.options.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className="selected-package">
            <span>{selectedPackage.detail}</span>
            <b>{formatPrice(selectedPackage.price)}</b>
          </div>

          <div className="field-group">
            <Label htmlFor="notes">Delivery notes</Label>
            <Textarea id="notes" value={formData.notes} onChange={(event) => handleInputChange("notes", event.target.value)} placeholder="Landmark, preferred time, or special instructions" />
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="spin" size={16} /> Processing order...</> : "Ship my order"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
