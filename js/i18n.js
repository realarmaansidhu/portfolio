// Languages: English, French, Spanish and Simplified Chinese.
// English is what's written in the page. Each row below is one English string followed by its French, Spanish and
// Chinese versions, so every translation can be reviewed side by side. On a switch, every text node, alt text and
// label whose English matches a row is swapped. Names stay as they are: companies, products, certifications, and
// the published titles of the papers and the novel.

export const LANGS = [
  { code: 'en', label: 'EN', name: 'English', html: 'en', locale: 'en-CA' },
  { code: 'fr', label: 'FR', name: 'Français', html: 'fr', locale: 'fr-CA' },
  { code: 'es', label: 'ES', name: 'Español', html: 'es', locale: 'es-419' },   // Latin American Spanish
  { code: 'zh', label: '文', name: '中文', html: 'zh-Hans', locale: 'zh-CN' },
];

const N = ' ';   // French puts a no-break space before : ? ! and inside « »

// [English, French, Spanish, Chinese]
const ROWS = [
  // page
  ['Armaan Sidhu — AI Security Engineer', 'Armaan Sidhu — Ingénieur en sécurité de l’IA', 'Armaan Sidhu — Ingeniero de seguridad de IA', 'Armaan Sidhu — AI 安全工程师'],
  ['Armaan Sidhu, AI security engineer. Final semester of an M.Eng in Information Systems Security at Concordia University in Montréal, with security internships at American Express and TMX Group, and a debut novel on the way.',
    'Armaan Sidhu, ingénieur en sécurité de l’IA. Dernière session d’une maîtrise en génie en sécurité des systèmes d’information à l’Université Concordia, à Montréal, des stages en sécurité chez American Express et au Groupe TMX, et un premier roman en préparation.',
    'Armaan Sidhu, ingeniero de seguridad de IA. Último semestre de una maestría en Ingeniería en Seguridad de Sistemas de Información en la Universidad Concordia, en Montreal, con prácticas en seguridad en American Express y TMX Group, y una primera novela en camino.',
    'Armaan Sidhu，AI 安全工程师。蒙特利尔康考迪亚大学信息系统安全工程硕士在读（最后一学期），曾在美国运通和 TMX 集团从事安全实习，首部小说即将问世。'],
  ['Skip to content', 'Aller au contenu', 'Saltar al contenido', '跳到正文'],
  ['Gathering {n} stars', 'Rassemblement de {n} étoiles', 'Reuniendo {n} estrellas', '正在汇聚 {n} 颗星'],
  ['Look closer.', 'Regardez de plus près.', 'Mira más de cerca.', '凑近一点看。'],
  ['Scroll to explore', 'Faites défiler pour explorer', 'Desplázate para explorar', '向下滚动，开始探索'],
  ['Swipe to explore', 'Balayez pour explorer', 'Desliza para explorar', '向上滑动，开始探索'],
  ['Mute sound', 'Couper le son', 'Silenciar', '静音'],
  ['Turn sound on', 'Activer le son', 'Activar el sonido', '开启声音'],
  ['Language', 'Langue', 'Idioma', '语言'],
  ['Armaan Sidhu — back to the top', 'Armaan Sidhu — retour en haut', 'Armaan Sidhu — volver arriba', 'Armaan Sidhu — 回到顶部'],
  ['Sections', 'Sections', 'Secciones', '页面目录'],
  ['Introduction', 'Introduction', 'Introducción', '简介'],

  // menu and section titles
  ['Menu', 'Menu', 'Menú', '菜单'],
  ['About', 'À propos', 'Sobre mí', '关于我'],
  ['Work', 'Expérience', 'Experiencia', '工作经历'],
  ['Projects', 'Projets', 'Proyectos', '项目'],
  ['Research & writing', 'Recherche et écriture', 'Investigación y escritura', '研究与写作'],
  ['The novel', 'Le roman', 'La novela', '小说'],
  ['Education', 'Formation', 'Formación', '教育背景'],
  ['Awards', 'Distinctions', 'Premios', '奖项'],
  ['Certifications', 'Certifications', 'Certificaciones', '专业认证'],
  ['Networking', 'Réseautage', 'Encuentros', '交流活动'],
  ['Contact', 'Contact', 'Contacto', '联系方式'],
  ['Back to the top ↑', 'Retour en haut ↑', 'Volver arriba ↑', '回到顶部 ↑'],
  ['Resume (PDF) ↓', 'CV (PDF) ↓', 'CV (PDF) ↓', '简历（PDF）↓'],

  // hero
  ['AI Security Engineer', 'Ingénieur en sécurité de l’IA', 'Ingeniero de seguridad de IA', 'AI 安全工程师'],

  // about
  ['I\'m in my final semester of a Master of Engineering in Information Systems Security at Concordia University in Montréal, with a 3.97/4.30 GPA, and I\'m enthusiastic about generative AI and cybersecurity.',
    'Je suis en dernière session de ma maîtrise en génie en sécurité des systèmes d’information à l’Université Concordia, à Montréal, avec une moyenne de 3,97/4,30, et je suis passionné par l’IA générative et la cybersécurité.',
    'Estoy en el último semestre de mi maestría en Ingeniería en Seguridad de Sistemas de Información en la Universidad Concordia, en Montreal, con un promedio de 3.97/4.30, y me apasionan la IA generativa y la ciberseguridad.',
    '我正在蒙特利尔康考迪亚大学攻读信息系统安全工程硕士，目前是最后一个学期，GPA 为 3.97/4.30。我热衷于生成式 AI 与网络安全。'],
  ['In fall 2025 I interned as a Junior Security Operations Analyst at TMX Group, the operator of the Toronto Stock Exchange, working with enterprise-grade security tools to monitor, investigate and strengthen the security posture of critical financial market infrastructure.',
    'À l’automne 2025, j’ai effectué un stage d’analyste junior en opérations de sécurité au Groupe TMX, l’exploitant de la Bourse de Toronto, où j’ai utilisé des outils de sécurité de niveau entreprise pour surveiller, enquêter et renforcer la posture de sécurité d’infrastructures essentielles des marchés financiers.',
    'En otoño de 2025 realicé prácticas como Analista Junior de Operaciones de Seguridad en TMX Group, operador de la Bolsa de Toronto, trabajando con herramientas de seguridad de nivel empresarial para monitorear, investigar y fortalecer la postura de seguridad de infraestructura crítica de los mercados financieros.',
    '2025 年秋季，我在多伦多证券交易所的运营方 TMX 集团担任初级安全运营分析师实习生，使用企业级安全工具对关键金融市场基础设施进行监控和调查，并加强其安全态势。'],
  ['I\'ve also interned at American Express twice. In summer 2025 I interned as an Information Security Analyst on the Generative AI Security team, working hands-on with LLMOps, secure AI/ML pipeline integration and risk mitigation across production systems. In summer 2026 I returned to work on identity and access management workflows and build agentic workflows on policy engines, so AI actions stay stable and deterministic.',
    'J’ai aussi effectué deux stages chez American Express. À l’été 2025, j’étais stagiaire analyste en sécurité de l’information au sein de l’équipe Sécurité de l’IA générative, où j’ai travaillé concrètement sur le LLMOps, l’intégration sécurisée de pipelines d’IA et d’apprentissage automatique, et l’atténuation des risques dans des systèmes en production. À l’été 2026, j’y suis retourné pour travailler sur les flux de gestion des identités et des accès et concevoir des flux agentiques reposant sur des moteurs de politiques, afin que les actions de l’IA restent stables et déterministes.',
    'También he hecho prácticas dos veces en American Express. En el verano de 2025 hice prácticas como Analista de Seguridad de la Información en el equipo de Seguridad de IA Generativa, con experiencia directa en LLMOps, la integración segura de pipelines de IA y aprendizaje automático, y la mitigación de riesgos en sistemas de producción. En el verano de 2026 volví para trabajar en los flujos de gestión de identidades y accesos y crear flujos agénticos basados en motores de políticas, para que las acciones de la IA sean estables y deterministas.',
    '我还曾两次在美国运通实习。2025 年夏季，我在生成式 AI 安全团队担任信息安全分析师实习生，亲身参与 LLMOps、AI/机器学习管道的安全集成，以及生产系统的风险缓解工作。2026 年夏季，我再次回到美国运通，负责身份与访问管理工作流程，并基于策略引擎构建智能体工作流，确保 AI 的操作稳定且具有确定性。'],
  ['Based in', 'Basé à', 'Con base en', '所在地'],
  ['Montréal, Canada', 'Montréal, Canada', 'Montreal, Canadá', '加拿大蒙特利尔'],
  ['Studying', 'Études', 'Estudios', '在读'],
  ['M.Eng, Information Systems Security', 'M.Ing., sécurité des systèmes d’information', 'Maestría en Ingeniería, Seguridad de Sistemas de Información', '信息系统安全工程硕士'],
  ['GPA', 'Moyenne', 'Promedio', 'GPA'],
  ['Writing', 'En écriture', 'Escribiendo', '正在创作'],
  ['Toolkit', 'Boîte à outils', 'Caja de herramientas', '技能与工具'],
  ['Focus', 'Domaines', 'Enfoque', '专注领域'],
  ['GenAI security', 'Sécurité de l’IA générative', 'Seguridad de IA generativa', '生成式 AI 安全'],
  ['Security governance', 'Gouvernance de la sécurité', 'Gobernanza de seguridad', '安全治理'],
  ['Threat intelligence & incident response', 'Renseignement sur les menaces et réponse aux incidents', 'Inteligencia de amenazas y respuesta a incidentes', '威胁情报与事件响应'],
  ['Key risk indicators', 'Indicateurs de risque clés', 'Indicadores clave de riesgo', '关键风险指标'],
  ['Emerging technology risk', 'Risques des technologies émergentes', 'Riesgos de tecnologías emergentes', '新兴技术风险'],
  ['Practice', 'Pratique', 'Práctica', '实践'],
  ['Vulnerability management', 'Gestion des vulnérabilités', 'Gestión de vulnerabilidades', '漏洞管理'],
  ['Security investigations', 'Enquêtes de sécurité', 'Investigaciones de seguridad', '安全调查'],
  ['Risk reporting', 'Rapports sur les risques', 'Informes de riesgos', '风险报告'],
  ['Social engineering assessments', 'Évaluations d’ingénierie sociale', 'Evaluaciones de ingeniería social', '社会工程评估'],
  ['Tools', 'Outils', 'Herramientas', '工具'],
  ['Cloud security tools', 'Outils de sécurité infonuagique', 'Herramientas de seguridad en la nube', '云安全工具'],
  ['Excel (advanced)', 'Excel (avancé)', 'Excel (avanzado)', 'Excel（高级）'],
  ['Code', 'Code', 'Código', '编程语言'],
  ['Systems', 'Systèmes', 'Sistemas', '操作系统'],

  // work
  ['TORONTO · 2025 — 2026', 'TORONTO · 2025 — 2026', 'TORONTO · 2025 — 2026', '多伦多 · 2025 — 2026'],
  ['SUMMER 2026 · MAY — AUG', 'ÉTÉ 2026 · MAI — AOÛT', 'VERANO 2026 · MAYO — AGO.', '2026 年夏季 · 5 月至 8 月'],
  ['Intern I', 'Stagiaire I', 'Practicante I', '实习生 I'],
  ['Studied the company\'s existing identity and access management workflows and documented them for use across the enterprise.',
    'J’ai étudié les flux de gestion des identités et des accès existants de l’entreprise et je les ai documentés pour qu’ils servent dans toute l’organisation.',
    'Estudié los flujos de gestión de identidades y accesos existentes en la empresa y los documenté para su uso en toda la organización.',
    '梳理公司现有的身份与访问管理工作流程，并编写文档供全公司使用。'],
  ['Analyzed policy engines and built agentic workflows integrated with them, so agentic AI actions stay stable and deterministic.',
    'J’ai analysé des moteurs de politiques et conçu des flux agentiques intégrés à ceux-ci, afin que les actions de l’IA agentique restent stables et déterministes.',
    'Analicé motores de políticas y construí flujos agénticos integrados con ellos, para que las acciones de la IA agéntica sean estables y deterministas.',
    '分析策略引擎，并构建与之集成的智能体工作流，确保智能体 AI 的操作稳定且具有确定性。'],
  ['SUMMER 2025 · MAY — AUG', 'ÉTÉ 2025 · MAI — AOÛT', 'VERANO 2025 · MAYO — AGO.', '2025 年夏季 · 5 月至 8 月'],
  ['Information Security Analyst Intern I', 'Stagiaire analyste en sécurité de l’information I', 'Analista de Seguridad de la Información (Practicante) I', '信息安全分析师实习生 I'],
  ['Worked in the Generative AI Security team on LLMOps, secure AI/ML pipeline integration and risk mitigation across production systems.',
    'J’ai travaillé au sein de l’équipe Sécurité de l’IA générative sur le LLMOps, l’intégration sécurisée de pipelines d’IA et d’apprentissage automatique, et l’atténuation des risques dans des systèmes en production.',
    'Trabajé en el equipo de Seguridad de IA Generativa en LLMOps, integración segura de pipelines de IA y aprendizaje automático, y mitigación de riesgos en sistemas de producción.',
    '在生成式 AI 安全团队从事 LLMOps、AI/机器学习管道安全集成以及生产系统风险缓解工作。'],
  ['Delivered cybersecurity initiatives across threat intelligence, incident response, data loss prevention, identity and access management, and cryptography services.',
    'J’ai mené des initiatives de cybersécurité touchant le renseignement sur les menaces, la réponse aux incidents, la prévention des pertes de données, la gestion des identités et des accès, et les services de cryptographie.',
    'Impulsé iniciativas de ciberseguridad en inteligencia de amenazas, respuesta a incidentes, prevención de pérdida de datos, gestión de identidades y accesos, y servicios de criptografía.',
    '推进涵盖威胁情报、事件响应、数据防泄漏、身份与访问管理以及密码服务等领域的网络安全项目。'],
  ['Led research and development on post-quantum cryptography and GenAI security enablement.',
    'J’ai dirigé des travaux de recherche et développement sur la cryptographie post-quantique et la mise en place de la sécurité de l’IA générative.',
    'Lideré la investigación y el desarrollo en criptografía poscuántica y en la habilitación de la seguridad de la IA generativa.',
    '牵头开展后量子密码学以及生成式 AI 安全赋能方面的研发工作。'],
  ['TORONTO · FALL 2025', 'TORONTO · AUTOMNE 2025', 'TORONTO · OTOÑO 2025', '多伦多 · 2025 年秋季'],
  ['TMX Group', 'Groupe TMX', 'TMX Group', 'TMX 集团'],
  ['SEP — DEC 2025 · TORONTO STOCK EXCHANGE', 'SEPT. — DÉC. 2025 · BOURSE DE TORONTO', 'SEP. — DIC. 2025 · BOLSA DE TORONTO', '2025 年 9 月至 12 月 · 多伦多证券交易所'],
  ['Jr. Security Operations Analyst Intern', 'Stagiaire analyste junior en opérations de sécurité', 'Analista Junior de Operaciones de Seguridad (Practicante)', '初级安全运营分析师实习生'],
  ['Worked with enterprise-grade security tools to monitor, investigate and strengthen the security posture of critical financial market infrastructure.',
    'J’ai utilisé des outils de sécurité de niveau entreprise pour surveiller, enquêter et renforcer la posture de sécurité d’infrastructures essentielles des marchés financiers.',
    'Trabajé con herramientas de seguridad de nivel empresarial para monitorear, investigar y fortalecer la postura de seguridad de infraestructura crítica de los mercados financieros.',
    '使用企业级安全工具，对关键金融市场基础设施进行监控和调查，并加强其安全态势。'],
  ['Designed and ran context-aware social engineering campaigns, including whaling and credential harvesting, to test and strengthen the human layer of defence against financial-sector threats.',
    'J’ai conçu et mené des campagnes d’ingénierie sociale adaptées au contexte, dont du whaling et de la collecte d’identifiants, pour tester et renforcer la couche humaine de défense contre les menaces visant le secteur financier.',
    'Diseñé y ejecuté campañas de ingeniería social adaptadas al contexto, incluidos whaling y recolección de credenciales, para poner a prueba y reforzar la capa humana de defensa frente a las amenazas del sector financiero.',
    '设计并实施贴合情境的社会工程演练（包括鲸钓攻击和凭证收集），检验并强化抵御金融行业威胁的人员防线。'],
  ['Analyzed key risk indicators to find vulnerability patterns among the C-suite and critical staff, then rolled out targeted training that reduced credential compromise rates.',
    'J’ai analysé des indicateurs de risque clés pour repérer des schémas de vulnérabilité chez la haute direction et le personnel essentiel, puis déployé des formations ciblées qui ont réduit les taux de compromission d’identifiants.',
    'Analicé indicadores clave de riesgo para detectar patrones de vulnerabilidad entre la alta dirección y el personal crítico, y luego implementé formaciones específicas que redujeron las tasas de compromiso de credenciales.',
    '分析关键风险指标，识别高管层和关键岗位人员中的漏洞模式，随后开展针对性培训，降低了凭证泄露率。'],

  // projects
  ['A personal equity research terminal. A LangChain agent drives 127 live financial tools through the OpenBB MCP server, falling back across data providers and eight LLMs so long research runs finish.',
    'Un terminal personnel de recherche sur les actions. Un agent LangChain pilote 127 outils financiers en temps réel par l’entremise du serveur MCP d’OpenBB, avec des solutions de repli entre fournisseurs de données et huit LLM pour que les longues analyses aillent jusqu’au bout.',
    'Una terminal personal de análisis bursátil. Un agente de LangChain maneja 127 herramientas financieras en tiempo real a través del servidor MCP de OpenBB, con respaldo entre proveedores de datos y ocho LLM para que los análisis largos lleguen hasta el final.',
    '个人股票研究终端。一个 LangChain 智能体通过 OpenBB MCP 服务器调用 127 个实时金融工具，并能在多个数据源和八个大语言模型之间自动切换，确保耗时较长的研究任务顺利完成。'],
  ['Open the app ↗', 'Ouvrir l’application ↗', 'Abrir la aplicación ↗', '打开应用 ↗'],
  ['Code ↗', 'Code ↗', 'Código ↗', '源代码 ↗'],
  ['An autonomous IoT threat hunter. Upload network logs and get a forensic report grounded in MITRE ATT&CK: guardrails reject anything that isn\'t a log, FAISS retrieves the matching techniques, and Llama 3.3 70B writes the findings. Built for IoT Security at Concordia.',
    `Un chasseur de menaces IoT autonome. Téléversez des journaux réseau et obtenez un rapport forensique fondé sur MITRE ATT&CK${N}: des garde-fous rejettent tout ce qui n’est pas un journal, FAISS retrouve les techniques correspondantes et Llama 3.3 70B rédige les constats. Conçu pour le cours de sécurité de l’IoT à Concordia.`,
    'Un cazador autónomo de amenazas IoT. Sube registros de red y obtén un informe forense basado en MITRE ATT&CK: unas salvaguardas rechazan todo lo que no sea un registro, FAISS recupera las técnicas correspondientes y Llama 3.3 70B redacta los hallazgos. Creado para el curso de Seguridad IoT en Concordia.',
    '自主运行的物联网威胁狩猎工具。上传网络日志，即可获得基于 MITRE ATT&CK 的取证报告：防护机制会拒绝一切非日志内容，FAISS 检索匹配的攻击技术，再由 Llama 3.3 70B 撰写分析结论。为康考迪亚大学的物联网安全课程而开发。'],
  ['GENAI · ZXCVBN · LLM FAILOVER', 'IA GÉNÉRATIVE · ZXCVBN · BASCULE DE LLM', 'IA GENERATIVA · ZXCVBN · CONMUTACIÓN DE LLM', '生成式 AI · ZXCVBN · 模型容灾切换'],
  ['A password architect and auditor. It turns a theme into a strong, memorable passphrase, then audits passwords with zxcvbn and an LLM red-team persona that roasts weak choices. A model ladder of Gemini, Llama 3 and Mistral keeps it running when a provider fails.',
    'Un architecte et auditeur de mots de passe. Il transforme un thème en phrase de passe robuste et facile à retenir, puis audite les mots de passe avec zxcvbn et un LLM qui joue l’équipe rouge et se moque des choix trop faibles. Une cascade de modèles (Gemini, Llama 3 et Mistral) le garde en marche quand un fournisseur tombe en panne.',
    'Un arquitecto y auditor de contraseñas. Convierte un tema en una frase de contraseña robusta y fácil de recordar, y luego audita contraseñas con zxcvbn y un LLM con personalidad de red team que se burla de las elecciones débiles. Una escalera de modelos con Gemini, Llama 3 y Mistral lo mantiene en marcha cuando falla un proveedor.',
    '密码设计与审计工具。它能根据一个主题生成高强度又好记的密码短语，再用 zxcvbn 和一个扮演红队的大语言模型审计密码，毫不留情地吐槽弱密码。由 Gemini、Llama 3 和 Mistral 组成的模型梯队，能在某个服务商故障时保持运行。'],
  ['GEMINI · LLM ENSEMBLE · STREAMLIT', 'GEMINI · ENSEMBLE DE LLM · STREAMLIT', 'GEMINI · ENSAMBLE DE LLM · STREAMLIT', 'GEMINI · 多模型集成 · STREAMLIT'],
  ['A private AI time capsule disguised as a time-zone dashboard. Behind a hidden date-key unlock sit a memory oracle that picks a shared memory to match your mood, and a ghost writer that learns a person\'s tone from old chat logs.',
    'Une capsule temporelle privée propulsée par l’IA, déguisée en tableau de fuseaux horaires. Derrière un déverrouillage caché par date se trouvent un oracle de souvenirs, qui choisit un souvenir commun selon votre humeur, et un prête-plume qui apprend le ton d’une personne à partir d’anciennes conversations.',
    'Una cápsula del tiempo privada con IA, disfrazada de panel de husos horarios. Tras un desbloqueo oculto por fecha hay un oráculo de recuerdos que elige un recuerdo compartido según tu estado de ánimo, y un escritor fantasma que aprende el tono de una persona a partir de viejos chats.',
    '一个伪装成时区面板的私人 AI 时间胶囊。通过隐藏的日期密钥解锁后，里面有一个“记忆神谕”，会根据你的心情挑选一段共同的回忆；还有一个“代笔人”，能从旧聊天记录中学会某个人说话的语气。'],
  ['MISTRALAI · IMAGE GENERATION', 'MISTRALAI · GÉNÉRATION D’IMAGES', 'MISTRALAI · GENERACIÓN DE IMÁGENES', 'MISTRALAI · 图像生成'],
  ['A children\'s storybook generator. MistralAI writes the story, AI image generation illustrates every page, and a character-memory system keeps the characters looking the same from page to page.',
    'Un générateur de livres d’histoires pour enfants. MistralAI écrit l’histoire, la génération d’images par IA illustre chaque page, et un système de mémoire des personnages leur garde la même apparence d’une page à l’autre.',
    'Un generador de cuentos infantiles. MistralAI escribe la historia, la generación de imágenes con IA ilustra cada página y un sistema de memoria de personajes hace que se vean igual de una página a otra.',
    '儿童绘本生成器。MistralAI 负责撰写故事，AI 图像生成为每一页配图，角色记忆系统则让角色在每一页上保持一致的样貌。'],
  ['NLP · KNOWLEDGE GRAPHS', 'TAL · GRAPHES DE CONNAISSANCES', 'PLN · GRAFOS DE CONOCIMIENTO', '自然语言处理 · 知识图谱'],
  ['Paste any text and get a knowledge graph. It summarizes the input, extracts factual triples chunk by chunk, and draws how everything connects.',
    'Collez n’importe quel texte et obtenez un graphe de connaissances. L’outil résume le contenu, extrait des triplets factuels morceau par morceau et montre comment tout est relié.',
    'Pega cualquier texto y obtén un grafo de conocimiento. Resume el contenido, extrae tripletas factuales fragmento a fragmento y dibuja cómo se conecta todo.',
    '粘贴任意文本，即可生成知识图谱。它会先概括内容，再逐段提取事实三元组，并画出各部分之间的关联。'],
  ['Explore all my projects on GitHub ↗', 'Voir tous mes projets sur GitHub ↗', 'Explora todos mis proyectos en GitHub ↗', '在 GitHub 上查看我的全部项目 ↗'],

  // research and writing
  ['Publications', 'Publications', 'Publicaciones', '学术论文'],
  ['PAPER · WCCIT 2023 · BERLIN', 'ARTICLE · WCCIT 2023 · BERLIN', 'ARTÍCULO · WCCIT 2023 · BERLÍN', '论文 · WCCIT 2023 · 柏林'],
  ['How machine learning can strengthen threat intelligence, from detection through response. Presented at the World Conference on Computing and IT in Berlin, Germany, on August 12, 2023.',
    'Comment l’apprentissage automatique peut renforcer le renseignement sur les menaces, de la détection à la réponse. Présenté à la World Conference on Computing and IT à Berlin, en Allemagne, le 12 août 2023.',
    'Cómo el aprendizaje automático puede reforzar la inteligencia de amenazas, desde la detección hasta la respuesta. Presentado en la World Conference on Computing and IT en Berlín, Alemania, el 12 de agosto de 2023.',
    '探讨机器学习如何从检测到响应全面增强威胁情报。2023 年 8 月 12 日在德国柏林举行的世界计算与信息技术大会（WCCIT）上发表。'],
  ['Read the paper ↗', 'Lire l’article ↗', 'Leer el artículo ↗', '阅读论文 ↗'],
  ['PAPER · 16TH SINCONF · JAIPUR', 'ARTICLE · 16E SINCONF · JAIPUR', 'ARTÍCULO · 16.ª SINCONF · JAIPUR', '论文 · 第 16 届 SINCONF · 斋浦尔'],
  ['Proposes distributed ledger technology as a way to counter advanced persistent threats and make systems more resilient to intrusion. Shortlisted for presentation at the 16th SINCONF in Jaipur, India.',
    'Propose les registres distribués comme moyen de contrer les menaces persistantes avancées et de rendre les systèmes plus résilients aux intrusions. Présélectionné pour une présentation à la 16e SINCONF à Jaipur, en Inde.',
    'Propone la tecnología de registro distribuido como forma de contrarrestar las amenazas persistentes avanzadas y hacer los sistemas más resilientes a las intrusiones. Preseleccionado para su presentación en la 16.ª SINCONF en Jaipur, India.',
    '提出利用分布式账本技术应对高级持续性威胁（APT），提升系统抵御入侵的能力。入选在印度斋浦尔举行的第 16 届 SINCONF 会议进行报告。'],
  ['REVIEW PAPER · 2023', 'ARTICLE DE SYNTHÈSE · 2023', 'ARTÍCULO DE REVISIÓN · 2023', '综述论文 · 2023'],
  ['Traces ciphers in chronological order, from the earliest known cryptography to modern cryptographic systems.',
    'Retrace l’histoire des chiffrements dans l’ordre chronologique, des premières formes connues de cryptographie aux systèmes cryptographiques modernes.',
    'Recorre los cifrados en orden cronológico, desde la criptografía más antigua conocida hasta los sistemas criptográficos modernos.',
    '按时间顺序梳理密码的发展历程，从已知最早的密码术一直到现代密码系统。'],
  ['How operating systems schedule processes, with a focus on how Windows implements it.',
    'Comment les systèmes d’exploitation ordonnancent les processus, en particulier la façon dont Windows le met en œuvre.',
    'Cómo los sistemas operativos planifican los procesos, con especial atención a cómo lo implementa Windows.',
    '介绍操作系统如何调度进程，并重点分析 Windows 的实现方式。'],
  ['Latest essays', 'Derniers articles', 'Últimos artículos', '最新文章'],
  ['Essays on security, AI and markets', 'Articles sur la sécurité, l’IA et les marchés', 'Artículos sobre seguridad, IA y mercados', '关于安全、AI 与市场的文章'],
  ['Read on Medium ↗', 'Lire sur Medium ↗', 'Leer en Medium ↗', '在 Medium 上阅读 ↗'],
  ['Shorter takes, as they happen', 'Des réflexions plus courtes, sur le vif', 'Opiniones breves, al momento', '随想短评，实时更新'],
  ['Follow on X ↗', 'Suivre sur X ↗', 'Seguir en X ↗', '在 X 上关注 ↗'],
  ['ARCHIVE', 'ARCHIVES', 'ARCHIVO', '全部文章'],
  ['Every essay, plus shorter takes on X', 'Tous mes articles, et des réflexions plus courtes sur X', 'Todos mis artículos, y opiniones breves en X', '全部文章，以及 X 上的短评'],
  ['All posts on Medium ↗', 'Tous les articles sur Medium ↗', 'Todos los artículos en Medium ↗', '在 Medium 上查看全部文章 ↗'],
  ['Untitled', 'Sans titre', 'Sin título', '无标题'],

  // the novel
  ['A DEBUT NOVEL · COMING SOON', 'UN PREMIER ROMAN · BIENTÔT', 'UNA PRIMERA NOVELA · PRÓXIMAMENTE', '首部小说 · 即将出版'],
  ['A gripping tale of mystery and resilience, set against the vibrant backdrop of Bombay.',
    'Un récit captivant de mystère et de résilience, sur fond de Bombay vibrante.',
    'Una historia apasionante de misterio y resiliencia, con el vibrante telón de fondo de Bombay.',
    '一个扣人心弦的悬疑与坚韧的故事，以充满活力的孟买为背景。'],
  ['“Step into a never-ending chase.”', `«${N}Entrez dans une traque sans fin.${N}»`, '«Adéntrate en una persecución sin fin».', '“踏入一场永无止境的追逐。”'],
  ['Notify me at launch', 'Me prévenir à la sortie', 'Avísame del lanzamiento', '出版时通知我'],
  ['Follow on X', 'Suivre sur X', 'Seguir en X', '在 X 上关注'],

  // education
  ['SEP 2024 — PRESENT · MONTRÉAL', 'SEPT. 2024 — AUJOURD’HUI · MONTRÉAL', 'SEP. 2024 — ACTUALIDAD · MONTREAL', '2024 年 9 月至今 · 蒙特利尔'],
  ['FINAL SEMESTER', 'DERNIÈRE SESSION', 'ÚLTIMO SEMESTRE', '最后一学期'],
  ['Concordia University', 'Université Concordia', 'Universidad Concordia', '康考迪亚大学'],
  ['Master of Engineering, Information Systems Security · Co-op', 'Maîtrise en génie, sécurité des systèmes d’information · Régime coopératif', 'Maestría en Ingeniería, Seguridad de Sistemas de Información · Programa cooperativo', '信息系统安全工程硕士 · 带薪实习（Co-op）项目'],
  ['/ 4.30 GPA', '/ 4,30 de moyenne', '/ 4.30 de promedio', '/ 4.30 GPA'],
  ['Foundations of Cryptography', 'Fondements de la cryptographie', 'Fundamentos de criptografía', '密码学基础'],
  ['Operating System Security', 'Sécurité des systèmes d’exploitation', 'Seguridad de sistemas operativos', '操作系统安全'],
  ['System Physical Security', 'Sécurité physique des systèmes', 'Seguridad física de sistemas', '系统物理安全'],
  ['Cyber-Physical Systems', 'Systèmes cyberphysiques', 'Sistemas ciberfísicos', '信息物理系统'],
  ['IoT Security', 'Sécurité de l’IoT', 'Seguridad IoT', '物联网安全'],
  ['AUG 2020 — JUN 2024 · JAIPUR', 'AOÛT 2020 — JUIN 2024 · JAIPUR', 'AGO. 2020 — JUN. 2024 · JAIPUR', '2020 年 8 月至 2024 年 6 月 · 斋浦尔'],
  ['Manipal University Jaipur', 'Université Manipal de Jaipur', 'Universidad Manipal de Jaipur', '斋浦尔马尼帕尔大学'],
  ['Bachelor of Technology, Computer Science & Engineering', 'Baccalauréat en technologie (B.Tech), informatique et génie informatique', 'Licenciatura en Tecnología (B.Tech), Ciencias de la Computación e Ingeniería', '计算机科学与工程技术学士（B.Tech）'],
  ['/ 10 CGPA', '/ 10 de moyenne cumulative', '/ 10 de promedio acumulado', '/ 10 累计 GPA'],
  ['Information Coding', 'Codage de l’information', 'Codificación de la información', '信息编码'],
  ['Computer Networks', 'Réseaux informatiques', 'Redes de computadoras', '计算机网络'],
  ['Operating Systems', 'Systèmes d’exploitation', 'Sistemas operativos', '操作系统'],
  ['Data Structures', 'Structures de données', 'Estructuras de datos', '数据结构'],

  // awards
  ['MARCH 2025 · @HACK 2025, MONTRÉAL', 'MARS 2025 · @HACK 2025, MONTRÉAL', 'MARZO 2025 · @HACK 2025, MONTREAL', '2025 年 3 月 · @HACK 2025，蒙特利尔'],
  ['Third place, Interac Challenge', 'Troisième place, défi Interac', 'Tercer lugar, Desafío Interac', 'Interac 挑战赛第三名'],
  ['Third in the Regular Track, with a Hak5 $100 USD gift card.', `Troisième du volet régulier, avec une carte-cadeau Hak5 de 100${N}$${N}US.`, `Tercer lugar en la categoría general, con una tarjeta de regalo de Hak5 de 100${N}USD.`, '在常规赛道获得第三名，奖品为一张 100 美元的 Hak5 礼品卡。'],
  ['TRYHACKME · VERIFIED APRIL 2025', 'TRYHACKME · VÉRIFIÉ EN AVRIL 2025', 'TRYHACKME · VERIFICADO EN ABRIL DE 2025', 'TRYHACKME · 2025 年 4 月核实'],
  ['Top 1% of learners worldwide', `Top 1${N}% des apprenants dans le monde`, `Entre el 1${N}% de los mejores estudiantes del mundo`, '全球学习者前 1%'],
  ['Ranked around 20,000 globally, with 20+ badges and about 150 rooms completed.', `Classé autour du 20${N}000e rang mondial, avec plus de 20 badges et environ 150 salles terminées.`, `En torno al puesto 20,000 a nivel mundial, con más de 20 insignias y unas 150 salas completadas.`, '全球排名约第 20,000 位，获得 20 多枚徽章，完成约 150 个训练房间。'],
  ['MANIPAL UNIVERSITY JAIPUR · JUNE 2024', 'UNIVERSITÉ MANIPAL DE JAIPUR · JUIN 2024', 'UNIVERSIDAD MANIPAL DE JAIPUR · JUNIO 2024', '斋浦尔马尼帕尔大学 · 2024 年 6 月'],
  ['Perfect 10/10 semester', `Un semestre parfait${N}: 10/10`, 'Un semestre perfecto: 10/10', '满分学期：10/10'],
  ['MANIPAL UNIVERSITY JAIPUR · MAY 2024', 'UNIVERSITÉ MANIPAL DE JAIPUR · MAI 2024', 'UNIVERSIDAD MANIPAL DE JAIPUR · MAYO 2024', '斋浦尔马尼帕尔大学 · 2024 年 5 月'],
  ['Dean\'s List for academic excellence', 'Liste d’honneur du doyen pour l’excellence académique', 'Cuadro de honor del decano por excelencia académica', '院长嘉许名单（学业优异）'],
  ['Recognized for semester 7, with the certificate presented by the Dean.', 'Distinction obtenue au 7e semestre, avec un certificat remis par le doyen.', 'Reconocimiento en el 7.º semestre, con el certificado entregado por el decano.', '第 7 学期获此殊荣，由院长亲自颁发证书。'],

  // certifications
  ['TRYHACKME · MAR 2025', 'TRYHACKME · MARS 2025', 'TRYHACKME · MAR. 2025', 'TRYHACKME · 2025 年 3 月'],
  ['TCM SECURITY · JAN 2025', 'TCM SECURITY · JANV. 2025', 'TCM SECURITY · ENE. 2025', 'TCM SECURITY · 2025 年 1 月'],
  ['COMPTIA · OCT 2024', 'COMPTIA · OCT. 2024', 'COMPTIA · OCT. 2024', 'COMPTIA · 2024 年 10 月'],
  ['COMPTIA · JUL 2024', 'COMPTIA · JUILL. 2024', 'COMPTIA · JUL. 2024', 'COMPTIA · 2024 年 7 月'],
  ['ISC2 · MAY 2024', 'ISC2 · MAI 2024', 'ISC2 · MAYO 2024', 'ISC2 · 2024 年 5 月'],
  ['GOOGLE · APR 2024', 'GOOGLE · AVR. 2024', 'GOOGLE · ABR. 2024', 'GOOGLE · 2024 年 4 月'],

  // networking
  ['MONTRÉAL, QC · APRIL 22, 2025', 'MONTRÉAL (QC) · 22 AVRIL 2025', 'MONTREAL, QC · 22 DE ABRIL DE 2025', '魁北克省蒙特利尔 · 2025 年 4 月 22 日'],
  ['In conversation with Mark Carney', 'En conversation avec Mark Carney', 'En conversación con Mark Carney', '与马克·卡尼交流'],
  ['Met the Prime Minister of Canada, the Right Honourable Mark Carney, on the campaign trail ahead of the 2025 federal election, and had a productive conversation on the economy and trade.',
    'J’ai rencontré le premier ministre du Canada, le très honorable Mark Carney, pendant la campagne précédant les élections fédérales de 2025, et nous avons eu une conversation productive sur l’économie et le commerce.',
    'Conocí al primer ministro de Canadá, el muy honorable Mark Carney, durante la campaña previa a las elecciones federales de 2025, y tuvimos una conversación productiva sobre economía y comercio.',
    '在 2025 年联邦大选前的竞选活动中，我见到了加拿大总理马克·卡尼阁下，并就经济与贸易进行了富有成效的交流。'],
  ['OTTAWA, ON · MAY 22, 2025', 'OTTAWA (ON) · 22 MAI 2025', 'OTTAWA, ON · 22 DE MAYO DE 2025', '安大略省渥太华 · 2025 年 5 月 22 日'],
  ['At Chrystia Freeland\'s swearing-in', 'À l’assermentation de Chrystia Freeland', 'En la juramentación de Chrystia Freeland', '出席方慧兰的宣誓就职仪式'],
  ['Attended the swearing-in of the Honourable Chrystia Freeland as Minister of Transport, inside the Parliament of Canada with her team.',
    'J’ai assisté à l’assermentation de l’honorable Chrystia Freeland à titre de ministre des Transports, au Parlement du Canada, avec son équipe.',
    'Asistí a la juramentación de la honorable Chrystia Freeland como ministra de Transporte, en el Parlamento de Canadá, junto a su equipo.',
    '在加拿大国会，与方慧兰及其团队一起出席了她就任交通部长的宣誓仪式。'],

  // contact and footer
  ['Let\'s talk', 'Discutons', 'Hablemos', '联系我'],
  ['Have a role, a project or a collaboration in mind? Email is the fastest way to reach me.', `Un poste, un projet ou une collaboration en tête${N}? Le courriel est le moyen le plus rapide de me joindre.`, '¿Tienes en mente un puesto, un proyecto o una colaboración? El correo electrónico es la forma más rápida de contactarme.', '有职位、项目或合作的想法？发邮件是联系我最快的方式。'],
  ['Copy', 'Copier', 'Copiar', '复制'],
  ['Copied', 'Copié', 'Copiado', '已复制'],
  ['Press and hold to copy', 'Appuyez longuement pour copier', 'Mantén presionado para copiar', '长按即可复制'],
  ['Phone', 'Téléphone', 'Teléfono', '电话'],
  ['Montréal, Québec, Canada', 'Montréal (Québec), Canada', 'Montreal, Quebec, Canadá', '加拿大魁北克省蒙特利尔'],
  ['Download resume (PDF)', 'Télécharger mon CV (PDF)', 'Descargar CV (PDF)', '下载简历（PDF）'],
  ['Elsewhere', 'Ailleurs', 'En otras redes', '其他平台'],
  ['· AI Security Engineer · Montréal', '· Ingénieur en sécurité de l’IA · Montréal', '· Ingeniero de seguridad de IA · Montreal', '· AI 安全工程师 · 蒙特利尔'],

  // image descriptions
  ['Illustrated portrait of Armaan Sidhu', 'Portrait illustré d’Armaan Sidhu', 'Retrato ilustrado de Armaan Sidhu', 'Armaan Sidhu 的插画肖像'],
  ['Armaan at the American Express office in Toronto', 'Armaan aux bureaux d’American Express à Toronto', 'Armaan en la oficina de American Express en Toronto', 'Armaan 在美国运通多伦多办公室'],
  ['Armaan on stage at the TMX Group market open ceremony in October 2025', 'Armaan sur scène lors de la cérémonie d’ouverture des marchés du Groupe TMX, en octobre 2025', 'Armaan en el escenario durante la ceremonia de apertura del mercado de TMX Group en octubre de 2025', '2025 年 10 月，Armaan 在 TMX 集团开市仪式的舞台上'],
  ['Cover of One Night in Trombay by Armaan Sidhu: a skull wreathed in flame under the title', `Couverture de One Night in Trombay d’Armaan Sidhu${N}: un crâne entouré de flammes sous le titre`, 'Portada de One Night in Trombay, de Armaan Sidhu: una calavera envuelta en llamas bajo el título', 'Armaan Sidhu 的小说《One Night in Trombay》封面：书名下方是一个被火焰环绕的骷髅'],
  ['Concordia University campus in winter', 'Le campus de l’Université Concordia en hiver', 'El campus de la Universidad Concordia en invierno', '冬季的康考迪亚大学校园'],
  ['The I love Manipal sign in front of Manipal University Jaipur', `L’enseigne «${N}I love Manipal${N}» devant l’Université Manipal de Jaipur`, 'El letrero «I love Manipal» frente a la Universidad Manipal de Jaipur', '斋浦尔马尼帕尔大学前的“I love Manipal”标志'],
  ['Armaan receiving third place in the Interac Challenge at the @Hack 2025 hackathon in Montréal', 'Armaan recevant la troisième place du défi Interac au hackathon @Hack 2025, à Montréal', 'Armaan recibiendo el tercer lugar del Desafío Interac en el hackathon @Hack 2025, en Montreal', 'Armaan 在蒙特利尔 @Hack 2025 黑客松上领取 Interac 挑战赛第三名'],
  ['TryHackMe Security Analyst Level 1 certificate', 'Certificat TryHackMe Security Analyst Level 1', 'Certificado TryHackMe Security Analyst Level 1', 'TryHackMe Security Analyst Level 1 证书'],
  ['TCM Security Practical OSINT Research Professional certificate', 'Certificat TCM Security Practical OSINT Research Professional', 'Certificado TCM Security Practical OSINT Research Professional', 'TCM Security Practical OSINT Research Professional 证书'],
  ['CompTIA CySA+ certificate', 'Certificat CompTIA CySA+', 'Certificado CompTIA CySA+', 'CompTIA CySA+ 证书'],
  ['CompTIA Security+ certificate', 'Certificat CompTIA Security+', 'Certificado CompTIA Security+', 'CompTIA Security+ 证书'],
  ['ISC2 Certified in Cybersecurity certificate', 'Certificat ISC2 Certified in Cybersecurity', 'Certificado ISC2 Certified in Cybersecurity', 'ISC2 Certified in Cybersecurity 证书'],
  ['Google Cybersecurity certificate', 'Certificat Google Cybersecurity', 'Certificado Google Cybersecurity', 'Google Cybersecurity 证书'],
  ['Armaan with Prime Minister Mark Carney on the 2025 campaign trail in Montréal', 'Armaan avec le premier ministre Mark Carney pendant la campagne de 2025, à Montréal', 'Armaan con el primer ministro Mark Carney durante la campaña de 2025 en Montreal', '2025 年竞选期间，Armaan 与总理马克·卡尼在蒙特利尔合影'],
  ['Armaan with Chrystia Freeland and her team at her swearing-in ceremony in the Parliament of Canada', 'Armaan avec Chrystia Freeland et son équipe lors de son assermentation au Parlement du Canada', 'Armaan con Chrystia Freeland y su equipo en su ceremonia de juramentación en el Parlamento de Canadá', 'Armaan 与方慧兰及其团队在加拿大国会宣誓就职仪式上合影'],
];

