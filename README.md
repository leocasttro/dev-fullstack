# Atende Lex - Desafio Full Stack

Aplicação full stack para visualização, pesquisa, análise e exportação de dados de atendimentos jurídicos.

O projeto foi separado em duas partes:

```txt
dev-fullstack/
├── backend/
└── frontend/
```

## Tecnologias

### Backend

- Node.js
- Express
- TypeScript
- CORS
- TSX
- Arquivo JSON como base mock

### Frontend

- React
- TypeScript
- Vite
- Recharts
- jsPDF
- jsPDF AutoTable

## Como Rodar O Backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Rode o servidor:

```bash
npm run dev
```

API disponível em:

```txt
http://localhost:3000
```

Principais rotas:

```txt
GET /api/atendimentos
GET /api/atendimentos/:codigo
GET /api/atendimentos/metricas
GET /api/atendimentos/export
```

Exemplo com filtros e paginação:

```txt
http://localhost:3000/api/atendimentos?search=maria&page=1&limit=10
```

## Como Rodar O Frontend

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Rode a aplicação:

```bash
npm run dev
```

Frontend disponível em:

```txt
http://localhost:5173
```

Para funcionar corretamente, o backend também precisa estar rodando em:

```txt
http://localhost:3000
```

## Funcionalidades

### Dashboard

A tela inicial mostra indicadores e gráficos:

- Total de atendimentos
- Total concluídos
- Total cancelados/não realizados
- Receita total
- Status dos agendamentos
- Top organizações
- Carga por responsável
- Evolução mensal

### Tabela De Agendamentos

A tabela exibe:

- Código
- Data
- Horário
- Assistido
- CPF
- Organização
- Advogado/responsável
- Status

Também possui:

- Busca textual
- Filtros
- Paginação
- Estados de loading, erro e lista vazia

### Exportação

O frontend possui botões para exportar:

- CSV
- PDF

A exportação respeita os filtros ativos no momento.

O backend retorna os dados filtrados pela rota:

```txt
GET /api/atendimentos/export
```

O frontend transforma esses dados em arquivo CSV ou PDF.

## Organização Do Backend

```txt
backend/src/
├── controllers/
├── data/
├── mappers/
├── routes/
├── services/
├── types/
├── utils/
└── server.ts
```

### Responsabilidades

`routes/`

Define os endpoints da API.

`controllers/`

Recebe requisições HTTP, valida parâmetros simples e retorna respostas JSON.

`services/`

Concentra regras de negócio, como listagem, filtros, métricas, busca por código e exportação.

`data/`

Contém o arquivo `atendimentos.json`, usado como base de dados mock.

`mappers/`

Transforma os nomes originais do JSON em nomes mais fáceis de usar no sistema.

`types/`

Centraliza os tipos TypeScript do backend.

`utils/`

Contém funções reutilizáveis, como o padrão de resposta JSON.

## Organização Do Frontend

```txt
frontend/src/
├── components/
├── hooks/
├── services/
├── types/
├── utils/
├── App.tsx
├── App.css
└── main.tsx
```

### Componentes

`components/Dashboard/`

Cards de KPI e gráficos.

`components/Table/`

Filtros, tabela e paginação.

`components/Export/`

Botões de exportação CSV e PDF.

`components/Layout/`

Cabeçalho e mensagens de estado.

`components/ui/`

Componentes reutilizáveis como botão, card e select.

### Hooks

`useAtendimentos`

Controla dados da tabela, filtros, busca, paginação, loading e erro.

`useMetricas`

Busca os dados do dashboard.

`useDebounce`

Evita chamar a API a cada tecla digitada no campo de busca.

### Services

`services/api.ts`

Centraliza as chamadas HTTP para o backend.

### Utils

`formatters.ts`

Formata datas, moeda, porcentagem e nomes.

`exportCsv.ts`

Gera arquivo CSV no navegador.

`exportPdf.ts`

