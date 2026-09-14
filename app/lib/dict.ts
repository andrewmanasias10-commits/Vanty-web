export type Lang = 'es' | 'en' | 'pt' | 'fr'

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
]

type Dict = {
  nav: { inicio: string; servicios: string; nosotros: string; como: string; contacto: string; login: string; hablemos: string; verTodos: string; megaFoot: string; noSabes: string; noSabesDesc: string; estrella: string; proximamente: string }
  footer: { tagline: string; servicios: string; empresa: string; contacto: string; verTodos: string; nosotros: string; como: string; login: string; copy: string }
  home: {
    h1a: string; h1grad: string; h1b: string; lead: string; ctaEnfoque: string; ctaProductos: string; micro: string
    logos: string; tuOrg: string
    enfEyebrow: string; enfTitle: string; enfLead: string
    p1t: string; p1d: string; p2t: string; p2d: string; p3t: string; p3d: string
    prodEyebrow: string; prodTitle: string; prodLead: string
    secEyebrow: string; secTitle: string
    s1n: string; s1d: string; s2n: string; s2d: string; s3n: string; s3d: string
    comoEyebrow: string; comoTitle: string; comoLead: string; comoCk1: string; comoCk2: string; comoCk3: string; comoCta: string
    ctaTitle: string; ctaSub: string; ctaDemo: string; ctaContacto: string
  }
}

