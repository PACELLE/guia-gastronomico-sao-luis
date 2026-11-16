# Guia Gastronômico de São Luís

Guia web de restaurantes de São Luís: lista os estabelecimentos com endereço, horário, faixa de preço e categoria, permite buscar e filtrar, e mostra a nota média dada pelos usuários.

Projeto da disciplina Desenvolvimento de Sistemas Web (EECP0036), UFMA, turma 24N12, 2026.2.

## Situação

A entrega atual é a **S1, protótipo**: 5 telas em HTML e CSS, sem JavaScript, ligadas por links e com dados de exemplo fixos. A lógica, o servidor e o banco de dados entram a partir da S2.

## Como rodar

O protótipo não precisa de instalação.

1. Clone o repositório:
   ```bash
   git clone https://github.com/PACELLE/guia-gastronomico-sao-luis.git
   ```
2. Abra o arquivo `index.html` no navegador.

Para testar como num site de verdade, você pode servir a pasta com um servidor local (com Python instalado) e abrir http://localhost:8000:

```bash
python -m http.server 8000
```

## Telas do protótipo

| Tela | Arquivo | RFs atendidos |
| --- | --- | --- |
| Página inicial (lista, busca e filtros) | `index.html` | RF01, RF02, RF03 |
| Detalhes do estabelecimento | `estabelecimentos.html` | RF04, RF11 |
| Login | `login.html` | RF06 |
| Cadastro de usuário | `cadastro.html` | RF05 |
| Avaliar estabelecimento | `avaliar.html` | RF07 |

Os RFs estão descritos no [PRD](docs/PRD.md), seção 4.

## Equipe

| Nome completo | Papel |
| --- | --- |
| João Gabriel de Oliveira Lopes | Back-end e banco de dados (Express e PostgreSQL) |
| Pacelle Henrique Parnaíba Sobral | Repositório e front-end |
| Pedro Augusto Sousa Noleto | Back-end e banco de dados (Express e PostgreSQL) |
| Rhaynon Carvalho Soares | Documentação, relatórios e entregas |
| Tereza Clarice da Silva Rocha | Back-end e banco de dados (Express e PostgreSQL) |
| Victor Eduard Rodrigues Cabral | Front-end e CSS |

## O que cada entrega trouxe

| Entrega | O que trouxe |
| --- | --- |
| PRD v1 | Funcionalidades, entidades e regras de negócio, 8 RFs, 5 RNFs, diagramas de classes e de sequência, escolha de tecnologias |
| PRD v2 | As 12 seções da disciplina: 14 RFs com critério de aceite, 9 RNFs mensuráveis, 10 histórias, diagramas dos fluxos, dados, arquitetura, plano de sprints e riscos ([docs/PRD.md](docs/PRD.md)) |
| S1 · protótipo | 5 telas em HTML e CSS, responsivas (360 px e 1280 px) e acessíveis: labels em todos os campos, foco visível, link "Pular para o conteúdo" e contraste de pelo menos 4,5:1 |

As versões em PDF enviadas ao professor ficam em [docs/entregas](docs/entregas).

## Onde ficam os dados

- **No protótipo (S1):** os dados de exemplo estão escritos no próprio HTML. Nada é salvo.
- **A partir da S2:** usuários, estabelecimentos, categorias e avaliações ficam num banco PostgreSQL no servidor. O navegador guarda só o cookie da sessão de login. Os detalhes estão no PRD, seções 8 e 9.

## Estrutura de pastas

```
index.html              página inicial
estabelecimentos.html   detalhes do estabelecimento
login.html              login
cadastro.html           cadastro de usuário
avaliar.html            avaliação
style.css               estilo de todas as telas
docs/
  PRD.md                documento de requisitos (versão atual)
  fluxos/               diagramas dos fluxos principais
  entregas/             PDFs enviados ao professor
```

## Como colaborar

1. `git pull` antes de começar.
2. Trabalhe num ramo por RF: `git switch -c rf02-busca`.
3. Commits pequenos, com mensagem clara, por exemplo `feat(busca): filtra estabelecimentos pelo nome`.
4. `git push -u origin rf02-busca` e abra um pull request para um colega revisar antes de juntar ao `main`.

A avaliação das sprints conta os commits de todos os integrantes.

## Uso de IA

Claude (Anthropic) foi usado para redigir o rascunho do PRD v2 e o relatório da S1, para revisar o código do protótipo e para aplicar as correções de acessibilidade do commit `b4f0828`. A equipe conferiu o resultado.
