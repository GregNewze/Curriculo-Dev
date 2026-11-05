<template>
  <section id="certificados" class="section certs">
    <div class="container narrow">
      <header class="head">
        <p class="label">Aprendizado contínuo</p>
        <h2 class="h-section" data-title>Certificações</h2>
      </header>

      <ul class="rows">
        <li v-for="cert in store.certificates" :key="cert.name" class="row" data-rise>
          <div>
            <h3 class="name">{{ cert.name }}</h3>
            <p class="muted meta">{{ cert.issuer }} <span aria-hidden="true">•</span> Certificação</p>
          </div>
          <span v-if="cert.hours" class="mono hours">{{ cert.hours }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()
</script>

<style scoped>
.narrow { max-width: 1040px; }
.head { margin-bottom: clamp(40px, 5vw, 72px); text-align: center; }
.head .label { margin-bottom: 18px; justify-content: center; }

.rows { display: grid; gap: 12px; }
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 24px clamp(20px, 2.4vw, 32px);
  border-radius: 22px;
  background: var(--card);
  border: 1px solid var(--line);
  transition: border-color 0.3s var(--ease), transform 0.3s var(--ease), background-color 0.3s var(--ease);
}
.row:hover { border-color: rgba(255, 106, 43, 0.5); transform: translateX(6px); background: var(--card-2); }
.name { font-size: clamp(1.25rem, 1.9vw, 1.75rem); letter-spacing: -0.02em; }
.meta { margin-top: 6px; font-size: 0.9375rem; }
.hours { color: var(--accent); font-size: 0.875rem; white-space: nowrap; }
</style>
