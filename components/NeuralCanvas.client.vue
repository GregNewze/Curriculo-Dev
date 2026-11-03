<template>
  <canvas ref="canvas" class="neural" aria-hidden="true" />
</template>

<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()
const colorMode = useColorMode()

let net: NeuralNet | null = null
let io: IntersectionObserver | undefined
let ro: ResizeObserver | undefined

function palette() {
  const s = getComputedStyle(document.documentElement)
  return { base: s.getPropertyValue('--ink').trim(), accent: s.getPropertyValue('--accent').trim() }
}

onMounted(async () => {
  // O wrapper .client monta o <canvas> um tick depois do onMounted.
  await nextTick()
  if (!canvas.value) return
  try {
    const { base, accent } = palette()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    net = await createNeuralNet(canvas.value, { mode: 'hero', base, accent, reduceMotion })
  } catch (err) {
    // Sem WebGL: o quadro fica no tom de superfície, sem quebrar a página.
    console.error('[neural] hero', err)
    return
  }
  ro = new ResizeObserver(() => net?.resize())
  ro.observe(canvas.value)
  io = new IntersectionObserver(([entry]) => net?.setRunning(entry.isIntersecting))
  io.observe(canvas.value)
})

watch(
  () => colorMode.value,
  () =>
    nextTick(() => {
      if (!net) return
      const { base, accent } = palette()
      net.setColors(base, accent)
    }),
)

onBeforeUnmount(() => {
  io?.disconnect()
  ro?.disconnect()
  net?.dispose()
})
</script>

<style scoped>
.neural {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
