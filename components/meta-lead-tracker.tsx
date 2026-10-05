"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    korretdealsMetaPixelReady?: boolean
  }
}

type MetaPurchaseTrackerProps = {
  reference?: string
  productName: string
}

function hasMarketingConsent() {
  try {
    const explicitConsent = localStorage.getItem("korretdeals_marketing_consent")
    const cookieConsent = localStorage.getItem("cookie_consent_marketing")
    const marketingConsent = localStorage.getItem("marketing_consent")

    if ([explicitConsent, cookieConsent, marketingConsent].includes("denied")) {
      return false
    }

    if ([explicitConsent, cookieConsent, marketingConsent].includes("granted")) {
      return true
    }
  } catch {
    return true
  }

  return true
}

export default function MetaPurchaseTracker({ reference, productName }: MetaPurchaseTrackerProps) {
  useEffect(() => {
    if (!reference) {
      return
    }

    const savedOrderKey = `korretdeals:order-saved:${reference}`
    const leadTrackedKey = `korretdeals:meta-purchase-tracked:${reference}`

    const firePurchase = () => {
      const savedOrder = sessionStorage.getItem(savedOrderKey)
      const alreadyTracked = localStorage.getItem(leadTrackedKey)

      if (!savedOrder || alreadyTracked || !hasMarketingConsent() || typeof window.fbq !== "function") {
        return
      }

      window.fbq("track", "Purchase", {
        content_name: productName,
        order_reference: reference
      })
      localStorage.setItem(leadTrackedKey, new Date().toISOString())
    }

    if (window.korretdealsMetaPixelReady) {
      firePurchase()
      return
    }

    window.addEventListener("korretdeals:meta-pixel-ready", firePurchase, { once: true })
    return () => window.removeEventListener("korretdeals:meta-pixel-ready", firePurchase)
  }, [productName, reference])

  return null
}