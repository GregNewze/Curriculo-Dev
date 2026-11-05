<template>
  <section id="stack" class="section skills">
    <div class="container">
      <header class="head">
        <p class="label">Stack</p>
        <h2 class="h-section" data-title>Ferramentas do dia a dia</h2>
      </header>

      <div class="bento">
        <div v-for="(cat, i) in store.skillCategories" :key="cat.title" class="cell" :class="{ big: i === 0 }" data-rise>
          <h3 class="cat">{{ cat.title }}</h3>
          <ul class="chips">
            <li v-for="skill in cat.skills" :key="skill">{{ skill }}</li>
          </ul>
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
.head { margin-bottom: clamp(48px, 6vw, 80px); }
.head .label { margin-bottom: 18px; }

.bento { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.cell {
  display: grid;
  gap: 20px;
  align-content: start;
  padding: clamp(24px, 2.6vw, 36px);
  border-radius: var(--radius);
  background: var(--card);
  border: 1px solid var(--line);
  transition: border-color 0.3s var(--ease), transform 0.3s var(--ease);
}
.cell:hover { border-color: var(--line-2); transform: translateY(-4px); }
.cell.big { grid-column: span 2; border-color: rgba(255, 106, 43, 0.4); background: linear-gradient(160deg, rgba(255, 106, 43, 0.1), var(--card) 55%); }
.cat { font-size: clamp(1.5rem, 2.2vw, 2rem); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chips li {
  padding: 7px 14px;
  border-radius: 999px;
  background: var(--card-2);
  border: 1px solid var(--line);
  font-size: 0.9375rem;
  transition: border-color 0.2s var(--ease), color 0.2s var(--ease);
}
.chips li:hover { border-color: var(--accent); color: var(--accent); }

@media (max-width: 960px) {
  .bento { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .bento { grid-template-columns: 1fr; }
  .cell.big { grid-column: auto; }
}
</style>
