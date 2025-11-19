# Super Pagamentos Dashboard ![Dashboard](https://raw.githubusercontent.com/wellington-tinho/super_pagamentos/refs/heads/main/public/logo.svg)

Interface de dashboard financeira construída em Vue 3 (Composition API) com foco em fidelidade total ao layout do Figma, responsividade entre desktop e mobile e uma arquitetura organizada por features que facilita escalabilidade.

## Demo e Preview
- Demo online: [https://super-pagamentos.vercel.app](https://super-pagamentos.vercel.app)
- Screenshot principal:
  ![Dashboard](https://raw.githubusercontent.com/wellington-tinho/super_pagamentos/refs/heads/main/public/demo.png)

## Stack & Principais Dependências
- Vue 3 + Vite
- Vue Router para navegação declarativa
- Element Plus para o seletor de datas com locale pt-BR
- Vue ApexCharts + ApexCharts para os gráficos responsivos
- Axios com interceptors centralizados (`apiService.js`)
- Fonte `Plus Jakarta Sans` e tokens globais definidos em `src/styles/global.css`

## Arquitetura
- Organização por features (dashboard/, charts/, layout/, etc.) com componentes reutilizáveis em `src/components`.
- Lógica compartilhada isolada em composables (`useDashboardMetrics`, `useDateRange`, `useMenu`), mantendo os componentes focados apenas em layout e estado local.
- Tokens globais de cor, tipografia, espaçamento e breakpoints em `src/styles/global.css`, garantindo pixel-perfect com o Figma.
- Camada de serviços (`src/services/apiService.js`) com `axios.create()`, interceptors e funções como `getDashboardMetrics`, permitindo trocar de mock para API real sem mudar os componentes.
- Dados mockados em `src/data/mock.json`, consumidos pelos composables para simular respostas reais enquanto a API não está disponível.

```
src/
  assets/            # Ícones do menu, botões e logotipos das bandeiras
  components/
    Base*.vue        # Design system: botões, cards, inputs, tags
    charts/          # BarChart, BarChartMobile, DonutChart encapsulados
    dashboard/       # RevenueCard, MetricCard, PendingTransferCard etc.
    layout/          # Sidebar, Header, MobileHeader, BottomNavigation
  composables/       # useDashboardMetrics, useMenu, useDateRange
  data/mock.json     # Fonte primária das métricas usadas no dashboard
  router/            # Rotas declaradas (Dashboard como rota principal)
  services/          # apiService com axios + helpers
  styles/global.css  # Design tokens e utilitários
  views/Dashboard.vue# Página principal que orquestra os blocos
```

## Recursos em Destaque
- **Layout híbrido desktop/mobile:** Sidebar fixa com estados colapsado/expandido, header contextual e `BottomNavigation.vue` que replica o menu no mobile sem perder funcionalidades.
- **Design system reutilizável:** `BaseButton`, `BaseCard`, `BaseInput`, `BaseSelect` e `BaseTag` padronizam tipografia, raios e sombras exigidos no Figma.
- **Gráficos responsivos:** `BarChart.vue` e `BarChartMobile.vue` usam ApexCharts com gradientes dinâmicos, alturas adaptativas e limitação de valores para manter a escala coerente.
- **Fluxo de dados desacoplado:** `useDashboardMetrics` centraliza fetch, loading, erros e formatações de moeda/percentual, permitindo alternar da camada mock para API real apenas trocando uma flag.
- **Controle de datas contextual:** `DateRange.vue` encapsula `el-date-picker` com locale pt-BR, atalhos configuráveis (últimos 7/15/30 dias, mês atual) e estilização com `:deep` para respeitar o layout.
- **Componentes específicos do dashboard:** Cards de métricas (`MetricCard`, `FinancialMetricsCard`, `RevenueCard*`), conversão por modalidade, tabela de bandeiras e `PendingTransferCard` com CTA “Autorizar transferência”.
- **Tokens globais:** cores, espaçamentos 4/8/16/24/32, raios 8/12/16/24px e breakpoints (375px e 1920px) aplicados em toda a UI para garantir consistência.

## Variáveis de Ambiente
Crie um arquivo `.env` (ou `.env.local`) quando for consumir uma API real:

```
VITE_API_BASE_URL=https://sua-api.com
```

## Como Rodar o Projeto
### Pré-requisitos
- Node.js 18+ (recomendado 18.18 ou superior)
- pnpm (preferido) ou npm/yarn

### Passos
```bash
# 1. Instale as dependências
pnpm install

# 2. Suba o servidor de desenvolvimento
pnpm dev

# 3. Abra o dashboard
http://localhost:5173

ou

# Instale as dependências
npm install

# Suba o servidor de desenvolvimento
npm dev
```

### Outros scripts úteis
```bash
pnpm build    # Gera a versão otimizada para produção
pnpm preview  # Serve o build localmente em modo pré-produção
```

## Fluxo de Desenvolvimento Recomendado
1. Ajuste ou adicione dados em `src/data/mock.json` enquanto a API real não estiver pronta.
2. Use os composables existentes para estados globais (menu, datas, métricas) ou crie novos seguindo o padrão `{ state, computed, actions }`.
3. Sempre derive novos componentes a partir dos bases (`BaseCard`, `BaseButton`) para manter consistência visual.
4. Respeite os tokens de `global.css` ao escrever novos estilos e mantenha `<style scoped>` em cada componente.
5. Quando integrar com a API real, habilite as funções `getDashboardMetrics`/`getRevenueData` e trate erros no composable correspondente.

---
Wellington R.


