/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_R3F?: string;
  readonly VITE_PAWN_R3F?: string;
  readonly VITE_WS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
