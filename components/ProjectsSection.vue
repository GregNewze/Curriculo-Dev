<template>
  <section id="projetos" class="sheet projects" data-sheet>
    <div class="container">
      <header class="head">
        <p class="tag" data-rise>Trabalhos selecionados</p>
        <h2 class="h-section" data-title>Projetos em destaque</h2>
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
          <div class="media">
            <img
              v-if="project.photo"
              :src="project.photo.src"
              :alt="project.photo.alt"
              :width="project.photo.width"
              :height="project.photo.height"
              loading="lazy"
              decoding="async"
            />
            <!-- Sem foto própria: capa tipográfica com o nome do projeto. -->
            <div v-else class="cover" :class="tone[project.id]" :style="{ '--len': coverName(project).length }" aria-hidden="true">
              <span class="cover-kind">{{ project.org.split(' · ').pop() }}</span>
              <span class="cover-name">{{ coverName(project) }}</span>
            </div>
          </div>

          <div class="info">
            <div class="row">
              <div>
                <h3 class="name">{{ split(project.name).main }}</h3>
                <p class="role">{{ split(project.name).sub || project.org }}</p>
              </div>
              <span v-if="project.year" class="pill">{{ project.status === 'active' ? `${project.year} · em andamento` : project.year }}</span>
            </div>
            <p class="desc muted">{{ project.description }}</p>
            <div class="foot">
              <p class="stack mono">{{ project.stack.join(' · ') }}</p>
              <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="gh">
                <span class="gh-circ"><ArrowUpRight :size="16" aria-hidden="true" /></span> GitHub
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { usePortfolioStore, type Project } from '~/stores/portfolio'

const store = usePortfolioStore()

// Capas alternam carvão, carmesim escuro e preto.
const tone: Record<string, string> = {
  osiris: 't-coal',
  chronos: 't-red',
  sharingan: 't-ink',
  agv: 't-red',
  'mach-force': 't-coal',
  axioslab: 't-red',
  etnius: 't-ink',
}

function split(name: string) {
  const [main, ...rest] = name.split(' — ')
  return { main, sub: rest.join(' — ') }
}

function coverName(project: Project) {
  return project.id === 'agv' ? 'AGV' : split(project.name).main
}
</script>

<style scoped>
.projects { padding-block: clamp(80px, 10vw, 150px); }
.head { display: grid; justify-items: center; gap: 22px; text-align: center; margin-bottom: clamp(48px, 6vw, 80px); }
.intro { max-width: 34rem; line-height: 1.6; }

.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(20px, 2.4vw, 32px); }
.card.wide { grid-column: 1 / -1; }

/* Moldura clara em volta da imagem, como os cartões da referência. */
.card {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: calc(var(--radius) + 6px);
  background: var(--card);
  border: 1px solid var(--line);
}

.media {
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius);
  overflow: hidden;
  container-type: inline-size;
  background: var(--bg);
}
.wide .media { aspect-ratio: 21 / 9; }
.media img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 40%; transition: transform 0.8s var(--ease); }
.card:hover .media img,
.card:hover .cover-name { transform: scale(1.04); }

.cover {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(18px, 6cqw, 32px);
  overflow: hidden;
}
/* A rede de luz do retrato reaparece, fraca, no canto de cada capa. */
.cover::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.22) 1px, transparent 1.6px);
  background-size: 16px 16px;
  -webkit-mask-image: radial-gradient(circle at 85% 15%, #000, transparent 55%);
  mask-image: radial-gradient(circle at 85% 15%, #000, transparent 55%);
}
.t-coal { background: radial-gradient(circle at 85% 10%, rgba(var(--accent-rgb), 0.35), transparent 55%), #161917; }
.t-red { background: radial-gradient(circle at 85% 10%, rgba(255, 90, 110, 0.35), transparent 55%), #3a0d18; }
.t-ink { background: radial-gradient(circle at 85% 10%, rgba(242, 239, 233, 0.16), transparent 55%), #0b0c0c; }
.cover-kind { position: relative; font-size: 0.875rem; font-weight: 500; color: rgba(255, 255, 255, 0.72); }
.cover-name {
  position: relative;
  font-family: var(--display);
  font-weight: 800;
  font-size: min(calc(150cqw / var(--len)), 30cqw);
  line-height: 0.82;
  letter-spacing: -0.05em;
  color: #f3f4f2;
  transform-origin: 0 100%;
  transition: transform 0.8s var(--ease);
  margin-bottom: -0.06em;
}

.info { padding: 22px 14px 12px; display: grid; gap: 12px; flex: 1; align-content: start; }
.row { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 10px 16px; }
.name { font-size: clamp(1.625rem, 2.3vw, 2.25rem); }
.role { margin-top: 6px; font-size: 0.9375rem; font-weight: 500; color: var(--muted); }
.desc { max-width: 62ch; line-height: 1.6; }
.foot { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 4px; }
.stack { font-size: 0.8125rem; color: var(--muted); }
.gh { display: inline-flex; align-items: center; gap: 10px; flex-shrink: 0; font-weight: 600; text-decoration: none; }
.gh-circ {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--text);
  color: var(--bg);
  transition: transform 0.35s var(--ease), background-color 0.25s var(--ease), color 0.25s var(--ease);
}
.gh:hover .gh-circ { transform: rotate(45deg); background: var(--accent); color: #fff; }

@media (max-width: 860px) {
  .grid { grid-template-columns: 1fr; }
  .wide .media { aspect-ratio: 16 / 10; }
  .foot { flex-direction: column; align-items: flex-start; }
}
</style>
