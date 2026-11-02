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
      title: 'Érico Nunes — Fullstack Developer',
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfólio de Érico Nunes Carneiro — Desenvolvedor Fullstack, Back-End e Sistemas Embarcados. Manaus, AM.' },
        { name: 'author', content: 'Érico Nunes Carneiro' },
        { property: 'og:title', content: 'Érico Nunes — Fullstack Developer' },
        { property: 'og:description', content: 'Desenvolvedor Back-End e Sistemas Embarcados com experiência em IoT, APIs REST e automação de fluxos.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
      ],
      script: [
        { innerHTML: "document.documentElement.classList.add('js')", tagPosition: 'head' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&display=swap' },
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
