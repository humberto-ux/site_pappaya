interface ImportMetaEnv {
  readonly PUBLIC_WHATSAPP?: string;
  readonly PUBLIC_FORM_ENDPOINT?: string;
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_OCULTAR_PENDENTES?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
