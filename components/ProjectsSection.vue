<template>
  <section id="projetos" class="section">
    <h2 v-reveal class="section-title">Projetos</h2>

    <div class="list">
      <article v-for="project in store.projects" :key="project.id" class="project">
        <div class="head">
          <h3 class="name">{{ split(project.name).main }}</h3>
          <p v-if="split(project.name).sub" class="sub">{{ split(project.name).sub }}</p>
        </div>

        <div class="info">
          <p class="meta muted small">
            {{ project.org }}<template v-if="project.status === 'active'"> · Em andamento</template
            ><template v-if="project.year"> · {{ project.year }}</template>
          </p>
          <p class="desc">{{ project.description }}</p>
          <ul v-if="project.bullets" class="bullets">
            <li v-for="bullet in project.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
          <p class="stack">{{ project.stack.join(', ') }}</p>
          <TelemetryTicker v-if="project.id === 'mach-force'" />
          <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="link">
            Ver no GitHub
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()
const nuxt = useNuxtApp()
const list = ref<HTMLElement>()
let ctx: { revert: () => void } | undefined

function split(name: string) {
  const [main, ...rest] = name.split(' — ')
  return { main, sub: rest.join(' — ') }
}

// Cada projeto entra com GSAP + ScrollTrigger: o nome desliza e o bloco de texto vem logo depois.
onMounted(() => {
  const gsap = nuxt.$gsap as typeof import('gsap').gsap
  const ScrollTrigger = nuxt.$ScrollTrigger as typeof import('gsap/ScrollTrigger').ScrollTrigger
  if (!gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.project').forEach((el) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        defaults: { ease: 'power3.out' },
      })
      tl.from(el.querySelector('.head'), { yPercent: 18, opacity: 0, duration: 0.8 })
        .from(el.querySelector('.info'), { y: 28, opacity: 0, duration: 0.8 }, '-=0.55')
    })
    ScrollTrigger.refresh()
  }, list.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.list { display: grid; gap: 6px; }

.project {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: 16px;
  row-gap: 24px;
  padding: clamp(24px, 3vw, 44px) clamp(16px, 2.4vw, 32px) clamp(56px, 7vw, 104px);
  background: var(--surface);
}
.head { grid-column: 1 / span 7; align-self: start; }
.info { grid-column: 8 / -1; display: grid; gap: 16px; align-content: start; }

.name {
  font-size: clamp(2.25rem, 5.2vw, 5rem);
  line-height: 0.92;
  letter-spacing: -0.05em;
  overflow-wrap: anywhere;
}
.sub { margin-top: 12px; font-size: var(--step-lead); line-height: 1.2; letter-spacing: -0.02em; }

.desc { font-size: var(--step-body); line-height: 1.5; max-width: 52ch; }
.bullets { display: grid; gap: 6px; font-size: var(--step-body); }
.bullets li { padding-left: 1.2em; position: relative; }
.bullets li::before { content: '→'; position: absolute; left: 0; color: var(--muted); }
.stack { color: var(--muted); max-width: 44ch; line-height: 1.4; }

@media (max-width: 860px) {
  .head, .info { grid-column: 1 / -1; }
}
</style>