export const DICT: Record<Lang, Dict> = {
  es: {
    nav: { inicio: 'Inicio', servicios: 'Servicios', nosotros: 'Nosotros', como: 'Cómo trabajamos', contacto: 'Contacto', login: 'Iniciar sesión', hablemos: 'Hablemos', verTodos: 'Ver todos los servicios', megaFoot: 'Una empresa, varias formas de resolver tu problema.', noSabes: '¿No sabes cuál necesitas?', noSabesDesc: 'Cuéntanos tu problema y te orientamos.', estrella: 'Estrella', proximamente: 'Próximamente' },
    footer: { tagline: 'Software e inteligencia artificial que resuelve problemas reales.', servicios: 'Servicios', empresa: 'Empresa', contacto: 'Contacto', verTodos: 'Ver todos', nosotros: 'Nosotros', como: 'Cómo trabajamos', login: 'Iniciar sesión', copy: '© 2026 Vanty · Software e inteligencia artificial' },
    home: {
      h1a: 'Inteligencia que ', h1grad: 'transforma', h1b: ' la manera en que operas', lead: 'En Vanty construimos ecosistemas de software B2B SaaS con inteligencia artificial nativa. Automatizamos la complejidad para que tu equipo se enfoque en lo que realmente importa.', ctaEnfoque: 'Conoce nuestro enfoque', ctaProductos: 'Descubre nuestros productos', micro: 'Ingeniería sólida · Seguridad desde el día cero · Soporte dedicado',
      logos: 'Tecnología en operación real', tuOrg: '+ tu organización aquí',
      enfEyebrow: 'Nuestro enfoque', enfTitle: 'No solo digitalizamos procesos: los hacemos pensar', enfLead: 'El software tradicional registra datos; el del futuro los entiende, los analiza y actúa. Diseñamos plataformas que llevan la eficiencia operativa a un nivel sin precedentes.',
      p1t: 'Orquestación de agentes', p1d: 'Asistentes y flujos de trabajo automatizados que reducen drásticamente la carga manual de tu equipo.', p2t: 'Arquitecturas modernas', p2d: 'Tecnología de última generación sobre infraestructura robusta: velocidad, estabilidad y escala.', p3t: 'Soluciones de nicho', p3d: 'Productos especializados que resuelven problemas concretos, de la gestión clínica a la operativa.',
      prodEyebrow: 'Productos y servicios', prodTitle: 'Software creado para resolver y escalar', prodLead: 'Desde productos propios listos para usar hasta soluciones construidas a tu medida.',
      secEyebrow: 'Dónde generamos impacto', secTitle: 'Operaciones complejas, soluciones elegantes',
      s1n: 'Gestión clínica', s1d: 'Operación de centros de salud y terapia, sin fricción administrativa.', s2n: 'Educación', s2d: 'Seguimiento, aprendizaje y comunicación con las familias.', s3n: 'Operación empresarial', s3d: 'Sistemas internos, automatización de procesos y datos accionables.',
      comoEyebrow: 'Cómo trabajamos', comoTitle: 'Del código a la solución, con rigor de ingeniería', comoLead: 'Combinamos la agilidad de una startup con arquitecturas sólidas y seguridad desde el día cero. Entendemos tu negocio, diseñamos la solución y la hacemos evolucionar contigo.', comoCk1: 'Análisis y arquitectura profunda', comoCk2: 'Seguridad y escalabilidad desde el día cero', comoCk3: 'Iteración continua: el software nunca está “terminado”', comoCta: 'Ver nuestra metodología',
      ctaTitle: 'El futuro de tu operación empieza aquí', ctaSub: 'Ya sea que busques transformar la gestión de tu centro clínico o llevar la eficiencia de tu empresa al siguiente nivel, en Vanty tenemos la infraestructura tecnológica para hacerlo realidad.', ctaDemo: 'Hablemos del futuro', ctaContacto: 'Contáctanos',
    },
  },
  en: {
    nav: { inicio: 'Home', servicios: 'Services', nosotros: 'About', como: 'How we work', contacto: 'Contact', login: 'Log in', hablemos: 'Let\'s talk', verTodos: 'See all services', megaFoot: 'One company, several ways to solve your problem.', noSabes: 'Not sure which you need?', noSabesDesc: 'Tell us your problem and we\'ll guide you.', estrella: 'Flagship', proximamente: 'Coming soon' },
    footer: { tagline: 'Software and artificial intelligence that solves real problems.', servicios: 'Services', empresa: 'Company', contacto: 'Contact', verTodos: 'See all', nosotros: 'About', como: 'How we work', login: 'Log in', copy: '© 2026 Vanty · Software & artificial intelligence' },
    home: {
      h1a: 'Intelligence that ', h1grad: 'transforms', h1b: ' the way you operate', lead: 'At Vanty we build B2B SaaS software ecosystems with native artificial intelligence. We automate complexity so your team can focus on what truly matters.', ctaEnfoque: 'See our approach', ctaProductos: 'Discover our products', micro: 'Solid engineering · Security from day zero · Dedicated support',
      logos: 'Technology in real-world use', tuOrg: '+ your organization here',
      enfEyebrow: 'Our approach', enfTitle: 'We don\'t just digitize processes: we make them think', enfLead: 'Traditional software records data; tomorrow\'s software understands, analyzes and acts on it. We design platforms that take operational efficiency to an unprecedented level.',
      p1t: 'Agent orchestration', p1d: 'Assistants and automated workflows that drastically reduce your team\'s manual workload.', p2t: 'Modern architectures', p2d: 'Cutting-edge technology on robust infrastructure: speed, stability and scale.', p3t: 'Niche solutions', p3d: 'Specialized products that solve concrete problems, from clinical to operational management.',
      prodEyebrow: 'Products & services', prodTitle: 'Software built to solve and scale', prodLead: 'From ready-to-use in-house products to solutions built to your measure.',
      secEyebrow: 'Where we make an impact', secTitle: 'Complex operations, elegant solutions',
      s1n: 'Clinical management', s1d: 'Running health and therapy centers without administrative friction.', s2n: 'Education', s2d: 'Tracking, learning and communication with families.', s3n: 'Business operations', s3d: 'Internal systems, process automation and actionable data.',
      comoEyebrow: 'How we work', comoTitle: 'From code to solution, with engineering rigor', comoLead: 'We combine startup agility with solid architectures and security from day zero. We understand your business, design the solution and evolve it with you.', comoCk1: 'Deep analysis and architecture', comoCk2: 'Security and scalability from day zero', comoCk3: 'Continuous iteration: software is never “finished”', comoCta: 'See our methodology',
      ctaTitle: 'The future of your operation starts here', ctaSub: 'Whether you want to transform your clinical center\'s management or take your company\'s efficiency to the next level, at Vanty we have the technological infrastructure to make it happen.', ctaDemo: 'Let\'s talk about the future', ctaContacto: 'Contact us',
    },
  },
  pt: {
    nav: { inicio: 'Início', servicios: 'Serviços', nosotros: 'Sobre nós', como: 'Como trabalhamos', contacto: 'Contato', login: 'Entrar', hablemos: 'Falar', verTodos: 'Ver todos os serviços', megaFoot: 'Uma empresa, várias formas de resolver o seu problema.', noSabes: 'Não sabe qual precisa?', noSabesDesc: 'Conte-nos o seu problema e te orientamos.', estrella: 'Destaque', proximamente: 'Em breve' },
    footer: { tagline: 'Software e inteligência artificial que resolve problemas reais.', servicios: 'Serviços', empresa: 'Empresa', contacto: 'Contato', verTodos: 'Ver todos', nosotros: 'Sobre nós', como: 'Como trabalhamos', login: 'Entrar', copy: '© 2026 Vanty · Software e inteligência artificial' },
    home: {
      h1a: 'Inteligência que ', h1grad: 'transforma', h1b: ' a forma como você opera', lead: 'Na Vanty construímos ecossistemas de software B2B SaaS com inteligência artificial nativa. Automatizamos a complexidade para que a sua equipe foque no que realmente importa.', ctaEnfoque: 'Conheça nossa abordagem', ctaProductos: 'Descubra nossos produtos', micro: 'Engenharia sólida · Segurança desde o dia zero · Suporte dedicado',
      logos: 'Tecnologia em operação real', tuOrg: '+ sua organização aqui',
      enfEyebrow: 'Nossa abordagem', enfTitle: 'Não só digitalizamos processos: nós os fazemos pensar', enfLead: 'O software tradicional registra dados; o do futuro os entende, analisa e age. Projetamos plataformas que levam a eficiência operacional a um nível sem precedentes.',
      p1t: 'Orquestração de agentes', p1d: 'Assistentes e fluxos de trabalho automatizados que reduzem drasticamente a carga manual da sua equipe.', p2t: 'Arquiteturas modernas', p2d: 'Tecnologia de última geração sobre infraestrutura robusta: velocidade, estabilidade e escala.', p3t: 'Soluções de nicho', p3d: 'Produtos especializados que resolvem problemas concretos, da gestão clínica à operacional.',
      prodEyebrow: 'Produtos e serviços', prodTitle: 'Software criado para resolver e escalar', prodLead: 'De produtos próprios prontos para usar a soluções feitas sob medida.',
      secEyebrow: 'Onde geramos impacto', secTitle: 'Operações complexas, soluções elegantes',
      s1n: 'Gestão clínica', s1d: 'Operação de centros de saúde e terapia, sem fricção administrativa.', s2n: 'Educação', s2d: 'Acompanhamento, aprendizagem e comunicação com as famílias.', s3n: 'Operação empresarial', s3d: 'Sistemas internos, automação de processos e dados acionáveis.',
      comoEyebrow: 'Como trabalhamos', comoTitle: 'Do código à solução, com rigor de engenharia', comoLead: 'Combinamos a agilidade de uma startup com arquiteturas sólidas e segurança desde o dia zero. Entendemos o seu negócio, desenhamos a solução e a evoluímos com você.', comoCk1: 'Análise e arquitetura profunda', comoCk2: 'Segurança e escalabilidade desde o dia zero', comoCk3: 'Iteração contínua: o software nunca está “pronto”', comoCta: 'Ver nossa metodologia',
      ctaTitle: 'O futuro da sua operação começa aqui', ctaSub: 'Seja para transformar a gestão do seu centro clínico ou levar a eficiência da sua empresa ao próximo nível, na Vanty temos a infraestrutura tecnológica para tornar isso realidade.', ctaDemo: 'Vamos falar do futuro', ctaContacto: 'Fale conosco',
    },
  },
  fr: {
    nav: { inicio: 'Accueil', servicios: 'Services', nosotros: 'À propos', como: 'Notre méthode', contacto: 'Contact', login: 'Connexion', hablemos: 'Parlons-en', verTodos: 'Voir tous les services', megaFoot: 'Une entreprise, plusieurs façons de résoudre votre problème.', noSabes: 'Vous ne savez pas lequel ?', noSabesDesc: 'Dites-nous votre problème et on vous oriente.', estrella: 'Produit phare', proximamente: 'Bientôt' },
    footer: { tagline: 'Des logiciels et de l\'intelligence artificielle qui résolvent de vrais problèmes.', servicios: 'Services', empresa: 'Entreprise', contacto: 'Contact', verTodos: 'Voir tout', nosotros: 'À propos', como: 'Notre méthode', login: 'Connexion', copy: '© 2026 Vanty · Logiciels et intelligence artificielle' },
    home: {
      h1a: 'Une intelligence qui ', h1grad: 'transforme', h1b: ' votre façon d\'opérer', lead: 'Chez Vanty, nous créons des écosystèmes logiciels B2B SaaS avec une intelligence artificielle native. Nous automatisons la complexité pour que votre équipe se concentre sur l\'essentiel.', ctaEnfoque: 'Découvrir notre approche', ctaProductos: 'Découvrir nos produits', micro: 'Ingénierie solide · Sécurité dès le jour zéro · Support dédié',
      logos: 'Une technologie en usage réel', tuOrg: '+ votre organisation ici',
      enfEyebrow: 'Notre approche', enfTitle: 'Nous ne numérisons pas seulement les processus : nous les faisons réfléchir', enfLead: 'Le logiciel traditionnel enregistre des données ; celui de demain les comprend, les analyse et agit. Nous concevons des plateformes qui portent l\'efficacité opérationnelle à un niveau inédit.',
      p1t: 'Orchestration d\'agents', p1d: 'Assistants et flux de travail automatisés qui réduisent fortement la charge manuelle de votre équipe.', p2t: 'Architectures modernes', p2d: 'Technologie de pointe sur une infrastructure robuste : vitesse, stabilité et passage à l\'échelle.', p3t: 'Solutions de niche', p3d: 'Produits spécialisés qui résolvent des problèmes concrets, de la gestion clinique à l\'opérationnel.',
      prodEyebrow: 'Produits et services', prodTitle: 'Des logiciels conçus pour résoudre et grandir', prodLead: 'De produits propres prêts à l\'emploi aux solutions sur mesure.',
      secEyebrow: 'Où nous créons de l\'impact', secTitle: 'Opérations complexes, solutions élégantes',
      s1n: 'Gestion clinique', s1d: 'Gestion de centres de santé et de thérapie, sans friction administrative.', s2n: 'Éducation', s2d: 'Suivi, apprentissage et communication avec les familles.', s3n: 'Opérations d\'entreprise', s3d: 'Systèmes internes, automatisation des processus et données exploitables.',
      comoEyebrow: 'Notre méthode', comoTitle: 'Du code à la solution, avec rigueur d\'ingénierie', comoLead: 'Nous combinons l\'agilité d\'une startup avec des architectures solides et la sécurité dès le jour zéro. Nous comprenons votre activité, concevons la solution et la faisons évoluer avec vous.', comoCk1: 'Analyse et architecture approfondies', comoCk2: 'Sécurité et évolutivité dès le jour zéro', comoCk3: 'Itération continue : un logiciel n\'est jamais « terminé »', comoCta: 'Voir notre méthodologie',
      ctaTitle: 'L\'avenir de votre opération commence ici', ctaSub: 'Que vous souhaitiez transformer la gestion de votre centre clinique ou faire passer l\'efficacité de votre entreprise au niveau supérieur, chez Vanty nous avons l\'infrastructure technologique pour y parvenir.', ctaDemo: 'Parlons de l\'avenir', ctaContacto: 'Contactez-nous',
    },
  },
}

export function langFromCountry(country?: string | null): Lang {
  if (!country) return 'es'
  const c = country.toUpperCase()
  if (c === 'BR') return 'pt'
  if (c === 'US' || c === 'CA') return 'en'
  if (['FR', 'BE', 'CH', 'LU', 'MC'].includes(c)) return 'fr'
  if (c === 'ES' || ['PE', 'MX', 'CO', 'AR', 'CL', 'EC', 'BO', 'PY', 'UY', 'VE', 'GT', 'CR', 'PA', 'DO', 'HN', 'SV', 'NI', 'PR'].includes(c)) return 'es'
  // resto de Europa / mundo → inglés
  return 'en'
}

export function langFromNavigator(l?: string): Lang {
  const x = (l || '').toLowerCase()
  if (x.startsWith('pt')) return 'pt'
  if (x.startsWith('fr')) return 'fr'
  if (x.startsWith('en')) return 'en'
  return 'es'
}
