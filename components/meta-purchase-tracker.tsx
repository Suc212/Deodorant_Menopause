"use client"

import { useEffect } from "react"
import { trackSavedPurchase } from "@/lib/meta-tracking"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    korretdealsMetaPixelInitialized?: boolean
  }
}

export default function MetaPurchaseTracker({ reference }: { reference?: string }) {
  useEffect(() => {
    if (!reference) return
    const track = () => {
      try {
        trackSavedPurchase(reference, window, window.sessionStorage, window.localStorage)
      } catch {
        // Browser storage may be unavailable.
      }
    }
    window.addEventListener("korretdeals:meta-pixel-ready", track)
    window.addEventListener("storage", track)
    // Also notice consent updates made in this tab, which do not emit storage events.
    const timer = window.setInterval(track, 1000)
    track()
    return () => {
      window.clearInterval(timer)
      window.removeEventListener("korretdeals:meta-pixel-ready", track)
      window.removeEventListener("storage", track)
    }
  }, [reference])

  return null
}
