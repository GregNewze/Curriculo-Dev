<template>
  <section id="sobre" class="section-wrapper">
    <div class="section-label">skills &amp; stack</div>

    <div
      class="grid border border-[#e0e0e0] dark:border-[#2a2a2a]"
      style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 5px; background-color: var(--grid-gap-color)"
    >
      <div
        v-for="cat in store.skillCategories"
        :key="cat.title"
        class="bg-white dark:bg-[#0d0d0d] p-5"
        :style="{ '--grid-gap-color': 'var(--tw-border-opacity)' }"
      >
        <p class="font-mono text-[11px] tracking-[0.1em] uppercase text-[#8a8a8a] mb-3">
          {{ cat.title }}
        </p>
        <div class="flex flex-wrap gap-1.5">
          <span v-for="skill in cat.skills" :key="skill" class="tag">
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'
const store = usePortfolioStore()
</script>

<style scoped>
/* grid gap using background trick */
.grid {
  background-color: #e0e0e0;
}
:global(.dark) .grid {
  background-color: #2a2a2a;
}
</style>
