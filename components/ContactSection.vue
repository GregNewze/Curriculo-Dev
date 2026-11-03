<template>
  <section id="contato" class="contact">
    <h2 v-reveal class="section-title head">Contato</h2>

    <div class="rows">
      <component
        :is="row.href ? 'a' : 'div'"
        v-for="(row, i) in rows"
        :key="row.label"
        v-reveal="i * 50"
        :href="row.href"
        :target="row.external ? '_blank' : undefined"
        :rel="row.external ? 'noopener' : undefined"
        :aria-label="row.href ? `${row.label}: ${row.value}` : undefined"
        class="row"
      >
        <span class="row-text">{{ row.value }}</span>
      </component>

      <div class="row hello">
        <span class="row-text">Vamos conversar</span>
        <a :href="`mailto:${store.email}`" class="arrow" aria-label="Enviar e-mail para Érico">
          <svg viewBox="0 0 24 24" width="40%" height="40%" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()

const rows = computed(() => [
  { label: 'E-mail', value: store.email, href: `mailto:${store.email}`, external: false },
  { label: 'Telefone', value: store.phone, href: `tel:+55${store.phone.replace(/\D/g, '')}`, external: false },
  {
    label: 'LinkedIn',
    value: store.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
    href: store.linkedin,
    external: true,
  },
  { label: 'GitHub', value: store.github.replace(/^https?:\/\//, ''), href: store.github, external: true },
  { label: 'Localização', value: store.location, href: undefined, external: false },
])
</script>

<style scoped>
.contact { padding-top: var(--gap-section); }
.head { padding: 0 var(--margin); }

/* Faixas de largura total, alternando dois tons do chão (sem linhas). */
.rows { display: grid; }
.row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  min-height: clamp(84px, 11vw, 150px);
  padding: 0 var(--margin) clamp(12px, 1.6vw, 24px);
  text-decoration: none;
  background: var(--bg);
}
.rows > :nth-child(even) { background: var(--surface); }
.row-text {
  font-size: clamp(1.5rem, 5vw, 4.5rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1;
  overflow-wrap: anywhere;
}
a.row { transition: padding-left 0.3s var(--ease); }
a.row:hover { padding-left: calc(var(--margin) + 16px); opacity: 1; }

.hello { align-items: center; justify-content: flex-start; gap: 24px; background: var(--accent) !important; color: var(--accent-ink); }
.arrow {
  display: grid;
  place-items: center;
  width: clamp(56px, 6vw, 88px);
  height: clamp(56px, 6vw, 88px);
  border-radius: 50%;
  background: var(--accent-ink);
  color: var(--accent);
  transition: transform 0.25s var(--ease);
}
.arrow:hover { transform: translateX(6px); }
.arrow:active { transform: scale(0.94); }
</style>
