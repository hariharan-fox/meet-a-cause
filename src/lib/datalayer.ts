declare global {
  interface Window {
    dataLayer: Record<string, any>[]
  }
}

export const pushEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: eventName,
    ...params,
  })
}

// User signs up / registers account
export const trackSignUp = (method: "email" | "google") => {
  pushEvent("sign_up", { method })
}

// User registers for a cause event
export const trackEventRegistration = (
  eventTitle: string,
  eventId: string,
  causeCategory: string
) => {
  pushEvent("event_registration", {
    event_title: eventTitle,
    event_id: eventId,
    cause_category: causeCategory,
  })
}

// Organisation submits enquiry
export const trackOrgEnquiry = (orgName?: string) => {
  pushEvent("org_enquiry", { org_name: orgName || "unknown" })
}

// For Organisations page view
export const trackForOrgsView = () => {
  pushEvent("for_orgs_page_view")
}

// WhatsApp share click
export const trackWhatsAppShare = (eventTitle: string) => {
  pushEvent("whatsapp_share", { event_title: eventTitle })
}

// LinkedIn share / certificate download
export const trackLinkedInShare = (eventTitle: string) => {
  pushEvent("linkedin_share", { event_title: eventTitle })
}

// Waitlist signup
export const trackWaitlistSignup = (source: string) => {
  pushEvent("waitlist_signup", { source })
}
