/**
 * Configurações do site da Pappaya.
 * Valores que dependem de contas da empresa vêm de variáveis de ambiente
 * (veja .env.example). Os demais ficam aqui para a equipe editar.
 */

export const site = {
  nome: 'Pappaya',
  url: 'https://www.pappaya.com.br',
  assinatura: 'CRM, IA e automação para operações comerciais.',
  // [Prazo a confirmar pela Pappaya.]
  prazoResposta: 'um dia útil',
  email: '', // ex.: contato@pappaya.com.br (a confirmar)
  instagram: '', // URL completa (a confirmar)
  linkedinEmpresa: '', // URL completa (a confirmar)
  linkedinHumberto: '', // URL completa (a confirmar)
  // [Razão social e CNPJ a confirmar. O site antigo cita Metaflow Soluções Digitais Ltda.]
  razaoSocial: '',
  cnpj: '',
};

export const whatsappNumero = (import.meta.env.PUBLIC_WHATSAPP ?? '').replace(/\D/g, '');
export const formEndpoint = import.meta.env.PUBLIC_FORM_ENDPOINT ?? '';
export const gtmId = import.meta.env.PUBLIC_GTM_ID ?? '';
export const ocultarPendentes = import.meta.env.PUBLIC_OCULTAR_PENDENTES === 'true';

/** Texto pronto de cada página, para a equipe saber de onde o contato veio. */
export const mensagensWhatsApp = {
  inicio: 'Olá! Vim pelo site da Pappaya e quero conversar sobre a minha operação.',
  valentina: 'Olá! Vim pela página da Valentina e quero agendar uma demonstração.',
  incorporacao: 'Olá! Vim pela página de Incorporação e quero ver a Valentina com um empreendimento meu.',
  hotelaria: 'Olá! Vim pela página de Hotelaria e quero ver o roteiro de cotação.',
  solucoes: 'Olá! Vim pela página de Soluções e quero falar sobre um diagnóstico.',
  sobre: 'Olá! Vim pelo site da Pappaya e ainda não sei qual é o melhor caminho.',
} as const;

export type PaginaId = keyof typeof mensagensWhatsApp;

/**
 * Link do WhatsApp com o texto pronto da página.
 * Sem número configurado, leva ao formulário para nenhum contato se perder.
 */
export function linkWhatsApp(pagina: PaginaId): string {
  if (!whatsappNumero) return '/sobre#formulario';
  return `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensagensWhatsApp[pagina])}`;
}

/** Link para o formulário já com o interesse marcado. */
export function linkFormulario(interesse: 'valentina' | 'projeto' | 'conversa'): string {
  return `/sobre?interesse=${interesse}#formulario`;
}

export const navegacao = [
  { href: '/valentina', rotulo: 'CRM Valentina' },
  { href: '/incorporadoras', rotulo: 'Incorporação' },
  { href: '/hotelaria', rotulo: 'Hotelaria' },
  { href: '/solucoes', rotulo: 'Soluções' },
  { href: '/sobre', rotulo: 'Sobre' },
];
