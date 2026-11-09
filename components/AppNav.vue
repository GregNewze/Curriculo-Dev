<template>
  <header class="top" :class="{ scrolled }">
    <div class="bar container">
      <a href="#inicio" class="logo">Érico Nunes<span class="accent">.</span></a>

      <nav class="pillnav" aria-label="Principal">
        <a
          v-for="l in links"
          :key="l.id"
          :href="`#${l.id}`"
          :class="{ on: active === l.id, 'hide-m': l.id === 'inicio' }"
          :aria-current="active === l.id ? 'true' : undefined"
        >{{ l.label }}</a>
      </nav>

      <div class="right">
        <button
          type="button"
          class="motion"
          :class="{ off: calm }"
          role="switch"
          :aria-checked="!calm"
          :title="calm ? 'Animações reduzidas. Clique para ligar.' : 'Animações ligadas. Clique para reduzir.'"
          @click="toggleMotion"
        >
          <span class="knob" aria-hidden="true" />
          <span class="sr-only">Animações</span>
        </button>
        <a href="#contato" class="btn cta">Vamos conversar</a>
      </div>
    </div>
  </header>

  <!-- Atalho fixo para o currículo, como a pílula de orçamento da referência. Só no desktop. -->
  <a href="/CV_Erico_Nunes_ATS.pdf" download class="dock" :class="{ show: pastHero }" :tabindex="pastHero ? undefined : -1">
    <span class="mark" aria-hidden="true">ÉN</span>
    <span class="dock-btn">Baixar currículo <span class="circ"><ArrowUpRight :size="16" aria-hidden="true" /></span></span>
  </a>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

const links = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'experiencia', label: 'Trajetória' },
  { id: 'contato', label: 'Contato' },
]

const nuxt = useNuxtApp()
const active = ref('inicio')
const scrolled = ref(false)
const pastHero = ref(false)
const calm = ref(false)
let ctx: { revert: () => void } | undefined

const toggleMotion = () => setMotion(calm.value)

onMounted(() => {
  calm.value = isCalm()
  const gsap = nuxt.$gsap as typeof import('gsap').gsap
  const ScrollTrigger = nuxt.$ScrollTrigger as typeof import('gsap/ScrollTrigger').ScrollTrigger
  ctx = gsap.context(() => {
    ScrollTrigger.create({ start: 12, end: 'max', onToggle: (self) => (scrolled.value = self.isActive) })
    ScrollTrigger.create({ trigger: '#inicio', start: '70% top', end: 'max', onToggle: (self) => (pastHero.value = self.isActive) })
    // A pílula acompanha a seção visível. "Trajetória" cobre também stack e certificações.
    const map: [string, string][] = [
      ['#inicio', 'inicio'],
      ['#sobre', 'sobre'],
      ['#numeros', 'sobre'],
      ['#projetos', 'projetos'],
      ['#experiencia', 'experiencia'],
      ['#stack', 'experiencia'],
      ['#certificados', 'experiencia'],
      ['#contato', 'contato'],
    ]
    for (const [sel, id] of map) {
      if (!document.querySelector(sel)) continue
      ScrollTrigger.create({
        trigger: sel,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && (active.value = id),
      })
    }
  })
})

onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.top {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 60;
  transition: background-color 0.35s var(--ease), border-color 0.35s var(--ease);
  border-bottom: 1px solid transparent;
}
.top.scrolled {
  /* fundo quase sólido em vez de desfoque: o blur recalcula a cada quadro de rolagem */
  background: rgba(18, 20, 19, 0.94);
  border-bottom-color: var(--line);
}

.bar {
  height: var(--nav-h);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
}
.logo { font-family: var(--display); font-weight: 800; font-size: 1.5rem; letter-spacing: -0.03em; text-decoration: none; }

.pillnav {
  display: flex;
  gap: 2px;
  padding: 5px;
  border-radius: 999px;
  background: rgba(35, 39, 36, 0.9);
  border: 1px solid var(--line);
}
.pillnav a {
  padding: 9px 18px;
  border-radius: 999px;
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--text);
  transition: background-color 0.3s var(--ease), color 0.3s var(--ease);
}
.pillnav a:hover { background: rgba(255, 255, 255, 0.08); }
.pillnav a.on { background: var(--text); color: var(--bg); }

.right { display: flex; align-items: center; justify-content: flex-end; gap: 14px; }

/* Chave de animação: trilho com bolinha, sem ícone. */
.motion {
  position: relative;
  width: 46px;
  height: 26px;
  padding: 0;
  border-radius: 999px;
  border: 1px solid var(--line-2);
  background: rgba(var(--accent-rgb), 0.35);
  cursor: pointer;
  transition: background-color 0.25s var(--ease);
}
.knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--text);
  transform: translateX(20px);
  transition: transform 0.25s var(--ease);
}
.motion.off { background: var(--card-2); }
.motion.off .knob { transform: none; }
.cta { min-height: 44px; padding: 0 22px; }

.dock {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 59;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px;
  border-radius: 18px;
  background: rgba(27, 30, 28, 0.94);
  border: 1px solid var(--line-2);
  text-decoration: none;
  opacity: 0;
  transform: translateY(24px);
  pointer-events: none;
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
}
.dock.show { opacity: 1; transform: none; pointer-events: auto; }
.mark {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  font-family: var(--display);
  font-weight: 800;
  font-size: 1.0625rem;
  letter-spacing: -0.04em;
  color: var(--accent-hi);
}
.dock-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 44px;
  padding: 0 4px 0 18px;
  border-radius: 999px;
  background: var(--text);
  color: var(--bg);
  font-size: 0.9375rem;
  font-weight: 600;
}
.dock .circ {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  transition: transform 0.35s var(--ease);
}
.dock:hover .circ { transform: rotate(45deg); }

@media (max-width: 900px) {
  .bar { grid-template-columns: 1fr auto; }
  .cta, .dock { display: none; }
  .hide-m { display: none; }
  /* No celular a navegação vira uma barra flutuante embaixo. */
  .pillnav {
    position: fixed;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    z-index: 61;
    background: rgba(27, 30, 28, 0.92);
  }
  .pillnav a { padding: 10px 14px; font-size: 0.8125rem; white-space: nowrap; }
}
</style>
