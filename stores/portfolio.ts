export interface Project {
  id: string
  name: string
  org: string
  year: string
  status: 'active' | 'done'
  description: string
  bullets: string[]
  stack: string[]
  github?: string
  live?: string
}

export interface Certificate {
  name: string
  issuer: string
  hours?: string
}

export interface Education {
  degree: string
  school: string
  period: string
}

export interface Experience {
  title: string
  org: string
  date: string
  description: string
}

export interface SkillCategory {
  title: string
  skills: string[]
}

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    name: 'Érico Nunes Carneiro',
    role: 'Fullstack Developer',
    location: 'Manaus, AM — Brasil',
    email: 'erico.nunesc@gmail.com',
    phone: '(92) 99901-4314',
    linkedin: 'www.linkedin.com/in/erico-nunes-dev',
    github: 'https://github.com/GregNewze',
    summary:
      'Desenvolvedor com foco em integração hardware/software, APIs REST e automação de fluxos. Construo sistemas do microcontrolador à aplicação fullstack, desde a camada física com microcontroladores/processadores até o back-end e mobile.',

    stats: [
      { value: '3+', label: 'Projetos entregues' },
      { value: '48h', label: 'Hackathon completo' },
      { value: '1ª', label: 'Equipe da região Norte no Shell Eco-marathon' },
    ],

  skillCategories: [
  { title: 'Linguagens', skills: ['TypeScript/Javascript', 'Python', 'Java','C/C++'] },

  { title: 'Back-End', skills: ['Node.js', 'REST APIs', 'Docker', 'Express.js', 'FastAPI'] },

  { title: 'Front-End / Mobile', skills: ['React', 'React Native', 'Vue.js', 'Nuxt.js', 'Vite'] },

  { title: 'Banco de Dados', skills: ['PostgreSQL', 'MySQL', 'TimescaleDB', 'Supabase', 'Firebase'] },

  { title: 'Embarcados / IoT', skills: ['STM32', 'ESP32','Raspberry Pi', 'UART', 'I2C', 'SPI','MQTT','Sensores'] },

  { title: 'Ferramentas', skills: ['Git', 'GitHub','Gitlab', 'Vercel' , 'N8N'] },
] as SkillCategory[],

    projects: [
      {
        id: 'mach-force',
        name: 'Mach Force — Shell Eco-marathon',
        org: 'Faculdade Matias Machline · Equipe Multidisciplinar',
        year: '2026',
        status: 'active',
        description:
          'Desenvolvedor Back-end & sistemas embarcados para monitoramento e controle em tempo real de protótipo elétrico de eficiência energética. Primeira equipe da Região Norte classificada para a competição internacional.',
        bullets: [
          'Back-end embarcado com monitoramento em tempo real',
          'Integração hardware/software via MQTT e APIs REST',
          'Definição de componentes e sensores para otimização de desempenho',
        ],
        stack: ['Node.js', 'Express.js','Docker','Javascript','WebSocket','MQTT', 'Sistemas Embarcados'],
        github: 'https://github.com/GregNewze',
      },
      {
        id: 'axioslab',
        name: 'AxiosLab — Inventário Automatizado de gestão de ativos',
        org: 'Fundação Matias Machline · Líder Técnico',
        year: '2025',
        status: 'done',
        description:
          'Sistema de inventário automatizado com integração de microcontroladores, sensores e interface mobile. Liderança técnica em todas as fases do ciclo de desenvolvimento.',
        bullets: [
          'Interface mobile em React Native com sincronização em tempo real',
          'Firebase Realtime Database para dados de sensores',
          'Redução de erros manuais de inventário em 35% via automação',
        ],
        stack: ['React Native', 'Firebase', 'TypeScript', 'IoT'],
        github: 'https://github.com/GregNewze',
      },
      {
        id: 'etnius',
        name: 'Etnius — Plataforma Cultural Indígena',
        org: 'Hackathon Urbanos da Amazônia · AIHHUAM',
        year: '2026',
        status: 'done',
        description:
          'Plataforma interativa de preservação cultural Kokama com dinâmicas de ensino via flashcards e validação de liderança nativa. Desenvolvida em ciclo completo em 48h.',
        bullets: [
          'Construído do zero em 48 horas em hackathon',
          'Dinâmicas de ensino com flashcards gamificados',
          'Validado por lideranças indígenas nativas',
        ],
        stack: ['React', 'Node.js', 'TypeScript'],
      },
    ] as Project[],

    experiences: [
      {
        title: 'Hackathon Urbanos da Amazônia',
        org: 'AIHHUAM · Participante',
        date: 'Fev. 2026',
        description:
          'Desenvolvimento do Acervo Digital Etnius em 48h — plataforma de preservação cultural indígena Kokama com validação de liderança nativa.',
      },
      {
        title: 'Feira de Tecnologia e Inovação',
        org: 'Fundação Matias Machline · Apresentador',
        date: 'Jun. 2025',
        description:
          'Apresentação do AxiosLab para público técnico e avaliadores, demonstrando arquitetura IoT e fluxo de integração hardware/software.',
      },
    ] as Experience[],

    education: [
      {
        degree: 'Bacharelado em Engenharia da Computação',
        school: 'Faculdade Matias Machline',
        period: '2026 – 2030',
      },
      {
        degree: 'Técnico em Mecatrônica',
        school: 'Fundação Matias Machline',
        period: '2025',
      },
    ] as Education[],

    certificates: [
      { name: 'Engenharia de Software', issuer: 'FIAP', hours: '100h' },
      { name: 'Soluções Tecnológicas Emergentes', issuer: 'FIAP', hours: '40h' },
      { name: 'Leadership Communication', issuer: 'FIAP', hours: '40h' },
      { name: 'IA em Dimensões', issuer: 'Pós Tech FIAP + Alura', hours: '1 Week' },
      { name: 'Six Sigma Lean Yellow Belt', issuer: 'FM2S', hours: '24h' },
      { name: 'Instalador e Reparador de Redes', issuer: 'IFRS', hours: '200h' },
    ] as Certificate[],
  }),
})
