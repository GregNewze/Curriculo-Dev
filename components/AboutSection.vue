<template>
  <section id="sobre" class="section">
    <h2 v-reveal class="section-title">Sobre</h2>

    <div class="grid12 top">
      <dl v-reveal="80" class="facts">
        <div v-for="fact in facts" :key="fact.label">
          <dt class="muted small">{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </div>
      </dl>

      <p v-reveal="160" class="statement">{{ store.summary }}</p>
    </div>

    <div class="grid12 bottom">
      <figure v-reveal class="photo">
        <img
          src="/img/raspberry-pi-jpg.jpg"
          width="1920"
          height="1130"
          loading="lazy"
          alt="Placa Raspberry Pi 4 Model B vista de lado"
        />
      </figure>

      <ul class="stats">
        <li v-for="(stat, i) in store.stats" :key="stat.value" v-reveal="i * 90">
          <span class="stat-value tnum">{{ stat.value }}</span>
          <span class="muted">{{ stat.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()

const facts = [
  { label: 'Base', value: 'Manaus, AM — Brasil' },
  { label: 'Formação', value: 'Engenharia da Computação, 2026 – 2030' },
  { label: 'Foco', value: 'Back-end e sistemas embarcados' },
]
</script>

<style scoped>
.top { row-gap: 40px; align-items: start; }

.facts {
  grid-column: 1 / span 3;
  display: grid;
  gap: 20px;
  font-size: var(--step-small);
}
.facts dd { font-size: var(--step-body); line-height: 1.3; margin-top: 2px; }

.statement {
  grid-column: 4 / -1;
  font-size: clamp(1.375rem, 1rem + 1.3vw, 2rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.03em;
  max-width: 32em;
}

.bottom {
  margin-top: clamp(56px, 7vw, 112px);
  align-items: end;
  row-gap: 40px;
}
.photo { grid-column: 1 / span 7; }
/* Fundo branco da foto some no chão putty. No tema escuro volta ao normal. */
.photo img { display: block; width: 100%; height: auto; mix-blend-mode: multiply; }
:global(.dark) .photo img { mix-blend-mode: normal; }

.stats {
  grid-column: 9 / -1;
  display: grid;
  gap: 28px;
}
.stats li { display: grid; gap: 2px; }
.stat-value {
  font-size: var(--step-head);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.95;
}

@media (max-width: 860px) {
  .top, .bottom { display: flex; flex-direction: column; gap: 48px; }
  .statement { order: 1; }
  .facts { order: 2; }
  .bottom { margin-top: 48px; }
}
</style>
