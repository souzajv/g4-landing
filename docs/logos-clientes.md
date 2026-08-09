# Logos dos clientes — seção "Empresas que confiam no nosso trabalho"

Levantamento de fontes para baixar as 21 logos usadas em `src/components/ClientsMarquee.jsx`.

**Prioridade de fonte:** 1) site/press kit oficial da empresa → 2) Wikimedia Commons → 3) agregadores (Brandfetch, seeklogo, logodownload, worldvectorlogo).

**Formato ideal:** SVG. Se não houver, PNG com fundo transparente e no mínimo ~1000px de largura.

---

## Marcas com fonte oficial disponível

| Empresa | Fonte recomendada | Observação |
|---|---|---|
| **QuintoAndar** | https://newsroom.quintoandar.com.br/logos/ | Newsroom oficial com várias versões da marca. Melhor fonte da lista. |
| **BTG Pactual** | https://www.btgpactual.com/uk/assets/images/our-dna/press/download/Guide.BTGPactual_PT.pdf | Manual de marca oficial (PT). Alternativa: https://brandfetch.com/btgpactual.com |
| **Banco PAN** | https://pt.wikipedia.org/wiki/Ficheiro:Logotipo_do_Banco_Pan.svg | SVG no Wikipédia. Alternativa: https://worldvectorlogo.com/pt/logo/banco-pan-logo-2 |
| **Locaweb** | https://brandfetch.com/locaweb.com.br | Alternativa: https://logodownload.org/locaweb-logo/ (SVG 2018) |
| **Estapar** | https://brandfetch.com/estapar.com.br | Alternativa: https://logodownload.org/estapar-logo/ (SVG 2021) |
| **Sorridents** | https://brandfetch.com/sorridents.com.br | Alternativa: https://seeklogo.com/vector-logo/250266/sorridents |

## Marcas com boas fontes em agregadores

| Empresa | Links |
|---|---|
| **Ri Happy** | https://seeklogo.com/vector-logo/491478/ri-happy-brinquedos (SVG) · https://freebiesupply.com/logos/rihappy-logo/ |
| **Novotel** | https://cdnlogo.com/logo/novotel_6010.html (SVG) · https://seeklogo.com/vector-logo/368087/novotel |
| **Kopenhagen** | https://seeklogo.com/vector-logo/79838/kopenhagen · https://vectorseek.com/vector_logo/kopenhagen-logo-vector/ |
| **Chocolates Brasil Cacau** | https://seeklogo.com/vector-logo/275162/brasil-cacau · https://www.brandsoftheworld.com/logo/brasil-cacau |
| **CTG Brasil** | https://pt.wikipedia.org/wiki/CTG_Brasil (logo no infobox) · site oficial https://www.ctgbr.com.br |

⚠️ Atenção em **Brasil Cacau**: a versão do Brands of the World está marcada como obsoleta. Confira contra o site atual (https://www.brasilcacau.com.br) antes de usar.

## Marcas sem repositório público — extrair do site oficial

Para estas não existe logo em banco de vetores. O caminho é pegar do próprio site (o header quase sempre usa SVG — botão direito → "Inspecionar" → copiar o `<svg>`, ou baixar o arquivo em `Network`), ou pedir o arquivo original ao cliente.

| Empresa | Site oficial | Alternativa |
|---|---|---|
| **l'Oeil** | https://www.loeil.com.br/ | https://br.linkedin.com/company/loeiloficial |
| **Blockbit** | https://www.blockbit.com/pt/ | https://www.linkedin.com/company/blockbitsec |
| **BRQ Digital** | https://www.brq.com/ | https://www.linkedin.com/company/brq |
| **Grupo CRM** | https://grupocrm.gupy.io/ | Holding da Kopenhagen + Brasil Cacau |
| **by Kamy** | https://www.bykamy.com.br/ | Tapetes e decoração (não é a marca de chocolate) |
| **UD House** | https://udhouse.com.br/ | https://br.linkedin.com/company/udhouse |
| **SG Global Group** | https://sgglobal.group/ | https://sgglobal.group/quem-somos |
| **Pimenta Print** | https://pimentaprint.com.br/ | https://br.linkedin.com/company/pimenta-print |
| **Amélio** | https://presentes.amelio.com.br | Confirmar com a G4 qual "Amélio" é o cliente |
| **TV Group** | — | Nome ambíguo; pedir o arquivo direto ao cliente |

---

## Truque para as difíceis

O **Brandfetch** indexa por domínio. Vale tentar `https://brandfetch.com/<dominio>` para qualquer uma da lista:

```
brandfetch.com/blockbit.com
brandfetch.com/brq.com
brandfetch.com/bykamy.com.br
brandfetch.com/udhouse.com.br
brandfetch.com/loeil.com.br
brandfetch.com/pimentaprint.com.br
brandfetch.com/sgglobal.group
```

---

## Preparo dos arquivos

1. Salvar em `public/images/clientes/` com nome em slug: `quintoandar.svg`, `btg-pactual.svg`, `banco-pan.svg`…
2. Padronizar altura (ex.: 40px de altura visual) — as logos têm proporções muito diferentes e ficam desalinhadas no marquee sem isso.
3. Para o efeito clássico de "prova social", aplicar `grayscale opacity-60` e reverter no hover, em vez de usar as logos coloridas.
4. PNGs: exportar em 2× (ex.: 80px de altura real) para não borrar em telas retina.

## Aviso sobre direitos

Logos são marcas registradas. Exibir a logo de um cliente numa página institucional exige autorização dele — o padrão do mercado é uma cláusula de uso de marca no contrato ou um aceite por e-mail. Vale confirmar com a G4 quais desses clientes já autorizaram antes de publicar.