// Paragraphs with a link inside are swapped whole (word order differs between languages).
const BLOCKS = {
  'about-outside': {
    fr: `En dehors de la technologie, j’adore lire et écrire des livres, voyager (Inde, Canada, Émirats arabes unis, Mexique et Pérou jusqu’à présent) et apprendre de nouvelles langues. J’apprends actuellement l’espagnol pour gagner en mobilité. J’écris mon premier roman, <a href="#novel" data-go><i>One Night in Trombay</i></a>, et je publie des articles sur X et Medium.`,
    es: `Fuera de la tecnología, me encanta leer y escribir libros, viajar (India, Canadá, los Emiratos Árabes Unidos, México y Perú hasta ahora) y aprender idiomas. Actualmente estoy aprendiendo español para tener más movilidad. Estoy escribiendo mi primera novela, <a href="#novel" data-go><i>One Night in Trombay</i></a>, y publico artículos en X y Medium.`,
    zh: `工作之外，我热爱阅读和写作，喜欢旅行（目前去过印度、加拿大、阿联酋、墨西哥和秘鲁），也喜欢学习新语言。为了今后能更自如地在各地发展，我正在学习西班牙语。我正在创作我的第一部小说《<a href="#novel" data-go><i>One Night in Trombay</i></a>》，并在 X 和 Medium 上发表文章。`,
  },
  'award-perfect': {
    fr: `Une moyenne de 10 au dernier semestre du B.Tech, obtenue après la présentation du <a href="https://github.com/realarmaansidhu/major-project-speed-estimation-of-vehicles-using-deep-learning" target="_blank" rel="noopener">projet de détection de la vitesse des véhicules</a>.`,
    es: `Un promedio de 10 en el último semestre de la B.Tech, obtenido tras presentar el <a href="https://github.com/realarmaansidhu/major-project-speed-estimation-of-vehicles-using-deep-learning" target="_blank" rel="noopener">proyecto de detección de velocidad de vehículos</a>.`,
    zh: `本科（B.Tech）最后一个学期 GPA 满分 10 分，在展示<a href="https://github.com/realarmaansidhu/major-project-speed-estimation-of-vehicles-using-deep-learning" target="_blank" rel="noopener">车辆测速项目</a>后获得。`,
  },
};

