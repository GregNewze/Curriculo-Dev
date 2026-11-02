// v-reveal="atraso em ms": entrada com subida de 24px + fade, uma vez, ao entrar na tela.
// A classe `js` é posta no <html> por script inline no <head> (nuxt.config), então
// sem JavaScript o conteúdo nunca fica escondido.
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  const getObserver = () => {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in')
              observer?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      )
    }
    return observer
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')
      if (binding.value) el.style.setProperty('--d', `${binding.value}ms`)
      getObserver().observe(el)
    },
    getSSRProps(binding) {
      return {
        class: 'reveal',
        style: binding.value ? `--d:${binding.value}ms` : undefined,
      }
    },
  })
})
