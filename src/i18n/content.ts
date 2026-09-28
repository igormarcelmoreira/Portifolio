export type Lang = 'en' | 'pt' | 'es';

export interface Project {
  name: string;
  kind: string;
  year: string;
  summary: string;
  stack: string[];
  href?: string;
  linkLabel?: string;
  icons?: boolean;
  icon?: string;
}

export interface Content {
  lang: Lang;
  htmlLang: string;
  meta: { title: string; description: string };
  nav: { work: string; services: string; about: string; contact: string; city: string };
  loader: string;
  hero: { intro: string; status: string; cta: string; scroll: string; tilt: string };
  manifesto: string;
  services: { title: string; lead: string; items: { title: string; body: string; tags: string[] }[] };
  work: { title: string; lead: string; open: string; projects: Project[]; github: string };
  numbers: { value: number; suffix: string; label: string }[];
  about: {
    title: string;
    body: string[];
    jobs: { period: string; role: string; company: string; body: string }[];
    eduTitle: string;
    edu: { period: string; title: string; school: string }[];
    langs: string;
  };
  stack: string[];
  contact: { title: string; body: string; email: string; whatsapp: string; rights: string; built: string; top: string };
}

const stack = [
  'C#', '.NET', 'ASP.NET Core', 'TypeScript', 'React', 'Angular', '.NET MAUI', 'Node.js', 'NestJS',
  'Python', 'Android', 'iOS', 'Azure DevOps', 'GitHub Actions', 'AWS', 'Azure', 'Firebase', 'RAG', 'AI agents',
];

const trueIcons = true;

