// LINARC - SPA & Site Avançado
const app = document.getElementById('app');
let lang = null;
let animationsPlayed = new Set(); // Controla quais animações já foram executadas

const texts = {
  'pt': {
    tabs: [
      { id: 'home', label: 'Home' },
      { id: 'manifesto', label: 'Manifesto' },
      { id: 'noticias', label: 'Notícias' },
      { id: 'quemSomos', label: 'Quem Somos Nós' },
      { id: 'about', label: 'Sobre' },
      { id: 'legal', label: 'Aviso Legal' },
      { id: 'lancamentos', label: 'Lançamentos' }
    ],
    homeTitle: 'Bem-vindo ao',
    homeSubtitle: 'Somos resistência digital. Justiça, anonimato e liberdade.',
    homeQuote: '"Somos legião. Não perdoamos. Não esquecemos."',
    homeManifesto: '"Hackear é resistir."',
    manifestoTitle: 'Manifesto',
    manifestoText: 'Liberdade digital. Transparência. Proteção.<br>"Código é arma. Ética é escudo."<br>"A justiça também é binária: certo ou errado."',
    manifestoQuote: '"A verdade é livre. O anonimato é poder."',
    manifestoManifesto: 'Somos resistência digital.',
    noticiasTitle: 'Notícias',
    noticiaBtn: 'Ver mais',
    noticiaFechar: 'Fechar',
    likeBtn: 'Curtir',
    likedBtn: 'Curtido',
    lancamentosTitle: 'Lançamentos',
    programasTitle: 'Programas',
    linarcTitle: 'Linarc',
    pentestingTitle: 'Linarc for All - Pentesting Gratuito',
    pentestingDesc: 'Programa gratuito de análise de segurança para sites. Envie seu site para análise e receba um relatório detalhado com vulnerabilidades e recomendações de melhorias.',
    formLink: 'Link do Site',
    formObs: 'Observações',
    formContact: 'Contato',
    formSubmit: 'Enviar para Análise',
    formSuccess: 'Site enviado com sucesso! Nossa equipe analisará e entrará em contato.',
    cofreTitle: 'Cofre de Sites',
    cofrePassword: 'Senha',
    cofreOpen: 'Abrir Cofre',
    cofreEmpty: 'Nenhum site no cofre ainda.',
    antivirusTitle: 'Crov - Antivirus Avançado',
    antivirusDesc: 'Antivirus de última geração desenvolvido pela LINARC com tecnologia própria e inteligência artificial.',
    downloadSoon: 'Em Breve',
    noticias: [
      {
        id: 'instagram',
        titulo: 'Linarc tem Instagram agora, @linarcteam',
        resumo: 'A Linarc agora está presente no Instagram! Siga-nos para ficar por dentro de todas as novidades.',
        conteudo: 'A Linarc expandiu sua presença digital e agora está no Instagram! Siga-nos em @linarcteam para acompanhar todas as novidades, atualizações de projetos, dicas de segurança e muito mais. É uma nova forma de nos conectar com a comunidade e compartilhar conhecimento.',
        data: '14/08/25'
      },
      {
        id: 'antivirus',
        titulo: 'Linarc criou um antivirus',
        resumo: 'Desenvolvemos um antivirus avançado com tecnologia própria para máxima proteção.',
        conteudo: 'A Linarc desenvolveu um antivirus de última geração utilizando tecnologia própria e inteligência artificial. O sistema oferece proteção em tempo real contra malware, ransomware e outras ameaças cibernéticas, com interface intuitiva e baixo consumo de recursos.',
        data: '14/08/25'
      },
      {
        id: 'aparencia',
        titulo: 'Linarc está com aparência nova',
        resumo: 'Nosso site recebeu uma renovação completa com design mais moderno e tecnológico.',
        conteudo: 'A Linarc renovou completamente a aparência de seu site! O novo design traz uma interface mais moderna, tecnológica e responsiva, com melhor experiência do usuário e visual mais profissional. Todas as funcionalidades foram mantidas e aprimoradas.',
        data: '14/08/25'
      },
      {
        id: 'pentesting',
        titulo: 'Linarc lançou programa de Pentesting gratuito',
        resumo: 'Programa gratuito para análise de segurança de sites e recomendações de melhorias.',
        conteudo: 'A Linarc lançou um programa gratuito de Pentesting para ajudar sites a melhorarem sua segurança! Os usuários podem enviar seus sites para análise através da aba Lançamentos e receberão um relatório detalhado com vulnerabilidades encontradas e recomendações de melhorias.',
        data: '14/08/25'
      },
      {
        id: 'datseeker',
        titulo: 'Linarc lança DatSeeker: extrator profissional de metadados',
        resumo: 'Criado com apoio da nossa I.A., o DatSeeker extrai metadados de imagens para uso forense e cooperação com autoridades.',
        conteudo: 'O DatSeeker é um extrator profissional de metadados de imagens criado pela Linarc com apoio da nossa I.A. Foco em análise forense e apoio investigativo à PF e demais autoridades, com uso ético e autorizado.',
        data: '08/08/25'
      },
      {
        id: 'patrocinios',
        titulo: 'Linarc busca patrocínios para expandir projetos',
        resumo: 'O time Linarc está em busca de patrocinadores. Contato será divulgado em breve.',
        conteudo: 'Para expandir suas operações e projetos, a Linarc está aberta a parcerias e patrocínios. Interessados poderão entrar em contato em breve, quando os canais oficiais forem divulgados. O objetivo é fortalecer a infraestrutura, pesquisa e desenvolvimento de novas tecnologias.',
        data: '21/07/25'
      },
      {
        id: 'vigilancia',
        titulo: 'Linarc desenvolve ferramenta de vigilância ética',
        resumo: 'Uma nova ferramenta de vigilância foi criada pela Linarc, com uso restrito e autorizado.',
        conteudo: 'A Linarc desenvolveu uma ferramenta de vigilância digital avançada, projetada para auditoria e defesa cibernética. O uso da ferramenta será estritamente controlado, nunca empregado sem autorização explícita e sempre respeitando princípios éticos e legais. O objetivo é proteger comunidades e identificar ameaças, sem violar privacidade ou direitos.',
        data: '21/07/25'
      },
      {
        id: 'linai',
        titulo: 'Linarc lança I.A. privada LinAI-1, superior ao GPT-4.5',
        resumo: 'A Linarc desenvolveu a LinAI-1, uma inteligência artificial privada, com capacidades superiores ao GPT-4.5.',
        conteudo: 'A equipe Linarc anunciou o lançamento da LinAI-1, uma I.A. privada desenvolvida internamente, com arquitetura avançada, foco em segurança, privacidade e performance. A LinAI-1 supera o GPT-4.5 em tarefas de linguagem, análise de dados e automação, sendo totalmente customizável e auditável. A tecnologia foi criada para uso exclusivo do time, garantindo independência de big techs e máxima proteção de dados.',
        data: '21/07/25'
      },
      {
        id: 'mbsl',
        titulo: 'Linarc expõe corrupção na MBSL em sua primeira análise',
        resumo: 'O grupo Linarc realizou sua primeira análise de segurança sobre o servidor de Discord conhecido como MBSL.',
        conteudo: 'O grupo Linarc realizou uma análise de segurança e denúncia sobre o servidor de Discord conhecido como MBSL. Foram identificadas práticas de corrupção envolvendo fianças e banimentos injustos, prejudicando membros honestos e promovendo práticas antiéticas. Como resultado da exposição, a MBSL foi fechada permanentemente e as vítimas da corrupção foram indenizadas. A divulgação dessas falhas buscou promover justiça digital e conscientização na comunidade.',
        data: '20/07/25'
      }
    ],
    aboutTitle: 'Sobre',
    aboutText: 'O time LINARC utiliza exclusivamente seu próprio sistema operacional, baseado em Arch Linux, chamado <b>Linarch</b>. Essa escolha reflete nossa busca por liberdade, controle total e customização máxima. Linarch é desenvolvido e mantido pelo próprio time, garantindo segurança, performance e filosofia hacker em cada linha de código.',
    quemSomosTitle: 'Quem Somos Nós',
    quemSomosText: `<div class="quem-somos-container">
      <div class="membro-card">
        <div class="membro-nome">Lua</div>
        <div class="membro-desc">Especialista em segurança ofensiva, automação e desenvolvimento de sistemas. Responsável por arquiteturas seguras e inovação no time.</div>
      </div>
      <div class="membro-card">
        <div class="membro-nome">Ghost</div>
        <div class="membro-desc">Foco em análise de vulnerabilidades, defesa cibernética e pesquisa. Atua na proteção de comunidades e desenvolvimento de ferramentas.</div>
      </div>
    </div>`,
    legalTitle: 'Aviso Legal',
    legalText: `<b>Ética e Cooperação:</b> O grupo LINARC atua de forma ética, não realiza ações sem permissão e coopera com autoridades e a polícia sempre que necessário. Nosso objetivo é promover segurança, conscientização e defesa digital.<br><br>
<b>Risco Legal:</b> Hacking sem permissão é crime na maioria dos países, mesmo com boas intenções. Relatar ou promover ações sem autorização pode ser interpretado como apologia ou confissão de crime.<br><br>
<b>Boas Práticas:</b> Nunca divulgamos detalhes técnicos de ataques, exploits ou métodos usados em ações sem permissão. Preferimos linguagem de denúncia, análise de vulnerabilidades públicas e defesa cibernética. Defendemos ética, privacidade e legalidade, e não incentivamos atividades ilegais.<br><br>
<b>Resumo:</b> O site discute ética, privacidade, defesa e hacking responsável. Não promovemos ações sem permissão. Atuamos sempre de forma responsável e colaborativa.`,
    changeLang: 'Trocar Idioma',
    aboutExtra: 'Linarc é PV!'
  },
  'en': {
    tabs: [
      { id: 'home', label: 'Home' },
      { id: 'manifesto', label: 'Manifesto' },
      { id: 'noticias', label: 'News' },
      { id: 'quemSomos', label: 'Who We Are' },
      { id: 'about', label: 'About Us' },
      { id: 'legal', label: 'Legal Notice' },
      { id: 'lancamentos', label: 'Releases' }
    ],
    homeTitle: 'Welcome to',
    homeSubtitle: 'We are digital resistance. Justice, anonymity and freedom.',
    homeQuote: '"We are legion. We do not forgive. We do not forget."',
    homeManifesto: '"Hacking is resistance."',
    manifestoTitle: 'Manifesto',
    manifestoText: 'Digital freedom. Transparency. Protection.<br>"Code is a weapon. Ethics is a shield."<br>"Justice is also binary : right or wrong."',
    manifestoQuote: '"Truth is free. Anonymity is power."',
    manifestoManifesto: 'We are digital resistance.',
    noticiasTitle: 'News',
    noticiaBtn: 'Read more',
    noticiaFechar: 'Close',
    likeBtn: 'Like',
    likedBtn: 'Liked',
    lancamentosTitle: 'Releases',
    programasTitle: 'Programs',
    linarcTitle: 'Linarc',
    pentestingTitle: 'Linarc for All - Free Pentesting',
    pentestingDesc: 'Free security analysis program for websites. Submit your site for analysis and receive a detailed report with vulnerabilities and improvement recommendations.',
    formLink: 'Website Link',
    formObs: 'Observations',
    formContact: 'Contact',
    formSubmit: 'Submit for Analysis',
    formSuccess: 'Site submitted successfully! Our team will analyze and contact you.',
    cofreTitle: 'Site Vault',
    cofrePassword: 'Password',
    cofreOpen: 'Open Vault',
    cofreEmpty: 'No sites in vault yet.',
    antivirusTitle: 'Crov - Advanced Antivirus',
    antivirusDesc: 'Next-generation antivirus developed by LINARC with proprietary technology and artificial intelligence.',
    downloadSoon: 'Coming Soon',
    noticias: [
      {
        id: 'instagram',
        titulo: 'Linarc now has Instagram, @linarcteam',
        resumo: 'Linarc is now on Instagram! Follow us to stay updated on all the latest news.',
        conteudo: 'Linarc has expanded its digital presence and is now on Instagram! Follow us at @linarcteam to keep up with all the latest news, project updates, security tips, and much more. It\'s a new way to connect with the community and share knowledge.',
        data: '08/14/25'
      },
      {
        id: 'antivirus',
        titulo: 'Linarc created an antivirus',
        resumo: 'We developed an advanced antivirus with proprietary technology for maximum protection.',
        conteudo: 'Linarc has developed a next-generation antivirus using proprietary technology and artificial intelligence. The system provides real-time protection against malware, ransomware, and other cyber threats, with an intuitive interface and low resource consumption.',
        data: '08/14/25'
      },
      {
        id: 'aparencia',
        titulo: 'Linarc has a new appearance',
        resumo: 'Our website received a complete renovation with a more modern and technological design.',
        conteudo: 'Linarc has completely renovated the appearance of its website! The new design brings a more modern, technological, and responsive interface, with better user experience and a more professional look. All functionalities have been maintained and enhanced.',
        data: '08/14/25'
      },
      {
        id: 'pentesting',
        titulo: 'Linarc launched free Pentesting program',
        resumo: 'Free program for website security analysis and improvement recommendations.',
        conteudo: 'Linarc has launched a free Pentesting program to help websites improve their security! Users can submit their sites for analysis through the Releases tab and will receive a detailed report with found vulnerabilities and improvement recommendations.',
        data: '08/14/25'
      },
      {
        id: 'datseeker',
        titulo: 'Linarc launches DatSeeker: professional metadata extractor',
        resumo: 'Built with our AI, DatSeeker extracts image metadata for forensics and cooperation with authorities.',
        conteudo: 'DatSeeker is a professional image metadata extractor created by Linarc with support from our in-house AI. Focused on forensic analysis and investigative support to law enforcement, with ethical and authorized use.',
        data: '07/21/25'
      },
      {
        id: 'patrocinios',
        titulo: 'Linarc seeks sponsorships to expand projects',
        resumo: 'The Linarc team is seeking sponsors. Contact will be announced soon.',
        conteudo: 'To expand its operations and projects, Linarc is open to partnerships and sponsorships. Interested parties will be able to contact soon, when official channels are announced. The goal is to strengthen infrastructure, research, and development of new technologies.',
        data: '07/21/25'
      },
      {
        id: 'vigilancia',
        titulo: 'Linarc develops ethical surveillance tool',
        resumo: 'A new surveillance tool was created by Linarc, with restricted and authorized use.',
        conteudo: 'Linarc developed an advanced digital surveillance tool, designed for auditing and cyber defense. The tool\'s use will be strictly controlled, never employed without explicit authorization and always respecting ethical and legal principles. The goal is to protect communities and identify threats, without violating privacy or rights.',
        data: '07/21/25'
      },
      {
        id: 'linai',
        titulo: 'Linarc launches private AI LinAI-1, superior to GPT-4.5',
        resumo: 'Linarc developed LinAI-1, a private artificial intelligence, with capabilities superior to GPT-4.5.',
        conteudo: 'The Linarc team announced the launch of LinAI-1, a private AI developed in-house, with advanced architecture, focus on security, privacy, and performance. LinAI-1 surpasses GPT-4.5 in language tasks, data analysis, and automation, being fully customizable and auditable. The technology was created for exclusive team use, ensuring independence from big techs and maximum data protection.',
        data: '07/21/25'
      },
      {
        id: 'mbsl',
        titulo: 'Linarc exposes corruption in MBSL in its first security analysis',
        resumo: 'Linarc group carried out its first security analysis on the Discord server known as MBSL.',
        conteudo: 'Linarc group conducted a security analysis and public report on the Discord server known as MBSL. Corruption practices involving bails and unfair bans were identified, harming honest members and promoting unethical practices. As a result of the exposure, MBSL was permanently shut down and the victims of corruption were compensated. The disclosure of these flaws aimed to promote digital justice and awareness in the community.',
        data: '07/20/25'
      }
    ],
    aboutTitle: 'About Us',
    aboutText: 'The LINARC team exclusively uses its own Arch-based operating system, called <b>Linarch</b>. This choice reflects our pursuit of freedom, total control, and maximum customization. Linarch is developed and maintained by the team itself, ensuring security, performance, and hacker philosophy in every line of code.',
    quemSomosTitle: 'Who We Are',
    quemSomosText: `<div class="quem-somos-container">
      <div class="membro-card">
        <div class="membro-nome">Lua</div>
        <div class="membro-desc">Specialist in offensive security, automation, and systems development. Responsible for secure architectures and innovation in the team.</div>
      </div>
      <div class="membro-card">
        <div class="membro-nome">Ghost</div>
        <div class="membro-desc">Focus on vulnerability analysis, cyber defense, and research. Works on community protection and tool development.</div>
      </div>
    </div>`,
    legalTitle: 'Legal Notice',
    legalText: `<b>Ethics and Cooperation:</b> The LINARC group acts ethically, does not perform actions without permission and always cooperates with authorities and the police when necessary. Our goal is to promote security, awareness, and digital defense.<br><br>
<b>Legal Risk:</b> Hacking without permission is a crime in most countries, even with good intentions. Reporting or promoting actions without authorization can be interpreted as advocacy or confession of a crime.<br><br>
<b>Best Practices:</b> We never disclose technical details of attacks, exploits or methods used in unauthorized actions. We prefer language of reporting, public vulnerability analysis and cyber defense. We stand for ethics, privacy and legality, and do not encourage illegal activities.<br><br>
<b>Summary:</b> The site discusses ethics, privacy, defense, and responsible hacking. We do not promote actions without permission. We always act responsibly and collaboratively.`,
    changeLang: 'Change Language',
    aboutExtra: 'Linarc is PV!'
  }
};

