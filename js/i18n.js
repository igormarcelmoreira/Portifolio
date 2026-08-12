/* ─── I18N: EN / PT-BR ────────────────────────────────────── */
const translations = {
  'meta.title': { en: 'Igor Marcel — Full-Stack Developer', pt: 'Igor Marcel — Desenvolvedor Full-Stack' },

  'nav.about': { en: 'About', pt: 'Sobre' },
  'nav.experience': { en: 'Experience', pt: 'Experiência' },
  'nav.projects': { en: 'Projects', pt: 'Projetos' },
  'nav.skills': { en: 'Skills', pt: 'Habilidades' },
  'nav.education': { en: 'Education', pt: 'Formação' },
  'nav.contact': { en: 'Contact', pt: 'Contato' },

  'hero.greeting': { en: 'Hi, my name is', pt: 'Olá, meu nome é' },
  'hero.desc': {
    en: '6+ years building mobile, web &amp; backend systems across healthcare, finance and energy sectors.',
    pt: 'Mais de 6 anos construindo sistemas mobile, web e backend nos setores de saúde, finanças e energia.'
  },
  'hero.ctaWork': { en: 'See My Work', pt: 'Ver Projetos' },
  'hero.ctaTouch': { en: 'Get In Touch', pt: 'Entrar em Contato' },
  'hero.scroll': { en: 'scroll', pt: 'rolar' },

  'about.title': { en: 'About Me', pt: 'Sobre Mim' },
  'about.p1': {
    en: "I'm a <strong>Full-Stack Developer</strong> with over 6 years of experience building production-grade mobile, web, and backend systems. I've worked as a technical reference across teams — leading architecture decisions, defining code standards, and mentoring developers.",
    pt: 'Sou <strong>Desenvolvedor Full-Stack</strong> com mais de 6 anos de experiência construindo sistemas mobile, web e backend em produção. Atuei como referência técnica em equipes — liderando decisões de arquitetura, definindo padrões de código e mentorando desenvolvedores.'
  },
  'about.p2': {
    en: "My background spans healthcare, finance, education, and energy sectors. I'm comfortable owning projects end-to-end: from designing CI/CD pipelines and MDM distribution to shipping polished frontends in React and Angular.",
    pt: 'Minha experiência abrange os setores de saúde, finanças, educação e energia. Tenho facilidade em conduzir projetos de ponta a ponta: desde o design de pipelines de CI/CD e distribuição MDM até a entrega de frontends refinados em React e Angular.'
  },
  'about.p3': {
    en: "Currently completing a <strong>Bachelor's in Software Engineering</strong> at PUCRS (Brazil). In 2026, I completed an academic exchange at <strong>Hankuk University of Foreign Studies</strong> in South Korea — broadening my perspective in cross-cultural and distributed team environments.",
    pt: 'Atualmente concluindo o <strong>Bacharelado em Engenharia de Software</strong> na PUCRS (Brasil). Em 2026, concluí um intercâmbio acadêmico na <strong>Hankuk University of Foreign Studies</strong>, na Coreia do Sul — ampliando minha perspectiva em ambientes multiculturais e equipes distribuídas.'
  },
  'about.h1': { en: 'Technical reference &amp; team lead', pt: 'Referência técnica e liderança de equipe' },
  'about.h2': { en: 'Full lifecycle: architecture → CI/CD → delivery', pt: 'Ciclo completo: arquitetura → CI/CD → entrega' },
  'about.h3': { en: 'Mobile (iOS &amp; Android), Web, Backend', pt: 'Mobile (iOS e Android), Web, Backend' },
  'about.h4': { en: 'Multicultural, distributed teams', pt: 'Equipes multiculturais e distribuídas' },
  'about.stat1': { en: 'Years Experience', pt: 'Anos de Experiência' },
  'about.stat2': { en: 'Production Apps Shipped', pt: 'Apps em Produção Entregues' },
  'about.stat3': { en: 'Countries &amp; Teams', pt: 'Países e Equipes' },
  'about.stat4': { en: 'Award-Winning Projects', pt: 'Projetos Premiados' },

  'exp.title': { en: 'Experience', pt: 'Experiência' },
  'exp.true.role': { en: 'Senior Full-Stack Developer <span class="accent">&</span> Technical Reference', pt: 'Desenvolvedor Full-Stack Sênior <span class="accent">&</span> Referência Técnica' },
  'exp.true.l1': { en: 'Served as technical reference for mobile and web teams — guiding architecture, reviewing code, defining standards across concurrent projects.', pt: 'Atuação como referência técnica para equipes mobile e web — orientando arquitetura, revisando código e definindo padrões em projetos simultâneos.' },
  'exp.true.l2': { en: 'Designed and maintained CI/CD pipelines for Android and iOS, improving delivery reliability and reducing release overhead.', pt: 'Desenvolvimento e manutenção de pipelines CI/CD para Android e iOS, aumentando a confiabilidade das entregas e reduzindo o esforço operacional de releases.' },
  'exp.true.l3': { en: 'Led enterprise app distribution via <strong>Microsoft Intune (MDM)</strong>, including RBAC-aligned access controls.', pt: 'Liderança na distribuição corporativa de aplicativos via <strong>Microsoft Intune (MDM)</strong>, incluindo controle de acesso alinhado a RBAC.' },
  'exp.true.l4': { en: 'Integrated <strong>Play Integrity API</strong> for runtime security and authenticity verification on Android.', pt: 'Integração da <strong>Play Integrity API</strong> para segurança em tempo de execução e verificação de autenticidade no Android.' },
  'exp.true.l5': { en: 'Led full technology migration from <strong>Xamarin → .NET MAUI</strong> across 6 production applications.', pt: 'Liderança na migração completa de tecnologia de <strong>Xamarin para .NET MAUI</strong> em 6 aplicações em produção.' },
  'exp.true.l6': { en: 'Full stack: <strong>Angular/TypeScript</strong> (frontend), <strong>WCF / VB.Net / ASP.NET Core</strong> (backend), <strong>C#</strong> (mobile).', pt: 'Full stack: <strong>Angular/TypeScript</strong> (frontend), <strong>WCF / VB.Net / ASP.NET Core</strong> (backend), <strong>C#</strong> (mobile).' },
  'exp.interanet.role': { en: 'Full-Stack Developer', pt: 'Desenvolvedor Full-Stack' },
  'exp.interanet.l1': { en: 'Delivered web, backend, and mobile solutions for clients across healthcare, finance, education, and energy sectors.', pt: 'Desenvolvimento de soluções web, backend e mobile para clientes dos setores de saúde, finanças, educação e energia.' },
  'exp.interanet.l2': { en: '<strong>Banrisul:</strong> Deployed and administered Moodle LMS on corporate intranet for employee training.', pt: '<strong>Banrisul:</strong> Implantação e administração do Moodle LMS na intranet corporativa para treinamento de funcionários.' },
  'exp.interanet.l3': { en: '<strong>Sulgás:</strong> Maintained Joomla CMS, integrated ERP APIs, and developed mobile client in Xamarin Forms.', pt: '<strong>Sulgás:</strong> Manutenção de CMS Joomla, integração com APIs ERP e desenvolvimento de aplicativo mobile em Xamarin Forms.' },
  'exp.interanet.l4': { en: '<strong>Marista:</strong> Development and maintenance in ASP.NET Core and SharePoint; workflow automation.', pt: '<strong>Marista:</strong> Desenvolvimento e manutenção em ASP.NET Core e SharePoint; automação de fluxos de trabalho.' },
  'exp.interanet.l5': { en: '<strong>Sinos Tecnologia:</strong> Full ERP system built with Angular and ASP.NET Core C#.', pt: '<strong>Sinos Tecnologia:</strong> Desenvolvimento de sistema ERP completo utilizando Angular e ASP.NET Core C#.' },
  'exp.interanet.l6': { en: '<strong>Aucon:</strong> Mobile application development in Xamarin Forms.', pt: '<strong>Aucon:</strong> Desenvolvimento de aplicação mobile em Xamarin Forms.' },

  'projects.title': { en: 'Projects', pt: 'Projetos' },
  'projects.sub': { en: 'Selected work from professional and academic contexts.', pt: 'Trabalhos selecionados de contextos profissionais e acadêmicos.' },
  'projects.badge.featured': { en: 'Featured', pt: 'Destaque' },
  'projects.badge.apps': { en: '6 Apps', pt: '6 Apps' },
  'projects.badge.first': { en: '🥇 1st Place', pt: '🥇 1º Lugar' },
  'projects.badge.highlight': { en: 'Highlight Award', pt: 'Projeto Destaque' },
  'projects.cairhos.p': { en: 'Web tool for medical regulators to visualise real-time healthcare facility availability. Led development and coordinated team execution at TRUE.', pt: 'Ferramenta web para reguladores médicos visualizarem disponibilidade de unidades de saúde em tempo real. Liderança no desenvolvimento e coordenação da equipe na TRUE.' },
  'projects.mobile.title': { en: 'Mobile App Suite', pt: 'Suite de Aplicativos Mobile' },
  'projects.mobile.p': { en: 'Full lifecycle development of 6 production apps: CHAMAR 192, SAPH Mobile, TRUE PCR, TRUE Checklist, TRUE SAPH Management, Unimed POA Chamar SOS — CI/CD on Android & iOS.', pt: 'Ciclo completo de desenvolvimento de 6 apps em produção: CHAMAR 192, SAPH Mobile, TRUE PCR, TRUE Checklist, TRUE SAPH Gestão, Unimed POA Chamar SOS — CI/CD para Android e iOS.' },
  'projects.lino.p': { en: 'Hackathon 2025 winner. Front-End Lead — built full UI in React/TypeScript under time constraints, established code standards, led frontend-backend integration.', pt: 'Vencedor do Hackathon 2025. Líder Front-End — desenvolvimento completo da interface em React/TypeScript sob restrições de tempo, definição de padrões de código e liderança da integração frontend-backend.' },
  'projects.poly.p': { en: 'AGES 2024/1 — Award-winning web app in React TypeScript. Front-End Reference: enforced code standards and tooling consistency across the team.', pt: 'AGES 2024/1 — Aplicação web premiada em React TypeScript. Referência Front-End: padronização de código e consistência de ferramentas em toda a equipe.' },
  'projects.cpplanta.p': { en: 'AGES 2024/2 — Front-End & Data Architecture Reference. UI in React with Figma; defined data workflows, logical-conceptual models, and API integration contracts.', pt: 'AGES 2024/2 — Referência em Front-End e Arquitetura de Dados. Interface em React com Figma; definição de fluxos de dados, modelos lógico-conceituais e contratos de integração de APIs.' },
  'projects.mtc.title': { en: 'Moving The Cities', pt: 'Moving The Cities' },
  'projects.mtc.p': { en: 'International multidisciplinary project in Santiago, Chile — addressing real business challenges with a social impact focus across multiple nationalities.', pt: 'Projeto internacional multidisciplinar em Santiago, Chile — resolução de desafios reais de negócios com foco em impacto social, com equipes de múltiplas nacionalidades.' },
  'projects.mtc.tag1': { en: 'Collaboration', pt: 'Colaboração' },
  'projects.mtc.tag2': { en: 'Social Impact', pt: 'Impacto Social' },
  'projects.mtc.tag3': { en: 'International', pt: 'Internacional' },
  'projects.sinos.p': { en: 'Full ERP system built from scratch for Sinos Tecnologia using Angular and ASP.NET Core C# — covering finance, inventory, and operational workflows.', pt: 'Sistema ERP completo desenvolvido do zero para a Sinos Tecnologia usando Angular e ASP.NET Core C# — cobrindo finanças, estoque e fluxos operacionais.' },

  'skills.title': { en: 'Skills', pt: 'Habilidades' },
  'skills.languages': { en: 'Languages', pt: 'Linguagens' },
  'skills.frameworks': { en: 'Frameworks & Libraries', pt: 'Frameworks e Bibliotecas' },
  'skills.mobile': { en: 'Mobile', pt: 'Mobile' },
  'skills.cicd': { en: 'CI/CD & DevOps', pt: 'CI/CD e DevOps' },
  'skills.cloud': { en: 'Cloud & Platforms', pt: 'Cloud e Plataformas' },
  'skills.tools': { en: 'Tools & Practices', pt: 'Ferramentas e Práticas' },

  'edu.title': { en: 'Education', pt: 'Formação' },
  'edu.hufs.title': { en: 'Academic Exchange — Software Engineering', pt: 'Intercâmbio Acadêmico — Engenharia de Software' },
  'edu.hufs.loc': { en: 'Seoul, South Korea', pt: 'Seul, Coreia do Sul' },
  'edu.pucrs.year': { en: '2023 — Present', pt: '2023 — Atual' },
  'edu.pucrs.title': { en: "Bachelor's in Software Engineering", pt: 'Bacharelado em Engenharia de Software' },
  'edu.pucrs.loc': { en: 'Porto Alegre, Brazil', pt: 'Porto Alegre, Brasil' },
  'edu.uergs.title': { en: 'Control and Automation Engineering', pt: 'Engenharia de Controle e Automação' },
  'edu.uergs.loc': { en: 'Rio Grande do Sul, Brazil', pt: 'Rio Grande do Sul, Brasil' },
  'edu.langsTitle': { en: 'Languages', pt: 'Idiomas' },
  'edu.lang.pt': { en: 'Portuguese', pt: 'Português' },
  'edu.lang.en': { en: 'English', pt: 'Inglês' },
  'edu.lang.jp': { en: 'Japanese', pt: 'Japonês' },
  'edu.level.native': { en: 'Native', pt: 'Nativo' },
  'edu.level.advanced': { en: 'Advanced', pt: 'Avançado' },
  'edu.level.beginner': { en: 'Beginner', pt: 'Iniciante' },

  'contact.title': { en: 'Get In Touch', pt: 'Entre em Contato' },
  'contact.p': {
    en: "I'm currently open to new opportunities — whether it's a full-time role, freelance project, or just a conversation. Feel free to reach out and I'll get back to you.",
    pt: 'Atualmente estou aberto a novas oportunidades — seja uma posição full-time, projeto freelance ou apenas uma conversa. Fique à vontade para entrar em contato, retornarei em breve.'
  },
  'contact.cta': { en: 'Say Hello', pt: 'Dizer Olá' },

  'footer.built': { en: 'Designed &amp; built by <span class="accent">Igor Marcel</span>', pt: 'Projetado e desenvolvido por <span class="accent">Igor Marcel</span>' },
};

