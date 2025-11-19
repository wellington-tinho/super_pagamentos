<template>
  <div class="dashboard">
    <Sidebar />
    <Header />
    <MobileHeader :value="metrics?.totalRevenue || 0" />
    <BottomNavigation />
    
    <main class="dashboard__main">
      <div class="dashboard__filters">
        <div class="dashboard__items-left">
          <BaseButton variant="primary" class="dashboard__new-charge-btn">
            Nova cobrança
            <template #icon-right>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="M9 5V13M5 9H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </template>
          </BaseButton>
          
          <hr class="pipe-divider"/>

          <BaseSelect
            v-model="selectedPeriod"
            :options="periodOptions"
            class="dashboard__filter"
          >
            <template #icon-left>
              <CalendarDays color="#0641FC"/>
            </template>
          </BaseSelect>
          
          <div class="dashboard__date-range">
            <div class="dashboard__date-input">
              <DateRange  />
            </div>
          </div>
        </div>
        
        <div class="dashboard__items-right">
          <BaseSelect
            v-model="selectedChargeType"
            :options="chargeTypeOptions"
            placeholder="Tipo de cobrança"
            class="dashboard__filter"
          >
            <template #icon-left>
              <component :is="TypeOfCharge" />
            </template>
          </BaseSelect>
          
          <button class="dashboard__download-btn" @click="">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1V13M9 13L5 9M9 13L13 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1 17H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="dashboard__content">
        <div class="dashboard__revenue-section">
          
          <div class="dashboard__revenue-chart">
            <RevenueCard
              :value="metrics?.totalRevenue || 0"
              :growth="metrics?.growth || 0"
              :isShowAmount="isShowAmount"
              @toggleShowAmount="isShowAmount = !isShowAmount"
            />
            <BarChart :data="revenueData" :isShowAmount = "isShowAmount" />
            
            <div class="dashboard__metrics-grid">
              <MetricCard
                :isShowAmount="isShowAmount"
                label="Faturamento recebido"
                :value="metrics?.revenueReceived || 0"
                dot-color="#0641fc"
              />
              <MetricCard
                :isShowAmount="isShowAmount"
                label="Faturamento previsto"
                :value="metrics?.revenuePredicted || 0"
                dot-color="#7c3aed"
                tag="D+2"
                tag-variant="info"
              />
              <MetricCard
                :isShowAmount="isShowAmount"
                label="Vendas pendentes"
                :value="metrics?.pendingSales || 0"
                dot-color="#f59e0b"
              />
              <MetricCard
                :isShowAmount="isShowAmount"
                label="Ticket médio"
                :value="metrics?.averageTicket || 0"
                dot-color="#7c3aed"
              />
              <MetricCard
                :isShowAmount="isShowAmount"
                label="Número de cobranças"
                :value="metrics?.numberOfCharges || 0"
                :is-currency="false"
                dot-color="#2a2e33"
              />
            </div>
          </div>
        </div>
        
        <PendingTransferCard
          v-if="pendingTransfer"
          :amount="pendingTransfer.amount"
          :transfer-id="pendingTransfer.id"
          @authorize="handleAuthorizeTransfer"
        />
        
        <div class="dashboard__financial-metrics">
          <FinancialMetricsCard
            title="Reembolsos"
            :amount="metrics?.refunds || 0"
            :count="metrics?.refundsCount || 0"
            :percentage="metrics?.refundsPercentage || 0"
            :show-percentage="true"
          />
          <FinancialMetricsCard
            title="Chargebacks"
            :amount="metrics?.chargebacks || 0"
            :count="metrics?.chargebacksCount || 0"
            :percentage="metrics?.chargebacksPercentage || 0"
            :show-percentage="true"
            :showBadge="true"
          />
          <FinancialMetricsCard
            title="Cancelados"
            :amount="metrics?.canceled || 0"
            :count="metrics?.canceledCount || 0"
            :percentage="metrics?.canceledPercentage || 0"
            :show-percentage="true"
          />
          <FinancialMetricsCard
            title="Não autorizado"
            :amount="metrics?.unauthorized || 0"
            :count="metrics?.unauthorizedCount || 0"
            :percentage="metrics?.unauthorizedPercentage || 0"
            :show-percentage="true"
          />
        </div>
        
        <div class="dashboard__charts-row">
          <ConversionChart :data="conversionData" />
          <CardBrandsChart :data="cardBrandsData" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted} from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import BottomNavigation from '@/components/layout/BottomNavigation.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import RevenueCard from '@/components/dashboard/RevenueCard.vue'
