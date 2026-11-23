// Tela de avaliar (protótipo, RF07 entra na S3): mantém o id do estabelecimento
// nos links que levam de volta aos detalhes (avaliar.html?id=1 -> estabelecimentos.html?id=1).

const idDoEstabelecimento = new URLSearchParams(window.location.search).get('id');

if (idDoEstabelecimento) {
  const enderecoDosDetalhes = `estabelecimentos.html?id=${encodeURIComponent(idDoEstabelecimento)}`;

  document.querySelectorAll('a[data-detalhes]').forEach((link) => {
    link.href = enderecoDosDetalhes;
  });
  document.querySelectorAll('form[data-detalhes]').forEach((formulario) => {
    formulario.action = enderecoDosDetalhes;
  });
}
