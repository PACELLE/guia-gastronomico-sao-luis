// Funções de formatação usadas pelas páginas. Todas devolvem texto puro:
// quem exibe o resultado deve usar textContent (nunca innerHTML) - RNF08.

const NOMES_FAIXA_PRECO = {
  '$': 'Econômico ($)',
  '$$': 'Moderado ($$)',
  '$$$': 'Caro ($$$)',
};

// Ex.: formatarNota(4.7, 3) -> "4,7 (3 avaliações)"; sem avaliações -> "Sem avaliações ainda".
function formatarNota(media, total) {
  if (!total) {
    return 'Sem avaliações ainda';
  }
  const nota = Number(media).toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const rotulo = total === 1 ? 'avaliação' : 'avaliações';
  return `${nota} (${total} ${rotulo})`;
}

// Ex.: "2026-10-20T16:05:00.000Z" -> "20/10/2026"
function formatarData(dataIso) {
  return new Date(dataIso).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
}

function formatarFaixaPreco(faixa) {
  return NOMES_FAIXA_PRECO[faixa] || faixa;
}

// Cria um elemento com o texto já protegido (textContent).
function criarElemento(tag, texto, classe) {
  const elemento = document.createElement(tag);
  if (texto !== undefined) {
    elemento.textContent = texto;
  }
  if (classe) {
    elemento.className = classe;
  }
  return elemento;
}
