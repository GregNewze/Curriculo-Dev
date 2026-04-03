# Érico Nunes — Currículo/Portfólio

Portfólio pessoal construído com **Nuxt 3**, **Vue.js (Composition API)**, **TypeScript**, **Tailwind CSS** e **Pinia**.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Nuxt 3 + Vue 3 (Composition API) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS |
| Estado | Pinia |
| Tema | @nuxtjs/color-mode (claro/escuro) |
| SEO | useSeoMeta (nativo Nuxt) |
| Deploy | Vercel |

---

## Estrutura de Pastas

```
portfolio/
├── assets/
│   └── css/
│       └── main.css          # Tailwind + classes globais
├── components/
│   ├── AppNav.vue             # Navbar fixa com toggle de tema
│   ├── AppFooter.vue          # Rodapé
│   ├── HeroSection.vue        # Seção hero (nome, CTA, stats)
│   ├── SkillsSection.vue      # Grid de skills por categoria
│   ├── ProjectsSection.vue    # Cards de projetos
│   ├── ExperienceSection.vue  # Experiência e formação
│   ├── CertificatesSection.vue# Grid de certificados
│   └── ContactSection.vue     # Contato + download CV
├── layouts/
│   └── default.vue            # Layout padrão (nav + slot + footer)
├── pages/
│   └── index.vue              # Página principal (monta todas as seções)
├── public/
│   └── CV_Erico_Nunes_ATS.pdf 
├── stores/
│   └── portfolio.ts           # Pinia store com todos os seus dados
├── app.vue
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
└── vercel.json
```

## Contato

**Érico Nunes Carneiro** — erico.nunesc@gmail.com
