<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6
           bg-white/90 dark:bg-[#0d0d0d]/90 backdrop-blur-md
           border-b border-[#e0e0e0] dark:border-[#2a2a2a] transition-colors duration-300"
  >
    <!-- Logo -->
    <NuxtLink
      to="/"
      class="font-mono text-[13px] font-medium tracking-wide text-[#0d0d0d] dark:text-[#f0f0ee] no-underline"
    >
      ÉricoNC.developer
    </NuxtLink>

    <!-- Links desktop -->
    <div class="hidden md:flex items-center gap-6">
      <button
        v-for="link in navLinks"
        :key="link.id"
        class="text-[13px] text-[#4a4a4a] dark:text-[#8a8a8a] hover:text-[#0d0d0d] dark:hover:text-[#f0f0ee]
               transition-colors cursor-pointer bg-transparent border-none font-sans"
        @click="scrollTo(link.id)"
      >
        {{ link.label }}
      </button>

      <!-- Theme toggle -->
      <button
        class="font-mono text-[12px] px-3 py-1.5 rounded-full
               border border-[#e0e0e0] dark:border-[#2a2a2a]
               text-[#4a4a4a] dark:text-[#8a8a8a]
               hover:border-[#c8c8c8] dark:hover:border-[#3a3a3a]
               hover:text-[#0d0d0d] dark:hover:text-[#f0f0ee]
               transition-all cursor-pointer bg-transparent"
        @click="toggleTheme"
      >
        {{ isDark ? '☀ Claro' : '☾ Escuro' }}
      </button>
    </div>

    <!-- Mobile: apenas theme toggle -->
    <div class="flex md:hidden items-center gap-3">
      <button
        class="font-mono text-[12px] px-3 py-1.5 rounded-full
               border border-[#e0e0e0] dark:border-[#2a2a2a]
               text-[#4a4a4a] dark:text-[#8a8a8a]
               transition-all cursor-pointer bg-transparent"
        @click="toggleTheme"
      >
        {{ isDark ? '☀' : '☾' }}
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

const navLinks = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'experiência', label: 'Experiência' },
  { id: 'contato', label: 'Contato' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>
