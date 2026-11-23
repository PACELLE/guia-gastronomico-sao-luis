// Página inicial: lista de estabelecimentos (RF01).
// Os dados vêm da API (GET /api/estabelecimentos) e são exibidos com textContent.

const areaLista = document.getElementById('lista');
const areaMensagem = document.getElementById('mensagem');

function criarCartao(estabelecimento) {
  const cartao = criarElemento('article', undefined, 'card');
  cartao.appendChild(criarElemento('h2', estabelecimento.nome));
  cartao.appendChild(criarElemento('p', `Categoria: ${estabelecimento.categoria}`));
  cartao.appendChild(
    criarElemento('p', `Nota: ${formatarNota(estabelecimento.media, estabelecimento.total_avaliacoes)}`)
  );

  const link = criarElemento('a', 'Ver Detalhes');
  link.href = `estabelecimentos.html?id=${estabelecimento.id}`;
  link.setAttribute('aria-label', `Ver detalhes de ${estabelecimento.nome}`);
  cartao.appendChild(link);
  return cartao;
}

function mostrarLista(lista) {
  areaLista.replaceChildren(...lista.map(criarCartao));
  areaMensagem.textContent = lista.length > 0 ? '' : 'Nenhum estabelecimento cadastrado';
}

function mostrarErro() {
  areaLista.replaceChildren();
  areaMensagem.textContent = 'Não foi possível carregar os estabelecimentos. Tente novamente.';
}

async function carregarLista() {
  try {
    const resposta = await fetch('/api/estabelecimentos');
    if (!resposta.ok) {
      throw new Error(`Resposta ${resposta.status}`);
    }
    mostrarLista(await resposta.json());
  } catch (erro) {
    mostrarErro();
  }
}

carregarLista();
