<template>
  <section id="projetos" class="section">
    <h2 v-reveal class="section-title">Projetos</h2>

    <div class="list">
      <details
        v-for="(project, i) in store.projects"
        :key="project.id"
        v-reveal="i * 80"
        class="project"
        open
      >
        <summary>
          <h3 class="name">{{ split(project.name).main }}</h3>
          <span class="meta">
            <span v-if="split(project.name).sub" class="sub">{{ split(project.name).sub }}</span>
            <span class="muted small">
              {{ project.status === 'active' ? `Em andamento · ${project.year}` : project.year }}
            </span>
          </span>
          <span class="plus" aria-hidden="true"></span>
        </summary>

        <div class="panel grid12">
          <div class="text">
            <p class="org muted">{{ project.org }}</p>
            <p class="desc">{{ project.description }}</p>
            <ul class="bullets">
              <li v-for="bullet in project.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
          </div>

          <div class="side">
            <p class="stack">{{ project.stack.join(', ') }}</p>
            <TelemetryTicker v-if="project.id === 'mach-force'" />
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="link">
              Ver no GitHub
            </a>
          </div>
        </div>
      </details>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()

function split(name: string) {
  const [main, ...rest] = name.split(' — ')
  return { main, sub: rest.join(' — ') }
}
</script>

<style scoped>
.list { display: grid; gap: 6px; }

.project { background: var(--surface); }

summary {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 8px 24px;
  padding: clamp(20px, 2.6vw, 36px) clamp(16px, 2.4vw, 32px);
  cursor: pointer;
  list-style: none;
  position: relative;
  padding-right: calc(clamp(16px, 2.4vw, 32px) + 40px);
  transition: opacity 0.18s var(--ease);
}
summary::-webkit-details-marker { display: none; }
summary:hover { opacity: 0.75; }

.name {
  font-size: clamp(2.5rem, 7.4vw, 7rem);
  line-height: 0.92;
  letter-spacing: -0.05em;
}
.meta { display: grid; justify-items: end; gap: 2px; text-align: right; }
.sub { font-size: var(--step-small); max-width: 26ch; }

.plus {
  position: absolute;
  right: clamp(16px, 2.4vw, 32px);
  top: clamp(26px, 3vw, 42px);
  width: 20px;
  height: 20px;
}
.plus::before,
.plus::after {
  content: '';
  position: absolute;
  background: var(--ink);
  transition: transform 0.3s var(--ease);
}
.plus::before { left: 0; right: 0; top: 9px; height: 2px; }
.plus::after { top: 0; bottom: 0; left: 9px; width: 2px; }
details[open] .plus::after { transform: scaleY(0); }

.panel {
  padding: 8px clamp(16px, 2.4vw, 32px) clamp(56px, 7vw, 104px);
  row-gap: 32px;
}
.text { grid-column: 1 / span 6; }
.side { grid-column: 8 / -1; display: grid; gap: 24px; align-content: start; }

.org { font-size: var(--step-small); margin-bottom: 14px; }
.desc { font-size: var(--step-lead); line-height: 1.3; letter-spacing: -0.015em; margin-bottom: 20px; }
.bullets { display: grid; gap: 8px; }
.bullets li { padding-left: 1.2em; position: relative; }
.bullets li::before { content: '→'; position: absolute; left: 0; color: var(--muted); }

.stack { font-size: var(--step-body); line-height: 1.4; max-width: 40ch; }

@media (max-width: 860px) {
  summary { grid-template-columns: 1fr; }
  .meta { justify-items: start; text-align: left; }
  .text, .side { grid-column: 1 / -1; }
}
</style>
