<template>
  <section id="anatomia" ref="root" class="anat" :class="{ live }">
    <div ref="stage" class="stage">
      <div class="copy">
        <h2 class="title">Do chão de fábrica ao modelo</h2>

        <div class="steps">
          <article v-for="(step, i) in steps" :key="step.name" class="step" :class="{ on: i === activeIndex }">
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-text">{{ step.text }}</p>
          </article>
        </div>

        <ol class="rail" aria-hidden="true">
          <li v-for="(step, i) in steps" :key="step.name" :class="{ on: i === activeIndex }">{{ step.name }}</li>
        </ol>
      </div>

      <canvas
        ref="canvas"
        class="gl"
        role="img"
        aria-label="Rede neural em 3D com quatro camadas: câmeras e sensores, racks de ingestão, neurônios e chips, e telas de dashboard, ligados por fios com pulsos de sinal"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    name: 'Captura',
    title: 'Câmeras e sensores no chão de fábrica',
    text: 'A visão computacional observa operadores, peças e linhas em tempo real. É o que alimenta o Osiris, o Chronos e o Sharingan.',
  },
  {
    name: 'Ingestão',
    title: 'deviceWise, MES e BigQuery',
    text: 'Telemetria contínua do maquinário até o Data Lake corporativo, com rastreabilidade de ponta a ponta. É a base do Projeto Injetados 1.0.',
  },
  {
    name: 'Modelo',
    title: 'Modelos de visão e linguagem, locais',
    text: 'VLMs e LLMs locais classificam ciclos e microparadas. Rotas em A* e aprendizado contínuo antecipam falhas no gêmeo digital do AGV.',
  },
  {
    name: 'Decisão',
    title: 'Dashboards e ação',
    text: 'OEE, gargalos e anomalias em tempo real viram melhoria contínua e balanceamento operacional da produção.',
  },
]

const nuxt = useNuxtApp()
const root = ref<HTMLElement>()
const stage = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
const activeIndex = ref(0)
const live = ref(false)

let net: NeuralNet | null = null
let ctx: { revert: () => void } | undefined
let io: IntersectionObserver | undefined
let ro: ResizeObserver | undefined
let onLoad: (() => void) | undefined

onMounted(async () => {
  if (!canvas.value || !root.value || !stage.value) return
  const gsap = nuxt.$gsap as typeof import('gsap').gsap
  const ScrollTrigger = nuxt.$ScrollTrigger as typeof import('gsap/ScrollTrigger').ScrollTrigger
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  try {
    // Esta seção é sempre escura (um "capítulo" de campo invertido), em qualquer tema.
    net = await createNeuralNet(canvas.value, { mode: 'anatomy', base: '#dedad3', accent: '#6cc0d4', reduceMotion })
  } catch (err) {
    console.error('[neural] anatomia', err)
    return // sem WebGL: os textos continuam legíveis em fluxo normal
  }

  net.onActive((i) => (activeIndex.value = Math.max(0, i)))

  ro = new ResizeObserver(() => net?.resize())
  ro.observe(canvas.value)
  io = new IntersectionObserver(([entry]) => net?.setRunning(entry.isIntersecting))
  io.observe(canvas.value)

  if (reduceMotion) return // sem pin nem movimento: camada de captura + os quatro textos em fluxo

  live.value = true
  await nextTick()
  net.resize()

  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: root.value,
      start: 'top top',
      end: '+=320%',
      pin: stage.value,
      scrub: true,
      anticipatePin: 1,
      snap: { snapTo: 1 / 3, duration: { min: 0.25, max: 0.6 }, ease: 'power1.inOut' },
      onUpdate: (self) => net?.setProgress(self.progress),
    })
  }, root.value)

  onLoad = () => ScrollTrigger.refresh()
  window.addEventListener('load', onLoad)
})

onBeforeUnmount(() => {
  if (onLoad) window.removeEventListener('load', onLoad)
  ctx?.revert()
  io?.disconnect()
  ro?.disconnect()
  net?.dispose()
})
</script>

<style scoped>
.anat {
  --a-ink: #dedad3;
  --a-muted: #a39e95;
  --a-accent: #6cc0d4;
  margin-top: var(--gap-section);
  background: #0a0a0a;
  color: var(--a-ink);
}

.stage {
  position: relative;
  min-height: 100svh;
  padding: calc(var(--nav-h) + 24px) var(--margin) var(--margin);
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: 16px;
  align-items: center;
}
.live .stage { height: 100svh; min-height: 0; }

.copy {
  grid-column: 1 / span 5;
  position: relative;
  z-index: 2;
  display: grid;
  gap: 32px;
}
.title {
  font-size: clamp(2.25rem, 4.2vw, 4rem);
  letter-spacing: -0.045em;
  line-height: 0.98;
}

.rail {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  font-size: var(--step-small);
  color: var(--a-muted);
}
.rail li { transition: color 0.3s var(--ease); }
.rail li.on { color: var(--a-accent); }

.steps { display: grid; gap: 32px; }
.step-title {
  font-size: clamp(1.5rem, 2.4vw, 2.25rem);
  letter-spacing: -0.035em;
  line-height: 1.05;
  margin-bottom: 12px;
}
.step-text { font-size: max(1.0625rem, var(--step-body)); line-height: 1.5; max-width: 40ch; color: var(--a-ink); }

/* Com a seção pinada, os textos se empilham e só o da camada ativa aparece. */
.live .steps { position: relative; display: block; min-height: 15em; }
.live .step {
  position: absolute;
  inset: 0 auto auto 0;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.45s var(--ease), transform 0.45s var(--ease);
  pointer-events: none;
}
.live .step.on { opacity: 1; transform: none; pointer-events: auto; }

.gl {
  grid-column: 6 / -1;
  width: 100%;
  height: min(78svh, 760px);
  display: block;
}

@media (max-width: 860px) {
  .stage {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr) auto;
    align-items: stretch;
    row-gap: 12px;
    padding-top: calc(var(--nav-h) + 12px);
  }
  .copy { display: contents; }
  .title { font-size: clamp(1.75rem, 8vw, 2.5rem); grid-row: 1; }
  .rail { display: none; }
  .gl { grid-column: 1; grid-row: 2; height: 100%; min-height: 34svh; }
  .steps { grid-row: 3; }
  .live .steps { min-height: 11.5em; }
  .step-title { font-size: 1.375rem; margin-bottom: 6px; }
  .step-text { font-size: 1rem; }
}
</style>
