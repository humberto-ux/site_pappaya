# Site da Pappaya

Site institucional e comercial da Pappaya (CRM Valentina, IA aplicada, automações e consultoria B2B), feito em [Astro](https://astro.build). Gera um site estático: só arquivos HTML, CSS e imagens, que rodam em qualquer hospedagem.

## Páginas

| Endereço | Página |
| --- | --- |
| `/` | Início |
| `/valentina` | CRM Valentina |
| `/incorporadoras` | Incorporação e loteamentos |
| `/hotelaria` | Hotelaria |
| `/solucoes` | Soluções sob projeto |
| `/sobre` | Sobre e contato (formulário em `/sobre#formulario`) |
| `/contato` | Atalho que leva ao formulário |
| `/obrigado` | Confirmação do formulário (fora do índice do Google) |
| `/privacidade` | Política de Privacidade (texto pendente) |
| `/desenvolvimento_site` | Redireciona para `/solucoes` (URL do site antigo) |

Os textos são os aprovados em 20/11/2026 no documento "Textos do site Pappaya".

## Rodar no computador

Precisa do Node.js 22.

```bash
npm install
cp .env.example .env   # preencha os valores
npm run dev            # abre em http://localhost:4321
npm run build          # gera o site em dist/
npm run preview        # mostra o site gerado
```

## Configuração

Tudo que depende de contas da Pappaya fica no arquivo `.env` (veja `.env.example`):

- `PUBLIC_WHATSAPP`: número comercial, só dígitos, com 55 e DDD. Sem ele, os botões de WhatsApp levam ao formulário.
- `PUBLIC_FORM_ENDPOINT`: URL de produção do nó Webhook (POST) do n8n. Sem ela, o formulário avisa que ainda não está ligado.
- `PUBLIC_GTM_ID`: contêiner do Google Tag Manager. O site antigo usa `GTM-M4WV8MVX`.
- `PUBLIC_OCULTAR_PENDENTES`: veja abaixo.

Contatos, redes sociais, prazo de resposta, razão social e CNPJ ficam em `src/config.ts`.

## Frases com prova pendente

Afirmações sobre a Valentina ou sobre clientes que ainda precisam de evidência (tela, vídeo, autorização) estão dentro do componente `<Pendente>`.

- Com `PUBLIC_OCULTAR_PENDENTES=false` (revisão), elas aparecem grifadas com a etiqueta "prova pendente".
- Com `PUBLIC_OCULTAR_PENDENTES=true` (publicação), elas somem do site.

Quando a equipe confirmar um item, basta tirar o `<Pendente>` em volta da frase.

## Logomarca, telas e fotos

- **Logomarca:** provisória. Troque o conteúdo de `src/components/Logo.astro` e `public/favicon.svg` pelo SVG oficial. As cores ficam no início de `src/styles/global.css`.
- **Telas da Valentina:** as janelas que aparecem no site são ilustrações feitas em código, com dados fictícios, em `src/components/mocks/`. Cada uma tem a nota "Espaço reservado" com o que deve entrar no lugar. Para usar uma tela real, coloque a imagem em `src/assets/` e troque o componente da ilustração por `<Image>` do Astro.
- **Fotos de Humberto e da equipe:** espaços reservados na página `/sobre`.

## Formulário → n8n → Valentina

O formulário envia um JSON por POST para `PUBLIC_FORM_ENDPOINT` com: `nome`, `whatsapp` (só dígitos, com 55), `email`, `empresa`, `cargo`, `setor`, `unidades`, `interesse`, `mensagem`, `consentimento`, `pagina`, `origem` ("site"), `enviado_em` e, quando houver, `utm_*`, `gclid` e `fbclid`. Depois do envio, o visitante vai para `/obrigado`.

No n8n, o fluxo procura o contato na Valentina pelo WhatsApp, cria ou anota, distribui conforme "O que você procura" e avisa o responsável. Se algo falhar, mande o pedido por e-mail para a equipe. A chave da API da Valentina fica só nas credenciais do n8n. O webhook precisa aceitar requisições do domínio do site (CORS).

## Medição

O GTM só carrega depois que o visitante aceita os cookies. O site envia ao `dataLayer`:

- `whatsapp_click` em todo clique de WhatsApp, com `pagina_origem`;
- `generate_lead` quando a página `/obrigado` abre;
- `pagina_site` em todas as páginas.

No GTM, crie os eventos GA4 a partir desses nomes e marque `whatsapp_click` e `generate_lead` como eventos principais.

## Publicação

O conteúdo de `dist/` pode ir para qualquer hospedagem de site estático (Hostinger, Vercel, Netlify, Cloudflare Pages). A escolha ainda está em aberto.

Antes de publicar:

- [ ] Logomarca e cores oficiais
- [ ] Número de WhatsApp, webhook do n8n e GTM no `.env`
- [ ] `PUBLIC_OCULTAR_PENDENTES=true`, ou provas confirmadas
- [ ] Política de Privacidade, razão social e CNPJ
- [ ] Um só endereço (com ou sem www), o outro redireciona com 301
- [ ] Testar o formulário de ponta a ponta e cada botão de WhatsApp no celular e no computador
- [ ] Enviar o sitemap (`/sitemap-index.xml`) ao Search Console no dia do lançamento
