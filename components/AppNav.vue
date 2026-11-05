<template>
  <header class="top" :class="{ scrolled }">
    <div v-if="bar" class="announce">
      <FileText :size="15" class="accent" aria-hidden="true" />
      <strong class="accent">Currículo atualizado</strong>
      <span class="muted hide-sm">· versão em PDF para download</span>
      <a href="/CV_Erico_Nunes_ATS.pdf" download class="mini">Baixar <ArrowDown :size="13" aria-hidden="true" /></a>
      <button type="button" class="close" aria-label="Fechar aviso" @click="bar = false"><X :size="16" /></button>
    </div>

    <div class="bar container">
      <a href="#inicio" class="logo">Érico Nunes<span class="accent">.</span></a>

      <nav class="pillnav" aria-label="Principal">
        <a
          v-for="l in links"
          :key="l.id"
          :href="`#${l.id}`"
          :class="{ on: active === l.id }"
          :aria-current="active === l.id ? 'true' : undefined"
        >
          <component :is="l.icon" :size="16" aria-hidden="true" />
          <span>{{ l.label }}</span>
        </a>
      </nav>

      <div class="right">
        <button
          type="button"
          class="motion"
          :class="{ off: calm }"
          :aria-pressed="!calm"
          :title="calm ? 'Animações reduzidas. Clique para ligar.' : 'Animações ligadas. Clique para reduzir.'"
          @click="toggleMotion"
        >
          <Sparkles :size="18" aria-hidden="true" />
          <span class="sr-only">{{ calm ? 'Ligar animações' : 'Reduzir animações' }}</span>
        </button>
        <a href="#contato" class="btn cta">Vamos conversar</a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ArrowDown, FileText, FolderKanban, House, Mail, Sparkles, User, X } from 'lucide-vue-next'

const links = [
  { id: 'inicio', label: 'Início', icon: House },
  { id: 'projetos', label: 'Projetos', icon: FolderKanban },
  { id: 'sobre', label: 'Sobre', icon: User },
  { id: 'contato', label: 'Contato', icon: Mail },
]

const nuxt = useNuxtApp()
const bar = ref(true)
const active = ref('inicio')
const scrolled = ref(false)
const calm = ref(false)
let ctx: { revert: () => void } | undefined

const toggleMotion = () => setMotion(calm.value)

onMounted(() => {
  calm.value = isCalm()
  const gsap = nuxt.$gsap as typeof import('gsap').gsap
  const ScrollTrigger = nuxt.$ScrollTrigger as typeof import('gsap/ScrollTrigger').ScrollTrigger
  ctx = gsap.context(() => {
    ScrollTrigger.create({ start: 12, end: 'max', onToggle: (self) => (scrolled.value = self.isActive) })
    // A pílula acompanha a seção visível. "Sobre" cobre perfil, anatomia, stack e experiência.
    const map: [string, string][] = [
      ['#inicio', 'inicio'],
      ['#sobre', 'sobre'],
      ['#anatomia', 'sobre'],
      ['#projetos', 'projetos'],
      ['#experiencia', 'sobre'],
      ['#stack', 'sobre'],
      ['#certificados', 'sobre'],
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
  background: rgba(10, 10, 12, 0.78);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--line);
}

.announce {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  padding: 6px 48px;
  font-size: 0.875rem;
  border-bottom: 1px solid var(--line);
  background: var(--bg);
}
.mini {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 6px;
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--accent);
  color: var(--accent-ink);
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
}
.close {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: none;
  color: var(--muted);
  cursor: pointer;
}
.close:hover { color: var(--text); background: var(--card-2); }

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
  gap: 4px;
  padding: 5px;
  border-radius: 999px;
  background: rgba(27, 27, 32, 0.8);
  border: 1px solid var(--line);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.pillnav a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--text);
  transition: background-color 0.3s var(--ease), color 0.3s var(--ease);
}
.pillnav a:hover { background: var(--card-2); }
.pillnav a.on { background: var(--accent); color: var(--accent-ink); }

.right { display: flex; align-items: center; justify-content: flex-end; gap: 14px; }
.motion {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: none;
  color: var(--accent);
  cursor: pointer;
  transition: color 0.2s var(--ease), border-color 0.2s var(--ease);
}
.motion.off { color: var(--muted); }
.motion:hover { border-color: var(--line-2); }
.cta { min-height: 44px; padding: 0 22px; }

@media (max-width: 900px) {
  .hide-sm { display: none; }
  /* backdrop-filter no cabeçalho prenderia a barra fixa de baixo dentro dele */
  .top.scrolled { backdrop-filter: none; -webkit-backdrop-filter: none; background: rgba(10, 10, 12, 0.96); }
  .bar { grid-template-columns: 1fr auto; }
  .cta { display: none; }
  /* No celular a navegação vira uma barra flutuante embaixo. */
  .pillnav {
    position: fixed;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    z-index: 61;
    background: rgba(20, 20, 24, 0.92);
  }
  .pillnav a { flex-direction: column; gap: 2px; padding: 8px 14px; font-size: 0.6875rem; }
}
</style>
