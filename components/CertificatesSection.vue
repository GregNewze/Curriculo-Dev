<template>
  <section id="certificados" class="section-wrapper">
    <div class="section-label">certificados</div>

    <div class="certs-grid">
      <div
        v-for="cert in store.certificates"
        :key="cert.name"
        class="bg-white dark:bg-[#0d0d0d] p-5"
      >
        <h3 class="text-[14px] font-medium text-[#0d0d0d] dark:text-[#f0f0ee] mb-1">
          {{ cert.name }}
        </h3>
        <p class="font-mono text-[12px] text-[#8a8a8a]">{{ cert.issuer }}</p>
        <p v-if="cert.hours" class="font-mono text-[11px] text-[#8a8a8a] mt-1">{{ cert.hours }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'
const store = usePortfolioStore()
</script>

<style scoped>
.certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1px;
  background-color: #e0e0e0;
  border: 1px solid #e0e0e0;
}
:global(.dark) .certs-grid {
  background-color: #2a2a2a;
  border-color: #2a2a2a;
}
</style>
