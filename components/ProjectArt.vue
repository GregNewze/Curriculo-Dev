<template>
  <svg
    v-if="kind"
    class="art"
    viewBox="0 0 400 270"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    role="img"
    :aria-label="labels[kind]"
  >
    <!-- Osiris: ciclos por operador e o gargalo -->
    <g v-if="kind === 'osiris'">
      <path d="M16 34h368M16 26v16M384 26v16" />
      <text x="16" y="18" class="t">macrociclo</text>
      <g v-for="(lane, li) in osiris" :key="li">
        <rect
          v-for="(r, ri) in lane"
          :key="ri"
          :x="r.x"
          :y="64 + li * 62"
          :width="r.w"
          height="40"
          :fill="r.hot ? 'var(--signal)' : 'none'"
          :stroke="r.hot ? 'var(--signal)' : 'currentColor'"
        />
      </g>
      <text x="16" y="258" class="t hot">gargalo identificado</text>
    </g>

    <!-- Chronos: faixa de estados da linha -->
    <g v-else-if="kind === 'chronos'">
      <polyline :points="chronosLine" stroke-width="2" />
      <g v-for="(s, i) in chronos" :key="i">
        <rect
          :x="s.x"
          :y="s.state === 'micro' ? 92 : 108"
          :width="s.w"
          :height="s.state === 'micro' ? 76 : 44"
          :fill="s.state === 'stop' ? 'var(--signal)' : s.state === 'micro' ? 'var(--signal)' : 'none'"
          :stroke="['block', 'stop', 'micro'].includes(s.state) ? 'var(--signal)' : 'currentColor'"
          :stroke-dasharray="s.state === 'idle' ? '4 4' : undefined"
        />
      </g>
      <g class="t">
        <text x="16" y="212">run</text>
        <text x="62" y="212" class="hot">block</text>
        <text x="120" y="212">idle</text>
        <text x="164" y="212" class="hot">stoppage</text>
        <text x="236" y="212" class="hot">micro-stoppage</text>
      </g>
    </g>

    <!-- Sharingan: monovia, peças e reconhecimento de cavidades -->
    <g v-else-if="kind === 'sharingan'">
      <path d="M8 40h384" stroke-width="3" />
      <g v-for="(p, i) in parts" :key="i">
        <path :d="`M${p.x + 26} 40v34`" />
        <rect :x="p.x" y="74" width="52" height="92" />
        <rect v-for="(c, ci) in p.cavities" :key="ci" :x="p.x + c.x" :y="74 + c.y" :width="c.w" :height="c.h" />
      </g>
      <rect x="130" y="64" width="72" height="112" stroke="var(--signal)" stroke-dasharray="5 4" stroke-width="2" />
      <text x="130" y="196" class="t hot">perfil reconhecido</text>
      <text x="16" y="236" class="t">contagem e auditoria por visão</text>
    </g>

    <!-- AGV: grade, obstáculos, rota A* e desgaste -->
    <g v-else-if="kind === 'agv'">
      <g v-for="(o, i) in obstacles" :key="i">
        <rect :x="8 + o[0] * 24" :y="14 + o[1] * 24" width="24" height="24" fill="currentColor" opacity="0.35" stroke="none" />
      </g>
      <path d="M8 14h384v216H8zM8 14" opacity="0.4" />
      <polyline :points="agvPath" stroke="var(--signal)" stroke-width="3" stroke-linejoin="round" />
      <circle :cx="8 + 0 * 24 + 12" :cy="14 + 6 * 24 + 12" r="6" fill="currentColor" stroke="none" />
      <rect :x="8 + 14 * 24 + 5" :y="14 + 7 * 24 + 5" width="14" height="14" fill="var(--signal)" stroke="none" />
      <rect :x="8 + 5 * 24 + 4" :y="14 + 4 * 24 + 4" width="16" height="16" fill="var(--signal)" stroke="none" />
      <text x="8" y="250" class="t">A*  ·  desgaste (RLS)</text>
      <rect x="196" y="241" width="120" height="10" />
      <rect x="196" y="241" width="68" height="10" fill="var(--signal)" stroke="none" />
    </g>

    <!-- AxiosLab: prateleira com sensores -->
    <g v-else-if="kind === 'axioslab'">
      <g v-for="r in 3" :key="r">
        <path :d="`M16 ${r * 70}h368`" stroke-width="3" />
        <rect v-for="c in 5" :key="c" :x="20 + (c - 1) * 72" :y="r * 70 - 52" width="58" height="50" :fill="(r + c) % 4 === 0 ? 'var(--signal)' : 'none'" :stroke="(r + c) % 4 === 0 ? 'var(--signal)' : 'currentColor'" />
      </g>
      <path d="M332 232a26 26 0 0 1 36 0M322 222a42 42 0 0 1 56 0M342 242a10 10 0 0 1 16 0" stroke="var(--signal)" stroke-width="2" />
      <text x="16" y="250" class="t">inventário com sensores</text>
    </g>

    <!-- Etnius: flashcards -->
    <g v-else-if="kind === 'etnius'">
      <rect x="86" y="46" width="200" height="140" transform="rotate(-9 186 116)" />
      <rect x="110" y="56" width="200" height="140" transform="rotate(5 210 126)" />
      <rect x="132" y="64" width="200" height="140" fill="var(--tint, #1b1b20)" />
      <path d="M156 100h120M156 124h90M156 148h108" stroke-width="2" />
      <rect x="156" y="170" width="46" height="18" fill="var(--signal)" stroke="none" />
      <text x="16" y="250" class="t">ensino por flashcards</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ kind?: string }>()