Gera arquivo PDF no navegador usando jsPDF.

## Dependências E Justificativa

### Backend

`express`

Usado para criar a API REST.

`cors`

Permite que o frontend React acesse a API.

`typescript`

Adiciona tipagem e melhora organização do código.

`tsx`

Permite rodar arquivos TypeScript diretamente em desenvolvimento.

`@types/node`, `@types/express`, `@types/cors`

Tipos necessários para trabalhar com TypeScript.

### Frontend

`react` e `react-dom`

Base da interface.

`vite`

Ferramenta para rodar e buildar o frontend.

`recharts`

Usado para gráficos de pizza, barra e linha.

`jspdf`

Usado para gerar arquivos PDF.

`jspdf-autotable`

Usado para montar tabela no PDF.

`typescript`

Tipagem no frontend.

## Decisões Técnicas

- Separei backend e frontend em pastas próprias para deixar o projeto mais claro.
- Usei o JSON como fonte de dados, conforme o desafio.
- Normalizei os campos do JSON no backend, porque o arquivo original tem nomes com acentos e palavras juntas.
- Mantive respostas da API em um formato consistente com `success`, `message`, `data` e `meta`.
- Separei regras de negócio em services para deixar controllers menores.
- Usei hooks no frontend para separar lógica de busca, filtros, paginação e métricas.
- Gerei CSV e PDF no frontend, porque a exportação foi pedida na seção de frontend do desafio.
- Usei debounce na busca para evitar chamadas excessivas à API.

## Limitações Conhecidas

- O arquivo JSON não possui campo financeiro. Por isso, `receitaTotal` é retornado como `0`.
- O JSON não possui um status real de cancelado. Foi usado `Agendamentorealizado = "Não"` como aproximação para cancelados/não realizados.
- Os campos `Serviço` e `Local` aparecem como `null` na base, então filtros nesses campos podem ter pouco efeito.
- A base tem dados mockados e não possui persistência de criação, edição ou exclusão.
- O PDF aumenta o tamanho do bundle do frontend. Uma melhoria futura seria carregar a biblioteca de PDF apenas quando o usuário clicar em exportar.

## O Que Explicar Na Entrevista

### Backend

Explique que a API segue este fluxo:

```txt
routes -> controllers -> services -> data
```

Pontos importantes para explicar:

- Como o JSON simula uma base de dados.
- Por que foi criado um mapper para normalizar os campos.
- Como funciona a paginação.
- Como funcionam os filtros e a busca textual.
- Por que a exportação reutiliza os mesmos filtros da tabela.
- Como as respostas JSON são padronizadas.
- Onde entram os status HTTP 400, 404 e 500.

### Frontend

Explique que os componentes cuidam da interface e os hooks cuidam da lógica.

Pontos importantes para explicar:

- `useAtendimentos`: busca dados, controla filtros, paginação, loading e erro.
- `useMetricas`: carrega dados do dashboard.
- `useDebounce`: melhora a busca em tempo real.
- `api.ts`: centraliza chamadas ao backend.
- `ExportActions`: busca os dados filtrados e gera CSV/PDF.
- `Recharts`: renderiza os gráficos.
- `StatusMessage`: padroniza loading, erro e estado vazio.

### Decisões Sobre Os Dados

Explique que algumas informações pedidas no desafio não existem diretamente na base:

- Receita total não existe no JSON.
- Cancelado não existe como status.
- Área jurídica não existe claramente, então `servico` seria o campo mais próximo, mas está nulo.

Essas limitações foram tratadas no código e documentadas.

## Melhorias Futuras

- Adicionar testes automatizados no backend e frontend.
- Criar filtros dinâmicos baseados nos valores reais do JSON.
- Adicionar ordenação na tabela.
- Adicionar modo de detalhes ao clicar em um atendimento.
- Carregar jsPDF sob demanda para reduzir o bundle inicial.
- Permitir configurar a URL da API por variável de ambiente.
