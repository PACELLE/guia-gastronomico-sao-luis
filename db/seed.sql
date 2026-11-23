-- Dados de exemplo (FICTÍCIOS) usados nos critérios de aceite do PRD v2.
-- Antes de cadastrar estabelecimentos reais, conferir endereço e horário em fonte oficial.
--
-- Atenção:
--  * A usuária "Marina Costa" (marina@exemplo.com) NÃO entra aqui: o teste do RF05
--    cria essa conta, e o e-mail não pode existir antes.
--  * O RF07 e o RF10 usam a Marina para avaliar, então ela não tem avaliações aqui.
--  * As senhas abaixo são só marcadores, NÃO são hashes válidos: ninguém consegue
--    entrar com esses usuários. O login (RF06, S3) vai criar o administrador real
--    com hash bcrypt, em um script separado.

INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES
  ('Rafael Admin',  'admin@exemplo.com',  'SEM-LOGIN-marcador-de-exemplo', 'admin'),
  ('Carlos Mendes', 'carlos@exemplo.com', 'SEM-LOGIN-marcador-de-exemplo', 'usuario'),
  ('Ana Souza',     'ana@exemplo.com',    'SEM-LOGIN-marcador-de-exemplo', 'usuario'),
  ('Bruno Lima',    'bruno@exemplo.com',  'SEM-LOGIN-marcador-de-exemplo', 'usuario');

INSERT INTO categorias (nome) VALUES
  ('Comida Típica'),
  ('Frutos do Mar');

INSERT INTO estabelecimentos (nome, descricao, endereco, horario, faixa_preco, categoria_id) VALUES
  ('Casa do Cuxá',
   'Cozinha típica maranhense com arroz de cuxá, torta de camarão e juçara. (Dados fictícios)',
   'Rua da Estrela, 123 - Centro Histórico, São Luís - MA',
   'Terça a Domingo, das 11h às 22h',
   '$$',
   (SELECT id FROM categorias WHERE nome = 'Comida Típica')),
  ('Sabor da Ilha',
   'Pratos regionais em porções para dividir, com ambiente familiar. (Dados fictícios)',
   'Avenida Litorânea, 456 - Calhau, São Luís - MA',
   'Todos os dias, das 10h às 21h',
   '$',
   (SELECT id FROM categorias WHERE nome = 'Comida Típica')),
  ('Peixaria Ponta d''Areia',
   'Peixes e frutos do mar frescos, com peixada e camarão ao molho. (Dados fictícios)',
   'Avenida dos Holandeses, 789 - Ponta d''Areia, São Luís - MA',
   'Quarta a Segunda, das 11h às 23h',
   '$$$',
   (SELECT id FROM categorias WHERE nome = 'Frutos do Mar'));

-- Casa do Cuxá: notas 4, 5 e 5 -> "4,7 (3 avaliações)" (RF11).
-- Sabor da Ilha: 1 avaliação. Peixaria Ponta d'Areia: sem avaliações ("Sem avaliações ainda").
INSERT INTO avaliacoes (usuario_id, estabelecimento_id, nota, comentario, data) VALUES
  ((SELECT id FROM usuarios WHERE email = 'carlos@exemplo.com'),
   (SELECT id FROM estabelecimentos WHERE nome = 'Casa do Cuxá'),
   4, 'Arroz de cuxá muito bom e preço justo.', '2026-10-15 12:30:00'),
  ((SELECT id FROM usuarios WHERE email = 'ana@exemplo.com'),
   (SELECT id FROM estabelecimentos WHERE nome = 'Casa do Cuxá'),
   5, 'Excelente comida típica e ambiente agradável no Centro Histórico.', '2026-10-18 20:10:00'),
  ((SELECT id FROM usuarios WHERE email = 'bruno@exemplo.com'),
   (SELECT id FROM estabelecimentos WHERE nome = 'Casa do Cuxá'),
   5, 'Melhor torta de camarão que já comi.', '2026-10-20 13:05:00'),
  ((SELECT id FROM usuarios WHERE email = 'carlos@exemplo.com'),
   (SELECT id FROM estabelecimentos WHERE nome = 'Sabor da Ilha'),
   4, 'Porções grandes, dá para dividir.', '2026-10-22 19:40:00');
