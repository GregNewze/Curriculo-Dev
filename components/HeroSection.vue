```vue
<template>
  <section
    id="hero"
    class="min-h-[calc(100vh-56px)] flex flex-col justify-center
           border-b border-[#e0e0e0] dark:border-[#2a2a2a]
           section-wrapper"
  >
    <!-- Label -->
    <p class="font-mono text-[11px] tracking-[0.12em] uppercase text-[#8a8a8a] mb-6">
      Fullstack & Sistemas Embarcados - Developer · Manaus, BR
    </p>

    <!-- Name -->
    <h1
      class="text-[clamp(2.8rem,7vw,5rem)] font-light leading-[1.05] tracking-[-0.03em]
             text-[#0d0d0d] dark:text-[#f0f0ee] mb-2"
    >
     <span class = 'font-semibold'> Érico </span> <span class = 'font-normal' >Nunes</span>
      
    </h1>

    <!-- Role -->
    <p class="text-[clamp(1rem,2.5vw,1.15rem)] text-[#4a4a4a] dark:text-[#8a8a8a] font-light tracking-[-0.01em] mb-6">
      Fullstack & Sistemas Embarcados · IoT · Engenharia de Computação
    </p>

    <!-- Summary -->
    <p class="max-w-[560px] text-[15px] leading-[1.8] text-[#4a4a4a] dark:text-[#8a8a8a] mb-8">
      {{ store.summary }}
    </p>

    <!-- CTA -->
    <div class="flex flex-wrap gap-3">
      <a 
        :href="store.linkedin" 
        target="_blank" 
        rel="noopener" 
        class="btn-primary flex items-center gap-2"
      >
        <Linkedin :size="16" />
        LinkedIn
      </a>

      <a 
        :href="store.github" 
        target="_blank" 
        rel="noopener" 
        class="btn-primary flex items-center gap-2"
      >
        <Github :size="16" />
        GitHub
      </a>

      <a href="/CV_Erico_Nunes_ATS.pdf" download class="btn-secondary flex items-center gap-2">
        ⬇ Baixar CV
      </a>
    </div>

    <!-- Stats -->
    <div
      class="flex flex-wrap gap-8 mt-12 pt-8
             border-t border-[#e0e0e0] dark:border-[#2a2a2a]"
    >
      <div v-for="stat in store.stats" :key="stat.value">
        <div class="text-[1.6rem] font-semibold tracking-[-0.02em] text-[#0d0d0d] dark:text-[#f0f0ee]">
          {{ stat.value }}
        </div>
        <div class="text-[12px] text-[#8a8a8a] mt-0.5">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'
import { Linkedin, Github } from 'lucide-vue-next'

const store = usePortfolioStore()
</script>
```