<template>
  <footer id="contato" class="sheet footer" data-sheet>
    <div class="container">
      <div class="cta">
        <p class="tag" data-rise>Contato</p>
        <h2 class="h-section" data-title>Vamos construir algo juntos?</h2>
        <p class="muted lead" data-rise>
          Aberto a conversas sobre IA aplicada, visão computacional, dados industriais e sistemas embarcados.
        </p>
        <div class="actions" data-rise>
          <a :href="`mailto:${store.email}`" class="btn-cta">Enviar e-mail <span class="circ"><ArrowUpRight :size="18" aria-hidden="true" /></span></a>
          <a href="/CV_Erico_Nunes_ATS.pdf" download class="btn-line">Baixar CV</a>
        </div>
      </div>

      <ul class="contacts">
        <li v-for="c in contacts" :key="c.label" data-rise>
          <component
            :is="c.href ? 'a' : 'div'"
            :href="c.href"
            :target="c.external ? '_blank' : undefined"
            :rel="c.external ? 'noopener' : undefined"
            class="contact"
          >
            <span class="c-label muted">{{ c.label }}</span>
            <span class="c-value">{{ c.value }}</span>
          </component>
        </li>
      </ul>

      <div class="bottom">
        <p class="muted">© {{ year }} Érico Nunes Carneiro · Manaus, AM</p>
        <p class="muted">Feito com Nuxt e GSAP</p>
        <a href="#inicio" class="top-link">Voltar ao topo</a>
      </div>
    </div>
    <p class="wordmark" aria-hidden="true">Érico Nunes</p>
  </footer>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()
const year = new Date().getFullYear()

const contacts = computed(() => [
  { label: 'E-mail', value: store.email, href: `mailto:${store.email}`, external: false },
  { label: 'Telefone', value: store.phone, href: `tel:+55${store.phone.replace(/\D/g, '')}`, external: false },
  { label: 'LinkedIn', value: 'in/erico-nunes-dev', href: store.linkedin, external: true },
  { label: 'GitHub', value: 'GregNewze', href: store.github, external: true },
  { label: 'Local', value: store.location, href: undefined, external: false },
])
</script>

<style scoped>
.footer {
  overflow: hidden;
  padding-top: clamp(80px, 10vw, 150px);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.cta { display: grid; justify-items: center; gap: 22px; text-align: center; }
.cta .h-section { max-width: 11em; }
.lead { max-width: 36rem; line-height: 1.6; }
.actions { margin-top: 14px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }

.contacts { margin-top: clamp(56px, 7vw, 96px); display: grid; grid-template-columns: minmax(0, 1.5fr) repeat(4, minmax(0, 1fr)); gap: 12px; }
.contact {
  display: grid;
  gap: 8px;
  height: 100%;
  padding: 22px;
  border-radius: 22px;
  background: var(--card);
  border: 1px solid var(--line);
  text-decoration: none;
  transition: border-color 0.3s var(--ease), transform 0.3s var(--ease);
}
a.contact:hover { border-color: rgba(var(--accent-rgb), 0.5); transform: translateY(-4px); }
.c-label { font-size: 0.875rem; }
.c-value { font-weight: 500; overflow-wrap: anywhere; }

.bottom {
  margin-top: clamp(64px, 8vw, 110px);
  padding: 28px 0;
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 0.9375rem;
}
.top-link { text-decoration: none; font-weight: 600; }
.top-link:hover { text-decoration: underline; text-underline-offset: 4px; }

.wordmark {
  font-family: var(--display);
  font-weight: 800;
  font-size: 19vw;
  line-height: 0.8;
  letter-spacing: -0.05em;
  white-space: nowrap;
  text-align: center;
  color: transparent;
  -webkit-text-stroke: 1px var(--line-2);
  margin-bottom: -4vw;
  user-select: none;
}

@media (max-width: 1100px) {
  .contacts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .contacts li:first-child { grid-column: 1 / -1; }
}
@media (max-width: 560px) {
  .contacts { grid-template-columns: 1fr; }
  .bottom { padding-bottom: 96px; }
}
</style>