// Strings that read the same in every language: names, products, tags made of names, certifications and titles.
const KEEP = new Set(['AS', 'Armaan Sidhu', 'Armaan Sidhu ·', 'ARMAAN', 'SIDHU', 'One Night in Trombay', 'OSINT', 'MCP', 'LangChain', 'LangGraph', 'Splunk', 'Jira',
  'Confluence', 'Python', 'SQL', 'Bash', 'JavaScript', 'Windows', 'macOS', 'Linux', 'American Express', 'LANGCHAIN · MCP · OPENBB', 'TapeDeck',
  'RAG · FAISS · MITRE ATT&CK', 'TacTracer', 'SentinelXC', 'Nuestra Bóveda', 'Whimsical', 'Knowledge Tree', 'MEDIUM', 'X',
  'AI-Driven Threat Intelligence: Leveraging Machine Learning to Empower Cybersecurity Applications for Enhanced Threat Detection and Response',
  'Mitigating Advanced Persistent Threats (APTs) in Cybersecurity Through the Implementation of Distributed Ledger Technology',
  'Analyzing Modern Cryptography Techniques and Reviewing their Timeline', 'Process Scheduling in Operating Systems and Evolution of Windows',
  'Security Analyst Level 1 (SAL1)', 'Practical OSINT Research Professional', 'Cybersecurity Analyst+ (CySA+)', 'Security+ (SY0-701)',
  'Certified in Cybersecurity (CC)', 'Google Cybersecurity Certificate', 'justarmaansidhu@gmail.com', 'LinkedIn', 'in/realarmaansidhu', 'GitHub',
  'realarmaansidhu', 'TryHackMe', 'armaansidhu', 'Medium', '@realarmaansidhu', 'English', 'Français', 'Español', '中文', 'EN', 'FR', 'ES', '文']);

