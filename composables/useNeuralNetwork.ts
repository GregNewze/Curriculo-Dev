import type {
  BufferGeometry,
  Color,
  Group,
  LineBasicMaterial,
  Material,
  Mesh,
  MeshStandardMaterial,
  Vector3,
} from 'three'

/**
 * Rede neural com elementos físicos, em quatro camadas que espelham o pipeline real:
 *   0 Captura  → câmeras e sensores
 *   1 Ingestão → gateways / racks (deviceWise, MES, Data Lake)
 *   2 Modelo   → neurônios e chips (VLMs, visão, preditivo)
 *   3 Decisão  → telas / dashboards
 * Fios ligam cada camada à próxima; pulsos de sinal correm por eles.
 */
export interface NeuralNet {
  /** 0..1, move a câmera pelas camadas (modo anatomy). */
  setProgress(progress: number): void
  setColors(base: string, accent: string): void
  /** Chamado quando a camada em foco muda. */
  onActive(cb: (index: number) => void): void
  resize(): void
  setRunning(on: boolean): void
  renderOnce(): void
  dispose(): void
}

export interface NeuralOptions {
  mode: 'hero' | 'anatomy'
  base: string
  accent: string
  reduceMotion: boolean
}

const LAYER_X = [-9, -3, 3, 9]
const COUNTS = [5, 4, 6, 3]

