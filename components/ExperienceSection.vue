<template>
  <section id="experiencia" class="section">
    <h2 v-reveal class="section-title">Experiência e formação</h2>

    <div class="ledger">
      <p class="group muted small">Eventos</p>
      <article v-for="(exp, i) in store.experiences" :key="exp.title" v-reveal="i * 80" class="item">
        <h3 class="item-title">{{ exp.title }}</h3>
        <p class="item-org muted">{{ exp.org }}</p>
        <p class="item-date tnum">{{ exp.date }}</p>
        <p class="item-desc">{{ exp.description }}</p>
      </article>

      <p class="group muted small">Formação</p>
      <article v-for="(edu, i) in store.education" :key="edu.degree" v-reveal="i * 80" class="item">
        <h3 class="item-title">{{ edu.degree }}</h3>
        <p class="item-org muted">{{ edu.school }}</p>
        <p class="item-date tnum">{{ edu.period }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()
</script>

<style scoped>
.ledger {
  margin-left: 22%;
  max-width: 760px;
  display: grid;
  gap: 28px;
}
.group { margin-top: 24px; }
.group:first-child { margin-top: 0; }

.item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 24px;
}
.item-title { font-size: var(--step-lead); letter-spacing: -0.03em; line-height: 1.1; }
.item-org { grid-column: 1; }
.item-date { grid-column: 2; grid-row: 1; text-align: right; white-space: nowrap; }
.item-desc { grid-column: 1 / -1; margin-top: 6px; max-width: 60ch; }

@media (max-width: 860px) {
  .ledger { margin-left: 0; }
}
</style>
