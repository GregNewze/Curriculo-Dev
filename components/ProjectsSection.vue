<template>
  <section id="projetos" class="section-wrapper">
    <div class="section-label">Projetos</div>

    <div class="project-grid">
      <article
        v-for="project in store.projects"
        :key="project.id"
        class="bg-white dark:bg-[#0d0d0d] p-7 card-hover cursor-default"
      >
        <!-- Header -->
        <div class="flex justify-between items-start gap-4 mb-3">
          <h3 class="text-[1.05rem] font-semibold tracking-[-0.01em] text-[#0d0d0d] dark:text-[#f0f0ee]">
            {{ project.name }}
          </h3>
          <span
            class="font-mono text-[10px] px-2 py-1 rounded-[3px] whitespace-nowrap shrink-0"
            :class="project.status === 'active' ? 'badge-active' : 'badge-done'"
          >
            {{ project.status === 'active' ? 'em andamento · ' + project.year : project.year }}
          </span>
        </div>

        <!-- Org -->
        <p class="font-mono text-[12px] text-[#8a8a8a] mb-3">{{ project.org }}</p>

        <!-- Description -->
        <p class="text-[14px] text-[#4a4a4a] dark:text-[#8a8a8a] leading-[1.7] mb-4">
          {{ project.description }}
        </p>

        <!-- Bullets -->
        <ul class="space-y-1.5 mb-4">
          <li
            v-for="bullet in project.bullets"
            :key="bullet"
            class="text-[13px] text-[#4a4a4a] dark:text-[#8a8a8a] flex gap-2"
          >
            <span class="text-[#8a8a8a] shrink-0">→</span>
            <span>{{ bullet }}</span>
          </li>
        </ul>

        <!-- Stack + link -->
        <div class="flex justify-between items-end flex-wrap gap-3">
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
          </div>
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener"
            class="font-mono text-[12px] text-[#8a8a8a] hover:text-[#0d0d0d] dark:hover:text-[#f0f0ee]
                   transition-colors no-underline"
          >
            GitHub ↗
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'
const store = usePortfolioStore()
</script>

<style scoped>
.project-grid {
  display: grid;
  gap: 1px;
  background-color: #e0e0e0;
  border: 1px solid #e0e0e0;
}
:global(.dark) .project-grid {
  background-color: #2a2a2a;
  border-color: #2a2a2a;
}

.badge-active {
  background: #f0faf4;
  color: #1a7a3e;
  border: 1px solid #b8e6cb;
}
:global(.dark) .badge-active {
  background: #0a1f12;
  color: #4ade80;
  border-color: #1a4028;
}

.badge-done {
  background: #f0efec;
  color: #8a8a8a;
  border: 1px solid #e0e0e0;
}
:global(.dark) .badge-done {
  background: #1e1e1e;
  color: #606060;
  border-color: #2a2a2a;
}
</style>
