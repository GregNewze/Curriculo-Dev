<template>
  <section id="hero" class="hero">
    <h1 class="name">
      <span class="word">Érico</span>
      <span class="frame">
        <img
          src="/img/encontro-das-aguas-jpg.jpg"
          width="1172"
          height="862"
          alt="Encontro das Águas em Manaus: o Rio Negro, escuro, e o Solimões, barrento, correm lado a lado sem se misturar"
          fetchpriority="high"
        />
      </span>
      <span class="word">Nunes</span>
    </h1>

    <div class="foot grid12">
      <p v-reveal="500" class="foot-line">
        Desenvolvedor fullstack e de sistemas embarcados em Manaus. Construo do microcontrolador à aplicação.
      </p>

      <div v-reveal="620" class="foot-actions">
        <a href="/CV_Erico_Nunes_ATS.pdf" download class="btn">Baixar CV</a>
        <a :href="store.linkedin" target="_blank" rel="noopener" class="link">LinkedIn</a>
        <a :href="store.github" target="_blank" rel="noopener" class="link">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()
</script>

<style scoped>
.hero {
  min-height: 100svh;
  padding: calc(var(--nav-h) + 24px) var(--margin) var(--margin);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* O nome é o monumento. O Encontro das Águas ocupa o espaço entre as duas palavras:
   dois rios lado a lado, como hardware e software. */
.name {
  margin: auto 0;
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 0.16em;
  font-size: clamp(3.5rem, 13vw, 13rem);
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 0.92;
  white-space: nowrap;
}

.frame {
  display: block;
  align-self: baseline;
  width: 1.5em;
  height: 0.7em;
  overflow: hidden;
  background: var(--surface);
  animation: shutter 1.1s var(--ease) 0.15s both;
}
.frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 72%;
  animation:
    settle 1.1s var(--ease) 0.15s both,
    drift 26s ease-in-out 1.4s infinite alternate;
}

@keyframes shutter {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}
@keyframes settle {
  from { transform: scale(1.12); }
  to { transform: scale(1); }
}
@keyframes drift {
  from { transform: scale(1); }
  to { transform: scale(1.07); }
}

.foot {
  align-items: end;
  row-gap: 24px;
}
.foot-line {
  grid-column: 6 / span 4;
  font-size: max(1.125rem, var(--step-body));
  line-height: 1.45;
  max-width: 34ch;
}
.foot-actions {
  grid-column: 10 / -1;
  justify-self: end;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px 24px;
}

@media (max-width: 760px) {
  .name {
    flex-direction: column;
    align-items: center;
    gap: 0.12em;
    font-size: 19vw;
    line-height: 0.9;
  }
  .frame {
    align-self: center;
    width: calc(100vw - 2 * var(--margin));
    height: auto;
    aspect-ratio: 3 / 2;
    font-size: 1rem;
  }
  .foot-line,
  .foot-actions {
    grid-column: 1 / -1;
    justify-self: start;
  }
  .foot-actions { justify-content: flex-start; }
}
</style>
