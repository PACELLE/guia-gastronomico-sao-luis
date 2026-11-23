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

// GET /api/estabelecimentos/:id  (RF04)
router.get('/:id', async (req, res) => {
  try {
    // Só aceita número inteiro positivo; qualquer outro valor é "não encontrado".
    if (!/^[1-9]\d{0,8}$/.test(req.params.id)) {
      return res.status(404).json({ erro: 'Estabelecimento não encontrado' });
    }
    const estabelecimento = await modelo.buscarPorId(Number(req.params.id));
    if (!estabelecimento) {
      return res.status(404).json({ erro: 'Estabelecimento não encontrado' });
    }
    res.json(estabelecimento);
  } catch (erro) {
    console.error('Erro ao buscar estabelecimento:', erro.message);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

module.exports = router;
