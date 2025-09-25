/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NG_APP_API_URL: string;
  readonly PROD: boolean;
  // thêm biến khác nếu cần
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