const COL = { fr: 1, es: 2, zh: 3 };
const DICT = { fr: new Map(), es: new Map(), zh: new Map() };
for (const row of ROWS) for (const c of ['fr', 'es', 'zh']) DICT[c].set(row[0], row[COL[c]]);

const norm = (s) => s.replace(/\s+/g, ' ').trim();
const STORE = 'site.lang';
let lang = 'en';
const before = [], listeners = [];

export const currentLang = () => lang;
export const locale = () => LANGS.find((l) => l.code === lang).locale;
export function t(s, vars) {
  let out = (lang !== 'en' && DICT[lang].get(s)) || s;
  if (vars) for (const k in vars) out = out.split(`{${k}}`).join(vars[k]);
  return out;
}
// beforeLangChange runs just ahead of a switch (to note where the reader is), onLangChange right after it.
export function beforeLangChange(fn) { before.push(fn); }
export function onLangChange(fn) { listeners.push(fn); }

let texts = [], attrs = [], blocks = [], nums = [], ready = false;
const DECIMAL = /(\d)\.(\d)/g;   // 3.97 → 3,97 in French

// Remember every translatable piece of the page as it is in English.
function capture() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const p = n.parentElement;
      if (!p || p.closest('script, style, [data-i18n-skip], [data-i18n-html]')) return NodeFilter.FILTER_REJECT;
      return /\p{L}|\d\.\d/u.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const v = n.nodeValue, key = norm(v);
    if (!/\p{L}/u.test(v)) { nums.push({ n, orig: v }); continue; }   // a bare figure like a GPA
    texts.push({ n, orig: v, key, lead: v.match(/^\s*/)[0], tail: v.match(/\s*$/)[0] });
  }
  for (const el of document.body.querySelectorAll('[alt], [aria-label], [title]')) {
    if (el.closest('[data-i18n-skip]')) continue;
    for (const a of ['alt', 'aria-label', 'title']) {
      const v = el.getAttribute(a);
      if (v && /\p{L}/u.test(v)) attrs.push({ el, a, orig: v, key: norm(v) });
    }
  }
  for (const el of document.querySelectorAll('[data-i18n-html]')) blocks.push({ el, key: el.dataset.i18nHtml, orig: el.innerHTML });
}

