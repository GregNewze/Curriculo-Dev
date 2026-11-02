<template>
  <footer class="footer">
    <div class="top grid12">
      <div class="invite">
        <p class="invite-text">Vamos construir<br />algo juntos?</p>
        <a :href="`mailto:${store.email}`" class="btn">Enviar e-mail</a>
      </div>

      <ul class="links">
        <li><a :href="store.linkedin" target="_blank" rel="noopener" class="link">LinkedIn</a></li>
        <li><a :href="store.github" target="_blank" rel="noopener" class="link">GitHub</a></li>
        <li><a href="/CV_Erico_Nunes_ATS.pdf" download class="link">Baixar CV</a></li>
      </ul>
    </div>

    <div class="bottom">
      <p class="credits">
        Fotos:
        <template v-for="(c, i) in credits" :key="c.href">
          <a :href="c.href" target="_blank" rel="noopener">{{ c.title }}</a>, {{ c.author }}, {{ c.licence }}<template v-if="i < credits.length - 1">; </template>
        </template>
        · © {{ year }} Érico Nunes Carneiro
      </p>
      <p class="mark" aria-hidden="true">Érico Nunes</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio'

const store = usePortfolioStore()
const year = new Date().getFullYear()

const credits = [
  { title: 'Manaus Encontro das aguas', author: 'Mario Roberto Duran Ortiz Mariordo', licence: 'CC BY 3.0', href: 'https://commons.wikimedia.org/wiki/File:Manaus_Encontro_das_aguas_10_2006_103_8x6.jpg' },
  { title: 'Revox B215 control PCB', author: 'Retired electrician', licence: 'CC0', href: 'https://commons.wikimedia.org/wiki/File:Revox_B215_control_PCB_-_microcontrollers.jpg' },
  { title: 'Raspberry Pi 4 Model B - Side', author: 'Laserlicht', licence: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:Raspberry_Pi_4_Model_B_-_Side.jpg' },
  { title: 'Noite no Teatro Amazonas', author: 'Susan Valentim', licence: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:Noite_no_Teatro_Amazonas_(cropped).jpg' },
]
</script>

<style scoped>
.footer {
  margin-top: var(--gap-section);
  min-height: min(100svh, 820px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: clamp(64px, 10vw, 160px);
  padding: clamp(40px, 6vw, 96px) var(--margin) 0;
  background: var(--inv-bg);
  color: var(--inv-ink);
  overflow: hidden;
}
.footer ::selection { background: var(--inv-ink); color: var(--inv-bg); }

.top { row-gap: 40px; align-items: start; }
.invite { grid-column: 1 / span 7; display: grid; gap: 32px; justify-items: start; }
.invite-text {
  font-size: clamp(2.5rem, 5.4vw, 5.5rem);
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 0.98;
}
.links { grid-column: 10 / -1; display: grid; gap: 10px; font-size: var(--step-body); }

.bottom { position: relative; }
.credits {
  font-size: var(--step-small);
  line-height: 1.5;
  max-width: 70ch;
  margin-bottom: clamp(16px, 2vw, 32px);
  opacity: 0.85;
}
.credits a { text-underline-offset: 0.2em; }

.mark {
  font-size: 21vw;
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 0.8;
  white-space: nowrap;
  margin-left: -0.04em;
  transform: translateY(26%);
  user-select: none;
}

@media (max-width: 760px) {
  .invite, .links { grid-column: 1 / -1; }
  .mark { font-size: 27vw; }
}
</style>
