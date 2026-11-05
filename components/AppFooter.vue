<template>
  <footer id="contato" class="footer">
    <div class="container">
      <div class="cta" data-rise>
        <div class="beam" aria-hidden="true" />
        <p class="label">Contato</p>
        <h2 class="h-section" data-title>Vamos construir algo juntos?</h2>
        <p class="muted lead">
          Aberto a conversas sobre IA aplicada, visão computacional, dados industriais e sistemas embarcados.
        </p>
        <div class="actions">
          <a :href="`mailto:${store.email}`" class="btn">Enviar e-mail <ArrowUpRight :size="18" aria-hidden="true" /></a>
          <a href="/CV_Erico_Nunes_ATS.pdf" download class="btn btn-ghost">Baixar CV <ArrowDown :size="18" aria-hidden="true" /></a>
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
            <component :is="c.icon" :size="20" class="accent" aria-hidden="true" />
            <span class="c-label muted">{{ c.label }}</span>
            <span class="c-value">{{ c.value }}</span>
          </component>
        </li>
      </ul>

      <div class="bottom">
        <p class="muted">© {{ year }} Érico Nunes Carneiro · Manaus, AM</p>
        <p class="muted">Feito com Nuxt, GSAP e Three.js</p>
        <a href="#inicio" class="top-link">Voltar ao topo <ArrowUp :size="16" aria-hidden="true" /></a>
      </div>
    </div>
    <p class="wordmark" aria-hidden="true">Érico Nunes</p>
  </footer>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowUp, ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-vue-next'
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()
const year = new Date().getFullYear()

const contacts = computed(() => [
  { label: 'E-mail', value: store.email, href: `mailto:${store.email}`, external: false, icon: Mail },
  { label: 'Telefone', value: store.phone, href: `tel:+55${store.phone.replace(/\D/g, '')}`, external: false, icon: Phone },
  { label: 'LinkedIn', value: 'in/erico-nunes-dev', href: store.linkedin, external: true, icon: Linkedin },
  { label: 'GitHub', value: 'GregNewze', href: store.github, external: true, icon: Github },
  { label: 'Local', value: store.location, href: undefined, external: false, icon: MapPin },
])
</script>

<style scoped>
.footer { position: relative; overflow: hidden; padding: clamp(96px, 12vw, 180px) 0 0; }

.cta {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: clamp(48px, 7vw, 110px) clamp(24px, 5vw, 80px);
  border-radius: calc(var(--radius) + 8px);
  background: var(--card);
  border: 1px solid var(--line);
}
.cta .label { justify-content: center; margin-bottom: 20px; }
.cta .h-section { max-width: 11em; margin-inline: auto; position: relative; }
.beam {
  position: absolute;
  inset: -40% 30%;
  background: linear-gradient(90deg, transparent, rgba(255, 106, 43, 0.2), transparent);
  filter: blur(40px);
  transform: rotate(-30deg);
  pointer-events: none;
}
.lead { position: relative; margin: 24px auto 0; max-width: 36rem; line-height: 1.6; }
.actions { position: relative; margin-top: 36px; display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }

.contacts { margin-top: 16px; display: grid; grid-template-columns: minmax(0, 1.5fr) repeat(4, minmax(0, 1fr)); gap: 12px; }
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
a.contact:hover { border-color: rgba(255, 106, 43, 0.5); transform: translateY(-4px); }
.c-label { font-size: 0.8125rem; letter-spacing: 0.12em; text-transform: uppercase; }
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
.top-link { display: inline-flex; align-items: center; gap: 6px; text-decoration: none; font-weight: 600; }
.top-link:hover { color: var(--accent); }

.wordmark {
  font-family: var(--display);
  font-weight: 800;
  font-size: 19vw;
  line-height: 0.8;
  letter-spacing: -0.05em;
  white-space: nowrap;
  text-align: center;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.12);
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