export async function createNeuralNet(canvas: HTMLCanvasElement, opts: NeuralOptions): Promise<NeuralNet> {
  const THREE = await import('three')
  const { mode } = opts

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(mode === 'hero' ? 34 : 38, 1, 0.1, 120)
  scene.add(new THREE.AmbientLight(0xffffff, 1.5))
  const sun = new THREE.DirectionalLight(0xffffff, 2.4)
  sun.position.set(6, 9, 8)
  scene.add(sun)

  const net = new THREE.Group()
  scene.add(net)

  // Aleatório determinístico: a rede tem sempre o mesmo desenho.
  let seed = 11
  const rnd = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  let baseColor = new THREE.Color(opts.base)
  let accentColor = new THREE.Color(opts.accent)

  const layerMats: MeshStandardMaterial[] = LAYER_X.map(
    () => new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.85, metalness: 0, flatShading: true }),
  )
  const layerCur: Color[] = LAYER_X.map(() => baseColor.clone())
  const layerTarget: Color[] = LAYER_X.map(() => baseColor.clone())
  const detailMat = new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.6, flatShading: true })

  // ---------- objetos físicos ----------
  const box = (w: number, h: number, d: number, mat: Material, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
    m.position.set(x, y, z)
    return m
  }

  const makeCamera = (mat: Material): Group => {
    const g = new THREE.Group()
    g.add(box(1.1, 0.75, 0.85, mat))
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.55, 20), mat)
    lens.rotation.z = -Math.PI / 2
    lens.position.set(0.8, 0, 0)
    g.add(lens)
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.06, 20), detailMat)
    glass.rotation.z = -Math.PI / 2
    glass.position.set(1.1, 0, 0)
    g.add(glass)
    return g
  }

  const makeSensor = (mat: Material): Group => {
    const g = new THREE.Group()
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.7, 18), mat))
    g.add(box(0.5, 0.2, 0.5, mat, 0, 0.45, 0))
    g.add(box(0.14, 0.14, 0.14, detailMat, 0, 0.62, 0))
    return g
  }

  const makeRack = (mat: Material): Group => {
    const g = new THREE.Group()
    for (let i = 0; i < 3; i++) {
      g.add(box(1.5, 0.28, 0.95, mat, 0, (i - 1) * 0.36, 0))
      g.add(box(0.12, 0.08, 0.04, detailMat, 0.5, (i - 1) * 0.36, 0.5))
    }
    return g
  }

  const makeNeuron = (mat: Material): Group => {
    const g = new THREE.Group()
    g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), mat))
    return g
  }

  const makeChip = (mat: Material): Group => {
    const g = new THREE.Group()
    g.add(box(1.1, 0.18, 1.1, mat))
    g.add(box(0.5, 0.06, 0.5, detailMat, 0, 0.12, 0))
    for (let i = 0; i < 5; i++) {
      const o = -0.4 + i * 0.2
      g.add(box(0.07, 0.05, 0.22, mat, o, -0.02, 0.66))
      g.add(box(0.07, 0.05, 0.22, mat, o, -0.02, -0.66))
      g.add(box(0.22, 0.05, 0.07, mat, 0.66, -0.02, o))
      g.add(box(0.22, 0.05, 0.07, mat, -0.66, -0.02, o))
    }
    return g
  }

  const makeScreen = (mat: Material): Group => {
    const g = new THREE.Group()
    g.add(box(1.6, 1, 0.1, mat))
    g.add(box(0.14, 0.4, 0.14, mat, 0, -0.65, 0))
    g.add(box(0.7, 0.06, 0.4, mat, 0, -0.86, 0))
    const heights = [0.28, 0.5, 0.36, 0.62]
    heights.forEach((h, i) => g.add(box(0.14, h, 0.04, detailMat, -0.45 + i * 0.3, -0.35 + h / 2, 0.08)))
    return g
  }

  const factories = [
    (i: number, m: Material) => (i % 2 === 0 ? makeCamera(m) : makeSensor(m)),
    (_i: number, m: Material) => makeRack(m),
    (i: number, m: Material) => (i % 2 === 0 ? makeNeuron(m) : makeChip(m)),
    (_i: number, m: Material) => makeScreen(m),
  ]

  // ---------- nós ----------
  const nodes: Vector3[][] = []
  LAYER_X.forEach((x, li) => {
    const n = COUNTS[li]
    const layer: Vector3[] = []
    for (let i = 0; i < n; i++) {
      const y = (i - (n - 1) / 2) * 2.3 + (rnd() - 0.5) * 0.6
      const z = (rnd() - 0.5) * 5
      const obj = factories[li](i, layerMats[li])
      obj.position.set(x, y, z)
      obj.rotation.y = (rnd() - 0.5) * 0.5
      net.add(obj)
      layer.push(new THREE.Vector3(x, y, z))
    }
    nodes.push(layer)
  })

  // ---------- fios ----------
  interface Edge { a: Vector3; b: Vector3; from: number; to: number }
  const edgesByGap: Edge[][] = []
  const edgeMats: LineBasicMaterial[] = []
  for (let g = 0; g < LAYER_X.length - 1; g++) {
    const edges: Edge[] = []
    const pos: number[] = []
    nodes[g].forEach((a, from) =>
      nodes[g + 1].forEach((b, to) => {
        edges.push({ a, b, from, to })
        pos.push(a.x + 0.7, a.y, a.z, b.x - 0.7, b.y, b.z)
      }),
    )
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    const mat = new THREE.LineBasicMaterial({ color: baseColor, transparent: true, opacity: 0.32 })
    net.add(new THREE.LineSegments(geo, mat))
    edgesByGap.push(edges)
    edgeMats.push(mat)
  }

  // ---------- pulsos de sinal ----------
  interface Pulse { mesh: Mesh; gap: number; edge: Edge; t: number; speed: number }
  const pulseMat = new THREE.MeshBasicMaterial({ color: accentColor })
  const pulseGeo = new THREE.SphereGeometry(0.11, 10, 10)
  const pickEdge = (gap: number, from?: number) => {
    const list = edgesByGap[gap]
    const pool = from === undefined ? list : list.filter((e) => e.from === from)
    return pool[Math.floor(rnd() * pool.length)] ?? list[0]
  }
  const pulses: Pulse[] = Array.from({ length: mode === 'hero' ? 14 : 26 }, (_, i) => {
    const gap = i % edgesByGap.length
    const mesh = new THREE.Mesh(pulseGeo, pulseMat)
    net.add(mesh)
    return { mesh, gap, edge: pickEdge(gap), t: rnd(), speed: 0.35 + rnd() * 0.35 }
  })

  const placePulse = (p: Pulse) => {
    const { a, b } = p.edge
    p.mesh.position.set(
      a.x + 0.7 + (b.x - a.x - 1.4) * p.t,
      a.y + (b.y - a.y) * p.t,
      a.z + (b.z - a.z) * p.t,
    )
  }
  pulses.forEach(placePulse)

  // ---------- estado e loop ----------
  let progressTarget = 0
  let progressCur = 0
  let active = -1
  let activeCb: ((i: number) => void) | null = null
  let running = false
  let elapsed = 0
  let last = 0
  let camDist = 17

  const applyActive = (idx: number) => {
    if (idx === active) return
    active = idx
    layerTarget.forEach((c, i) => c.copy(i === idx ? accentColor : baseColor))
    edgeMats.forEach((m, g) => {
      m.opacity = g === idx || g === idx - 1 ? 0.85 : 0.28
    })
    activeCb?.(idx)
  }

  const update = (dt: number) => {
    elapsed += dt

    if (mode === 'anatomy') {
      progressCur += (progressTarget - progressCur) * Math.min(1, dt * 4)
      const tx = LAYER_X[0] + (LAYER_X[3] - LAYER_X[0]) * progressCur
      camera.position.set(tx - 6.5, 2.2 + Math.sin(progressCur * Math.PI) * 0.9, camDist)
      camera.lookAt(tx + 1.5, 0, 0)
      applyActive(Math.round(progressTarget * 3))
    } else {
      net.rotation.y = Math.sin(elapsed * 0.25) * 0.5
      camera.position.set(0, 1.4, camDist)
      camera.lookAt(0, 0, 0)
      applyActive(Math.floor(elapsed / 1.3) % 4)
    }

    layerCur.forEach((c, i) => {
      c.lerp(layerTarget[i], Math.min(1, dt * 5))
      layerMats[i].color.copy(c)
    })

    for (const p of pulses) {
      p.t += dt * p.speed
      if (p.t >= 1) {
        const nextGap = (p.gap + 1) % edgesByGap.length
        p.edge = pickEdge(nextGap, nextGap === 0 ? undefined : p.edge.to)
        p.gap = nextGap
        p.t = 0
      }
      placePulse(p)
    }
  }

  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000 || 0)
    last = now
    update(dt)
    renderer.render(scene, camera)
  }

  const resize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    const tanHalf = Math.tan((camera.fov * Math.PI) / 360)
    if (mode === 'hero') {
      camDist = Math.max(15, 22 / (2 * tanHalf * camera.aspect))
    } else {
      camDist = 11 * Math.max(1, 1.15 / camera.aspect)
    }
  }

  const renderOnce = () => {
    update(0)
    renderer.render(scene, camera)
  }

  resize()
  applyActive(0)
  renderOnce()

  return {
    setProgress(p) {
      progressTarget = Math.min(1, Math.max(0, p))
      if (!running) {
        progressCur = progressTarget
        renderOnce()
      }
    },
    setColors(base, accent) {
      baseColor = new THREE.Color(base)
      accentColor = new THREE.Color(accent)
      detailMat.color.copy(accentColor)
      pulseMat.color.copy(accentColor)
      const idx = active
      active = -1
      layerCur.forEach((c, i) => {
        c.copy(baseColor)
        layerMats[i].color.copy(baseColor)
      })
      applyActive(idx)
      if (!running) renderOnce()
    },
    onActive(cb) {
      activeCb = cb
      cb(active)
    },
    resize() {
      resize()
      if (!running) renderOnce()
    },
    setRunning(on) {
      if (on === running) return
      running = on
      if (on && !opts.reduceMotion) {
        last = performance.now()
        renderer.setAnimationLoop(frame)
      } else {
        renderer.setAnimationLoop(null)
        if (on) renderOnce()
      }
    },
    renderOnce,
    dispose() {
      renderer.setAnimationLoop(null)
      scene.traverse((o) => {
        const m = o as Mesh
        if (m.geometry) (m.geometry as BufferGeometry).dispose()
      })
      layerMats.forEach((m) => m.dispose())
      edgeMats.forEach((m) => m.dispose())
      detailMat.dispose()
      pulseMat.dispose()
      pulseGeo.dispose()
      renderer.dispose()
    },
  }
}
