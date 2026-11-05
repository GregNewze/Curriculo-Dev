<template>
  <section id="experiencia" ref="root" class="section exp">
    <div class="container">
      <header class="head">
        <p class="label">Trajetória</p>
        <h2 class="h-section" data-title>Minha experiência</h2>
      </header>

      <div class="timeline">
        <span class="rail" aria-hidden="true"><span ref="fill" class="fill" /></span>

        <article v-for="exp in store.experiences" :key="exp.title" class="item" data-rise>
          <span class="node" aria-hidden="true" />
          <div class="top">
            <h3 class="title">{{ exp.title }}</h3>
            <span class="pill date">{{ exp.date }}</span>
          </div>
          <p class="org"><span class="badge" aria-hidden="true">{{ initials(exp.org) }}</span>{{ exp.org }}</p>
          <p class="desc muted">{{ exp.description }}</p>
        </article>
      </div>

      <div class="edu">
        <p class="label">Formação</p>
        <div class="edu-grid">
          <div v-for="edu in store.education" :key="edu.degree" class="edu-card" data-rise>
            <span class="pill">{{ edu.period }}</span>
            <h3>{{ edu.degree }}</h3>
            <p class="muted">{{ edu.school }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()
const nuxt = useNuxtApp()
const root = ref<HTMLElement>()
const fill = ref<HTMLElement>()
let ctx: { revert: () => void } | undefined

function initials(org: string) {
  const name = org.split(/[·,]/)[0].trim()
  return name
    .split(/\s+/)
    .filter((w) => /^[A-ZÀ-Ý]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
}

// A linha da trajetória se enche conforme você rola; o nó acende quando o item passa do meio.
onMounted(() => {
  const gsap = nuxt.$gsap as typeof import('gsap').gsap
  const ScrollTrigger = nuxt.$ScrollTrigger as typeof import('gsap/ScrollTrigger').ScrollTrigger
  ctx = gsap.context(() => {
    gsap.fromTo(fill.value!, { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.timeline', start: 'top 60%', end: 'bottom 60%', scrub: true },
    })
    gsap.utils.toArray<HTMLElement>('.item').forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: 'top 60%', toggleClass: { targets: el, className: 'lit' } })
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.exp { background: var(--bg-2); border-block: 1px solid var(--line); }
.head { margin-bottom: clamp(56px, 7vw, 96px); }
.head .label { margin-bottom: 18px; }

.timeline { position: relative; display: grid; gap: clamp(56px, 6vw, 88px); padding-left: clamp(40px, 6vw, 96px); max-width: 980px; margin-left: clamp(0px, 8vw, 140px); }
.rail { position: absolute; left: 0; top: 8px; bottom: 8px; width: 2px; background: var(--line-2); }
.fill { position: absolute; inset: 0; background: var(--accent); transform-origin: top; box-shadow: var(--glow); }

.item { position: relative; }
.node {
  position: absolute;
  left: calc(-1 * clamp(40px, 6vw, 96px) - 8px);
  top: 10px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--bg-2);
  border: 2px solid var(--line-2);
  transition: background-color 0.3s var(--ease), border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
}
.item.lit .node { background: var(--accent); border-color: var(--accent); box-shadow: var(--glow); }

.top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.title { font-size: clamp(1.75rem, 3vw, 2.75rem); max-width: 18em; }
.date { color: var(--accent); border-color: rgba(255, 106, 43, 0.45); }
.org { margin-top: 14px; display: flex; align-items: center; gap: 12px; font-size: 1.0625rem; font-weight: 500; }
.badge {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--card-2);
  border: 1px solid var(--line);
  font-family: var(--display);
  font-weight: 800;
  font-size: 0.9375rem;
  color: var(--accent);
  flex-shrink: 0;
}
.desc { margin-top: 18px; padding-left: 20px; border-left: 2px solid var(--line-2); line-height: 1.7; max-width: 64ch; }

.edu { margin-top: clamp(96px, 10vw, 150px); }
.edu-grid { margin-top: 24px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.edu-card { display: grid; gap: 12px; justify-items: start; padding: clamp(24px, 3vw, 40px); border-radius: var(--radius); background: var(--card); border: 1px solid var(--line); }
.edu-card h3 { font-size: clamp(1.5rem, 2.4vw, 2.25rem); line-height: 1.05; }

@media (max-width: 860px) {
  .timeline { margin-left: 0; padding-left: 36px; }
  .node { left: -44px; }
  .edu-grid { grid-template-columns: 1fr; }
}
</style>
