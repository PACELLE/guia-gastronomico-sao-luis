// Recria as tabelas e carrega os dados de exemplo.
// Uso: npm run db:criar   (precisa do DATABASE_URL no arquivo .env)
// Atenção: apaga os dados que já existem nas tabelas do projeto.
const fs = require('fs');
const path = require('path');
const { pool } = require('../src/db');

async function executarArquivo(nome) {
  const sql = fs.readFileSync(path.join(__dirname, nome), 'utf8');
  await pool.query(sql);
  console.log(`OK: ${nome}`);
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL não definido. Copie .env.exemplo para .env e preencha.');
  }
  await executarArquivo('schema.sql');
  await executarArquivo('seed.sql');

  const resultado = await pool.query(
    `SELECT (SELECT COUNT(*) FROM usuarios) AS usuarios,
            (SELECT COUNT(*) FROM categorias) AS categorias,
            (SELECT COUNT(*) FROM estabelecimentos) AS estabelecimentos,
            (SELECT COUNT(*) FROM avaliacoes) AS avaliacoes`
  );
  console.log('Linhas criadas:', resultado.rows[0]);
}

main()
  .catch((erro) => {
    console.error('Erro ao criar o banco:', erro.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