const heroTitles = {
  en: [
    'Senior Full-Stack Developer',
    'Mobile & Web Engineer',
    'Technical Reference & Mentor',
    'CI/CD & DevOps Practitioner',
  ],
  pt: [
    'Desenvolvedor Full-Stack Sênior',
    'Engenheiro Mobile & Web',
    'Referência Técnica & Mentor',
    'Praticante de CI/CD & DevOps',
  ],
};

const SUPPORTED_LANGS = ['en', 'pt'];
const LANG_STORAGE_KEY = 'portfolio-lang';

function detectLang() {
  const stored = localStorage.getItem(LANG_STORAGE_KEY);
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  return browserLang.startsWith('pt') ? 'pt' : 'en';
}

function applyLanguage(lang) {
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const entry = translations[key];
    if (!entry) return;
    if (el.tagName === 'TITLE') {
      el.textContent = entry[lang];
    } else {
      el.innerHTML = entry[lang];
    }
  });
  document.querySelectorAll('.lang-toggle .lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
  window.currentLang = lang;
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

const initialLang = detectLang();
applyLanguage(initialLang);

document.getElementById('lang-toggle').addEventListener('click', () => {
  const next = window.currentLang === 'pt' ? 'en' : 'pt';
  localStorage.setItem(LANG_STORAGE_KEY, next);
  applyLanguage(next);
});
