-- Criação das tabelas do Guia Gastronômico de São Luís (PRD v2, seção 8).
-- Pode ser executado várias vezes: apaga e recria as tabelas.

DROP TABLE IF EXISTS avaliacoes CASCADE;
DROP TABLE IF EXISTS estabelecimentos CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

CREATE TABLE usuarios (
  id         SERIAL PRIMARY KEY,
  nome       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL,
  perfil     TEXT NOT NULL DEFAULT 'usuario' CHECK (perfil IN ('usuario', 'admin')),
  criado_em  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE categorias (
  id   SERIAL PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE
);

-- Uma categoria com estabelecimentos não pode ser excluída (RESTRICT).
CREATE TABLE estabelecimentos (
  id           SERIAL PRIMARY KEY,
  nome         TEXT NOT NULL,
  descricao    TEXT,
  endereco     TEXT NOT NULL,
  horario      TEXT NOT NULL,
  faixa_preco  TEXT NOT NULL CHECK (faixa_preco IN ('$', '$$', '$$$')),
  imagem       TEXT,
  categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT
);

-- Nota de 1 a 5; um usuário avalia cada estabelecimento uma única vez;
-- ao excluir o estabelecimento (ou o usuário), as avaliações dele são excluídas.
CREATE TABLE avaliacoes (
  id                 SERIAL PRIMARY KEY,
  usuario_id         INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  estabelecimento_id INTEGER NOT NULL REFERENCES estabelecimentos(id) ON DELETE CASCADE,
  nota               INTEGER NOT NULL CHECK (nota BETWEEN 1 AND 5),
  comentario         TEXT NOT NULL,
  data               TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (usuario_id, estabelecimento_id)
);

CREATE INDEX idx_estabelecimentos_categoria ON estabelecimentos(categoria_id);
CREATE INDEX idx_avaliacoes_estabelecimento ON avaliacoes(estabelecimento_id);
