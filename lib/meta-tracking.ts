type TrackingWindow = {
  fbq?: (...args: unknown[]) => void
  korretdealsMetaPixelInitialized?: boolean
}

export function trackSavedPurchase(reference: string, pixel: TrackingWindow, session: Storage, local: Storage) {
  if (!reference || !pixel.korretdealsMetaPixelInitialized || typeof pixel.fbq !== "function") return

  try {
    const saved = JSON.parse(session.getItem(`korretdeals:order-saved:${reference}`) || "null")
    if (saved?.success !== true || saved.reference !== reference || !saved.savedAt) return

    const consent = ["korretdeals_marketing_consent", "cookie_consent_marketing", "marketing_consent"]
      .map((key) => local.getItem(key))
      .filter((value) => value !== null)
    if (consent.some((value) => value !== "granted")) return

    const trackedKey = `korretdeals:meta-purchase-tracked:${reference}`
    if (local.getItem(trackedKey)) return

    // Persist before queueing so repeated effects and revisits cannot queue a duplicate.
    local.setItem(trackedKey, new Date().toISOString())
    pixel.fbq("track", "Purchase")
  } catch {
    // Without readable proof and persistent deduplication, do not send a conversion.
  }
}