import MetricCard from '@/components/dashboard/MetricCard.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PendingTransferCard from '@/components/dashboard/PendingTransferCard.vue'
import FinancialMetricsCard from '@/components/dashboard/FinancialMetricsCard.vue'
import ConversionChart from '@/components/dashboard/ConversionChart.vue'
import CardBrandsChart from '@/components/dashboard/CardBrandsChart.vue'
import { useDashboardMetrics } from '@/composables/useDashboardMetrics'
import { useDateRange } from '@/composables/useDateRange'
import TypeOfCharge from '@/assets/bottons/type-of-charge.svg'
import mockData from '@/data/mock.json'
import { CalendarDays } from 'lucide-vue-next';
import DateRange from '@/components/dashboard/DateRange.vue';

const { metrics, revenueData, fetchMetrics } = useDashboardMetrics()
const { periodOptions } = useDateRange()

const selectedPeriod = ref('specific')
const selectedChargeType = ref('')

const isShowAmount = ref(true)

const chargeTypeOptions = [
  { value: 'all', label: 'Todos os tipos' },
  { value: 'credit', label: 'Crédito' },
  { value: 'debit', label: 'Débito' },
  { value: 'pix', label: 'Pix' },
  { value: 'boleto', label: 'Boleto' }
]

const pendingTransfer = ref({
  id: '1',
  amount: 29119.13
})

const conversionData = computed(() => {
  if (!metrics.value?.conversionByModality) return []
  
  return [
    { percentage: metrics.value.conversionByModality.credit, label: 'Crédito', color: 'blue' },
    { percentage: metrics.value.conversionByModality.debit, label: 'Débito', color: 'purple' },
    { percentage: metrics.value.conversionByModality.boleto, label: 'Boleto', color: 'light-purple' },
    { percentage: metrics.value.conversionByModality.pix, label: 'Pix', color: 'light-blue' }
  ]
})

const cardBrandsData = computed(() => {
  return mockData.cardBrands || []
})

const handleAuthorizeTransfer = async (transferId) => {
  console.log('Authorizing transfer:', transferId)
  // Implementar lógica de autorização
  pendingTransfer.value = null
}

onMounted(() => {
  fetchMetrics()
})

</script>

<style scoped>

.dashboard {
  min-height: 100vh;
  background: var(--color-background);
}

.dashboard__main {
  margin-left: var(--sidebar-width);
  margin-top: var(--header-height);
  padding: var(--spacing-24);
}

.dashboard__main .pipe-divider{
  height: 40px;
  border: none;
  border-right: 1px solid var(--color-border);
  margin-inline: 10px;
}

@media (max-width: 768px) {
  .dashboard__main {
    margin-left: 0;
    margin-top: 0;
    padding: var(--spacing-16);
    padding-bottom: calc(var(--spacing-16) + 80px); /* Espaço para bottom nav */
  }
}

.dashboard__filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard__items-left, .dashboard__items-right{
  display: flex;
  align-items: center;
  gap: var(--spacing-16);
  margin-bottom: var(--spacing-24);
  flex-wrap: wrap;
}

.dashboard__new-charge-btn {
  min-width: 162px;
}

.dashboard__filter {
  min-width: 235px;
}

.dashboard__date-range {
  display: flex;
  align-items: center;
  gap: var(--spacing-16);
  min-width: 317px;
}

.dashboard__date-input {
  /* flex: 1; */
  display: flex;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius-full);
  cursor: pointer;
  color: var(--color-text-primary);
  transition: all 0.2s ease;
}

.dashboard__date-separator {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
}

.dashboard__download-btn {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius-full);
  cursor: pointer;
  color: var(--color-text-primary);
  transition: all 0.2s ease;
}

.dashboard__download-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.dashboard__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-24);
}

.dashboard__revenue-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-24);
}

.dashboard__revenue-chart {
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-24);
  box-shadow: var(--shadow-sm);
}

.dashboard__metrics-grid {
  display: grid;
  align-items: baseline;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-16);
  margin-top: var(--spacing-24);
}

.dashboard__financial-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-16);
}

.dashboard__charts-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: var(--spacing-16);
}

@media (max-width: 1920px) {
  .dashboard__charts-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard__filters {
    flex-direction: column;
    align-items: stretch;
    margin-top: var(--spacing-16);
  }
  
  .dashboard__new-charge-btn {
    width: 100%;
    min-width: auto;
  }
  
  .dashboard__filter {
    width: 100%;
    min-width: auto;
  }
  
  .dashboard__date-range {
    flex-direction: row;
    width: 100%;
    min-width: auto;
  }
  
  .dashboard__date-input {
    flex: 1;
  }
  
  .dashboard__download-btn {
    width: 100%;
    height: 46px;
  }
  
  .dashboard__revenue-section {
    margin-top: 0;
  }
  
  .dashboard__revenue-chart {
    padding: var(--spacing-16);
    margin-top: var(--spacing-16);
  }
  
  .dashboard__metrics-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-12);
  }
  
  .dashboard__financial-metrics {
    grid-template-columns: 1fr;
    gap: var(--spacing-12);
  }
  
  .dashboard__charts-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-12);
  }
}
</style>

