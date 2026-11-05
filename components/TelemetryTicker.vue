<template>
  <div class="ticker">
    <pre class="screen" aria-hidden="true"><code>{{ lines }}</code></pre>
    <p class="note mono">Simulação do formato das mensagens MQTT. Não são dados reais do protótipo.</p>
  </div>
</template>

<script setup lang="ts">
interface Channel {
  topic: string
  unit: string
  value: number
  min: number
  max: number
  step: number
}

const channels = reactive<Channel[]>([
  { topic: 'machforce/veiculo/velocidade', unit: 'km/h', value: 31.4, min: 18, max: 44, step: 1.6 },
  { topic: 'machforce/bateria/tensao', unit: 'V', value: 47.8, min: 44, max: 50, step: 0.12 },
  { topic: 'machforce/motor/corrente', unit: 'A', value: 8.6, min: 3, max: 16, step: 0.9 },
])

const lines = computed(() =>
  channels.map((c) => `${c.topic.padEnd(30)} ${c.value.toFixed(1).padStart(5)} ${c.unit}`).join('\n'),
)

let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  // Sem movimento para quem pediu menos animação: fica o retrato estático.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    for (const c of channels) {
      const next = c.value + (Math.random() - 0.5) * 2 * c.step
      c.value = Math.min(c.max, Math.max(c.min, next))
    }
  }, 1100)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.screen {
  margin: 0 0 10px;
  padding: 18px 20px;
  background: rgba(10, 10, 12, 0.72);
  color: var(--text);
  border: 1px solid var(--line-2);
  border-radius: 16px;
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-size: 13px;
  line-height: 1.7;
  overflow-x: auto;
  white-space: pre;
}
.note { color: var(--muted); line-height: 1.5; text-transform: none; letter-spacing: 0.02em; }
.ticker { width: 100%; }
</style>
