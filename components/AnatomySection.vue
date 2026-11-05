<template>
  <section id="anatomia" ref="root" class="anat" :class="{ live }">
    <div ref="stage" class="stage">
      <canvas
        ref="canvas"
        class="gl"
        role="img"
        aria-label="Rede neural em 3D feita de objetos físicos: câmeras e sensores, racks, neurônios e chips, e telas de dashboard, ligados por fios com pulsos de sinal"
      />
      <div class="vignette" aria-hidden="true" />

      <header class="head container">
        <p class="label">Anatomia</p>
        <h2 class="title">Como um sistema de IA <span class="accent">nasce na fábrica</span></h2>
      </header>

      <div class="steps container">
        <article v-for="(step, i) in steps" :key="step.name" class="step" :class="{ on: i === active }">
          <p class="step-tag mono">{{ String(i + 1).padStart(2, '0') }} · {{ step.name }}</p>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-text muted">{{ step.text }}</p>
        </article>
      </div>

      <ol class="hud" :class="{ on: active >= 0 }" aria-hidden="true">
        <li v-for="(step, i) in steps" :key="step.name" :class="{ on: i === active }">{{ step.name }}</li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    name: 'Captura',
    title: 'Câmeras e sensores',
    text: 'A visão computacional observa operadores, peças e linhas em tempo real. É o que alimenta o Osiris, o Chronos e o Sharingan.',
  },
  {
    name: 'Ingestão',
    title: 'deviceWise, MES e BigQuery',
    text: 'Telemetria contínua do maquinário até o Data Lake corporativo, com rastreabilidade de ponta a ponta. É a base do Projeto Injetados 1.0.',
  },
  {
    name: 'Modelo',
    title: 'Visão e linguagem, locais',
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
const active = ref(-1)
const live = ref(false)

let net: NeuralNet | null = null
let ctx: { revert: () => void } | undefined
let near: IntersectionObserver | undefined
let vis: IntersectionObserver | undefined
let ro: ResizeObserver | undefined
let onPointer: ((e: PointerEvent) => void) | undefined
let progress = 0

async function boot(calm: boolean) {
  if (net || !canvas.value) return
  try {
    net = await createNeuralNet(canvas.value, { base: '#52525b', active: '#f4f4f5', accent: '#ff6a2b', calm })
  } catch (err) {
    console.error('[neural]', err)
    return
  }
  net.onActive((i) => (active.value = i))
  net.setProgress(progress)
  ro = new ResizeObserver(() => net?.resize())
  ro.observe(canvas.value)
  vis = new IntersectionObserver(([e]) => net?.setRunning(e.isIntersecting))
  vis.observe(canvas.value)
  onPointer = (e) => net?.setPointer((e.clientX / window.innerWidth - 0.5) * 2, (e.clientY / window.innerHeight - 0.5) * 2)
  window.addEventListener('pointermove', onPointer, { passive: true })
}

onMounted(async () => {
  if (!root.value || !stage.value) return
  const gsap = nuxt.$gsap as typeof import('gsap').gsap
  const ScrollTrigger = nuxt.$ScrollTrigger as typeof import('gsap/ScrollTrigger').ScrollTrigger
  const calm = isCalm()

  // O pin existe desde já (as alturas da página dependem dele); o Three.js só é baixado
  // quando a seção está a ~1 tela de distância.
  live.value = true
  await nextTick()
  const intro = JOURNEY_INTRO
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: root.value,
      start: 'top top',
      end: '+=420%',
      pin: stage.value,
      scrub: true,
      anticipatePin: 1,
      refreshPriority: 10,
      snap: calm ? undefined : { snapTo: [0, intro, intro + (1 - intro) / 3, intro + ((1 - intro) * 2) / 3, 1], duration: { min: 0.2, max: 0.6 }, ease: 'power1.inOut' },
      onUpdate: (self) => {
        progress = self.progress
        net?.setProgress(progress)
      },
    })
  }, root.value)

  near = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        near?.disconnect()
        boot(calm)
      }
    },
    { rootMargin: '100% 0px' },
  )
  near.observe(root.value)
})

onBeforeUnmount(() => {
  if (onPointer) window.removeEventListener('pointermove', onPointer)
  ctx?.revert()
  near?.disconnect()
  vis?.disconnect()
  ro?.disconnect()
  net?.dispose()
})
</script>

<style scoped>
.anat { background: var(--bg); border-block: 1px solid var(--line); }
.stage { position: relative; height: 100svh; min-height: 600px; overflow: hidden; }
.gl { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at 62% 50%, transparent 35%, rgba(10, 10, 12, 0.85) 100%);
}

.head { position: absolute; left: 0; right: 0; top: calc(var(--nav-h) + 64px); z-index: 2; pointer-events: none; }
.title { margin-top: 16px; font-size: clamp(2.25rem, 4.6vw, 4.25rem); max-width: 12em; line-height: 1.02; }

.steps { position: absolute; left: 0; right: 0; bottom: clamp(64px, 10vh, 120px); z-index: 3; pointer-events: none; }
.step {
  position: absolute;
  left: 0;
  bottom: 0;
  width: min(480px, 40vw);
  padding: clamp(22px, 2.2vw, 32px);
  border-radius: var(--radius);
  background: rgba(20, 20, 24, 0.82);
  border: 1px solid var(--line-2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
}
.step.on { opacity: 1; transform: none; }
.step-tag { color: var(--accent); font-size: 0.8125rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; }
.step-title { font-size: clamp(1.75rem, 2.6vw, 2.5rem); margin-bottom: 12px; }
.step-text { line-height: 1.6; }

.hud {
  position: absolute;
  right: var(--margin);
  bottom: clamp(24px, 4vh, 44px);
  z-index: 3;
  display: flex;
  gap: 6px;
  padding: 5px;
  border-radius: 999px;
  background: rgba(20, 20, 24, 0.82);
  border: 1px solid var(--line);
  opacity: 0;
  transition: opacity 0.4s var(--ease);
}
.hud.on { opacity: 1; }
.hud li { padding: 8px 16px; border-radius: 999px; font-size: 0.875rem; color: var(--muted); transition: background-color 0.3s var(--ease), color 0.3s var(--ease); }
.hud li.on { background: var(--accent); color: var(--accent-ink); font-weight: 600; }

/* Sem JS: os quatro passos em fluxo normal. */
.anat:not(.live) .stage { height: auto; padding: 160px 0 80px; }
.anat:not(.live) .head,
.anat:not(.live) .steps { position: relative; top: auto; bottom: auto; }
.anat:not(.live) .step { position: relative; opacity: 1; transform: none; margin-top: 16px; }
.anat:not(.live) .gl, .anat:not(.live) .hud { display: none; }

@media (max-width: 860px) {
  .head { top: calc(var(--nav-h) + 24px); }
  .title { font-size: clamp(1.9rem, 8vw, 2.6rem); }
  .step { width: auto; right: 0; }
  .steps { bottom: 100px; }
  .hud { left: 50%; right: auto; transform: translateX(-50%); bottom: 96px; display: none; }
}
</style>
