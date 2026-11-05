import type { BufferGeometry, Color, Group, LineBasicMaterial, Material, Mesh, MeshStandardMaterial, Vector3 } from 'three'

/**
 * Rede neural feita de objetos físicos, em quatro camadas que espelham o pipeline real:
 *   0 Captura  → câmeras e sensores
 *   1 Ingestão → racks / gateways (deviceWise, MES, Data Lake)
 *   2 Modelo   → neurônios e chips (VLMs, visão, preditivo)
 *   3 Decisão  → telas de dashboard
 * Um único canvas serve a página inteira: `setProgress(0..1)` leva a câmera de uma visão
 * aberta (hero) até dentro de cada camada.
 */
export interface NeuralNet {
  setProgress(progress: number): void
  /** -1..1 em cada eixo: parallax do ponteiro. */
  setPointer(x: number, y: number): void
  /** Camada em foco; -1 enquanto a visão ainda é a do hero. */
  onActive(cb: (index: number) => void): void
  resize(): void
  setRunning(on: boolean): void
  dispose(): void
}

export interface NeuralOptions {
  base: string
  active: string
  accent: string
  /** Sem deriva idle da câmera. O scroll continua movendo tudo. */
  calm: boolean
}

const LAYER_X = [-9, -3, 3, 9]
const COUNTS = [5, 4, 6, 3]
/** Fração do scroll dedicada à entrada (visão aberta → primeira camada). */
export const JOURNEY_INTRO = 0.12

