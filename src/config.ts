// Dados de contato vêm do .env (um lugar só para trocar).
const env = import.meta.env

export const site = {
  url: env.VITE_SITE_URL.replace(/\/$/, ''),
  whatsapp: env.VITE_WHATSAPP,
  phoneDisplay: env.VITE_PHONE_DISPLAY,
  cref: env.VITE_CREF,
  instagram: env.VITE_INSTAGRAM,
  instagramHandle: '@victoroliveira.personal',
  name: 'Victor Oliveira',
  businessName: 'Victor Oliveira Personal Trainer',
  city: 'Vila Velha',
  state: 'ES',
} as const

/** Link do WhatsApp com mensagem pronta, para o Victor saber de onde veio o contato. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
