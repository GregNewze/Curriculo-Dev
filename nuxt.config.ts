import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/color-mode',
      {
        classSuffix: '',
        preference: 'light',
        fallback: 'light',
      },
    ],
    '@pinia/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Érico Nunes — Engenharia de IA e Dados',
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfólio de Érico Nunes Carneiro — Engenharia de IA e Dados, visão computacional, telemetria industrial e sistemas embarcados. Manaus, AM.' },
        { name: 'author', content: 'Érico Nunes Carneiro' },
        { property: 'og:title', content: 'Érico Nunes — Engenharia de IA e Dados' },
        { property: 'og:description', content: 'Visão computacional, agentes inteligentes e dados em tempo real, do chão de fábrica ao dashboard.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
      ],
      script: [
        {
          // js: há JavaScript. calm: animações reduzidas (sistema pede, ou o visitante escolheu).
          innerHTML:
            "(function(){var d=document.documentElement;d.classList.add('js');try{var m=localStorage.getItem('motion');var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(m==='off'||(m!=='on'&&r))d.classList.add('calm')}catch(e){}})()",
          tagPosition: 'head',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://api.fontshare.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://cdn.fontshare.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=general-sans@400,500,600&display=swap' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://ericonunes.vercel.app',
    },
  },

  typescript: {
    strict: true,
  },
})
