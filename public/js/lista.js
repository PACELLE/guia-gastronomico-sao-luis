// Página inicial: lista, busca por nome e filtro por categoria (RF01, RF02, RF03).
// Os dados vêm da API (GET /api/estabelecimentos) e são exibidos com textContent.

const campoBusca = document.getElementById('busca');
const botoesFiltro = document.querySelectorAll('.filtros button');
const areaLista = document.getElementById('lista');
const areaMensagem = document.getElementById('mensagem');

const ESPERA_DA_BUSCA_MS = 250;

let categoriaAtual = '';
let numeroDaUltimaConsulta = 0;
let temporizadorDaBusca;

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

function mostrarLista(lista, estaFiltrando) {
  areaLista.replaceChildren(...lista.map(criarCartao));
  if (lista.length > 0) {
    areaMensagem.textContent = '';
  } else if (estaFiltrando) {
    areaMensagem.textContent = 'Nenhum estabelecimento encontrado';
  } else {
    areaMensagem.textContent = 'Nenhum estabelecimento cadastrado';
  }
}

function mostrarErro() {
  areaLista.replaceChildren();
  areaMensagem.textContent = 'Não foi possível carregar os estabelecimentos. Tente novamente.';
}

async function carregarLista() {
  const numeroDestaConsulta = ++numeroDaUltimaConsulta;
  const busca = campoBusca.value.trim();

  const parametros = new URLSearchParams();
  if (busca) {
    parametros.set('busca', busca);
  }
  if (categoriaAtual) {
    parametros.set('categoria', categoriaAtual);
  }

  try {
    const resposta = await fetch(`/api/estabelecimentos?${parametros}`);
    if (!resposta.ok) {
      throw new Error(`Resposta ${resposta.status}`);
    }
    const lista = await resposta.json();
    // Se o usuário digitou de novo enquanto esperava, ignora a resposta antiga.
    if (numeroDestaConsulta !== numeroDaUltimaConsulta) {
      return;
    }
    mostrarLista(lista, Boolean(busca || categoriaAtual));
  } catch (erro) {
    if (numeroDestaConsulta === numeroDaUltimaConsulta) {
      mostrarErro();
    }
  }
}

function escolherCategoria(botao) {
  categoriaAtual = botao.dataset.categoria;
  botoesFiltro.forEach((outro) => {
    outro.setAttribute('aria-pressed', String(outro === botao));
  });
  carregarLista();
}

campoBusca.addEventListener('input', () => {
  clearTimeout(temporizadorDaBusca);
  temporizadorDaBusca = setTimeout(carregarLista, ESPERA_DA_BUSCA_MS);
});

botoesFiltro.forEach((botao) => {
  botao.addEventListener('click', () => escolherCategoria(botao));
});

carregarLista();
