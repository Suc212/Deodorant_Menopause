"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    korretdealsMetaPixelReady?: boolean
  }
}

type MetaLeadTrackerProps = {
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

export default function MetaLeadTracker({ reference, productName }: MetaLeadTrackerProps) {
  useEffect(() => {
    if (!reference) {
      return
    }

    const savedOrderKey = `korretdeals:order-saved:${reference}`
    const leadTrackedKey = `korretdeals:meta-lead-tracked:${reference}`

    const fireLead = () => {
      const savedOrder = sessionStorage.getItem(savedOrderKey)
      const alreadyTracked = localStorage.getItem(leadTrackedKey)

      if (!savedOrder || alreadyTracked || !hasMarketingConsent() || typeof window.fbq !== "function") {
        return
      }

      window.fbq("track", "Lead", {
        content_name: productName,
        order_reference: reference
      })
      localStorage.setItem(leadTrackedKey, new Date().toISOString())
    }

    if (window.korretdealsMetaPixelReady) {
      fireLead()
      return
    }

    window.addEventListener("korretdeals:meta-pixel-ready", fireLead, { once: true })
    return () => window.removeEventListener("korretdeals:meta-pixel-ready", fireLead)
  }, [productName, reference])

  return null
}