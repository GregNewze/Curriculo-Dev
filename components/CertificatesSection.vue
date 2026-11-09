<template>
  <section id="certificados" class="section certs">
    <div class="container narrow">
      <header class="head">
        <p class="tag" data-rise>Aprendizado contínuo</p>
        <h2 class="h-section" data-title>Certificações</h2>
      </header>
      <ul class="rows">
        <li v-for="cert in store.certificates" :key="cert.name" class="row" data-rise>
          <div>
            <h3 class="name">{{ cert.name }}</h3>
            <p class="meta">{{ cert.issuer }}</p>
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
.head { display: grid; justify-items: center; gap: 22px; text-align: center; margin-bottom: clamp(40px, 5vw, 72px); }
.rows { display: grid; gap: 10px; }

/* Linha com a cor saindo da esquerda, como as perguntas frequentes da referência. */
.row {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px clamp(20px, 2.4vw, 32px);
  border-radius: 18px;
  background: linear-gradient(90deg, rgba(var(--accent-rgb), 0.5), rgba(var(--accent-rgb), 0.12) 38%, transparent 72%), var(--card);
  border: 1px solid var(--line);
  transition: transform 0.35s var(--ease), border-color 0.35s var(--ease);
}
.row::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(var(--accent-rgb), 0.35), transparent 85%);
  opacity: 0;
  transition: opacity 0.35s var(--ease);
  pointer-events: none;
}
.row:hover { transform: translateX(6px); border-color: rgba(var(--accent-rgb), 0.5); }
.row:hover::after { opacity: 1; }
.name { position: relative; font-size: clamp(1.125rem, 1.6vw, 1.5rem); letter-spacing: -0.02em; }
.meta { position: relative; margin-top: 4px; font-size: 0.9375rem; color: rgba(243, 244, 242, 0.78); }
.hours { position: relative; font-size: 0.875rem; white-space: nowrap; }
</style>
