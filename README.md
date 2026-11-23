# Guia Gastronômico de São Luís

Guia web de restaurantes de São Luís: lista os estabelecimentos com endereço, horário, faixa de preço e categoria, permite buscar e filtrar, e mostra a nota média dada pelos usuários.

Projeto da disciplina **Desenvolvimento de Sistemas Web (EECP0036)**, UFMA, turma 24N12, 2026.2.

## O que cada entrega trouxe

| Entrega | O que tem |
|---|---|
| PRD v1 e v2 | Requisitos, histórias, fluxos, dados, arquitetura, plano de sprints e riscos em [docs/PRD.md](docs/PRD.md) |
| S1 · protótipo | 5 telas em HTML e CSS, sem JavaScript, com dados de exemplo fixos (commit `b4f0828`) |
| **S2 · sprint 2** | Servidor Express, banco PostgreSQL com dados de exemplo e os RFs essenciais **RF01, RF02 e RF04** funcionando. O filtro por categoria (RF03, importante) também já funciona. Relatório em [docs/sprint-2.md](docs/sprint-2.md) |

Ainda **não** funcionam (entram na S3 e na entrega final): cadastro (RF05), login (RF06), avaliar (RF07), área do administrador (RF08), editar ou remover a própria avaliação (RF10) e os demais. As telas de login, cadastro e avaliar continuam sendo as do protótipo, sem lógica.

## Tecnologias

- Front-end: HTML5, CSS3 e JavaScript puro, sem frameworks.
- Back-end: Node.js com Express (monolito: um servidor entrega as páginas e responde à API).
- Banco de dados: PostgreSQL, com a biblioteca `pg`.
- Decisão e justificativa: seção 9 do [PRD](docs/PRD.md).

## Como rodar

### Pré-requisitos
- [Node.js](https://nodejs.org) versão 20 ou mais nova (LTS).
- [PostgreSQL](https://www.postgresql.org/download/) (testado com a versão 17). O instalador inclui o pgAdmin, uma interface gráfica para ver as tabelas.

### Passo a passo

1. Baixe o projeto e entre na pasta:
   ```
   git clone https://github.com/PACELLE/guia-gastronomico-sao-luis
   cd guia-gastronomico-sao-luis
   ```
2. Instale as dependências:
   ```
   npm install
   ```
3. Crie o banco `guia_gastronomico` (pelo pgAdmin, ou pelo `psql`):
   ```
   psql -U postgres -c "CREATE DATABASE guia_gastronomico;"
   ```
4. Copie o arquivo de configuração e preencha com a sua senha do PostgreSQL:
   ```
   copy .env.exemplo .env
   ```
   No `.env`, ajuste a linha `DATABASE_URL=postgresql://postgres:SUA_SENHA@localhost:5432/guia_gastronomico`.
5. Crie as tabelas e carregue os dados de exemplo:
   ```
   npm run db:criar
   ```
   O resultado esperado é `usuarios: 4, categorias: 2, estabelecimentos: 3, avaliacoes: 4`. **Atenção:** esse comando apaga e recria as tabelas.
6. Ligue o servidor:
   ```
   npm run dev
   ```
7. Abra **http://localhost:3000** no navegador.

### Se o `npm` for bloqueado no PowerShell
Em alguns computadores com Windows aparece "a execução de scripts foi desabilitada neste sistema". Use `npm.cmd` no lugar de `npm` (por exemplo, `npm.cmd install` e `npm.cmd run dev`). Não é preciso mudar nenhuma configuração do sistema.

### Para parar o servidor
`Ctrl + C` no terminal. Se o Windows perguntar "Deseja finalizar o arquivo em lotes (S/N)?", responda `S`.

## Telas

| Tela | Arquivo | RFs | Situação na S2 |
|---|---|---|---|
| Página inicial (lista, busca e filtro) | `public/index.html` | RF01, RF02, RF03 | Funcionando |
| Detalhes do estabelecimento | `public/estabelecimentos.html?id=1` | RF04, RF11 | Funcionando (a nota média e a lista de avaliações já aparecem) |
| Login | `public/login.html` | RF06 | Protótipo (sem lógica) |
| Cadastro | `public/cadastro.html` | RF05 | Protótipo (sem lógica) |
| Avaliar | `public/avaliar.html` | RF07 | Protótipo (sem lógica) |

## API

| Método e caminho | O que faz |
|---|---|
| `GET /api/estabelecimentos?busca=&categoria=` | Lista os estabelecimentos, com busca por parte do nome (sem diferenciar maiúsculas e minúsculas) e filtro por categoria. Devolve nome, categoria, nota média e total de avaliações |
| `GET /api/estabelecimentos/:id` | Detalhes de um estabelecimento e suas avaliações. Id inexistente responde `404` com "Estabelecimento não encontrado" |
| `GET /api/saude` | Teste rápido: confirma que o servidor está no ar |

## Estrutura de pastas

```
public/        páginas HTML, CSS e JavaScript do navegador
  js/          lista.js (RF01, RF02, RF03), detalhes.js (RF04), formatar.js
src/
  server.js    servidor Express
  db.js        conexão com o PostgreSQL
  routes/      rotas da API
  models/      consultas ao banco
db/
  schema.sql   cria as 4 tabelas
  seed.sql     dados de exemplo (fictícios)
  criar.js     roda os dois arquivos acima (npm run db:criar)
docs/          PRD, relatórios das sprints e diagramas
```

## Onde ficam os dados

Os dados ficam no **PostgreSQL**, em 4 tabelas: `usuarios`, `categorias`, `estabelecimentos` e `avaliacoes`. O navegador não guarda dados do sistema. Os restaurantes, endereços e avaliações do `db/seed.sql` são **fictícios**, criados para os testes.

As regras do PRD são garantidas pelo próprio banco: nota de 1 a 5, e-mail único, uma avaliação por usuário em cada estabelecimento e categoria em uso que não pode ser excluída.

## Segurança

- O arquivo `.env` (senha do banco e chave de sessão) **não vai para o GitHub**. O repositório guarda só o `.env.exemplo`, sem valores reais.
- Todo texto vindo do servidor é exibido com `textContent`, nunca com `innerHTML`.
- As consultas ao banco usam parâmetros, sem montar SQL com texto digitado.

## Equipe

| Integrante | Papel |
|---|---|
| João Gabriel de Oliveira Lopes | Back-end e banco de dados |
| Pacelle Henrique Parnaíba Sobral | Repositório e front-end |
| Pedro Augusto Sousa Noleto | Back-end e banco de dados |
| Rhaynon Carvalho Soares | Documentação, relatórios e entregas |
| Tereza Clarice da Silva Rocha | Back-end e banco de dados |
| Victor Eduard Rodrigues Cabral | Front-end e CSS |

Responsáveis por cada RF: veja o plano de sprints na seção 10 do [PRD](docs/PRD.md).

## Como a equipe trabalha

`git pull` antes de começar, um ramo por RF (por exemplo `rf02-busca`), commits pequenos com mensagem clara e pull request revisado por um colega.

## Uso de IA

- **Claude (Anthropic)** foi usado no PRD v2 (rascunho), no relatório e nas correções de acessibilidade da S1.
- **Claude (Anthropic)**, na S2: escreveu o servidor Express, o script do banco (`schema.sql`, `seed.sql`), as rotas da API e o JavaScript das telas de RF01, RF02 e RF04.
- A equipe executou o sistema, testou cada RF pelo critério de aceite do PRD, conferiu os dados e as regras no pgAdmin e tirou os prints do relatório. Cada integrante explica no pitch a parte em que trabalhou.
