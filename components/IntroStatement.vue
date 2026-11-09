<template>
  <section id="sobre" class="sheet about" data-sheet>
    <div class="container split">
      <div class="left">
        <p class="tag" data-rise>Sobre mim</p>
        <!-- TEXTO NOVO: revisar -->
        <h2 class="headline" data-title>Dados em tempo real, do chão de fábrica ao dashboard.</h2>
      </div>
      <div class="right">
        <p class="summary" data-rise>{{ store.summary }}</p>
        <dl class="facts" data-rise>
          <div v-for="f in facts" :key="f.label">
            <dt>{{ f.label }}</dt>
            <dd>{{ f.value }}</dd>
          </div>
        </dl>
        <div class="actions" data-rise>
          <a href="#projetos" class="btn-cta">Ver projetos <span class="circ"><ArrowUpRight :size="18" aria-hidden="true" /></span></a>
        </div>
      </div>
    </div>
  </section>

  <section id="numeros" class="section numbers">
    <div class="cross" aria-hidden="true">
      <span class="v v1" /><span class="v v2" /><span class="h" />
    </div>
    <div class="container">
      <p class="statement" data-blur>
        Sou o Érico Nunes, desenvolvedor focado em engenharia de IA e dados, levando visão computacional e modelos de
        linguagem para dentro da fábrica.
      </p>
      <ul class="stats">
        <li v-for="stat in store.stats" :key="stat.label" class="stat" data-rise>
          <span class="num" :data-count="/^\d{1,3}$/.test(stat.value) ? stat.value : undefined">{{ stat.value }}</span>
          <span class="muted">{{ stat.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()

const facts = [
  { label: 'Base', value: 'Manaus, AM — Brasil' },
  { label: 'Ênfases', value: 'Visão computacional, agentes LLM/VLM e dados em tempo real' },
  { label: 'Formação', value: 'Engenharia da Computação, 2026 – 2030' },
]
</script>

<style scoped>
.about { padding-block: clamp(80px, 10vw, 150px); }
.split { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(40px, 7vw, 120px); align-items: start; }
.headline { margin-top: 24px; font-size: clamp(2.25rem, 4.4vw, 4.25rem); line-height: 1.02; }
.summary { font-size: clamp(1.125rem, 1.35vw, 1.3125rem); line-height: 1.6; }
.facts { margin-top: 36px; border-top: 1px solid var(--line); }
.facts > div { display: grid; grid-template-columns: 8.5rem 1fr; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--line); }
.facts dt { color: var(--muted); font-size: 0.9375rem; }
.facts dd { font-weight: 500; }
.actions { margin-top: 36px; }

/* Faixa escura: frase que sai do desfoque e números grandes, entre linhas finas. */
.numbers { overflow: hidden; }
.cross { position: absolute; inset: 0; pointer-events: none; }
.cross .v { position: absolute; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent, var(--line-2) 30%, var(--line-2) 70%, transparent); }
.v1 { left: 18%; }
.v2 { right: 18%; }
.cross .h { position: absolute; left: 0; right: 0; top: 34%; height: 1px; background: linear-gradient(to right, transparent, var(--line-2) 20%, var(--line-2) 80%, transparent); }

.statement {
  position: relative;
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(1.5rem, 3.6vw, 3.5rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  text-align: center;
  max-width: 21em;
  margin-inline: auto;
}

.stats {
  position: relative;
  margin-top: clamp(80px, 10vw, 140px);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-block: 1px solid var(--line-2);
}
.stat { display: grid; gap: 12px; align-content: start; padding: clamp(28px, 3vw, 44px) clamp(8px, 2vw, 32px); }
.stat + .stat { border-left: 1px solid var(--line); }
.num { font-family: var(--display); font-weight: 800; font-size: clamp(3.5rem, 6.5vw, 6rem); line-height: 0.9; letter-spacing: -0.04em; }
.stat:first-child .num { color: var(--accent-hi); }

@media (max-width: 860px) {
  .split { grid-template-columns: 1fr; }
  .facts > div { grid-template-columns: 1fr; gap: 2px; }
  .stats { grid-template-columns: 1fr; }
  .stat + .stat { border-left: 0; border-top: 1px solid var(--line); }
  .v1 { left: 6%; }
  .v2 { right: 6%; }
}
</style>
