<template>
  <section id="certificados" class="section">
    <h2 v-reveal class="giant">Certificados</h2>

    <ul class="bars">
      <li v-for="(cert, i) in store.certificates" :key="cert.name" v-reveal="i * 50" class="bar">
        <span class="bar-name">{{ cert.name }}</span>
        <span class="bar-issuer muted">{{ cert.issuer }}</span>
        <span v-if="cert.hours" class="bar-hours tnum">{{ cert.hours }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()
</script>

<style scoped>
.giant {
  font-size: 14.4vw;
  line-height: 0.82;
  letter-spacing: -0.06em;
  white-space: nowrap;
  margin: 0 0 clamp(24px, 3vw, 44px) -0.04em;
}

.bars { display: grid; gap: 6px; }
.bar {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  min-height: 64px;
  padding: 10px clamp(16px, 2vw, 24px);
  background: var(--surface);
  transition: transform 0.25s var(--ease);
}
.bar:hover { transform: translateX(6px); }
.bar-name { font-weight: 500; }
.bar-hours { text-align: right; }

@media (max-width: 640px) {
  .bar { grid-template-columns: 1fr auto; }
  .bar-issuer { grid-row: 2; grid-column: 1; font-size: var(--step-small); }
  .bar-hours { grid-row: 1; grid-column: 2; }
}
</style>
