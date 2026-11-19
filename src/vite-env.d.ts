/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string
  readonly VITE_WHATSAPP: string
  readonly VITE_PHONE_DISPLAY: string
  readonly VITE_CREF: string
  readonly VITE_INSTAGRAM: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Ano do build, injetado pelo vite.config.ts. */
declare const __BUILD_YEAR__: number