const labels: Record<string, string> = {
  osiris: 'Diagrama de ciclos por operador, com o gargalo destacado',
  chronos: 'Faixa de estados da linha com paradas e microparadas destacadas',
  sharingan: 'Peças em uma monovia, com uma peça reconhecida por visão',
  agv: 'Grade com obstáculos e rota A* de um veículo autônomo',
  axioslab: 'Prateleiras com sensores de inventário',
  etnius: 'Cartões de estudo empilhados',
}

// Osiris: cada linha é um operador; a maior etapa de cada linha é o gargalo.
const rawLanes = [
  [46, 80, 52, 96, 64, 70],
  [70, 54, 98, 60, 74, 50],
  [58, 90, 48, 112, 56, 58],
]
const osiris = rawLanes.map((lane) => {
  const total = lane.reduce((a, b) => a + b, 0)
  const scale = (368 - (lane.length - 1) * 4) / total
  const max = Math.max(...lane)
  let x = 16
  return lane.map((w) => {
    const r = { x, w: w * scale, hot: w === max }
    x += w * scale + 4
    return r
  })
})

// Chronos
const states: [string, number][] = [
  ['run', 62], ['idle', 30], ['run', 44], ['block', 28], ['run', 54], ['micro', 8],
  ['run', 38], ['stop', 46], ['run', 36], ['micro', 8], ['run', 34],
]
const chronos = (() => {
  let x = 10
  return states.map(([state, w]) => {
    const s = { state, x, w }
    x += w
    return s
  })
})()
const chronosLine = '10,76 50,60 90,70 130,40 170,62 210,36 250,56 290,30 330,52 370,44 390,50'

// Sharingan: três perfis de cavidade
const parts = [
  { x: 28, cavities: [{ x: 10, y: 14, w: 14, h: 20 }, { x: 28, y: 50, w: 14, h: 24 }] },
  { x: 140, cavities: [{ x: 8, y: 12, w: 12, h: 18 }, { x: 28, y: 12, w: 12, h: 18 }, { x: 18, y: 52, w: 16, h: 26 }] },
  { x: 252, cavities: [{ x: 18, y: 28, w: 16, h: 36 }] },
]

// AGV: obstáculos e a rota planejada (células → pixels)
const obstacles = [
  [3, 1], [3, 2], [3, 3], [3, 4],
  [7, 4], [7, 5], [7, 6], [7, 7], [7, 8],
  [11, 0], [11, 1], [11, 2], [11, 3], [11, 4],
]
const route = [[0, 6], [5, 6], [5, 2], [9, 2], [9, 7], [14, 7]]
const agvPath = route.map(([c, r]) => `${8 + c * 24 + 12},${14 + r * 24 + 12}`).join(' ')
</script>

<style scoped>
.art { width: 100%; height: auto; display: block; }
.t { font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; fill: currentColor; stroke: none; }
.hot { fill: var(--signal); }
</style>
