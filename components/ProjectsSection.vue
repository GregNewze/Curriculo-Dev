<template>
  <section id="projetos" class="section projects">
    <div class="container">
      <header class="head">
        <div>
          <p class="label">Trabalhos selecionados</p>
          <h2 class="h-section" data-title>Projetos em destaque</h2>
        </div>
        <p class="muted intro" data-rise>
          Sistemas de IA, visão computacional e dados em tempo real, do protótipo ao chão de fábrica.
        </p>
      </header>

      <div class="grid">
        <article
          v-for="project in store.projects"
          :key="project.id"
          class="card"
          :class="{ wide: project.id === 'mach-force' }"
          data-rise
        >
          <div class="media" :style="{ '--tint': tints[project.id] ?? '#1b1b20' }">
            <div class="art-wrap">
              <TelemetryTicker v-if="project.id === 'mach-force'" />
              <ProjectArt v-else :kind="project.id" />
            </div>
          </div>

          <div class="info">
            <div class="row">
              <h3 class="name">{{ split(project.name).main }}</h3>
              <span v-if="project.year" class="pill">{{ project.status === 'active' ? `${project.year} · em andamento` : project.year }}</span>
            </div>
            <p class="role">{{ split(project.name).sub || project.org }}</p>
            <p class="desc muted">{{ project.description }}</p>
            <p class="stack mono">{{ project.stack.join(' · ') }}</p>
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="gh">
              Ver no GitHub <ArrowUpRight :size="16" aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()

// Cada projeto ganha um campo de cor próprio, escuro, para o diagrama respirar.
const tints: Record<string, string> = {
  osiris: '#172a4d',
  chronos: '#3a1d12',
  sharingan: '#123128',
  agv: '#2a1d40',
  'mach-force': '#2e2410',
  axioslab: '#0f2a38',
  etnius: '#331630',
}

function split(name: string) {
  const [main, ...rest] = name.split(' — ')
  return { main, sub: rest.join(' — ') }
}
</script>

<style scoped>
.head { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; flex-wrap: wrap; margin-bottom: clamp(48px, 6vw, 80px); }
.head .label { margin-bottom: 18px; }
.intro { max-width: 26rem; text-align: right; line-height: 1.6; }

.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(28px, 3vw, 48px) clamp(20px, 2.4vw, 36px); }
.card.wide { grid-column: 1 / -1; }

.media {
  position: relative;
  border-radius: var(--radius);
  background: var(--tint);
  aspect-ratio: 4 / 3;
  overflow: hidden;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  transition: transform 0.5s var(--ease);
}
.wide .media { aspect-ratio: 21 / 8; }
.art-wrap { width: min(78%, 560px); color: rgba(244, 244, 245, 0.92); transition: transform 0.6s var(--ease); }
.card:hover .media { transform: scale(0.985); }
.card:hover .art-wrap { transform: scale(1.04); }

.info { padding: 26px 8px 0; display: grid; gap: 8px; }
.row { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.name { font-size: clamp(1.75rem, 2.6vw, 2.5rem); }
.role { font-size: 0.875rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.desc { margin-top: 6px; max-width: 60ch; line-height: 1.6; }
.stack { font-size: 0.8125rem; color: var(--muted); opacity: 0.85; }
.gh { display: inline-flex; align-items: center; gap: 4px; margin-top: 4px; width: fit-content; font-weight: 600; text-decoration: none; color: var(--accent); }
.gh:hover { text-decoration: underline; text-underline-offset: 4px; }

@media (max-width: 860px) {
  .intro { text-align: left; }
  .grid { grid-template-columns: 1fr; }
  .wide .media { aspect-ratio: 4 / 3; }
}
</style>