function apply(code) {
  lang = LANGS.some((l) => l.code === code) ? code : 'en';
  const meta = LANGS.find((l) => l.code === lang);
  document.documentElement.lang = meta.html;
  for (const x of texts) x.n.nodeValue = lang === 'en' ? x.orig : x.lead + (DICT[lang].get(x.key) || x.key) + x.tail;
  for (const x of attrs) x.el.setAttribute(x.a, lang === 'en' ? x.orig : DICT[lang].get(x.key) || x.orig);
  for (const x of nums) x.n.nodeValue = lang === 'fr' ? x.orig.replace(DECIMAL, '$1,$2') : x.orig;
  for (const x of blocks) x.el.innerHTML = lang === 'en' ? x.orig : (BLOCKS[x.key] && BLOCKS[x.key][lang]) || x.orig;
  document.title = t('Armaan Sidhu — AI Security Engineer');
  const desc = document.querySelector('meta[name="description"]');
  if (desc) { desc.dataset.en = desc.dataset.en || desc.content; desc.content = t(desc.dataset.en); }
  for (const b of document.querySelectorAll('[data-lang]')) b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  document.documentElement.classList.remove('i18n-wait');
  for (const fn of listeners) fn(lang);
}

export function setLang(code) {
  try { localStorage.setItem(STORE, code); } catch (e) { /* private mode */ }
  for (const fn of before) fn(lang);
  apply(code);
  const u = new URL(location.href);
  if (u.searchParams.has('lang')) { u.searchParams.delete('lang'); history.replaceState(null, '', u); }
}

