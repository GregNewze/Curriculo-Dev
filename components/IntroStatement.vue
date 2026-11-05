<template>
  <section id="sobre" class="section intro">
    <div class="container">
      <p class="label center">Sobre mim</p>
      <h2 class="statement" data-blur>
        Sou o Érico Nunes, desenvolvedor focado em engenharia de IA e dados, levando visão computacional e modelos de
        linguagem para dentro da fábrica.
      </h2>
      <p class="sub muted" data-rise>{{ store.summary }}</p>

      <ul class="stats">
        <li v-for="stat in store.stats" :key="stat.label" class="stat" data-rise>
          <span class="num" :data-count="/^\d{1,3}$/.test(stat.value) ? stat.value : undefined">{{ stat.value }}</span>
          <span class="muted">{{ stat.label }}</span>
        </li>
      </ul>

      <dl class="facts" data-rise>
        <div v-for="f in facts" :key="f.label">
          <dt class="muted">{{ f.label }}</dt>
          <dd>{{ f.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()

const facts = [
  { label: 'Base', value: 'Manaus, AM — Brasil' },
  { label: 'Atual', value: 'Controlador de Automação e Dados I, Whirlpool' },
  { label: 'Formação', value: 'Engenharia da Computação, 2026 – 2030' },
]
</script>

<style scoped>
.intro { text-align: center; }
.center { justify-content: center; margin-bottom: 28px; }
.statement {
  font-size: clamp(2rem, 4.4vw, 4rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  max-width: 19em;
  margin-inline: auto;
}
.sub { margin: 36px auto 0; max-width: 44rem; font-size: clamp(1.0625rem, 1.2vw, 1.25rem); line-height: 1.65; }

.stats {
  margin-top: clamp(64px, 8vw, 112px);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  text-align: left;
}
.stat {
  display: grid;
  gap: 10px;
  align-content: start;
  padding: clamp(24px, 3vw, 40px);
  border-radius: var(--radius);
  background: var(--card);
  border: 1px solid var(--line);
  transition: border-color 0.3s var(--ease), transform 0.3s var(--ease);
}
.stat:hover { border-color: rgba(255, 106, 43, 0.5); transform: translateY(-4px); }
.num { font-family: var(--display); font-weight: 800; font-size: clamp(3.5rem, 7vw, 6.5rem); line-height: 0.9; color: var(--accent); letter-spacing: -0.04em; }

.facts {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  text-align: left;
}
.facts > div { padding: 20px 24px; border-radius: 20px; border: 1px solid var(--line); }
.facts dt { font-size: 0.8125rem; letter-spacing: 0.12em; text-transform: uppercase; }
.facts dd { margin-top: 4px; font-weight: 500; }

@media (max-width: 860px) {
  .stats, .facts { grid-template-columns: 1fr; }
}
</style>