// Sistema de cookies para idioma
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function setCookie(name, value, days = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Sistema de likes para notícias
function getLikes(newsId) {
  const likes = getCookie(`likes_${newsId}`);
  return likes ? parseInt(likes) : 0;
}

function setLikes(newsId, count) {
  setCookie(`likes_${newsId}`, count.toString());
}

function hasLiked(newsId) {
  return getCookie(`user_liked_${newsId}`) === 'true';
}

function setUserLiked(newsId) {
  setCookie(`user_liked_${newsId}`, 'true', 365);
}

function likeNews(newsId) {
  if (hasLiked(newsId)) return;
  
  const currentLikes = getLikes(newsId);
  const newLikes = currentLikes + 1;
  setLikes(newsId, newLikes);
  setUserLiked(newsId);
  
  // Atualiza a interface
  renderApp();
}

// Função para carregar idioma salvo
function loadSavedLanguage() {
  const savedLang = getCookie('selectedLanguage');
  if (savedLang && texts[savedLang]) {
    lang = savedLang;
    console.log(`🌐 Idioma carregado: ${savedLang}`);
    renderApp(); // Renderizar o site com o idioma salvo
  } else {
    // Se não há idioma salvo, mostrar tela de seleção
    showLanguageSelection();
  }
}

// Função para mostrar seleção de idioma
function showLanguageSelection() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="language-selection">
      <div class="language-modal">
        <h2>�� Escolha seu idioma</h2>
        <div class="language-grid">
          ${languageOptions.map(option => `
            <button class="language-option" onclick="selectLanguage('${option.code}')">
              <span class="flag">${option.flag}</span>
              <span class="name">${option.name}</span>
              <span class="native">${option.native}</span>
            </button>
          `).join('')}
      </div>
      </div>
    </div>
  `;
}

// Função para selecionar idioma
function selectLanguage(languageCode) {
  if (texts[languageCode]) {
    lang = languageCode;
    setCookie('selectedLanguage', languageCode, 365);
    console.log(`🌐 Idioma selecionado: ${languageCode}`);
    renderApp(); // Renderizar todo o site no idioma selecionado
  }
}

// Função para voltar à seleção de idioma
function backToLanguageSelection() {
  showLanguageSelection();
}

// Opções de idioma
const languageOptions = [
  {
    code: 'pt',
    name: 'Português',
    native: 'Português',
    flag: '🇧🇷'
  },
  {
    code: 'en',
    name: 'English',
    native: 'English',
    flag: '🇺🇸'
  }
];

const langTexts = {
  en: { choose: 'Choose your language', confirm: 'Confirm' },
  pt: { choose: 'Escolha seu idioma', confirm: 'Confirmar' },
  es: { choose: 'Elige tu idioma', confirm: 'Confirmar' },
  fr: { choose: 'Choisissez votre langue', confirm: 'Confirmer' },
  de: { choose: 'Wählen Sie Ihre Sprache', confirm: 'Bestätigen' },
  it: { choose: 'Scegli la tua lingua', confirm: 'Conferma' },
  ru: { choose: 'Выберите язык', confirm: 'Подтвердить' },
  zh: { choose: '选择你的语言', confirm: '确认' },
  th: { choose: 'เลือกภาษาของคุณ', confirm: 'ยืนยัน' },
  hi: { choose: 'अपनी भाषा चुनें', confirm: 'पुष्टि करें' }
};

let tempLang = 'en';
let currentTab = 'home';
let noticiaAberta = null;

function renderLangSelector() {
  const t = langTexts[tempLang] || langTexts['en'];
  return `<div class="lang-bg">
    <div class="lang-modal">
      <div class="lang-title">${t.choose}</div>
      <div class="lang-select-row">
        <select class="lang-select" onchange="window.setTempLang(this.value)">
          ${languageOptions.map(opt => `<option value="${opt.code}"${opt.code===tempLang?' selected':''}>${opt.flag} ${opt.name}</option>`).join('')}
        </select>
      </div>
      <button class="lang-btn" onclick="window.confirmLang()">${t.confirm}</button>
    </div>
  </div>`;
}

window.setTempLang = function(code) {
  tempLang = code;
  renderApp();
}

window.confirmLang = function() {
  lang = languageOptions.some(opt => opt.code === tempLang && texts[tempLang]) ? tempLang : 'en';
  setCookie('linarc_lang', lang);
  renderApp();
}

function renderNavbar() {
  return `<nav class="navbar">
    <div class="tabs tabs-left">
      ${texts[lang].tabs.map(tab => `<button class="tab-btn${currentTab===tab.id?' active':''}" onclick="switchTab('${tab.id}')">${tab.label}</button>`).join('')}
    </div>
    <div class="lang-switcher">
      <button class="lang-switch-btn" onclick="backToLanguageSelection()">
        ${texts[lang].changeLang}
      </button>
    </div>
  </nav>`;
}

function renderHome() {
  const animationKey = `home-${lang}`;
  const hasAnimated = animationsPlayed.has(animationKey);
  return `<section class="section home-anon ${hasAnimated ? '' : 'fade-in'}" data-animation="${animationKey}">
    <div class="anon-mask"></div>
    <div class="section-title">${texts[lang].homeTitle} <span style="color:#fff">LINARC</span></div>
    <div class="section-text">${texts[lang].homeSubtitle}<br><span class='anon-quote'>${texts[lang].homeQuote}</span></div>
    <div class="manifesto">${texts[lang].homeManifesto}</div>
  </section>`;
}

function renderManifesto() {
  const animationKey = `manifesto-${lang}`;
  const hasAnimated = animationsPlayed.has(animationKey);
  return `<section class="section ${hasAnimated ? '' : 'fade-in'}" data-animation="${animationKey}">
    <div class="section-title">${texts[lang].manifestoTitle}</div>
    <div class="section-text">${texts[lang].manifestoText}<br><span class='anon-quote'>${texts[lang].manifestoQuote}</span></div>
    <div class="manifesto">${texts[lang].manifestoManifesto}</div>
  </section>`;
}

function renderNoticias() {
  // Ordena as notícias por data decrescente (mais recente primeiro)
  const noticiasOrdenadas = texts[lang].noticias.slice().sort((a, b) => {
    const parse = (d) => {
      if (lang === 'pt') {
        const [dia, mes, ano] = d.data.split('/');
        return new Date(`20${ano}-${mes}-${dia}`);
      } else {
        const [mes, dia, ano] = d.data.split('/');
        return new Date(`20${ano}-${mes}-${dia}`);
      }
    };
    return parse(b) - parse(a);
  });
  
  const animationKey = `noticias-${lang}`;
  const hasAnimated = animationsPlayed.has(animationKey);
  return `<section class="noticias-section ${hasAnimated ? '' : 'fade-in'}" data-animation="${animationKey}">
    <div class="section-title">${texts[lang].noticiasTitle}</div>
    <div class="noticias-list">
      ${noticiasOrdenadas.map((n, i) => {
        const likes = getLikes(n.id);
        const userLiked = hasLiked(n.id);
        const cardAnimationKey = `noticia-${n.id}-${lang}`;
        const cardHasAnimated = animationsPlayed.has(cardAnimationKey);
        return `
          <div class="noticia-card ${cardHasAnimated ? '' : 'fade-in'}" data-animation="${cardAnimationKey}" onclick="abrirNoticia(${i})">
          <div class="noticia-titulo">${n.titulo}</div>
          <div class="noticia-data">${n.data}</div>
          <div class="noticia-resumo">${n.resumo}</div>
            <div class="noticia-actions">
          <button class="noticia-btn" onclick="event.stopPropagation(); abrirNoticia(${i})">${texts[lang].noticiaBtn}</button>
              <div class="like-section" onclick="event.stopPropagation(); likeNews('${n.id}')">
                <button class="like-btn ${userLiked ? 'liked' : ''}">
                  ${userLiked ? '❤️' : '🤍'} ${texts[lang][userLiked ? 'likedBtn' : 'likeBtn']}
                </button>
                <span class="like-count">${likes}</span>
        </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    ${noticiaAberta !== null ? renderNoticiaModal(noticiaAberta, noticiasOrdenadas) : ''}
  </section>`;
}

function renderNoticiaModal(idx, noticiasArr) {
  const arr = noticiasArr || texts[lang].noticias;
  const n = arr[idx];
  const likes = getLikes(n.id);
  const userLiked = hasLiked(n.id);
  
  return `<div class="noticia-modal-bg" onclick="fecharNoticia(event)">
    <div class="noticia-modal fade-in-modal" onclick="event.stopPropagation()">
      <div class="noticia-modal-titulo">${n.titulo}</div>
      <div class="noticia-modal-data">${n.data}</div>
      <div class="noticia-modal-conteudo">${n.conteudo}</div>
      <div class="modal-actions">
      <button class="noticia-modal-fechar" onclick="fecharNoticia(event)">${texts[lang].noticiaFechar}</button>
        <div class="like-section" onclick="likeNews('${n.id}')">
          <button class="like-btn ${userLiked ? 'liked' : ''}">
            ${userLiked ? '❤️' : '🤍'} ${texts[lang][userLiked ? 'likedBtn' : 'likeBtn']}
          </button>
          <span class="like-count">${likes}</span>
        </div>
      </div>
    </div>
  </div>`;
}

function renderQuemSomos() {
  const animationKey = `quemSomos-${lang}`;
  const hasAnimated = animationsPlayed.has(animationKey);
  return `<section class="section ${hasAnimated ? '' : 'fade-in'}" data-animation="${animationKey}">
    <div class="section-title">${texts[lang].quemSomosTitle}</div>
    <div class="section-text">${texts[lang].quemSomosText}</div>
  </section>`;
}

function renderAbout() {
  const animationKey = `about-${lang}`;
  const hasAnimated = animationsPlayed.has(animationKey);
  return `<section class="section ${hasAnimated ? '' : 'fade-in'}" data-animation="${animationKey}">
    <div class="section-title">${texts[lang].aboutTitle}</div>
    <div class="section-text">${texts[lang].aboutText}</div>
    <div class="about-extra">${texts[lang].aboutExtra}</div>
  </section>`;
}

function renderLegal() {
  const animationKey = `legal-${lang}`;
  const hasAnimated = animationsPlayed.has(animationKey);
  return `<section class="section ${hasAnimated ? '' : 'fade-in'}" data-animation="${animationKey}">
    <div class="section-title">${texts[lang].legalTitle}</div>
    <div class="section-text legal-text">${texts[lang].legalText}</div>
  </section>`;
}

// Função para alternar entre as sub-seções de Lançamentos
function switchLancamentoTab(tabName) {
  // Remover classe active de todas as tabs e conteúdos
  document.querySelectorAll('.lancamento-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.lancamento-section').forEach(content => content.classList.remove('active'));
  
  // Adicionar classe active na tab e conteúdo selecionados
  document.querySelector(`.lancamento-tab[onclick*="${tabName}"]`).classList.add('active');
  document.getElementById(`${tabName}-content`).classList.add('active');
}

function renderLancamentos() {
  const animationKey = 'lancamentos';
  const hasAnimated = animationsPlayed.has(animationKey);
  
  return `<section class="section ${hasAnimated ? '' : 'fade-in'}" data-animation="${animationKey}">
    <div class="section-title">${texts[lang].lancamentosTitle}</div>
    <div class="section-text">
      <div class="lancamentos-container">
        <!-- Mini-tabs para sub-seções -->
        <div class="lancamento-tabs">
          <button class="lancamento-tab active" onclick="switchLancamentoTab('programas')">
            ${texts[lang].programasTitle}
          </button>
          <button class="lancamento-tab" onclick="switchLancamentoTab('linarc')">
            ${texts[lang].linarcTitle}
          </button>
        </div>
        
        <!-- Conteúdo das sub-seções -->
        <div class="lancamento-content">
          <!-- Seção Programas -->
          <div id="programas-content" class="lancamento-section active">
            <div class="lancamento-subtitle">${texts[lang].pentestingTitle}</div>
            <div class="programa-card">
              <p>${texts[lang].pentestingDesc}</p>
              
              <!-- Formulário de envio -->
              <div class="form-container">
                <div class="form-group">
                  <label>${texts[lang].formLink}:</label>
                  <input type="url" id="siteLink" placeholder="https://exemplo.com" required>
                </div>
                <div class="form-group">
                  <label>${texts[lang].formObs}:</label>
                  <textarea id="siteObs" placeholder="Observações sobre o site..."></textarea>
                </div>
                <div class="form-group">
                  <label>${texts[lang].formContact}:</label>
                  <input type="text" id="siteContact" placeholder="Email ou contato">
                </div>
                <button class="submit-btn" onclick="submitSite()">${texts[lang].formSubmit}</button>
              </div>
              
              <!-- Cofre secreto -->
              <div class="cofre-section">
                <div class="cofre-trigger" onclick="toggleCofre()">
                  <span class="cofre-letter">P</span>
                  <span class="cofre-text">${texts[lang].cofreTitle}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Seção Linarc -->
          <div id="linarc-content" class="lancamento-section">
            <div class="lancamento-subtitle">${texts[lang].antivirusTitle}</div>
            <div class="programa-card">
              <p>${texts[lang].antivirusDesc}</p>
              <button class="download-btn soon" disabled>
                ${texts[lang].downloadSoon}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal do Cofre (fora da estrutura principal) -->
      <div id="cofreModal" class="cofre-modal" style="display: none;">
        <div class="cofre-content">
          <h4>${texts[lang].cofreTitle}</h4>
          <div class="password-input">
            <input type="password" id="cofrePassword" placeholder="${texts[lang].cofrePassword}">
            <button onclick="openCofre()">${texts[lang].cofreOpen}</button>
          </div>
          <div id="cofreContent" class="cofre-sites" style="display: none;">
            <h5>Sites no Cofre:</h5>
            <div id="sitesList" class="sites-list">
              <p class="cofre-empty">${texts[lang].cofreEmpty}</p>
            </div>
          </div>
          <button class="close-btn" onclick="toggleCofre()">×</button>
        </div>
      </div>
    </div>
  </section>`;
}

function switchTab(tab) {
  currentTab = tab;
  noticiaAberta = null;
  
  renderApp();
}

window.switchTab = switchTab;

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent) || window.matchMedia('(max-width: 700px)').matches;
}

function setDeviceClass() {
  const body = document.body;
  if (isMobileDevice()) {
    body.classList.add('mobile-ui');
    body.classList.remove('desktop-ui');
  } else {
    body.classList.add('desktop-ui');
    body.classList.remove('mobile-ui');
  }
}

window.addEventListener('resize', setDeviceClass);
window.addEventListener('orientationchange', setDeviceClass);

function renderApp() {
  setDeviceClass();
  if (!lang) {
    app.innerHTML = renderLangSelector();
    setTimeout(applyAnimations, 50);
    return;
  }
  
  if (!texts[lang]) lang = 'en';
  
  app.innerHTML = renderNavbar() + '<div class="main-content anon-bg">' +
    (currentTab==='home'?renderHome():
    currentTab==='manifesto'?renderManifesto():
    currentTab==='noticias'?renderNoticias():
    currentTab==='quemSomos'?renderQuemSomos():
    currentTab==='about'?renderAbout():
    currentTab==='legal'?renderLegal():
    currentTab==='lancamentos'?renderLancamentos():
    '') + '</div>';
    
  setTimeout(applyAnimations, 50);
}

// Animações extras
function applyAnimations() {
  document.querySelectorAll('.anon-mask').forEach(el => {
    el.innerHTML = `<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="45" cy="45" rx="44" ry="44" stroke="#fff" stroke-width="2" fill="#111"/><path d="M30 40 Q45 60 60 40" stroke="#fff" stroke-width="2" fill="none"/><ellipse cx="36" cy="38" rx="3" ry="2" fill="#fff"/><ellipse cx="54" cy="38" rx="3" ry="2" fill="#fff"/><path d="M38 50 Q45 55 52 50" stroke="#fff" stroke-width="2" fill="none"/></svg>`;
  });
  
  document.querySelectorAll('.anon-bg').forEach(el => {
    el.style.background = 'radial-gradient(ellipse at center, #222 0%, #111 100%)';
  });
  
  // Marca animações como executadas
  document.querySelectorAll('[data-animation]').forEach(el => {
    const animationKey = el.getAttribute('data-animation');
    if (!animationsPlayed.has(animationKey)) {
      animationsPlayed.add(animationKey);
    }
  });
  
  // GFX linhas e partículas
  if (!document.getElementById('gfx-bg')) {
    const gfx = document.createElement('div');
    gfx.id = 'gfx-bg';
    gfx.innerHTML = `<canvas id='gfx-canvas'></canvas>`;
    document.body.appendChild(gfx);
    setTimeout(initGfx, 100);
  }
}

// GFX globais
function initGfx() {
  const canvas = document.getElementById('gfx-canvas');
  if (!canvas) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  
  let lines = [];
  for (let i = 0; i < 18; i++) {
    lines.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: 80 + Math.random() * 120,
      angle: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.4,
      alpha: 0.08 + Math.random() * 0.08
    });
  }
  
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (const l of lines) {
      ctx.save();
      ctx.globalAlpha = l.alpha;
      ctx.strokeStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(l.x + Math.cos(l.angle) * l.len, l.y + Math.sin(l.angle) * l.len);
      ctx.lineWidth = 1.2;
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();
      
      l.x += Math.cos(l.angle) * l.speed;
      l.y += Math.sin(l.angle) * l.speed;
      
      if (l.x < -200 || l.x > canvas.width+200 || l.y < -200 || l.y > canvas.height+200) {
        l.x = Math.random() * canvas.width;
        l.y = Math.random() * canvas.height;
      }
    }
    requestAnimationFrame(draw);
  }
  
  draw();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
} 

