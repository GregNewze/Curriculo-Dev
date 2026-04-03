<template>
  <section id="experiencia" class="section-wrapper">
    <div class="section-label">experiência &amp; formação</div>

    <!-- Experience -->
    <div class="exp-grid mb-8">
      <div
        v-for="exp in store.experiences"
        :key="exp.title"
        class="bg-white dark:bg-[#0d0d0d] p-6 grid grid-cols-[1fr_auto] gap-4"
      >
        <div>
          <h3 class="text-[0.95rem] font-medium text-[#0d0d0d] dark:text-[#f0f0ee] mb-1">
            {{ exp.title }}
          </h3>
          <p class="font-mono text-[12px] text-[#8a8a8a]">{{ exp.org }}</p>
        </div>
        <div class="font-mono text-[12px] text-[#8a8a8a] text-right whitespace-nowrap">
          {{ exp.date }}
        </div>
        <p class="text-[14px] text-[#4a4a4a] dark:text-[#8a8a8a] leading-[1.7] col-span-2">
          {{ exp.description }}
        </p>
      </div>
    </div>

    <!-- Education -->
    <div class="exp-grid">
      <div
        v-for="edu in store.education"
        :key="edu.degree"
        class="bg-[#f7f7f5] dark:bg-[#161616] p-6 flex justify-between items-start gap-4"
      >
        <div>
          <h3 class="text-[1rem] font-medium text-[#0d0d0d] dark:text-[#f0f0ee] mb-1">
            {{ edu.degree }}
          </h3>
          <p class="font-mono text-[12px] text-[#8a8a8a]">{{ edu.school }}</p>
        </div>
        <div class="font-mono text-[12px] text-[#8a8a8a] whitespace-nowrap">{{ edu.period }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'
const store = usePortfolioStore()
</script>

<style scoped>
.exp-grid {
  display: grid;
  gap: 1px;
  background-color: #e0e0e0;
  border: 1px solid #e0e0e0;
}
:global(.dark) .exp-grid {
  background-color: #2a2a2a;
  border-color: #2a2a2a;
}
</style>
