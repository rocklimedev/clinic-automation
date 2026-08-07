/**
 * Fake network layer. Every mock endpoint funnels through here so that
 * swapping in a real HTTP client (fetch/axios) against the future Meta
 * WhatsApp Cloud API backend only requires changing this one function.
 */
export function delay(data, ms = 350) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}
