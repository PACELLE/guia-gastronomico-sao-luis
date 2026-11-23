// Conexão com o PostgreSQL. As consultas usam parâmetros ($1, $2...) para
// nunca montar SQL com texto digitado pelo usuário (RNF02).
require('dotenv').config();

const { Pool } = require('pg');

// Bancos online (Neon, Supabase, Render...) exigem conexão com SSL.
// Em DATABASE_SSL=true o SSL é ligado; no PostgreSQL local deixe em branco.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

function consultar(texto, parametros) {
  return pool.query(texto, parametros);
}

module.exports = { pool, consultar };
