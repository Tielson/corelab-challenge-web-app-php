/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL: string
  // Outras variáveis de ambiente que você possa ter
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
