<template>
  <div class="marquee" aria-label="Tecnologias que uso">
    <div v-for="(row, r) in rows" :key="r" class="row" :class="{ reverse: r === 1 }">
      <ul class="track" :aria-hidden="r === 1 ? 'true' : undefined">
        <li v-for="(t, i) in [...row, ...row]" :key="i" class="chip" :aria-hidden="i >= row.length ? 'true' : undefined">
          <span class="dot" aria-hidden="true" />{{ t }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// CSS puro (transform), sem JavaScript: leve e pausa ao passar o mouse.
const rows = [
  ['Python', 'TypeScript', 'Visão computacional', 'VLMs', 'LLMs locais', 'BigQuery', 'Data Lakes', 'n8n', 'Node.js', 'Docker', 'MQTT'],
  ['React', 'React Native', 'Vue.js', 'Nuxt.js', 'Three.js', 'PostgreSQL', 'TimescaleDB', 'Supabase', 'Firebase', 'ESP32', 'STM32'],
]
</script>

<style scoped>
.marquee {
  display: grid;
  gap: 14px;
  padding: 40px 0;
  border-bottom: 1px solid var(--line);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  overflow: hidden;
}
.track {
  display: flex;
  gap: 14px;
  width: max-content;
  animation: scroll 46s linear infinite;
  will-change: transform;
}
.reverse .track { animation-direction: reverse; animation-duration: 52s; }
.marquee:hover .track { animation-play-state: paused; }
@keyframes scroll { to { transform: translateX(calc(-50% - 7px)); } }

.chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  border-radius: 999px;
  background: var(--card);
  border: 1px solid var(--line);
  font-weight: 500;
  white-space: nowrap;
}
.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
</style>
