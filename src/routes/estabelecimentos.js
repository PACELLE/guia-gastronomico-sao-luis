// Rotas da API de estabelecimentos (o "Controller" do MVC).
const express = require('express');
const modelo = require('../models/estabelecimentos');

const router = express.Router();

// GET /api/estabelecimentos  (RF01)
router.get('/', async (req, res) => {
  try {
    res.json(await modelo.listar());
  } catch (erro) {
    console.error('Erro ao listar estabelecimentos:', erro.message);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

module.exports = router;
