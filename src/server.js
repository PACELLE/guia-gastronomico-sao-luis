// Servidor do Guia Gastronômico de São Luís (Express).
// Entrega as páginas da pasta public/ e responde à API em /api.
require('dotenv').config();

const path = require('path');
const express = require('express');

const app = express();
const PORTA = process.env.PORT || 3000;

// Lê o corpo das requisições em JSON (usado pelas rotas da API).
app.use(express.json());

// Entrega os arquivos HTML, CSS e JS do navegador.
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rota de teste: confirma que o servidor está no ar.
app.get('/api/saude', (req, res) => {
  res.json({ status: 'ok' });
});

// As rotas da API entram aqui (uma por assunto, em src/routes/).

// Qualquer outra rota /api responde 404 em JSON.
app.use('/api', (req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Só abre a porta quando o arquivo é executado direto (npm start), não quando importado.
if (require.main === module) {
  app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
  });
}

module.exports = app;
