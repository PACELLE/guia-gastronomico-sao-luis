# Relatório da Sprint 2 (S2)

Guia Gastronômico de São Luís · DSW (EECP0036) · Turma 24N12 · 2026.2

**Link do repositório:** https://github.com/PACELLE/guia-gastronomico-sao-luis · **Link funcionando (se houver):** nenhum (o sistema roda localmente) · **Commit ou tag desta entrega:** add818e (último commit de código da S2)

## 1. Planejado e feito

| RF | Descrição curta | Prioridade | Responsável (nome) | Planejado | Feito? |
|---|---|---|---|---|---|
| RF01 | listar estabelecimentos | essencial | Pedro Augusto Sousa Noleto e João Gabriel de Oliveira Lopes | sim | sim |
| RF02 | buscar por nome | essencial | Pacelle Henrique Parnaíba Sobral e Victor Eduard Rodrigues Cabral | sim | sim |
| RF04 | mostrar detalhes | essencial | Tereza Clarice da Silva Rocha e Rhaynon Carvalho Soares | sim | sim |
| RF03 | filtrar por categoria | importante | Victor Eduard Rodrigues Cabral e Rhaynon Carvalho Soares | adiantado | sim (não entra na conta: não é essencial) |

Também entregue: servidor Express, tabelas do banco e dados de exemplo (planejados para esta sprint).

**Conta da meta:** essenciais funcionando = 3 de 8 = 37,5% (mínimo da sprint: 25% de 8 = 2). Só conta o RF que passa no critério de aceite, no código enviado. As telas de login, cadastro e avaliar continuam sendo protótipo (sem lógica) e não entram na conta.

## 2. Roteiro de teste (um por RF entregue)

| RF | Passos | Resultado esperado | Resultado obtido |
|---|---|---|---|
| RF01 | Abrir a página inicial com os 3 estabelecimentos de exemplo no banco | 3 cartões com nome, categoria e nota | ok |
| RF01 | Abrir a página inicial com o banco vazio | "Nenhum estabelecimento cadastrado" | ok |
| RF02 | Buscar "cuxá" | Só "Casa do Cuxá" | ok |
| RF02 | Buscar "PEIXARIA" | Só "Peixaria Ponta d'Areia" | ok |
| RF02 | Buscar "xyz" | "Nenhum estabelecimento encontrado" | ok |
| RF04 | "Ver Detalhes" da Casa do Cuxá | Descrição, endereço, horário, faixa de preço, categoria e avaliações | ok |
| RF04 | Abrir o estabelecimento de id 999 | "Estabelecimento não encontrado" | ok |
| Banco | Nota 6, e-mail repetido, avaliação duplicada e excluir categoria em uso (pgAdmin) | O banco recusa os 4 | ok (4 erros de restrição) |
| RNF05 | Inserir uma categoria, reiniciar o servidor e consultar | A categoria continua lá | ok |
| Erro | Parar o servidor e digitar na busca | "Não foi possível carregar os estabelecimentos. Tente novamente." | ok |

## 3. O que a equipe aprendeu

O PowerShell bloqueou o `npm` (scripts desabilitados); passamos a usar `npm.cmd`. Depois de recriar o banco, o pgAdmin mostrou "objeto não encontrado" até atualizar a árvore (Refresh). Deixamos a usuária Marina fora dos dados de exemplo, para o teste do RF05 poder criá-la. Fica para a S3: cadastro, login e avaliar (RF05, RF06, RF07).

## 4. Uso de IA

Claude (Anthropic): escreveu o servidor Express, o banco (`schema.sql` e `seed.sql`), as rotas da API e o JavaScript das telas de RF01, RF02 e RF04. A equipe rodou o sistema, testou cada RF pelo critério de aceite do PRD (inclusive busca vazia, id inexistente, banco vazio e servidor desligado), conferiu as regras do banco no pgAdmin e tirou os prints deste relatório.
