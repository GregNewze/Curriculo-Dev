import { defineStore } from 'pinia'

export interface Project {
  id: string
  name: string
  org: string
  year?: string
  status: 'active' | 'done'
  description: string
  bullets?: string[]
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
    role: 'Engenharia de IA e Dados',
    location: 'Manaus, AM — Brasil',
    email: 'erico.nunesc@gmail.com',
    phone: '(92) 99901-4314',
    linkedin: 'https://www.linkedin.com/in/erico-nunes-dev',
    github: 'https://github.com/GregNewze',
    summary:
      'Desenvolvedor com foco em Engenharia de Inteligência Artificial e Dados, graduando em Engenharia da Computação. Experiência na arquitetura de soluções escaláveis, processamento de dados em tempo real e integração de sistemas complexos (OT/IT).',

    stats: [
      { value: '4', label: 'Projetos de IA e visão computacional' },
      { value: '1ª', label: 'Equipe da região Norte no Shell Eco-marathon' },
      { value: '2026', label: 'Aspire Leaders Program' },
    ],

    skillCategories: [
      {
        title: 'IA e Dados',
        skills: [
          'Visão computacional',
          'Modelos fundacionais locais (LLMs/VLMs)',
          'Modelagem preditiva',
          'BigQuery',
          'Data Lakes',
          'Agentes (n8n)',
        ],
      },
      { title: 'Linguagens', skills: ['Python', 'TypeScript/JavaScript', 'Java', 'C/C++'] },
      {
        title: 'Back-end e integrações',
        skills: ['Node.js', 'APIs REST', 'Firebase', 'Supabase', 'Integração OT/IT', 'Docker'],
      },
      {
        title: 'Front-end e visualização',
        skills: ['React', 'React Native', 'Vue.js', 'Nuxt.js', 'Three.js (3D)', 'Dashboards analíticos'],
      },
      { title: 'Bancos de dados e cloud', skills: ['PostgreSQL', 'TimescaleDB', 'MySQL', 'BigQuery', 'Cloud Storage'] },
      { title: 'Embarcados e IoT', skills: ['STM32', 'ESP32', 'Raspberry Pi', 'UART', 'I2C', 'SPI', 'MQTT'] },
    ] as SkillCategory[],

    projects: [
      {
        id: 'osiris',
        name: 'Osiris — Balanceamento operacional com IA',
        org: 'Projeto de destaque · IA e visão computacional',
        status: 'done',
        description:
          'Sistema automatizado de análise de linha com modelos fundacionais de visão e linguagem (VLMs/LLMs) locais. Mapeia as ações dos operadores e classifica macro e microciclos em tempo real, identificando gargalos para automatizar e otimizar o balanceamento produtivo.',
        stack: ['VLMs', 'LLMs locais', 'Visão computacional'],
      },
      {
        id: 'chronos',
        name: 'Chronos — Anomalias e microparadas',
        org: 'Projeto de destaque · Visão computacional',
        status: 'done',
        description:
          'Solução de visão computacional que detecta, classifica e contabiliza interrupções na produção (block, idle, stoppage, micro-stoppage), alimentando dashboards em tempo real para ações de melhoria contínua.',
        stack: ['Visão computacional', 'Dashboards em tempo real'],
      },
      {
        id: 'sharingan',
        name: 'Sharingan — Classificação visual e auditoria',
        org: 'Projeto de destaque · Visão computacional',
        status: 'done',
        description:
          'Sistema de rastreamento computacional em monovia que reconhece perfis específicos de cavidades em peças, automatizando a contagem e a auditoria de componentes em alta velocidade.',
        stack: ['Visão computacional', 'Rastreamento', 'Auditoria automatizada'],
      },
      {
        id: 'agv',
        name: 'Gêmeo digital do AGV — Veículo autônomo e realidade mista',
        org: 'Projeto de destaque · IA e realidade mista',
        status: 'done',
        description:
          'Sistema preditivo com realidade mista. Algoritmos de rota (A*), motor 3D (Three.js) e aprendizado contínuo (mínimos quadrados recursivos) embarcados para calcular desgaste e antecipar falhas de hardware.',
        stack: ['Three.js', 'A*', 'Mínimos quadrados recursivos', 'Realidade mista'],
      },
      {
        id: 'mach-force',
        name: 'Mach Force — Shell Eco-marathon',
        org: 'Faculdade Matias Machline · Equipe multidisciplinar',
        year: '2026',
        status: 'active',
        description:
          'Desenvolvedor de software e telemetria de protótipo elétrico de eficiência energética, com monitoramento e controle em tempo real. Primeira equipe da região Norte classificada para a competição internacional.',
        bullets: [
          'Back-end embarcado com monitoramento em tempo real',
          'Integração hardware/software via MQTT e APIs REST',
          'Definição de componentes e sensores para otimização de desempenho',
        ],
        stack: ['Node.js', 'Express.js', 'Docker', 'WebSocket', 'MQTT', 'Sistemas embarcados'],
        github: 'https://github.com/GregNewze',
      },
      {
        id: 'axioslab',
        name: 'AxiosLab — Inventário automatizado',
        org: 'Fundação Matias Machline · Líder técnico',
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
        name: 'Etnius — Plataforma cultural indígena',
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
        title: 'Controlador de Automação e Dados I',
        org: 'Whirlpool Corporation · Manaus, AM',
        date: 'Mai. 2026 – atual',
        description:
          'Projeto Injetados 1.0: liderança técnica na migração de sistemas legados para a plataforma deviceWise, conectando o maquinário industrial ao banco de dados MES e ao Data Lake corporativo (BigQuery). Ingestão contínua de telemetria para cálculo automatizado de OEE e monitoramento da produção em tempo real, com rastreabilidade de ponta a ponta.',
      },
      {
        title: 'Aspire Leaders Program',
        org: 'Iniciativa global fundada por professores da Harvard Business School',
        date: '2026',
        description:
          'Aprovado no programa de desenvolvimento de lideranças emergentes e impacto em escala.',
      },
      {
        title: 'Hackathon Urbanos da Amazônia',
        org: 'AIHHUAM · Participante',
        date: 'Fev. 2026',
        description:
          'Desenvolvimento do Acervo Digital Etnius em 48h: plataforma de preservação cultural indígena Kokama com validação de liderança nativa.',
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