// Funções do sistema de cofre
let sitesCofre = [];
const COFRE_PASSWORD = '7733L';

function submitSite() {
  const link = document.getElementById('siteLink').value;
  const obs = document.getElementById('siteObs').value;
  const contact = document.getElementById('siteContact').value;
  
  if (!link || !contact) {
    alert('Por favor, preencha o link e contato obrigatórios.');
    return;
  }
  
  const site = {
    id: Date.now(),
    link: link,
    obs: obs || 'Sem observações',
    contact: contact,
    date: new Date().toISOString(),
    status: 'Pendente'
  };
  
  sitesCofre.push(site);
  localStorage.setItem('linarc_sites', JSON.stringify(sitesCofre));
  
  // Limpar formulário
  document.getElementById('siteLink').value = '';
  document.getElementById('siteObs').value = '';
  document.getElementById('siteContact').value = '';
  
  alert(texts[lang].formSuccess);
}

function toggleCofre() {
  const modal = document.getElementById('cofreModal');
  modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
  
  if (modal.style.display === 'flex') {
    // Carregar sites salvos
    const saved = localStorage.getItem('linarc_sites');
    if (saved) {
      sitesCofre = JSON.parse(saved);
    }
  }
}

function openCofre() {
  const password = document.getElementById('cofrePassword').value;
  
  if (password === COFRE_PASSWORD) {
    document.getElementById('cofreContent').style.display = 'block';
    document.getElementById('cofrePassword').value = '';
    renderSitesList();
  } else {
    alert('Senha incorreta!');
  }
}