// The switcher: four buttons. On narrow screens only the current language shows; tapping it opens the other three.
function wire() {
  const box = document.getElementById('lang');
  if (!box) return;
  const narrow = matchMedia('(max-width: 559px)');
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lang]');
    if (!b) return;
    if (narrow.matches && b.dataset.lang === lang && !box.classList.contains('open')) { box.classList.add('open'); return; }
    box.classList.remove('open');
    if (b.dataset.lang !== lang) setLang(b.dataset.lang);
  });
  document.addEventListener('click', (e) => { if (!box.contains(e.target)) box.classList.remove('open'); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') box.classList.remove('open'); });
}

export function initI18n() {
  if (ready) return;
  ready = true;
  capture();
  wire();
  let want = new URLSearchParams(location.search).get('lang');
  if (!want) { try { want = localStorage.getItem(STORE); } catch (e) { want = null; } }
  apply(want || 'en');
  // for checking coverage: strings on the page that have neither a translation nor a reason to stay the same
  window.__i18n = {
    set: setLang,
    missing: (c) => [...new Set([...texts.map((x) => x.key), ...attrs.map((x) => x.key)])].filter((k) => !KEEP.has(k) && !DICT[c].has(k)),
  };
}

// Runs on its own as soon as the page is parsed, so the switcher works even when the 3D scene doesn't.
initI18n();
