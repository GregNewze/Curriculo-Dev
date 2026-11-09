<template>
  <section id="experiencia" ref="root" class="section exp">
    <div class="container">
      <header class="head">
        <p class="tag" data-rise>Trajetória</p>
        <h2 class="h-section" data-title>Minha experiência</h2>
      </header>

      <div ref="track" class="track">
        <svg class="snake" aria-hidden="true">
          <path class="base" :d="d" />
          <path ref="fill" class="fill" :d="d" />
        </svg>
        <ol class="steps">
          <li v-for="(s, i) in store.experiences" :key="s.title" class="step" :style="place(i)">
            <span class="num">{{ i + 1 }}</span>
            <p class="when mono">{{ s.date }}</p>
            <h3 class="title">{{ s.title }}</h3>
            <p class="org">{{ s.org }}</p>
            <p class="desc muted">{{ s.description }}</p>
          </li>
        </ol>
      </div>

      <div class="extra">
        <div>
          <h3 class="extra-title">Formação</h3>
          <ul class="list">
            <li v-for="e in store.education" :key="e.degree" data-rise>
              <span class="mono when">{{ e.period }}</span>
              <strong>{{ e.degree }}</strong>
              <span class="muted">{{ e.school }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="extra-title">Destaques</h3>
          <ul class="list">
            <li v-for="h in store.highlights" :key="h.title" data-rise>
              <span class="mono when">{{ h.date }}</span>
              <strong>{{ h.title }}</strong>
              <span class="muted">{{ h.description }}</span>
            </li>
          </ul>
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
const track = ref<HTMLElement>()
const fill = ref<SVGPathElement>()
const d = ref('')

/**
 * Posição em grade de serpente: as linhas pares correm da esquerda para a direita, as ímpares
 * voltam, para que o passo seguinte fique logo abaixo do anterior. Uma posição por largura
 * de tela (4 colunas no desktop, 2 no tablet); no celular a lista é simples.
 */
function place(i: number) {
  const at = (cols: number) => {
    const row = Math.floor(i / cols)
    const col = row % 2 === 0 ? (i % cols) + 1 : cols - (i % cols)
    return [row + 1, col]
  }
  const [r4, c4] = at(4)
  const [r2, c2] = at(2)
  return { '--r4': r4, '--c4': c4, '--r2': r2, '--c2': c2 }
}

let ctx: { revert: () => void } | undefined
let ro: ResizeObserver | undefined
let length = 0
let progress = 0

/** Liga os centros dos números; nas trocas de linha, curva pela borda onde a linha terminou. */
function measure() {
  const el = track.value
  const nums = el?.querySelectorAll<HTMLElement>('.num')
  if (!el || !nums || !nums.length) return
  // offsetLeft/offsetTop ignoram transform: a entrada animada dos passos não entorta a linha.
  const p = Array.from(nums, (n) => {
    let x = n.offsetWidth / 2
    let y = n.offsetHeight / 2
    for (let q: HTMLElement | null = n; q && q !== el; q = q.offsetParent as HTMLElement | null) {
      x += q.offsetLeft
      y += q.offsetTop
    }
    return { x, y }
  })
  const w = el.offsetWidth
  const column = p.every((pt) => Math.abs(pt.x - p[0].x) < 2)
  let path = `M${p[0].x} ${p[0].y}`
  for (let i = 1; i < p.length; i++) {
    const a = p[i - 1]
    const b = p[i]
    if (column) path += ` V${b.y}`
    else if (Math.abs(a.y - b.y) < 2) path += ` H${b.x}`
    else {
      const right = a.x > w / 2
      const xe = right ? w - 1 : 1
      const s = right ? 1 : -1
      const sweep = right ? 1 : 0
      const R = Math.min(48, (b.y - a.y) / 2)
      path += ` H${xe - s * R} A${R} ${R} 0 0 ${sweep} ${xe} ${a.y + R} V${b.y - R} A${R} ${R} 0 0 ${sweep} ${xe - s * R} ${b.y} H${b.x}`
    }
  }
  d.value = path
  nextTick(() => {
    length = fill.value?.getTotalLength() ?? 0
    paint()
  })
}

function paint() {
  if (!fill.value) return
  fill.value.style.strokeDasharray = `${length}`
  fill.value.style.strokeDashoffset = `${length * (1 - progress)}`
}

// A linha se enche conforme você rola; cada número acende quando a página passa por ele.
onMounted(() => {
  measure()
  ro = new ResizeObserver(measure)
  if (track.value) ro.observe(track.value)

  const gsap = nuxt.$gsap as typeof import('gsap').gsap
  const ScrollTrigger = nuxt.$ScrollTrigger as typeof import('gsap/ScrollTrigger').ScrollTrigger
  ctx = gsap.context(() => {
    if (isCalm()) {
      progress = 1
      paint()
      gsap.utils.toArray<HTMLElement>('.step').forEach((el) => el.classList.add('lit'))
      return
    }
    ScrollTrigger.create({
      trigger: track.value!,
      start: 'top 65%',
      end: 'bottom 60%',
      scrub: true,
      onUpdate: (self) => {
        progress = self.progress
        paint()
      },
    })
    gsap.utils.toArray<HTMLElement>('.step').forEach((el, i) => {
      gsap.from(el, { opacity: 0, y: 36, duration: 0.8, ease: 'power3.out', delay: (i % 4) * 0.08, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      ScrollTrigger.create({ trigger: el, start: 'top 62%', toggleClass: { targets: el, className: 'lit' } })
    })
  }, root.value)
})

onBeforeUnmount(() => {
  ro?.disconnect()
  ctx?.revert()
})
</script>

<style scoped>
.head { display: grid; gap: 22px; justify-items: start; margin-bottom: clamp(56px, 7vw, 96px); }

.track { position: relative; }
.snake { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.snake path { fill: none; stroke-width: 2; }
.base { stroke: var(--line-2); }
.fill { stroke: var(--accent); stroke-width: 3; }

.steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(64px, 7vw, 96px) clamp(24px, 3vw, 48px);
}
.step { grid-row: var(--r4); grid-column: var(--c4); display: grid; gap: 8px; align-content: start; justify-items: start; }

.num {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 14px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--line-2);
  font-family: var(--display);
  font-weight: 800;
  font-size: 1.375rem;
  transition: background-color 0.35s var(--ease), border-color 0.35s var(--ease), box-shadow 0.35s var(--ease);
}
.step.lit .num { background: var(--accent); border-color: var(--accent); box-shadow: var(--glow); }

.when { font-size: 0.8125rem; color: var(--accent-hi); }
.title { font-size: clamp(1.25rem, 1.6vw, 1.625rem); line-height: 1.1; }
.org { font-weight: 500; }
.desc { margin-top: 6px; font-size: 0.9375rem; line-height: 1.65; }

/* Formação e destaques: duas colunas discretas abaixo da linha. */
.extra {
  margin-top: clamp(80px, 9vw, 130px);
  padding-top: 40px;
  border-top: 1px solid var(--line);
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: clamp(40px, 6vw, 96px);
}
.extra-title { font-size: clamp(1.5rem, 2vw, 2rem); margin-bottom: 20px; }
.list { display: grid; }
.list li { display: grid; gap: 4px; padding: 18px 0; border-bottom: 1px solid var(--line); }
.list strong { font-weight: 600; font-size: 1.0625rem; }
.list .muted { font-size: 0.9375rem; line-height: 1.6; }

/* Tablet: serpente de 2 colunas (1 → 2, curva, 4 ← 3). */
@media (max-width: 1100px) {
  .steps { grid-template-columns: repeat(2, minmax(0, 1fr)); padding-right: 64px; }
  .step { grid-row: var(--r2); grid-column: var(--c2); }
}

@media (max-width: 700px) {
  .steps { grid-template-columns: 1fr; gap: 56px; padding-right: 0; }
  .step { grid-row: auto; grid-column: auto; padding-left: 76px; position: relative; }
  .num { position: absolute; left: 0; top: 0; margin: 0; }
  .extra { grid-template-columns: 1fr; }
}
</style>
