# Cotação

No celular (abaixo de 768 px), o formulário tem três etapas: Contato, Transporte e pagamento, Dados da carga. Os campos permanecem montados para preservar os dados entre etapas. No desktop há duas etapas: Contato e transporte, Carga e confirmação. O CAPTCHA aparece na etapa final, em formato horizontal, com versão compacta em telas abaixo de 380 px. O envio verifica os campos obrigatórios, serviço permitido e token CAPTCHA.

O formulário aceita somente Rodoviário Convencional e Aéreo Convencional. Os botões dos outros serviços abrem uma solicitação por e-mail, sem selecionar uma modalidade incorreta. Pagador do frete identifica pelo nome ou razão social quem pagará o transporte. As medidas seguem comprimento, largura e altura em centímetros.

## Ativação do envio e CAPTCHA

1. Configure `VITE_WEB3FORMS_KEY` no ambiente da aplicação e gere um novo build.
2. No painel da conta Web3Forms, abra as configurações do formulário e habilite **hCaptcha** em **Block Spam**. Essa configuração é necessária para rejeitar tokens ausentes ou inválidos no servidor, inclusive em requisições feitas fora da interface.
3. Valide no domínio publicado uma solicitação autorizada com o CAPTCHA concluído e confirme o recebimento. Não há chave Web3Forms no ambiente local; nenhum envio real foi feito durante a implementação.

Integração oficial: https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha

O widget utiliza a sitekey pública indicada pelo Web3Forms para o plano gratuito. Tokens são limpos após tentativas de envio e ao expirar. Falhas de carregamento oferecem nova tentativa. A verificação externa exige acesso aos domínios do hCaptcha.

Verificação local: `node --test tests/quote.test.mjs` e `npm run build`. O fluxo das etapas foi também verificado no navegador sem enviar cotação.
