<template>
  <nav class="nav" aria-label="Principal">
    <a href="#hero" class="nav-mark">Érico Nunes</a>

    <div class="nav-links">
      <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" class="nav-link" :class="{ 'nav-extra': link.extra }">
        {{ link.label }}
      </a>

      <button
        type="button"
        class="nav-theme"
        :aria-label="isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
        @click="toggleTheme"
      >
        {{ isDark ? 'Claro' : 'Escuro' }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

// Serial position: o primeiro e o último item são os mais lembrados.
// Sobre abre, Contato fecha.
const navLinks = [
  { id: 'sobre', label: 'Sobre', extra: false },
  { id: 'projetos', label: 'Projetos', extra: false },
  { id: 'experiencia', label: 'Experiência', extra: true },
  { id: 'contato', label: 'Contato', extra: false },
]
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--margin);
  background: var(--bg);
  transition: background-color 0.3s var(--ease);
}
.nav-mark {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-decoration: none;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2.4vw, 36px);
}
.nav-link,
.nav-theme {
  font: inherit;
  font-size: 14px;
  color: var(--ink);
  text-decoration: none;
  background: none;
  border: 0;
  padding: 12px 2px;
  cursor: pointer;
  transition: opacity 0.18s var(--ease);
}
.nav-link:hover,
.nav-theme:hover { opacity: 0.55; }
.nav-theme { color: var(--muted); }

@media (max-width: 640px) {
  .nav-extra { display: none; }
  .nav-link:nth-child(2) { display: none; }
}
</style>
