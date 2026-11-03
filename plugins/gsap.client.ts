import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP + ScrollTrigger só no cliente. Componentes usam useNuxtApp().$gsap e criam
// seus triggers dentro de gsap.context(), revertido em onBeforeUnmount.
export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  return {
    provide: { gsap, ScrollTrigger },
  }
})
