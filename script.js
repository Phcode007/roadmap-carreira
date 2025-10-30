// ========================================
// DADOS DAS FASES DO ROADMAP
// ========================================
// Estrutura centralizada para facilitar manutenção e atualizações
const phases = [
  {
    title: "Preparação",
    duration: "0-3 meses",
    icon: "📚",
    description: "Fase intensiva de estudos e construção de portfólio:",
    items: [
      "Estudo diário: JavaScript, NestJS, NextJS, React",
      "Desenvolver 2 projetos completos com deploy",
      "GitHub ativo com commits constantes",
      "Networking e aplicações diárias para vagas",
    ],
  },
  {
    title: "Dev Full Stack Júnior",
    duration: "0-3 anos",
    icon: "💻",
    description: "Consolidação de conhecimentos e práticas profissionais:",
    items: [
      "Consolidação de fundamentos técnicos",
      "Aplicação de boas práticas e otimização",
      "Participação ativa em comunidades e eventos",
      "Primeiras contribuições em projetos open source",
    ],
  },
  {
    title: "Dev Pleno",
    duration: "3-6 anos",
    icon: "⚡",
    description: "Evolução técnica e compartilhamento de conhecimento:",
    items: [
      "Mentoria de desenvolvedores iniciantes",
      "Estudos avançados de arquitetura e testes",
      "Criação de conteúdo técnico (blogs, talks)",
      "Melhoria de documentação e processos",
    ],
  },
  {
    title: "Dev Sênior",
    duration: "6-8 anos",
    icon: "🎯",
    description: "Liderança técnica e decisões estratégicas:",
    items: [
      "Liderança técnica em projetos complexos",
      "Tomada de decisões arquiteturais críticas",
      "Code Review e garantia de qualidade",
      "Inovação contínua e pesquisa de tecnologias",
    ],
  },
  {
    title: "Tech Lead",
    duration: "Objetivo Final",
    icon: "👑",
    description: "Gestão estratégica de equipes e produtos:",
    items: [
      "Gestão de equipe e produto técnico",
      "Coordenação técnica entre múltiplos times",
      "Comunicação clara com stakeholders",
      "Visão de longo prazo e roadmap tecnológico",
    ],
  },
];

// ========================================
// SELEÇÃO DE ELEMENTOS DO DOM
// ========================================
const timelineItems = document.querySelectorAll(".timeline-item");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDuration = document.getElementById("modalDuration");
const modalDescription = document.getElementById("modalDescription");

// ========================================
// FUNÇÕES PRINCIPAIS
// ========================================

/**
 * Alterna a visibilidade dos detalhes do card (modo desktop)
 * Remove 'active' de outros cards antes de ativar o clicado
 * @param {HTMLElement} item - O item da timeline clicado
 */
function toggleCard(item) {
  const content = item.querySelector(".timeline-content");
  const isActive = content.classList.contains("active");

  // Remove active de todos os outros cards
  document.querySelectorAll(".timeline-content").forEach((card) => {
    card.classList.remove("active");
  });

  // Toggle do card clicado (se não estava ativo, ativa)
  if (!isActive) {
    content.classList.add("active");
  }
}

/**
 * Abre o modal com os detalhes da fase (modo mobile)
 * Popula o modal com dados do array phases
 * @param {number} phaseIndex - Índice da fase no array phases
 */
function openModal(phaseIndex) {
  const phase = phases[phaseIndex];

  // Define título com ícone
  modalTitle.textContent = phase.icon + " " + phase.title;
  modalDuration.textContent = phase.duration;

  // Monta a descrição com lista HTML
  let descriptionHTML = `<p>${phase.description}</p><ul>`;
  phase.items.forEach((item) => {
    descriptionHTML += `<li>${item}</li>`;
  });
  descriptionHTML += "</ul>";

  modalDescription.innerHTML = descriptionHTML;
  modal.classList.add("active");
}

/**
 * Detecta se o dispositivo está em modo mobile
 * @returns {boolean} - true se largura <= 768px
 */
function isMobile() {
  return window.innerWidth <= 768;
}

/**
 * Fecha o modal removendo a classe 'active'
 */
function closeModal() {
  modal.classList.remove("active");
}

// ========================================
// EVENT LISTENERS
// ========================================

/**
 * Configura listeners para cada item da timeline
 * Comportamento diferente para desktop (toggle card) e mobile (modal)
 */
timelineItems.forEach((item, index) => {
  // Click no card inteiro
  item.addEventListener("click", (e) => {
    // Previne propagação se clicar diretamente no ícone
    if (e.target.classList.contains("timeline-icon")) {
      return;
    }

    const phaseIndex = parseInt(item.dataset.phase);

    if (isMobile()) {
      openModal(phaseIndex);
    } else {
      toggleCard(item);
    }
  });

  // Click específico no ícone (funciona tanto em mobile quanto desktop)
  const icon = item.querySelector(".timeline-icon");
  icon.addEventListener("click", (e) => {
    e.stopPropagation(); // Previne duplo trigger
    const phaseIndex = parseInt(item.dataset.phase);

    if (isMobile()) {
      openModal(phaseIndex);
    } else {
      toggleCard(item);
    }
  });
});

/**
 * Fecha o modal ao clicar no botão X
 */
modalClose.addEventListener("click", closeModal);

/**
 * Fecha o modal ao clicar fora do conteúdo (backdrop)
 */
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

/**
 * Fecha o modal ao pressionar a tecla ESC
 */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

// ========================================
// RESPONSIVIDADE DINÂMICA
// ========================================

/**
 * Ajusta comportamento ao redimensionar a janela
 * Usa debounce para evitar múltiplas execuções
 */
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Fecha modal se mudou de mobile para desktop
    if (!isMobile() && modal.classList.contains("active")) {
      closeModal();
    }

    // Remove active dos cards se mudou de desktop para mobile
    if (isMobile()) {
      document.querySelectorAll(".timeline-content").forEach((card) => {
        card.classList.remove("active");
      });
    }
  }, 250); // Debounce de 250ms
});

// ========================================
// INICIALIZAÇÃO
// ========================================

/**
 * Log inicial para debug e confirmação de carregamento
 */
console.log("🚀 Roadmap de Carreira carregado com sucesso!");
console.log(`📱 Modo atual: ${isMobile() ? "Mobile" : "Desktop"}`);
console.log(`📊 Total de fases: ${phases.length}`);
