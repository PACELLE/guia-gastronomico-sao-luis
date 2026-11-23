// Rotas da API de estabelecimentos (o "Controller" do MVC).
const express = require('express');
const modelo = require('../models/estabelecimentos');

const router = express.Router();

function textoDaConsulta(valor) {
  return typeof valor === 'string' ? valor.trim() : '';
}

// GET /api/estabelecimentos?busca=&categoria=  (RF01, RF02)
router.get('/', async (req, res) => {
  try {
    const lista = await modelo.listar({
      busca: textoDaConsulta(req.query.busca),
      categoria: textoDaConsulta(req.query.categoria),
    });
    res.json(lista);
  } catch (erro) {
    console.error('Erro ao listar estabelecimentos:', erro.message);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

module.exports = router;
