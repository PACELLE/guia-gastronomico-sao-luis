// Funções de formatação usadas pelas páginas. Todas devolvem texto puro:
// quem exibe o resultado deve usar textContent (nunca innerHTML) - RNF08.

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
