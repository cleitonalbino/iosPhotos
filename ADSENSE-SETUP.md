# Configuração do Google AdSense

Para ativar os anúncios do Google AdSense no app, siga os passos abaixo:

## 1. Criar conta no Google AdSense

1. Acesse [https://www.google.com/adsense](https://www.google.com/adsense)
2. Crie uma conta ou faça login
3. Adicione seu site/domínio
4. Aguarde aprovação do Google (pode levar alguns dias)

## 2. Obter seu ID de Cliente

Após aprovação, você receberá um ID de cliente no formato:
```
ca-pub-XXXXXXXXXXXXXXXXX
```

## 3. Configurar o ID no código

Você precisa substituir `ca-pub-XXXXXXXXXXXXXXXXX` em **2 arquivos**:

### Arquivo 1: `app/layout.tsx` (linha 31)

```tsx
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-SEU-ID-AQUI"
  crossOrigin="anonymous"
></script>
```

### Arquivo 2: `app/components/AdSenseAd.tsx` (linha 28)

```tsx
<ins
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client="ca-pub-SEU-ID-AQUI"
  data-ad-slot={adSlot}
  data-ad-format="auto"
  data-full-width-responsive="true"
></ins>
```

## 4. Configurar Ad Slot (Opcional)

Se quiser usar slots de anúncios específicos:

1. No painel do AdSense, crie unidades de anúncio
2. Copie o ID do slot (ex: `1234567890`)
3. No arquivo `app/[id]/page.tsx`, modifique a linha 213:

```tsx
<AdSenseAd adSlot="SEU-AD-SLOT-ID" />
```

## 5. Como funcionam os anúncios no app

- Um anúncio aparece a cada 5 imagens visualizadas
- O anúncio ocupa uma tela inteira, como as imagens
- Possui um indicador "Anúncio" no canto superior esquerdo
- É responsivo e se adapta ao tamanho da tela

## 6. Testando

Durante o desenvolvimento:
- Os anúncios podem não aparecer em localhost
- Use a extensão "AdSense Invalid Click Protector" para evitar cliques acidentais
- Nunca clique nos próprios anúncios (viola políticas do AdSense)

## 7. Deploy

Para os anúncios funcionarem corretamente:
- Faça deploy em um domínio público
- Adicione o domínio no painel do AdSense
- Aguarde aprovação do domínio

## Estrutura do código

```
/app
  /components
    AdSenseAd.tsx          # Componente do anúncio
  /[id]
    page.tsx               # Lógica de inserção a cada 5 imagens
  layout.tsx               # Script do AdSense
```

## Problemas comuns

1. **Anúncios não aparecem**: Verifique se o ID está correto em ambos os arquivos
2. **"AdSense not loaded"**: O script pode estar bloqueado por AdBlockers
3. **Anúncios em branco**: Pode levar até 24h após configuração para anúncios aparecerem

## Política do AdSense

- Não clique nos próprios anúncios
- Não peça para outros clicarem
- Não use métodos artificiais para gerar cliques
- Respeite as [Políticas do Google AdSense](https://support.google.com/adsense/answer/48182)