function renderSitesList() {
  const sitesList = document.getElementById('sitesList');
  
  if (sitesCofre.length === 0) {
    sitesList.innerHTML = `<p class="cofre-empty">${texts[lang].cofreEmpty}</p>`;
    return;
  }
  
  const sitesHTML = sitesCofre.map(site => `
    <div class="site-item">
      <div class="site-info">
        <strong>${site.link}</strong>
        <small>${new Date(site.date).toLocaleDateString()}</small>
      </div>
      <div class="site-details">
        <p><strong>Contato:</strong> ${site.contact}</p>
        <p><strong>Observações:</strong> ${site.obs}</p>
        <p><strong>Status:</strong> <span class="status-${site.status.toLowerCase()}">${site.status}</span></p>
      </div>
    </div>
  `).join('');
  
  sitesList.innerHTML = sitesHTML;
}

// Funções para abrir e fechar notícias
function abrirNoticia(idx) {
  noticiaAberta = idx;
  renderApp();
}

function fecharNoticia(event) {
  if (event) {
    event.stopPropagation();
  }
  noticiaAberta = null;
  renderApp();
}

// Funções globais
window.submitSite = submitSite;
window.toggleCofre = toggleCofre;
window.openCofre = openCofre;
window.switchLancamentoTab = switchLancamentoTab;
window.abrirNoticia = abrirNoticia;
window.fecharNoticia = fecharNoticia;

// Contagem regressiva
function initCountdown() {
  // Data final: 16 de agosto de 2025 às 19:11
  const targetDate = new Date('2025-08-16T19:11:00');
  
  function updateCountdown() {
    const now = new Date();
    const timeLeft = targetDate - now;
    
    if (timeLeft <= 0) {
      // Contagem acabou, esconder overlay
      const overlay = document.getElementById('countdown-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
      return;
    }
    
    // Calcular dias, horas, minutos e segundos
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Atualizar elementos
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
  }
  
  // Atualizar imediatamente
  updateCountdown();
  
  // Atualizar a cada segundo
  setInterval(updateCountdown, 1000);
}

// Inicialização
function init() {
  console.log('🚀 Inicializando LINARC...');
  
  // Inicializar contagem regressiva
  initCountdown();
  
  // Carregar idioma salvo ou mostrar seleção
  loadSavedLanguage();
}

init(); 