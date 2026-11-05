<template>
  <section id="inicio" class="hero">
    <!-- Feixes de luz em CSS puro (leve: nenhum canvas no primeiro carregamento) -->
    <div class="beams" aria-hidden="true">
      <span v-for="n in 4" :key="n" class="beam" :class="`b${n}`" />
    </div>
    <div class="grain" aria-hidden="true" />

    <div class="container inner">
      <p class="hello hero-in"><span class="dot" aria-hidden="true" />Olá, eu sou o Érico</p>

      <h1 class="title">
        <span class="line"><span class="li">Do chão de fábrica</span></span>
        <span class="line"><span class="li">a decisões com</span></span>
        <span class="line"><span class="li accent">inteligência artificial.</span></span>
      </h1>

      <p class="lead hero-in">
        Engenharia de IA e Dados em Manaus. Controlador de Automação e Dados na Whirlpool e graduando em
        Engenharia da Computação. Construo visão computacional, agentes com LLMs/VLMs locais e telemetria
        industrial em tempo real.
      </p>

      <div class="foot hero-in">
        <ul class="socials">
          <li v-for="s in socials" :key="s.label">
            <a :href="s.href" :target="s.external ? '_blank' : undefined" :rel="s.external ? 'noopener' : undefined" :download="s.download || undefined">
              {{ s.label }} <ArrowUpRight :size="15" aria-hidden="true" />
            </a>
          </li>
        </ul>
        <a href="#sobre" class="btn btn-ghost">Role para baixo <ArrowRight :size="18" aria-hidden="true" /></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()
const nuxt = useNuxtApp()

const socials = computed(() => [
  { label: 'LinkedIn', href: store.linkedin, external: true },
  { label: 'GitHub', href: store.github, external: true },
  { label: 'E-mail', href: `mailto:${store.email}`, external: false },
  { label: 'Currículo', href: '/CV_Erico_Nunes_ATS.pdf', external: false, download: true },
])

// Entrada: cada linha do título sobe de dentro da máscara, depois o resto.
onMounted(() => {
  const gsap = nuxt.$gsap as typeof import('gsap').gsap
  if (!gsap || isCalm()) return
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
  tl.from('.hero .li', { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.15)
    .from('.hero .hero-in', { y: 24, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, 0.45)
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 180px 0 72px;
  border-bottom: 1px solid var(--line);
}

.beams { position: absolute; inset: -20% -10%; pointer-events: none; }
.beam {
  position: absolute;
  top: -10%;
  width: 14vw;
  height: 140%;
  background: linear-gradient(90deg, transparent, rgba(255, 106, 43, 0.16), transparent);
  filter: blur(28px);
  transform: rotate(-32deg);
  animation: drift 16s ease-in-out infinite alternate;
  will-change: transform;
}
.b1 { left: 30%; }
.b2 { left: 48%; width: 8vw; opacity: 0.7; animation-duration: 21s; }
.b3 { left: 62%; width: 18vw; opacity: 0.5; animation-duration: 25s; }
.b4 { left: 80%; width: 6vw; opacity: 0.8; animation-duration: 18s; }
@keyframes drift {
  from { transform: rotate(-32deg) translateX(-4vw); }
  to { transform: rotate(-32deg) translateX(5vw); }
}

/* Grão estático por SVG: textura sem custo de animação. */
.grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.18;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

.inner { position: relative; z-index: 2; }
.hello {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 28px;
}
.dot { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); box-shadow: var(--glow); }

.title { font-size: clamp(3rem, 7.2vw, 7.25rem); line-height: 0.98; max-width: 12.5em; }
.line { display: block; overflow: hidden; padding: 0.06em 0 0.08em; margin: -0.06em 0 -0.08em; }
.li { display: inline-block; will-change: transform; }

.lead { margin-top: 32px; max-width: 44rem; font-size: clamp(1.0625rem, 1.25vw, 1.25rem); line-height: 1.65; color: var(--muted); }

.foot {
  margin-top: clamp(48px, 7vw, 96px);
  padding-top: 32px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.socials { display: flex; flex-wrap: wrap; gap: 12px 30px; }
.socials a {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--muted);
  transition: color 0.2s var(--ease);
}
.socials a:hover { color: var(--accent); }

@media (max-width: 900px) {
  .hero { padding-top: 150px; padding-bottom: 120px; }
}
</style>
