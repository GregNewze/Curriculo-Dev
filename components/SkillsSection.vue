<template>
  <section id="stack" class="section">
    <h2 v-reveal class="stack-title">Do chip ao app, ponta a ponta</h2>

    <div class="grid12 body">
      <figure v-reveal class="photo">
        <img
          src="/img/placa-microcontrolador-jpg.jpg"
          width="1920"
          height="1080"
          loading="lazy"
          alt="Placa de circuito com três microcontroladores Philips MAB8440 e fiação colorida"
        />
      </figure>

      <div class="table">
        <p class="muted small table-name">Stack</p>
        <ul>
          <li v-for="(cat, i) in store.skillCategories" :key="cat.title" v-reveal="i * 60" class="row">
            <span class="muted">{{ cat.title }}</span>
            <span>{{ cat.skills.join(', ') }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()
</script>

<style scoped>
.stack-title {
  font-size: clamp(2.5rem, 4.5vw, 4.25rem);
  line-height: 0.98;
  max-width: 14em;
  padding-left: 3vw;
  margin: 0 0 clamp(48px, 6vw, 96px);
}
.body { align-items: end; row-gap: 40px; }
.photo { grid-column: 1 / span 4; aspect-ratio: 4 / 5; overflow: hidden; }
.photo img { width: 100%; height: 100%; object-fit: cover; display: block; }

.table { grid-column: 7 / -1; position: relative; }
.table-name { margin-bottom: 20px; }
.row {
  display: grid;
  grid-template-columns: 30% 1fr;
  gap: 16px;
  padding: 13px 0;
  font-size: var(--step-body);
  line-height: 1.35;
}

@media (max-width: 860px) {
  .stack-title { padding-left: 0; }
  .photo { grid-column: 1 / span 8; grid-row: 2; }
  .table { grid-column: 1 / -1; }
  .table-name { display: none; }
  .row { grid-template-columns: 1fr; gap: 2px; }
}
</style>
