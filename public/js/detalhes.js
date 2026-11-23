// Tela de detalhes: mostra um estabelecimento e suas avaliações (RF04).
// O id vem do endereço (estabelecimentos.html?id=1) e os dados da API
// (GET /api/estabelecimentos/:id). Todo texto é exibido com textContent.

const areaMensagem = document.getElementById('mensagem');
const areaDetalhes = document.getElementById('detalhes');
const listaAvaliacoes = document.getElementById('lista-avaliacoes');

function mostrarMensagem(texto) {
  areaDetalhes.hidden = true;
  areaMensagem.textContent = texto;
}

function criarAvaliacao(avaliacao) {
  const bloco = criarElemento('article', undefined, 'avaliacao');
  bloco.appendChild(criarElemento('p', `Nota: ${avaliacao.nota} de 5`, 'avaliacao-nota'));
  bloco.appendChild(criarElemento('p', `"${avaliacao.comentario}"`, 'avaliacao-comentario'));
  bloco.appendChild(
    criarElemento('p', `— Por ${avaliacao.autor} em ${formatarData(avaliacao.data)}`, 'avaliacao-autor')
  );
  return bloco;
}

function preencherDetalhes(estabelecimento) {
  document.title = `${estabelecimento.nome} - Guia Gastronômico de São Luís`;
  document.getElementById('nome').textContent = estabelecimento.nome;
  document.getElementById('categoria').textContent = estabelecimento.categoria;
  document.getElementById('endereco').textContent = estabelecimento.endereco;
  document.getElementById('horario').textContent = estabelecimento.horario;
  document.getElementById('faixa-preco').textContent = formatarFaixaPreco(estabelecimento.faixa_preco);
  document.getElementById('descricao').textContent = estabelecimento.descricao || 'Sem descrição.';
  document.getElementById('nota-media').textContent = formatarNota(
    estabelecimento.media,
    estabelecimento.total_avaliacoes
  );
  document.getElementById('link-avaliar').href = `avaliar.html?id=${estabelecimento.id}`;

  listaAvaliacoes.replaceChildren(...estabelecimento.avaliacoes.map(criarAvaliacao));

  areaMensagem.textContent = '';
  areaDetalhes.hidden = false;
}

async function carregarDetalhes() {
  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) {
    mostrarMensagem('Estabelecimento não encontrado');
    return;
  }

  try {
    const resposta = await fetch(`/api/estabelecimentos/${encodeURIComponent(id)}`);
    if (resposta.status === 404) {
      mostrarMensagem('Estabelecimento não encontrado');
      return;
    }
    if (!resposta.ok) {
      throw new Error(`Resposta ${resposta.status}`);
    }
    preencherDetalhes(await resposta.json());
  } catch (erro) {
    mostrarMensagem('Não foi possível carregar o estabelecimento. Tente novamente.');
  }
}

carregarDetalhes();
