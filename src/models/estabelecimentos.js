// Consultas ao banco sobre estabelecimentos (o "Model" do MVC).
// Todas usam parâmetros ($1, $2...): nunca montam SQL com texto digitado (RNF02).
const { consultar } = require('../db');

// A nota média não é guardada: é calculada a partir das avaliações.
function converterNumero(valor) {
  return valor === null ? null : Number(valor);
}

function formatarEstabelecimento(linha) {
  return {
    ...linha,
    media: converterNumero(linha.media),
    total_avaliacoes: Number(linha.total_avaliacoes),
  };
}

// Evita que % e _ digitados na busca sejam tratados como curingas do SQL.
function escaparCuringas(texto) {
  return texto.replace(/[\\%_]/g, '\\$&');
}

// RF01 e RF02: lista os estabelecimentos, com busca opcional por parte do nome
// (sem diferenciar maiúsculas e minúsculas) e filtro opcional por categoria.
async function listar({ busca = '', categoria = '' } = {}) {
  const resultado = await consultar(
    `SELECT e.id,
            e.nome,
            c.nome AS categoria,
            ROUND(AVG(a.nota), 1) AS media,
            COUNT(a.id) AS total_avaliacoes
       FROM estabelecimentos e
       JOIN categorias c ON c.id = e.categoria_id
       LEFT JOIN avaliacoes a ON a.estabelecimento_id = e.id
      WHERE ($1 = '' OR e.nome ILIKE $2)
        AND ($3 = '' OR c.nome = $3)
      GROUP BY e.id, c.nome
      ORDER BY e.nome`,
    [busca, `%${escaparCuringas(busca)}%`, categoria]
  );
  return resultado.rows.map(formatarEstabelecimento);
}

// RF04: detalhes de um estabelecimento. Devolve null se o id não existe.
async function buscarPorId(id) {
  const detalhes = await consultar(
    `SELECT e.id,
            e.nome,
            e.descricao,
            e.endereco,
            e.horario,
            e.faixa_preco,
            e.imagem,
            c.nome AS categoria,
            ROUND(AVG(a.nota), 1) AS media,
            COUNT(a.id) AS total_avaliacoes
       FROM estabelecimentos e
       JOIN categorias c ON c.id = e.categoria_id
       LEFT JOIN avaliacoes a ON a.estabelecimento_id = e.id
      WHERE e.id = $1
      GROUP BY e.id, c.nome`,
    [id]
  );
  if (detalhes.rows.length === 0) {
    return null;
  }

  // RNF07: nas avaliações aparece só o primeiro nome; o e-mail nunca sai do servidor.
  const avaliacoes = await consultar(
    `SELECT a.id,
            a.nota,
            a.comentario,
            a.data,
            split_part(u.nome, ' ', 1) AS autor
       FROM avaliacoes a
       JOIN usuarios u ON u.id = a.usuario_id
      WHERE a.estabelecimento_id = $1
      ORDER BY a.data DESC`,
    [id]
  );

  return { ...formatarEstabelecimento(detalhes.rows[0]), avaliacoes: avaliacoes.rows };
}

module.exports = { listar, buscarPorId };
