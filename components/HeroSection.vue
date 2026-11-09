<template>
  <section id="inicio" ref="root" class="hero">
    <!-- Retrato no centro; ao redor, luz carmesim em CSS puro (nenhum canvas no primeiro carregamento). -->
    <div class="figure">
      <div ref="aura" class="aura" aria-hidden="true">
        <span class="halo" />
        <span class="net" />
        <!-- Um SVG por anel: o navegador gira cada um como camada, sem redesenhar a cada quadro. -->
        <svg class="ring r1" viewBox="0 0 600 600"><circle cx="300" cy="300" r="196" /></svg>
        <svg class="ring r2" viewBox="0 0 600 600"><circle cx="300" cy="300" r="238" /></svg>
        <svg class="ring r3" viewBox="0 0 600 600"><circle cx="300" cy="300" r="284" /></svg>
        <span v-for="n in 3" :key="n" class="ray" :class="`ray${n}`" />
      </div>
      <div class="sparks" aria-hidden="true">
        <span v-for="(s, i) in sparks" :key="i" class="spark" :style="s" />
      </div>
      <img
        ref="portrait"
        class="portrait"
        src="/img/erico-retrato.webp"
        width="704"
        height="1480"
        alt="Retrato de Érico Nunes de óculos escuros, com luz vermelha em rede no rosto"
        fetchpriority="high"
        decoding="async"
      />
    </div>
    <div class="fade" aria-hidden="true" />

    <div ref="copy" class="copy">
      <p class="hello hero-in"><span class="dot" aria-hidden="true" />Olá, eu sou o Érico</p>
      <h1 class="title">
        <span class="line"><span class="li">Do chão de fábrica</span></span>
        <span class="line"><span class="li">a decisões com</span></span>
        <span class="line"><span class="li accent-word">inteligência artificial.</span></span>
      </h1>
      <!-- Ênfases, nas palavras do perfil do currículo em PDF -->
      <p class="lead hero-in">
        Desenvolvo ferramentas de visão computacional, orquestro agentes inteligentes (LLMs/VLMs) e construo
        Data Lakes no BigQuery.
      </p>
      <div class="actions hero-in">
        <a href="/CV_Erico_Nunes_ATS.pdf" download class="btn-cta">
          Baixar currículo <span class="circ"><ArrowUpRight :size="18" aria-hidden="true" /></span>
        </a>
        <a href="#projetos" class="btn-line">Projetos</a>
      </div>
    </div>

    <div ref="sign" class="sign">
      <p class="name" aria-label="Érico Nunes">
        <span class="line" aria-hidden="true"><span class="li">Érico</span></span>
        <span class="line" aria-hidden="true"><span class="li">Nunes</span></span>
      </p>
      <p class="role hero-in">
        Engenharia de Inteligência Artificial e Dados. Graduando em Engenharia da Computação, Manaus, AM.
      </p>
      <ul class="socials hero-in">
        <li v-for="s in socials" :key="s.label">
          <a :href="s.href" :target="s.external ? '_blank' : undefined" :rel="s.external ? 'noopener' : undefined">{{ s.label }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()
const nuxt = useNuxtApp()

const root = ref<HTMLElement>()
const aura = ref<HTMLElement>()
const portrait = ref<HTMLElement>()
const copy = ref<HTMLElement>()
const sign = ref<HTMLElement>()

const socials = computed(() => [
  { label: 'LinkedIn', href: store.linkedin, external: true },
  { label: 'GitHub', href: store.github, external: true },
  { label: 'E-mail', href: `mailto:${store.email}`, external: false },
])

// Faíscas que sobem ao redor do retrato. Posições fixas: o SSR e o cliente desenham igual.
const sparks = [
  [8, 0, 9], [16, 2.4, 11], [24, 5.1, 8], [31, 1.2, 12], [69, 3.3, 10], [76, 0.6, 9],
  [84, 4.2, 11], [91, 1.8, 8], [12, 6.4, 10], [88, 7, 12], [20, 8.1, 9], [80, 9, 10],
].map(([left, delay, dur]) => ({ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${dur}s` }))

let ctx: { revert: () => void } | undefined
let onMove: ((e: PointerEvent) => void) | undefined

onMounted(() => {
  const gsap = nuxt.$gsap as typeof import('gsap').gsap
  if (!gsap || isCalm()) return

  ctx = gsap.context(() => {
    // Entrada: o retrato acende de dentro do halo, depois as linhas sobem das máscaras.
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from(portrait.value!, { opacity: 0, scale: 1.06, filter: 'brightness(0.2)', duration: 1.6, ease: 'power2.out' }, 0)
      .from(aura.value!, { opacity: 0, scale: 0.8, duration: 1.8, ease: 'power2.out' }, 0.1)
      .from('.hero .li', { yPercent: 110, duration: 1.1, stagger: 0.1 }, 0.35)
      .from('.hero .hero-in', { y: 24, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 0.7)

    // Ao rolar: o retrato desce devagar e o texto se afasta, como no fim de um plano.
    const out = { trigger: root.value!, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to(portrait.value!, { yPercent: 10, scale: 1.04, ease: 'none', scrollTrigger: out })
    gsap.to(aura.value!, { scale: 1.25, opacity: 0.35, ease: 'none', scrollTrigger: out })
    gsap.to([copy.value!, sign.value!], { y: -90, opacity: 0, ease: 'none', scrollTrigger: { ...out, end: '60% top' } })

    // O halo segue o ponteiro de leve; o retrato vai para o lado oposto.
    if (matchMedia('(pointer: fine)').matches) {
      const ax = gsap.quickTo(aura.value!, 'x', { duration: 1.2, ease: 'power3.out' })
      const ay = gsap.quickTo(aura.value!, 'y', { duration: 1.2, ease: 'power3.out' })
      const px = gsap.quickTo(portrait.value!, 'x', { duration: 1.4, ease: 'power3.out' })
      onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        ax(nx * 36)
        ay(ny * 28)
        px(nx * -10)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
    }
  }, root.value)
})

onBeforeUnmount(() => {
  if (onMove) window.removeEventListener('pointermove', onMove)
  ctx?.revert()
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: max(100svh, 640px);
  overflow: hidden;
  isolation: isolate;
}

/* Retrato preso à base, centralizado. A cabeça fica perto de 36% da altura da imagem. */
.figure {
  position: absolute;
  left: 50%;
  bottom: 0;
  height: 100%;
  aspect-ratio: 704 / 1480;
  transform: translateX(-50%);
  z-index: 1;
}
.portrait {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: 50% 100%;
  will-change: transform;
  /* A camisa vai até a borda da foto: some nas laterais da metade de baixo, a cabeça fica inteira. */
  -webkit-mask-image: linear-gradient(#000, #000), linear-gradient(to right, transparent, #000 22%, #000 78%, transparent);
  -webkit-mask-size: 100% 46%, 100% 54%;
  -webkit-mask-position: top, bottom;
  -webkit-mask-repeat: no-repeat;
  mask-image: linear-gradient(#000, #000), linear-gradient(to right, transparent, #000 22%, #000 78%, transparent);
  mask-size: 100% 46%, 100% 54%;
  mask-position: top, bottom;
  mask-repeat: no-repeat;
}

.aura { position: absolute; left: 50%; top: 36%; width: 0; height: 0; z-index: 1; pointer-events: none; }
.aura > * { position: absolute; left: 50%; top: 50%; }

.halo {
  width: 130vmin;
  height: 130vmin;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(var(--accent-rgb), 0.55) 0%, rgba(var(--accent-rgb), 0.22) 22%, rgba(var(--accent-rgb), 0.06) 42%, transparent 62%);
  animation: breathe 7s ease-in-out infinite alternate;
}
@keyframes breathe {
  from { opacity: 0.8; transform: translate(-50%, -50%) scale(0.94); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
}

/* A mesma rede de luz que cai no rosto, espalhada atrás da cabeça. */
.net {
  width: 110vmin;
  height: 110vmin;
  transform: translate(-50%, -50%);
  background-image: radial-gradient(circle, rgba(255, 70, 90, 0.75) 1.3px, transparent 1.9px);
  background-size: 20px 20px;
  -webkit-mask-image: radial-gradient(circle, #000 0%, rgba(0, 0, 0, 0.5) 30%, transparent 62%);
  mask-image: radial-gradient(circle, #000 0%, rgba(0, 0, 0, 0.5) 30%, transparent 62%);
  opacity: 0.55;
}

.ring {
  width: min(118vmin, 1100px);
  height: min(118vmin, 1100px);
  margin: calc(min(118vmin, 1100px) / -2) 0 0 calc(min(118vmin, 1100px) / -2);
  overflow: visible;
  fill: none;
  stroke: rgba(var(--accent-rgb), 0.55);
  will-change: transform;
  animation: spin 40s linear infinite;
}
.r1 circle { stroke-width: 1.2; stroke-dasharray: 2 10; }
.r2 { opacity: 0.7; animation-duration: 60s; animation-direction: reverse; }
.r2 circle { stroke-width: 1; stroke-dasharray: 90 30 6 30; }
.r3 { opacity: 0.45; animation-duration: 90s; }
.r3 circle { stroke-width: 0.8; stroke-dasharray: 1 6; }
@keyframes spin { to { transform: rotate(360deg); } }

.ray {
  width: 9vmin;
  height: 190vmin;
  transform-origin: 50% 0;
  /* luz macia só com gradiente: sem filter: blur, que pesa a cada quadro */
  background: radial-gradient(50% 60% at 50% 0%, rgba(var(--accent-rgb), 0.3), transparent);
  will-change: transform;
  animation: sway 14s ease-in-out infinite alternate;
}
.ray1 { --a: -38deg; translate: -50% -92vmin; }
.ray2 { --a: 34deg; translate: -50% -92vmin; width: 6vmin; opacity: 0.7; animation-duration: 18s; }
.ray3 { --a: -8deg; translate: -50% -96vmin; width: 4vmin; opacity: 0.45; animation-duration: 22s; }
@keyframes sway {
  from { transform: rotate(calc(var(--a) - 4deg)); }
  to { transform: rotate(calc(var(--a) + 4deg)); }
}

/* Faíscas numa faixa de 100vmin centrada no retrato, subindo da base. */
.sparks {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 100vmin;
  height: 100%;
  transform: translateX(-50%);
  z-index: 1;
  pointer-events: none;
}
.spark {
  position: absolute;
  bottom: 4%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ff5a6e;
  box-shadow: 0 0 10px 2px rgba(var(--accent-rgb), 0.8);
  opacity: 0;
  animation: rise linear infinite;
}
@keyframes rise {
  0% { transform: translateY(0) scale(0.6); opacity: 0; }
  15% { opacity: 0.9; }
  80% { opacity: 0.5; }
  100% { transform: translateY(-80vh) scale(1); opacity: 0; }
}

.fade {
  position: absolute;
  inset: auto 0 0;
  height: 26%;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(to top, var(--bg), transparent);
}

/* Título no canto superior esquerdo; nome no canto inferior direito. */
.copy {
  position: absolute;
  z-index: 3;
  left: var(--margin);
  top: calc(var(--nav-h) + clamp(40px, 7vh, 88px));
  width: min(31vw, 30rem);
}
.hello {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--muted);
}
.dot { width: 9px; height: 9px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px rgba(var(--accent-rgb), 0.25); }

.title { font-size: clamp(2rem, 2.9vw, 3.25rem); line-height: 1.02; }
.line { display: block; overflow: hidden; padding: 0.06em 0 0.1em; margin: -0.06em 0 -0.1em; }
.li { display: inline-block; will-change: transform; }
.accent-word { color: var(--accent-hi); }

.lead { margin-top: 22px; max-width: 26rem; line-height: 1.6; color: var(--muted); }
.actions { margin-top: 30px; display: flex; flex-wrap: wrap; gap: 12px; }

.sign {
  position: absolute;
  z-index: 3;
  right: var(--margin);
  bottom: clamp(40px, 7vh, 80px);
  text-align: right;
}
.name {
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(3.5rem, 8.4vw, 9rem);
  line-height: 0.86;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}
.role { margin: 20px 0 0 auto; max-width: 22rem; font-size: 0.9375rem; line-height: 1.6; color: var(--muted); }
.socials { margin-top: 16px; display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 6px 22px; }
.socials a { font-size: 0.9375rem; font-weight: 600; text-decoration: none; color: var(--text); transition: color 0.2s var(--ease); }
.socials a:hover { color: var(--accent-hi); }

/* Telas médias: o retrato encolhe para não brigar com o texto. */
@media (max-width: 1180px) {
  .figure { height: 88%; }
  .copy { width: min(36vw, 26rem); }
}

/* Celular: retrato em cima, texto embaixo sobre a camisa escura (como na referência). */
@media (max-width: 900px) {
  .hero { min-height: max(100svh, 700px); }
  .figure { height: 86%; bottom: 14%; }
  .fade { height: 62%; background: linear-gradient(to top, var(--bg) 30%, rgba(18, 20, 19, 0.85) 55%, transparent); }
  .copy {
    top: auto;
    bottom: 104px;
    left: var(--margin);
    right: var(--margin);
    width: auto;
    text-align: center;
  }
  .hello { margin-bottom: 14px; }
  .title { font-size: clamp(2rem, 8.4vw, 2.75rem); }
  .lead { margin: 16px auto 0; }
  .actions { justify-content: center; margin-top: 22px; }
  .sign { display: none; }
}
</style>
