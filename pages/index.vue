<template>
  <div>
    <HeroSection />
    <IntroStatement />
    <ProjectsSection />
    <ExperienceSection />
    <SkillsSection />
    <CertificatesSection />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Érico Nunes — Engenharia de IA e Dados',
  description:
    'Portfólio de Érico Nunes Carneiro — Engenharia de IA e Dados, visão computacional, telemetria industrial e sistemas embarcados. Manaus, AM.',
  ogTitle: 'Érico Nunes — Engenharia de IA e Dados',
  ogDescription: 'Visão computacional, agentes inteligentes e dados em tempo real, do chão de fábrica ao dashboard.',
})

const nuxt = useNuxtApp()
let ctx: { revert: () => void } | undefined
let refresh: (() => void) | undefined
let riseObserver: IntersectionObserver | undefined

/** Quebra o texto de um elemento em palavras, cada uma num invólucro. */
function splitWords(el: HTMLElement, wrapClass: string, innerClass: string) {
  const words = (el.textContent ?? '').trim().split(/\s+/)
  el.setAttribute('aria-label', words.join(' '))
  el.innerHTML = words
    .map((w) => `<span class="${wrapClass}" aria-hidden="true"><span class="${innerClass}">${w}</span></span>`)
    .join(' ')
  return Array.from(el.querySelectorAll<HTMLElement>(`.${innerClass}`))
}

onMounted(async () => {
  await nextTick()
  const gsap = nuxt.$gsap as typeof import('gsap').gsap
  const ScrollTrigger = nuxt.$ScrollTrigger as typeof import('gsap/ScrollTrigger').ScrollTrigger
  const calm = isCalm()

  ctx = gsap.context(() => {
    // Títulos: cada palavra sobe de dentro de uma máscara.
    gsap.utils.toArray<HTMLElement>('[data-title]').forEach((el) => {
      const inner = splitWords(el, 'tw', 'ti')
      if (calm) return
      gsap.from(inner, {
        yPercent: 115,
        duration: 1,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    // Frase de apresentação: as palavras acendem conforme você rola (só opacidade: blur pesa).
    gsap.utils.toArray<HTMLElement>('[data-blur]').forEach((el) => {
      const words = splitWords(el, 'wd', 'wi')
      if (calm) return
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: true },
        },
      )
    })

    // Entradas: sobem e aparecem em sequência. IntersectionObserver em vez de batch: dispara
    // também quando o visitante salta direto para uma seção (links do menu).
    if (!calm) {
      const rise = gsap.utils.toArray<HTMLElement>('[data-rise]')
      gsap.set(rise, { opacity: 0, y: 44 })
      riseObserver = new IntersectionObserver(
        (entries) => {
          const shown = entries.filter((e) => e.isIntersecting).map((e) => e.target)
          if (!shown.length) return
          shown.forEach((el) => riseObserver?.unobserve(el))
          gsap.to(shown, { opacity: 1, y: 0, duration: 0.85, stagger: 0.09, ease: 'power3.out', overwrite: true })
        },
        { rootMargin: '0px 0px -6% 0px' },
      )
      rise.forEach((el) => riseObserver?.observe(el))
    }

    // Contadores.
    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count)
      if (calm || !target) return
      const state = { v: 0 }
      gsap.to(state, {
        v: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => (el.textContent = String(Math.round(state.v))),
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })
  })

  // Fontes mudam as alturas: recalcula os gatilhos quando carregarem.
  refresh = () => ScrollTrigger.refresh()
  document.fonts?.ready.then(refresh)
  window.addEventListener('load', refresh)
})

onBeforeUnmount(() => {
  if (refresh) window.removeEventListener('load', refresh)
  riseObserver?.disconnect()
  ctx?.revert()
})
</script>