export async function createNeuralNet(canvas: HTMLCanvasElement, opts: NeuralOptions): Promise<NeuralNet> {
  // Imports nomeados: o bundler descarta o resto do Three.js.
  const {
    AmbientLight, BoxGeometry, BufferGeometry, Color, CylinderGeometry, DirectionalLight, Float32BufferAttribute,
    Group, IcosahedronGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, MeshStandardMaterial,
    PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
  } = await import('three')

  // Leve: DPR no máximo 1.5 e antialias só em telas de densidade baixa.
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  const renderer = new WebGLRenderer({ canvas, antialias: dpr < 1.5, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(dpr)

  const scene = new Scene()
  const camera = new PerspectiveCamera(36, 1, 0.1, 160)
  scene.add(new AmbientLight(0xffffff, 1.35))
  const sun = new DirectionalLight(0xffffff, 2.6)
  sun.position.set(6, 9, 8)
  scene.add(sun)

  const net = new Group()
  scene.add(net)

  let seed = 11
  const rnd = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  const baseColor = new Color(opts.base)
  const activeColor = new Color(opts.active)
  const accentColor = new Color(opts.accent)

  const layerMats: MeshStandardMaterial[] = LAYER_X.map(
    () => new MeshStandardMaterial({ color: baseColor, roughness: 0.8, metalness: 0.05, flatShading: true }),
  )
  const layerCur: Color[] = LAYER_X.map(() => baseColor.clone())
  const layerTarget: Color[] = LAYER_X.map(() => baseColor.clone())
  const detailMat = new MeshStandardMaterial({ color: accentColor, roughness: 0.5, flatShading: true })

  // ---------- objetos físicos ----------
  const box = (w: number, h: number, d: number, mat: Material, x = 0, y = 0, z = 0) => {
    const m = new Mesh(new BoxGeometry(w, h, d), mat)
    m.position.set(x, y, z)
    return m
  }

  const makeCamera = (mat: Material): Group => {
    const g = new Group()
    g.add(box(1.1, 0.75, 0.85, mat))
    const lens = new Mesh(new CylinderGeometry(0.3, 0.3, 0.55, 20), mat)
    lens.rotation.z = -Math.PI / 2
    lens.position.set(0.8, 0, 0)
    g.add(lens)
    const glass = new Mesh(new CylinderGeometry(0.18, 0.18, 0.06, 20), detailMat)
    glass.rotation.z = -Math.PI / 2
    glass.position.set(1.1, 0, 0)
    g.add(glass)
    g.add(box(0.12, 0.12, 0.12, detailMat, -0.3, 0.45, 0))
    return g
  }

  const makeSensor = (mat: Material): Group => {
    const g = new Group()
    g.add(new Mesh(new CylinderGeometry(0.38, 0.38, 0.7, 18), mat))
    g.add(box(0.5, 0.2, 0.5, mat, 0, 0.45, 0))
    g.add(box(0.14, 0.14, 0.14, detailMat, 0, 0.62, 0))
    return g
  }

  const makeRack = (mat: Material): Group => {
    const g = new Group()
    for (let i = 0; i < 3; i++) {
      g.add(box(1.5, 0.28, 0.95, mat, 0, (i - 1) * 0.36, 0))
      g.add(box(0.12, 0.08, 0.04, detailMat, 0.5, (i - 1) * 0.36, 0.5))
    }
    return g
  }

  const makeNeuron = (mat: Material): Group => {
    const g = new Group()
    g.add(new Mesh(new IcosahedronGeometry(0.55, 1), mat))
    return g
  }

  const makeChip = (mat: Material): Group => {
    const g = new Group()
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
    const g = new Group()
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

  const nodes: Vector3[][] = []
  const objects: Group[] = []
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
      objects.push(obj)
      layer.push(new Vector3(x, y, z))
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
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(pos, 3))
    const mat = new LineBasicMaterial({ color: baseColor, transparent: true, opacity: 0.4 })
    net.add(new LineSegments(geo, mat))
    edgesByGap.push(edges)
    edgeMats.push(mat)
  }

  // ---------- pulsos de sinal ----------
  interface Pulse { mesh: Mesh; gap: number; edge: Edge; t: number; speed: number }
  const pulseMat = new MeshBasicMaterial({ color: accentColor })
  const pulseGeo = new SphereGeometry(0.13, 10, 10)
  const pickEdge = (gap: number, from?: number) => {
    const list = edgesByGap[gap]
    const pool = from === undefined ? list : list.filter((e) => e.from === from)
    return pool[Math.floor(rnd() * pool.length)] ?? list[0]
  }
  const pulses: Pulse[] = Array.from({ length: window.innerWidth < 760 ? 12 : 20 }, (_, i) => {
    const gap = i % edgesByGap.length
    const mesh = new Mesh(pulseGeo, pulseMat)
    net.add(mesh)
    return { mesh, gap, edge: pickEdge(gap), t: rnd(), speed: 0.35 + rnd() * 0.4 }
  })
  const placePulse = (p: Pulse) => {
    const { a, b } = p.edge
    p.mesh.position.set(a.x + 0.7 + (b.x - a.x - 1.4) * p.t, a.y + (b.y - a.y) * p.t, a.z + (b.z - a.z) * p.t)
  }
  pulses.forEach(placePulse)

  // ---------- câmera e estado ----------
  let progressTarget = 0
  let progressCur = 0
  let ptrTarget = { x: 0, y: 0 }
  const ptr = { x: 0, y: 0 }
  let active = -2
  let activeCb: ((i: number) => void) | null = null
  let running = false
  let elapsed = 0
  let last = 0
  let W = 1
  let H = 1
  let wideDist = 31
  let layerDist = 11

  const pos = new Vector3()
  const look = new Vector3()
  const wideLook = new Vector3(0, -2.2, 0)
  const ease = (t: number) => t * t * (3 - 2 * t)

  const applyActive = (idx: number) => {
    if (idx === active) return
    active = idx
    layerTarget.forEach((c, i) => c.copy(i === idx ? activeColor : baseColor))
    edgeMats.forEach((m, g) => {
      const on = g === idx || g === idx - 1
      m.color.copy(on ? activeColor : baseColor)
      m.opacity = on ? 0.95 : 0.32
    })
    activeCb?.(idx)
  }

  const update = (dt: number) => {
    elapsed += dt
    progressCur += (progressTarget - progressCur) * Math.min(1, dt * 5)
    ptr.x += (ptrTarget.x - ptr.x) * Math.min(1, dt * 3)
    ptr.y += (ptrTarget.y - ptr.y) * Math.min(1, dt * 3)

    const p = progressCur
    const drift = opts.calm ? 0 : 1
    let shift = 0

    if (p < JOURNEY_INTRO) {
      // Visão aberta → primeira camada
      const t = ease(p / JOURNEY_INTRO)
      const l0x = LAYER_X[0]
      pos.set(2 + (l0x - 6.5 - 2) * t, 4.5 + (2.2 - 4.5) * t, wideDist + (layerDist - wideDist) * t)
      look.set(wideLook.x + (l0x + 1.5 - wideLook.x) * t, wideLook.y * (1 - t), 0)
      shift = t
    } else {
      const u = (p - JOURNEY_INTRO) / (1 - JOURNEY_INTRO)
      const tx = LAYER_X[0] + (LAYER_X[3] - LAYER_X[0]) * u
      pos.set(tx - 6.5, 2.2 + Math.sin(u * Math.PI) * 0.9, layerDist)
      look.set(tx + 1.5, 0, 0)
      shift = 1
    }
    pos.x += ptr.x * 1.4
    pos.y += -ptr.y * 0.9 + Math.sin(elapsed * 0.6) * 0.18 * drift
    net.rotation.y = Math.sin(elapsed * 0.22) * 0.07 * drift
    camera.position.copy(pos)
    camera.lookAt(look)

    // O foco da cena fica à direita quando há texto à esquerda (telas largas).
    const sx = W / H > 1.15 ? shift * 0.17 : 0
    // Na visão aberta a rede sobe um pouco, para o nome ocupar a parte de baixo.
    const sy = (1 - shift) * 0.13
    camera.setViewOffset(W, H, -W * sx, H * sy, W, H)

    applyActive(p < JOURNEY_INTRO * 0.85 ? -1 : Math.round(((p - JOURNEY_INTRO) / (1 - JOURNEY_INTRO)) * 3))

    layerCur.forEach((c, i) => {
      c.lerp(layerTarget[i], Math.min(1, dt * 6))
      layerMats[i].color.copy(c)
    })
    objects.forEach((o, i) => {
      o.position.y += Math.sin(elapsed * 0.9 + i) * 0.0016 * drift
    })

    for (const pl of pulses) {
      pl.t += dt * pl.speed
      if (pl.t >= 1) {
        const nextGap = (pl.gap + 1) % edgesByGap.length
        pl.edge = pickEdge(nextGap, nextGap === 0 ? undefined : pl.edge.to)
        pl.gap = nextGap
        pl.t = 0
      }
      placePulse(pl)
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
    W = w
    H = h
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    const tanHalf = Math.tan((camera.fov * Math.PI) / 360)
    wideDist = Math.max(31, 27 / (2 * tanHalf * camera.aspect))
    layerDist = 11 * Math.max(1, 1.15 / camera.aspect)
  }

  const renderOnce = () => {
    update(0)
    renderer.render(scene, camera)
  }

  resize()
  applyActive(-1)
  renderOnce()

  return {
    setProgress(p) {
      progressTarget = Math.min(1, Math.max(0, p))
      if (!running) {
        progressCur = progressTarget
        renderOnce()
      }
    },
    setPointer(x, y) {
      ptrTarget = { x, y }
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
      if (on) {
        last = performance.now()
        renderer.setAnimationLoop(frame)
      } else {
        renderer.setAnimationLoop(null)
      }
    },
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