export const content: Record<Lang, Content> = {
  en: {
    lang: 'en',
    htmlLang: 'en',
    meta: {
      title: 'Igor Marcel — Software Engineer',
      description:
        'Software engineer building web platforms, mobile apps and AI features that ship. 6+ years across healthcare, finance and energy. Based in Porto Alegre, Brazil.',
    },
    nav: { work: 'Work', services: 'Services', about: 'About', contact: 'Contact', city: 'Porto Alegre' },
    loader: 'Loading',
    hero: {
      intro: 'I design and build software that ships: web platforms, mobile apps and AI that does real work.',
      status: 'Taking on new projects',
      cta: 'Start a project',
      scroll: 'Scroll',
      tilt: 'Tilt your phone',
    },
    manifesto:
      'Six years turning messy requirements into software people depend on. Apps that run inside ambulances, platforms hospitals check in real time, ERPs that run a company, and lately, AI that removes the boring part of someone’s job.',
    services: {
      title: 'What I can build for you',
      lead: 'For founders who need a product out the door and teams who need a senior pair of hands.',
      items: [
        {
          title: 'Web platforms',
          body: 'Dashboards, internal tools and SaaS products in React, Angular and .NET, built so the next developer can keep going without me.',
          tags: ['React', 'Angular', 'ASP.NET Core'],
        },
        {
          title: 'Mobile apps',
          body: 'Android and iOS apps from first commit to store release, with CI/CD and enterprise distribution already solved.',
          tags: ['.NET MAUI', 'CI/CD', 'Intune MDM'],
        },
        {
          title: 'AI & automation',
          body: 'LLM features, retrieval over your own documents, and agents that take manual steps out of real workflows.',
          tags: ['RAG', 'Agents', 'Automation'],
        },
        {
          title: 'Technical leadership',
          body: 'Architecture, code standards, reviews and mentoring for teams that are growing faster than their codebase.',
          tags: ['Architecture', 'Code review', 'Mentoring'],
        },
      ],
    },
    work: {
      title: 'Selected work',
      lead: 'Most of it lives behind company logins, so here is what it is and where it runs.',
      open: 'Open',
      github: 'Latest on GitHub',
      projects: [
        {
          name: 'SAPH Web',
          icon: 'saph-web.webp',
          kind: 'Healthcare web platform',
          year: '2023–2025',
          summary: 'Real-time view of healthcare facility availability for medical regulators. I led development and the team shipping it at TRUE.',
          stack: ['Angular', 'TypeScript', 'ASP.NET Core'],
          href: 'https://true.com.br/solucoes/cairhos',
          linkLabel: 'Product page',
        },
        {
          name: 'Mobile app suite',
          kind: '6 apps in production',
          year: '2022–2025',
          summary: 'CHAMAR 192, SAPH Móvel, TRUE PCR, TRUE Checklist, SAPH Gestão and Unimed POA SOS, taken from Xamarin to .NET MAUI with CI/CD on Android and iOS.',
          stack: ['.NET MAUI', 'C#', 'GitHub Actions'],
          href: 'https://play.google.com/store/apps/dev?id=8163336353300983840',
          linkLabel: 'Google Play',
          icons: trueIcons,
        },
        {
          name: 'Sinos ERP',
          icon: 'sinos-erp.webp',
          kind: 'ERP from scratch',
          year: '2021',
          summary: 'Finance, inventory and operations for Sinos Tecnologia, designed and built end to end.',
          stack: ['Angular', 'ASP.NET Core', 'C#'],
          href: 'https://www.sinosservice.com/',
          linkLabel: 'Company site',
        },
        {
          name: 'Lino',
          icon: 'lino.webp',
          kind: 'Hackathon, 1st place',
          year: '2025',
          summary: 'Front-end lead: the whole interface in React and TypeScript under hackathon time, plus the integration with the back end.',
          stack: ['React', 'TypeScript'],
          href: 'https://github.com/PedroAugustoPereira/LikeNow',
          linkLabel: 'GitHub',
        },
        {
          name: 'Polymathech',
          icon: 'polymathech.webp',
          kind: 'Highlight award, AGES',
          year: '2024',
          summary: 'Study and career-guidance platform. Front-end reference for the team, owning code standards and tooling.',
          stack: ['React', 'TypeScript', 'Figma'],
          href: 'https://github.com/igormarcelmoreira/polymathech',
          linkLabel: 'GitHub',
        },
        {
          name: 'CP-Planta',
          icon: 'cp-planta.webp',
          kind: 'Data architecture',
          year: '2024',
          summary: 'Front end in React plus the data model and API contracts behind it.',
          stack: ['React', 'API design'],
          href: 'https://tools.ages.pucrs.br/cp-planta',
          linkLabel: 'GitLab',
        },
      ],
    },
    numbers: [
      { value: 6, suffix: '+', label: 'years building production software' },
      { value: 6, suffix: '', label: 'apps live on Android and iOS' },
      { value: 2, suffix: '', label: 'awards: hackathon and AGES' },
      { value: 3, suffix: '', label: 'countries worked and studied in' },
    ],
    about: {
      title: 'About',
      body: [
        'I’m Igor, a full-stack engineer from Porto Alegre. I’ve been the technical reference on mobile and web teams, set up the pipelines that ship their releases, and migrated six production apps to a new framework without stopping them.',
        'I finished an academic exchange at Hankuk University of Foreign Studies in Seoul in 2026, and I’m completing a degree in Software Engineering at PUCRS.',
      ],
      jobs: [
        {
          period: '2022–2025',
          role: 'Senior full-stack developer & technical reference',
          company: 'TRUE — Tecnologia para a vida',
          body: 'Architecture and reviews across teams, CI/CD for Android and iOS, Intune MDM distribution, Play Integrity, and the Xamarin to .NET MAUI migration.',
        },
        {
          period: '2020–2022',
          role: 'Full-stack developer',
          company: 'Interanet IT',
          body: 'Web, back-end and mobile work for Banrisul, Sulgás, Marista, Sinos Tecnologia and Aucon.',
        },
      ],
      eduTitle: 'Education',
      edu: [
        { period: '2026', title: 'Academic exchange, Software Engineering', school: 'HUFS, Seoul' },
        { period: '2023–now', title: 'B.Sc. Software Engineering', school: 'PUCRS, Porto Alegre' },
        { period: '2020–2022', title: 'Control and Automation Engineering', school: 'UERGS' },
      ],
      langs: 'Portuguese (native), English (advanced), Japanese (beginner)',
    },
    stack,
    contact: {
      title: 'Let’s build something',
      body: 'Tell me what you need shipped. I usually reply within a day.',
      email: 'igor2mxavier@gmail.com',
      whatsapp: 'WhatsApp',
      rights: '© 2026 Igor Marcel',
      built: 'Built with Astro and GSAP',
      top: 'Back to top',
    },
  },

  pt: {
    lang: 'pt',
    htmlLang: 'pt-BR',
    meta: {
      title: 'Igor Marcel — Engenheiro de Software',
      description:
        'Engenheiro de software construindo plataformas web, apps mobile e IA que vão pra produção. 6+ anos em saúde, finanças e energia. Porto Alegre, Brasil.',
    },
    nav: { work: 'Projetos', services: 'Serviços', about: 'Sobre', contact: 'Contato', city: 'Porto Alegre' },
    loader: 'Carregando',
    hero: {
      intro: 'Projeto e construo software que vai pra produção: plataformas web, apps mobile e IA que faz trabalho de verdade.',
      status: 'Aceitando novos projetos',
      cta: 'Começar um projeto',
      scroll: 'Role',
      tilt: 'Incline o celular',
    },
    manifesto:
      'Seis anos transformando requisitos bagunçados em software do qual as pessoas dependem. Apps que rodam dentro de ambulâncias, plataformas que hospitais consultam em tempo real, ERPs que tocam uma empresa, e agora IA que tira a parte chata do trabalho de alguém.',
    services: {
      title: 'O que eu posso construir pra você',
      lead: 'Pra fundadores que precisam de um produto no ar e times que precisam de um sênior de verdade.',
      items: [
        {
          title: 'Plataformas web',
          body: 'Dashboards, ferramentas internas e produtos SaaS em React, Angular e .NET, feitos pra que o próximo dev consiga continuar sem mim.',
          tags: ['React', 'Angular', 'ASP.NET Core'],
        },
        {
          title: 'Apps mobile',
          body: 'Apps Android e iOS do primeiro commit até a loja, com CI/CD e distribuição corporativa já resolvidos.',
          tags: ['.NET MAUI', 'CI/CD', 'Intune MDM'],
        },
        {
          title: 'IA e automação',
          body: 'Funcionalidades com LLM, busca sobre os seus próprios documentos e agentes que tiram etapas manuais de fluxos reais.',
          tags: ['RAG', 'Agentes', 'Automação'],
        },
        {
          title: 'Liderança técnica',
          body: 'Arquitetura, padrões de código, revisões e mentoria pra times que crescem mais rápido que o código.',
          tags: ['Arquitetura', 'Code review', 'Mentoria'],
        },
      ],
    },
    work: {
      title: 'Projetos selecionados',
      lead: 'A maioria vive atrás de login de empresa, então aqui está o que é e onde roda.',
      open: 'Abrir',
      github: 'Último no GitHub',
      projects: [
        {
          name: 'SAPH Web',
          icon: 'saph-web.webp',
          kind: 'Plataforma web de saúde',
          year: '2023–2025',
          summary: 'Disponibilidade de unidades de saúde em tempo real para reguladores médicos. Liderei o desenvolvimento e o time na TRUE.',
          stack: ['Angular', 'TypeScript', 'ASP.NET Core'],
          href: 'https://true.com.br/solucoes/cairhos',
          linkLabel: 'Página do produto',
        },
        {
          name: 'Suíte de apps mobile',
          kind: '6 apps em produção',
          year: '2022–2025',
          summary: 'CHAMAR 192, SAPH Móvel, TRUE PCR, TRUE Checklist, SAPH Gestão e Unimed POA SOS, migrados de Xamarin para .NET MAUI com CI/CD em Android e iOS.',
          stack: ['.NET MAUI', 'C#', 'GitHub Actions'],
          href: 'https://play.google.com/store/apps/dev?id=8163336353300983840',
          linkLabel: 'Google Play',
          icons: trueIcons,
        },
        {
          name: 'Sinos ERP',
          icon: 'sinos-erp.webp',
          kind: 'ERP do zero',
          year: '2021',
          summary: 'Finanças, estoque e operação da Sinos Tecnologia, projetado e construído de ponta a ponta.',
          stack: ['Angular', 'ASP.NET Core', 'C#'],
          href: 'https://www.sinosservice.com/',
          linkLabel: 'Site da empresa',
        },
        {
          name: 'Lino',
          icon: 'lino.webp',
          kind: 'Hackathon, 1º lugar',
          year: '2025',
          summary: 'Líder de front-end: a interface inteira em React e TypeScript no tempo de hackathon, mais a integração com o back-end.',
          stack: ['React', 'TypeScript'],
          href: 'https://github.com/PedroAugustoPereira/LikeNow',
          linkLabel: 'GitHub',
        },
        {
          name: 'Polymathech',
          icon: 'polymathech.webp',
          kind: 'Projeto destaque, AGES',
          year: '2024',
          summary: 'Plataforma de estudos e orientação vocacional. Referência de front-end do time, cuidando de padrões e ferramentas.',
          stack: ['React', 'TypeScript', 'Figma'],
          href: 'https://github.com/igormarcelmoreira/polymathech',
          linkLabel: 'GitHub',
        },
        {
          name: 'CP-Planta',
          icon: 'cp-planta.webp',
          kind: 'Arquitetura de dados',
          year: '2024',
          summary: 'Front-end em React e o modelo de dados e contratos de API por trás dele.',
          stack: ['React', 'API design'],
          href: 'https://tools.ages.pucrs.br/cp-planta',
          linkLabel: 'GitLab',
        },
      ],
    },
    numbers: [
      { value: 6, suffix: '+', label: 'anos construindo software em produção' },
      { value: 6, suffix: '', label: 'apps no ar em Android e iOS' },
      { value: 2, suffix: '', label: 'prêmios: hackathon e AGES' },
      { value: 3, suffix: '', label: 'países onde trabalhei e estudei' },
    ],
    about: {
      title: 'Sobre',
      body: [
        'Sou o Igor, engenheiro full-stack de Porto Alegre. Fui referência técnica de times mobile e web, montei os pipelines que publicam as versões deles e migrei seis apps em produção para um novo framework sem tirá-los do ar.',
        'Concluí um intercâmbio na Hankuk University of Foreign Studies, em Seul, em 2026, e estou terminando Engenharia de Software na PUCRS.',
      ],
      jobs: [
        {
          period: '2022–2025',
          role: 'Desenvolvedor full-stack sênior e referência técnica',
          company: 'TRUE — Tecnologia para a vida',
          body: 'Arquitetura e revisões entre times, CI/CD para Android e iOS, distribuição via Intune MDM, Play Integrity e a migração de Xamarin para .NET MAUI.',
        },
        {
          period: '2020–2022',
          role: 'Desenvolvedor full-stack',
          company: 'Interanet IT',
          body: 'Web, back-end e mobile para Banrisul, Sulgás, Marista, Sinos Tecnologia e Aucon.',
        },
      ],
      eduTitle: 'Formação',
      edu: [
        { period: '2026', title: 'Intercâmbio, Engenharia de Software', school: 'HUFS, Seul' },
        { period: '2023–atual', title: 'Bacharelado em Engenharia de Software', school: 'PUCRS, Porto Alegre' },
        { period: '2020–2022', title: 'Engenharia de Controle e Automação', school: 'UERGS' },
      ],
      langs: 'Português (nativo), inglês (avançado), japonês (iniciante)',
    },
    stack,
    contact: {
      title: 'Bora construir algo',
      body: 'Me conta o que você precisa colocar no ar. Costumo responder em até um dia.',
      email: 'igor2mxavier@gmail.com',
      whatsapp: 'WhatsApp',
      rights: '© 2026 Igor Marcel',
      built: 'Feito com Astro e GSAP',
      top: 'Voltar ao topo',
    },
  },

  es: {
    lang: 'es',
    htmlLang: 'es',
    meta: {
      title: 'Igor Marcel — Ingeniero de Software',
      description:
        'Ingeniero de software que construye plataformas web, apps móviles e IA que llegan a producción. Más de 6 años en salud, finanzas y energía. Desde Porto Alegre, Brasil.',
    },
    nav: { work: 'Proyectos', services: 'Servicios', about: 'Sobre mí', contact: 'Contacto', city: 'Porto Alegre' },
    loader: 'Cargando',
    hero: {
      intro: 'Diseño y construyo software que llega a producción: plataformas web, apps móviles e IA que hace trabajo de verdad.',
      status: 'Disponible para nuevos proyectos',
      cta: 'Empezar un proyecto',
      scroll: 'Desliza',
      tilt: 'Inclina el móvil',
    },
    manifesto:
      'Seis años convirtiendo requisitos desordenados en software del que la gente depende. Apps que funcionan dentro de ambulancias, plataformas que los hospitales consultan en tiempo real, ERPs que mueven una empresa y, ahora, IA que le quita a alguien la parte aburrida de su trabajo.',
    services: {
      title: 'Lo que puedo construir para ti',
      lead: 'Para fundadores que necesitan un producto en el aire y equipos que necesitan un senior de verdad.',
      items: [
        {
          title: 'Plataformas web',
          body: 'Dashboards, herramientas internas y productos SaaS en React, Angular y .NET, hechos para que el próximo dev pueda seguir sin mí.',
          tags: ['React', 'Angular', 'ASP.NET Core'],
        },
        {
          title: 'Apps móviles',
          body: 'Apps Android e iOS desde el primer commit hasta la tienda, con CI/CD y distribución corporativa ya resueltos.',
          tags: ['.NET MAUI', 'CI/CD', 'Intune MDM'],
        },
        {
          title: 'IA y automatización',
          body: 'Funcionalidades con LLM, búsqueda sobre tus propios documentos y agentes que eliminan pasos manuales de flujos reales.',
          tags: ['RAG', 'Agentes', 'Automatización'],
        },
        {
          title: 'Liderazgo técnico',
          body: 'Arquitectura, estándares de código, revisiones y mentoría para equipos que crecen más rápido que su código.',
          tags: ['Arquitectura', 'Code review', 'Mentoría'],
        },
      ],
    },
    work: {
      title: 'Proyectos seleccionados',
      lead: 'La mayoría vive detrás del login de una empresa, así que aquí está qué es y dónde funciona.',
      open: 'Abrir',
      github: 'Lo último en GitHub',
      projects: [
        {
          name: 'SAPH Web',
          icon: 'saph-web.webp',
          kind: 'Plataforma web de salud',
          year: '2023–2025',
          summary: 'Disponibilidad de unidades de salud en tiempo real para reguladores médicos. Lideré el desarrollo y el equipo en TRUE.',
          stack: ['Angular', 'TypeScript', 'ASP.NET Core'],
          href: 'https://true.com.br/solucoes/cairhos',
          linkLabel: 'Página del producto',
        },
        {
          name: 'Suite de apps móviles',
          kind: '6 apps en producción',
          year: '2022–2025',
          summary: 'CHAMAR 192, SAPH Móvel, TRUE PCR, TRUE Checklist, SAPH Gestão y Unimed POA SOS, migradas de Xamarin a .NET MAUI con CI/CD en Android e iOS.',
          stack: ['.NET MAUI', 'C#', 'GitHub Actions'],
          href: 'https://play.google.com/store/apps/dev?id=8163336353300983840',
          linkLabel: 'Google Play',
          icons: trueIcons,
        },
        {
          name: 'Sinos ERP',
          icon: 'sinos-erp.webp',
          kind: 'ERP desde cero',
          year: '2021',
          summary: 'Finanzas, inventario y operación de Sinos Tecnologia, diseñado y construido de punta a punta.',
          stack: ['Angular', 'ASP.NET Core', 'C#'],
          href: 'https://www.sinosservice.com/',
          linkLabel: 'Sitio de la empresa',
        },
        {
          name: 'Lino',
          icon: 'lino.webp',
          kind: 'Hackathon, 1er lugar',
          year: '2025',
          summary: 'Líder de front-end: toda la interfaz en React y TypeScript en tiempo de hackathon, más la integración con el back-end.',
          stack: ['React', 'TypeScript'],
          href: 'https://github.com/PedroAugustoPereira/LikeNow',
          linkLabel: 'GitHub',
        },
        {
          name: 'Polymathech',
          icon: 'polymathech.webp',
          kind: 'Proyecto destacado, AGES',
          year: '2024',
          summary: 'Plataforma de estudio y orientación vocacional. Referente de front-end del equipo, a cargo de estándares y herramientas.',
          stack: ['React', 'TypeScript', 'Figma'],
          href: 'https://github.com/igormarcelmoreira/polymathech',
          linkLabel: 'GitHub',
        },
        {
          name: 'CP-Planta',
          icon: 'cp-planta.webp',
          kind: 'Arquitectura de datos',
          year: '2024',
          summary: 'Front-end en React y el modelo de datos y contratos de API detrás de él.',
          stack: ['React', 'API design'],
          href: 'https://tools.ages.pucrs.br/cp-planta',
          linkLabel: 'GitLab',
        },
      ],
    },
    numbers: [
      { value: 6, suffix: '+', label: 'años construyendo software en producción' },
      { value: 6, suffix: '', label: 'apps publicadas en Android e iOS' },
      { value: 2, suffix: '', label: 'premios: hackathon y AGES' },
      { value: 3, suffix: '', label: 'países donde trabajé y estudié' },
    ],
    about: {
      title: 'Sobre mí',
      body: [
        'Soy Igor, ingeniero full-stack de Porto Alegre. Fui el referente técnico de equipos móviles y web, armé los pipelines que publican sus versiones y migré seis apps en producción a un nuevo framework sin sacarlas del aire.',
        'Terminé un intercambio en Hankuk University of Foreign Studies, en Seúl, en 2026, y estoy terminando Ingeniería de Software en la PUCRS.',
      ],
      jobs: [
        {
          period: '2022–2025',
          role: 'Desarrollador full-stack senior y referente técnico',
          company: 'TRUE — Tecnologia para a vida',
          body: 'Arquitectura y revisiones entre equipos, CI/CD para Android e iOS, distribución con Intune MDM, Play Integrity y la migración de Xamarin a .NET MAUI.',
        },
        {
          period: '2020–2022',
          role: 'Desarrollador full-stack',
          company: 'Interanet IT',
          body: 'Web, back-end y móvil para Banrisul, Sulgás, Marista, Sinos Tecnologia y Aucon.',
        },
      ],
      eduTitle: 'Formación',
      edu: [
        { period: '2026', title: 'Intercambio, Ingeniería de Software', school: 'HUFS, Seúl' },
        { period: '2023–hoy', title: 'Licenciatura en Ingeniería de Software', school: 'PUCRS, Porto Alegre' },
        { period: '2020–2022', title: 'Ingeniería de Control y Automatización', school: 'UERGS' },
      ],
      langs: 'Portugués (nativo), inglés (avanzado), japonés (principiante)',
    },
    stack,
    contact: {
      title: 'Construyamos algo',
      body: 'Cuéntame qué necesitas poner en marcha. Suelo responder en menos de un día.',
      email: 'igor2mxavier@gmail.com',
      whatsapp: 'WhatsApp',
      rights: '© 2026 Igor Marcel',
      built: 'Hecho con Astro y GSAP',
      top: 'Volver arriba',
    },
  },
};
