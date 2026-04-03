<template>
  <section id="contato" class="section-wrapper">
    <div class="section-label">contato</div>

    <!-- Contact grid -->
    <div class="contact-grid mb-8">
      <a
        v-for="item in contactItems"
        :key="item.type"
        :href="item.href"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noopener' : undefined"
        class="bg-white dark:bg-[#0d0d0d] p-5 no-underline card-hover block"
      >
        <p class="font-mono text-[11px] tracking-[0.1em] uppercase text-[#8a8a8a] mb-1.5">
          {{ item.type }}
        </p>
        <p class="text-[14px] font-medium text-[#0d0d0d] dark:text-[#f0f0ee]">
          {{ item.value }}
        </p>
      </a>

      <!-- Location (not a link) -->
      <div class="bg-white dark:bg-[#0d0d0d] p-5">
        <p class="font-mono text-[11px] tracking-[0.1em] uppercase text-[#8a8a8a] mb-1.5">
          localização
        </p>
        <p class="text-[14px] font-medium text-[#0d0d0d] dark:text-[#f0f0ee]">
          {{ store.location }}
        </p>
      </div>
    </div>

    <!-- Download bar -->
    <div
      class="flex items-center justify-between flex-wrap gap-4 p-6
             bg-[#f7f7f5] dark:bg-[#161616]
             border border-[#e0e0e0] dark:border-[#2a2a2a]"
    >
      <div>
        <p class="text-[14px] text-[#4a4a4a] dark:text-[#8a8a8a]">
          <strong class="text-[#0d0d0d] dark:text-[#f0f0ee] font-medium">Curriculum Vitae</strong>
          Atualizado em 03/04/2026.
        </p>
      </div>
      <a href="/CV_Erico_Nunes_ATS.pdf" download class="btn-primary shrink-0">
        ⬇ Baixar CV em PDF
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()

const contactItems = computed(() => [
  {
    type: 'e-mail',
    value: store.email,
    href: `mailto:${store.email}`,
    external: false,
  },
  {
    type: 'telefone',
    value: store.phone,
    href: `tel:+55${store.phone.replace(/\D/g, '')}`,
    external: false,
  },
  {
    type: 'linkedin',
    value: 'www.linkedin.com/in/erico-nunes-dev',
    href: store.linkedin.startsWith('http') ? store.linkedin : `https://${store.linkedin}`,
    external: true,
  },
])
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1px;
  background-color: #e0e0e0;
  border: 1px solid #e0e0e0;
}
:global(.dark) .contact-grid {
  background-color: #2a2a2a;
  border-color: #2a2a2a;
}
</style>