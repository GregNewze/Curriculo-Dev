<template>
  <section id="stack" class="sheet skills" data-sheet>
    <div class="container">
      <header class="head">
        <p class="tag" data-rise>Stack</p>
        <h2 class="h-section" data-title>Ferramentas do dia a dia</h2>
      </header>

      <div class="cards">
        <div v-for="cat in store.skillCategories" :key="cat.title" class="cell" data-rise>
          <h3 class="cat">{{ cat.title }}</h3>
          <ul class="chips">
            <li v-for="skill in cat.skills" :key="skill">{{ skill }}</li>
          </ul>
          <span class="horizon" aria-hidden="true" />
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
.skills { padding-block: clamp(80px, 10vw, 150px); }
.head { display: grid; justify-items: center; gap: 22px; text-align: center; margin-bottom: clamp(48px, 6vw, 80px); }

.cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }

/* Cartão alto e escuro; embaixo, um horizonte carmesim no lugar da Terra da referência. */
.cell {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 22px;
  align-content: start;
  min-height: 320px;
  padding: clamp(26px, 2.6vw, 36px);
  border-radius: var(--radius);
  color: #f3f4f2;
  background: linear-gradient(180deg, #1b1e1c, #121413);
  border: 1px solid rgba(255, 255, 255, 0.14);
  transition: transform 0.4s var(--ease), border-color 0.4s var(--ease);
}
.cell:hover { transform: translateY(-6px); border-color: rgba(var(--accent-rgb), 0.55); }
.horizon {
  position: absolute;
  left: -20%;
  right: -20%;
  bottom: -62%;
  height: 90%;
  border-radius: 50%;
  background: radial-gradient(ellipse at 50% 0%, rgba(255, 90, 110, 0.55), rgba(var(--accent-rgb), 0.18) 30%, transparent 62%);
  border-top: 1px solid rgba(255, 120, 135, 0.5);
  opacity: 0.55;
  transition: opacity 0.5s var(--ease), transform 0.6s var(--ease);
  pointer-events: none;
}
.cell:hover .horizon { opacity: 1; transform: translateY(-14px); }

.cat { position: relative; font-size: clamp(1.5rem, 2.1vw, 1.875rem); }
.chips { position: relative; display: flex; flex-wrap: wrap; gap: 8px; }
.chips li {
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.9375rem;
}

@media (max-width: 960px) {
  .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .cards { grid-template-columns: 1fr; }
  .cell { min-height: 260px; }
}
</style>
