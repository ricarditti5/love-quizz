![Header](./header.png)
# 📝 Love Quiz - Quiz Interativo sobre o Amor

Um quiz interativo desenvolvido em React que permite aos utilizadores descobrirem o seu tipo de personalidade amorosa através de questões personalizadas. Os resultados são guardados numa base de dados Supabase.

## 📋 Índice

- [Descrição](#-descrição)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração do Supabase](#-configuração-do-supabase)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar](#-como-executar)
- [Como Funciona](#-como-funciona)
- [Estrutura da Base de Dados](#-estrutura-da-base-de-dados)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Resolução de Problemas](#-resolução-de-problemas)
- [Licença](#-licença)

## 📖 Descrição

O **Love Quiz** é uma aplicação web interativa que apresenta aos utilizadores um conjunto de questões sobre o amor e relacionamentos. Com base nas respostas, o sistema calcula e apresenta um dos quatro tipos de personalidade amorosa:

- **O Romântico** - Valoriza emoção, intensidade e momentos mágicos
- **O Parceiro(a)** - Procura estabilidade, confiança e crescimento mútuo
- **O Libertador(a)** - Valoriza autonomia e espaço pessoal
- **O Guardião(ã)** - Mostra amor através de cuidado prático e proteção

## ✨ Funcionalidades

- ✅ Formulário de identificação do utilizador (nome, número do cartão, turma, ano escolar)
- ✅ Quiz interativo com 4 questões sobre o amor
- ✅ Cálculo automático do tipo de personalidade amorosa
- ✅ Visualização do resultado com descrição e conselho prático
- ✅ Guardar resultados na base de dados Supabase
- ✅ Sistema de UPSERT (sistema "update or insert" - actualiza se já existir, insere se não existir) - cada utilizador aparece apenas uma vez (actualiza se já existir)
- ✅ Interface moderna e responsiva (adapta-se a diferentes dispositivos) com Tailwind CSS (framework de estilos CSS)
- ✅ Navegação entre questões (Anterior/Próxima)
- ✅ Possibilidade de recomeçar o quiz

## 🛠 Tecnologias Utilizadas

- **React** (v19.1.1) - Biblioteca JavaScript para criar interfaces de utilizador interactivas
- **Vite** (v7.1.7) - Ferramenta de construção e servidor de desenvolvimento (devtool) que acelera o desenvolvimento web moderno
- **Tailwind CSS** (v3.4.18) - Framework CSS utilitário que permite estilizar rapidamente através de classes pré-definidas
- **Supabase** (@supabase/supabase-js v2.80.0) - Plataforma Backend como Serviço (BaaS) que fornece base de dados, autenticação e APIs
- **ESLint** - Ferramenta de análise estática de código (linter) que verifica o código JavaScript/React em busca de erros, bugs e problemas de estilo

## 📦 Pré-requisitos

Antes de começar, certifica-te de que tens instalado:

- **Node.js** (versão 16 ou superior) - Runtime de JavaScript que permite executar JavaScript fora do navegador (software)
- **npm** ou **yarn** - Gerenciadores de pacotes (ferramentas de linha de comando) para instalar e gerir dependências do projeto
- Conta no **Supabase** (gratuita em [supabase.com](https://supabase.com)) - Plataforma online que fornece serviços de backend

## 🚀 Instalação

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/ricarditti5/love-quizz.git
cd love-quizz
```

**Nota:** `git clone` é um comando Git (sistema de controlo de versões) que descarrega uma cópia do projeto para o teu computador.

### Passo 2: Instalar Dependências

```bash
npm install
```

Este comando instala todas as dependências (bibliotecas e ferramentas externas) necessárias listadas no `package.json`.

### Passo 3: Configurar Variáveis de Ambiente

Cria um ficheiro `.env` (ficheiro de variáveis de ambiente) na raiz do projeto (se necessário) ou configura directamente no código:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Nota:** No projeto actual, as credenciais estão configuradas directamente em `src/lib/supabaseClient.js`. Para produção (versão publicada), recomenda-se usar variáveis de ambiente (valores de configuração armazenados fora do código, mais seguros).

## 🗄 Configuração do Supabase

### Passo 1: Criar um Projeto no Supabase

1. Acede a [supabase.com](https://supabase.com) e cria uma conta (se ainda não tiveres)
2. Cria um novo projeto
3. Guarda a **URL do projeto** e a **chave anónima (anon key)**

### Passo 2: Criar a Tabela `quizz_results_teuNome`

No Supabase Dashboard (painel de controlo web do Supabase):

1. Vai a **Table Editor** (editor de tabelas - interface gráfica para gerir tabelas da base de dados)
2. Clica em **New Table** (nova tabela)
3. Define o nome da tabela: `quizz_results`
4. Adiciona as seguintes colunas (campos que armazenam diferentes tipos de informação):

| Nome da Coluna | Tipo | Propriedades |
|---------------|------|--------------|
| `id` | `int8` | Primary Key (chave primária - identificador único), Auto-increment (incremento automático) |
| `name` | `text` | Not Null (não pode ser vazio - campo obrigatório) |
| `card_number` | `numeric` | Tipo numérico (armazena números) |
| `turma` | `text` | Nullable (pode ficar vazio - campo opcional) |
| `ano_escolar` | `int2` | Inteiro pequeno (números inteiros de -32,768 a 32,767) |
| `resultado` | `text` | Nullable (pode ficar vazio) |
| `timestamp` | `timestamp` | Data e hora, Default: NOW() (valor padrão é a data/hora actual) |

**Ou executa este SQL no SQL Editor** (editor de SQL - interface para executar comandos de base de dados):

```sql
CREATE TABLE quizz_results (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  card_number NUMERIC,
  turma TEXT,
  ano_escolar SMALLINT,
  resultado TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Criar índice único em card_number (opcional, mas recomendado)
-- Índice único: estrutura de dados que garante que não podem existir dois valores iguais
CREATE UNIQUE INDEX IF NOT EXISTS quizz_results_card_number_key 
ON quizz_results(card_number);
```

### Passo 3: Configurar Row Level Security (RLS)

**Row Level Security (RLS)** - Sistema de segurança da base de dados que controla o acesso aos registos (linhas) da tabela com base em políticas definidas. Actua como um filtro que determina quem pode ler, escrever ou modificar dados.

#### Opção 1: Desabilitar RLS (apenas para testes)

1. Vai a **Authentication** → **Policies** → `quizz_results`
2. Clica em **Disable RLS**

#### Opção 2: Criar Políticas RLS (recomendado para produção)

1. Vai a **Authentication** → **Policies** → `quizz_results`
2. Cria as seguintes políticas:

**Política de INSERT** (regra que permite adicionar novos registos):
- **Name:** `permitir inserts`
- **Allowed operation:** `INSERT` (operação de inserção de dados)
- **Target roles:** `anon` (utilizadores anónimos), `authenticated` (utilizadores autenticados)
- **Policy definition:** `WITH CHECK (true)` (permite sempre)

**Política de SELECT** (regra que permite ler registos):
- **Name:** `permitir leitura`
- **Allowed operation:** `SELECT` (operação de leitura de dados)
- **Target roles:** `anon, authenticated`
- **Policy definition:** `USING (true)` (permite sempre)

**Política de UPDATE** (regra que permite actualizar registos existentes):
- **Name:** `permitir updates`
- **Allowed operation:** `UPDATE` (operação de actualização de dados)
- **Target roles:** `anon, authenticated`
- **Policy definition:** `USING (true) WITH CHECK (true)` (permite sempre)

**Ou executa este SQL:**

```sql
-- Política de INSERT
CREATE POLICY "permitir inserts" ON quizz_results
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Política de SELECT
CREATE POLICY "permitir leitura" ON quizz_results
FOR SELECT
TO anon, authenticated
USING (true);

-- Política de UPDATE
CREATE POLICY "permitir updates" ON quizz_results
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);
```

### Passo 4: Configurar o Cliente Supabase

Edita o ficheiro `src/lib/supabaseClient.js` (ficheiro de configuração do cliente Supabase) e substitui as credenciais:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://seu-projeto.supabase.co'  // URL do teu projeto Supabase
const supabaseAnonKey = 'sua-chave-anon-key'          // Chave pública de acesso

export const supabase = createClient(supabaseUrl, supabaseAnonKey)  // Cria o cliente para conectar à base de dados
```

## 📁 Estrutura do Projeto

```
my-love-quiz/
├── public/                 # Ficheiros estáticos (ficheiros servidos directamente, não processados)
│   └── vite.svg
├── src/
│   ├── assets/            # Imagens e recursos (ficheiros de media)
│   │   └── react.svg
│   ├── components/        # Componentes React (blocos reutilizáveis de interface)
│   │   ├── loveQuiz.jsx   # Componente principal do quiz
│   │   └── userForm.jsx   # Formulário de identificação
│   ├── lib/               # Bibliotecas e utilitários (código auxiliar e configurações)
│   │   ├── supabaseClient.js  # Cliente Supabase (configuração da conexão à base de dados)
│   │   └── testSupabase.js    # Script de teste da BD (programa para testar a base de dados)
│   ├── App.jsx            # Componente principal da aplicação (componente raiz)
│   ├── App.css            # Estilos do App (folha de estilos CSS)
│   ├── index.css          # Estilos globais (estilos aplicados a toda a aplicação)
│   └── main.jsx           # Ponto de entrada da aplicação (ficheiro que inicia a aplicação React)
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## ▶ Como Executar

### Modo de Desenvolvimento

```bash
npm run dev
```

Este comando inicia o servidor de desenvolvimento (servidor local que permite ver as alterações em tempo real). A aplicação estará disponível em `http://localhost:5173`

### Modo de Produção

```bash
# Construir a aplicação (cria versão optimizada para publicação)
npm run build

# Pré-visualizar a versão de produção (testa a versão final antes de publicar)
npm run preview
```

**Nota:** Para projetos pequenos como este, o build é opcional mas recomendado se planeias publicar online (deploy). Para desenvolvimento e testes locais, o modo dev é suficiente.

### Testar a Conexão com a Base de Dados

```bash
npm run test:supabase
```

Este comando executa o script de teste (programa automatizado que verifica funcionalidades) que verifica:
- ✅ Conexão com o Supabase (comunicação estabelecida)
- ✅ Leitura de dados (conseguir buscar informação)
- ✅ Inserção/atualização de dados (conseguir adicionar ou modificar informação)
- ✅ Estrutura da tabela (verificar se as colunas estão correctas)

## 🔄 Como Funciona

### 1. Identificação do Utilizador

Quando a aplicação é iniciada (quando abres o site no navegador), o utilizador é solicitado a preencher um formulário com:
- **Nome completo** (obrigatório)
- **Número do cartão** (obrigatório)
- **Turma** (opcional)
- **Ano escolar** (opcional - 9, 10, 11 ou 12)

### 2. Realização do Quiz

Após submeter o formulário (clicar em "Iniciar Quiz"), o utilizador responde a 4 questões sobre o amor:
- Cada questão tem 4 opções de resposta (a, b, c, d)
- O utilizador pode navegar entre questões usando os botões "Anterior" e "Próxima"
- Pode recomeçar o quiz a qualquer momento (botão "Recomeçar")

### 3. Cálculo do Resultado

Quando todas as questões são respondidas e o utilizador clica em "Ver Resultado":
- O sistema calcula qual resposta aparece mais vezes (a, b, c ou d) - algoritmo de frequência
- O resultado é determinado com base na resposta mais frequente (moda estatística)
- O tipo de personalidade é exibido (mostrado na interface) com descrição e conselho prático

### 4. Guardar na Base de Dados

O resultado é automaticamente guardado na base de dados (armazenamento permanente de informação):
- **Se é a primeira vez:** Insere um novo registo (adiciona nova linha na tabela)
- **Se o utilizador já existe (mesmo `card_number` ou `name`):** Atualiza o registo existente (modifica a linha existente)
- Cada utilizador aparece apenas **uma vez** na tabela (sistema UPSERT - "update or insert")

### 5. Tipos de Resultado

O quiz pode resultar em 4 tipos diferentes:

| Tipo | Descrição | Conselho |
|------|-----------|----------|
| **O Romântico** | Valoriza emoção, intensidade e momentos mágicos | Abraça a paixão, mas lembra-te de construir confiança |
| **O Parceiro(a)** | Procura estabilidade, confiança e crescimento mútuo | Continua a construir com presença — vulnerabilidade é força |
| **O Libertador(a)** | Valoriza autonomia e espaço pessoal | Equilibra liberdade com pequenos rituais de ligação |
| **O Guardião(ã)** | Mostra amor através de cuidado prático e proteção | Cuidados consistentes geram segurança emocional — mantém isso |

## 🗃 Estrutura da Base de Dados

### Tabela: `quizz_results`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `BIGSERIAL` | Chave primária (identificador único, auto-incremento - aumenta automaticamente) |
| `name` | `TEXT` | Nome completo do utilizador (obrigatório - campo de texto) |
| `card_number` | `NUMERIC` | Número do cartão do utilizador (único - tipo numérico) |
| `turma` | `TEXT` | Turma do utilizador (opcional - campo de texto) |
| `ano_escolar` | `SMALLINT` | Ano escolar (9, 10, 11 ou 12 - inteiro pequeno) |
| `resultado` | `TEXT` | Tipo de personalidade amorosa (campo de texto) |
| `timestamp` | `TIMESTAMP` | Data e hora de criação/atualização (marca temporal) |

### Exemplo de Registo

```json
{
  "id": 1,
  "name": "Maria Silva",
  "card_number": 12345,
  "turma": "12A",
  "ano_escolar": 12,
  "resultado": "O Romântico",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento (servidor local para desenvolvimento) |
| `npm run build` | Constrói a aplicação para produção (cria versão optimizada) |
| `npm run preview` | Pré-visualiza a versão de produção (testa a versão final) |
| `npm run lint` | Executa o linter (ferramenta de análise de código) para verificar o código |
| `npm run test:supabase` | Testa a conexão e operações com a base de dados (executa testes automatizados) |

## 🔧 Resolução de Problemas

### Problema: Erro ao guardar resultado na base de dados

**Soluções:**
1. Verifica se a tabela `quizz_results` existe no Supabase (consulta o Table Editor)
2. Verifica se a coluna `resultado` foi adicionada à tabela (ver estrutura da tabela)
3. Verifica as políticas RLS (Row Level Security - regras de acesso à base de dados)
4. Verifica se as credenciais do Supabase (URL e chave de acesso) estão correctas
5. Executa `npm run test:supabase` para diagnosticar o problema (executa testes automatizados)

### Problema: "Could not find the table 'quizz_results'"

**Solução:**
- Verifica se o nome da tabela está correcto: `quizz_results` (com dois 'z')
- Cria a tabela seguindo os passos na secção [Configuração do Supabase](#-configuração-do-supabase)

### Problema: "new row violates row-level security policy" (nova linha viola política de segurança)

**Solução:**
- Configura as políticas RLS (regras de segurança) conforme descrito na secção [Configuração do Supabase](#-configuração-do-supabase)
- Ou desabilita temporariamente o RLS (Row Level Security) para testes

### Problema: Utilizador aparece múltiplas vezes na tabela

**Solução:**
- Garante que a coluna `card_number` tem um índice único (estrutura que impede valores duplicados)
- Executa o SQL (linguagem de consulta de base de dados) para criar o índice único (ver secção [Configuração do Supabase](#-configuração-do-supabase))

### Problema: Coluna `resultado` não existe

**Solução:**
1. Vai ao Supabase Dashboard → Table Editor → `quizz_results`
2. Adiciona a coluna `resultado` do tipo `TEXT`
3. Ou executa: `ALTER TABLE quizz_results ADD COLUMN resultado TEXT;`

### Documentação Adicional

- [SUPABASE_RLS_FIX.md](SUPABASE_RLS_FIX.md) - Guia para corrigir problemas de RLS
- [ADICIONAR_COLUNA_RESULTADO.md](ADICIONAR_COLUNA_RESULTADO.md) - Guia para adicionar a coluna resultado

## 🚀 Deploy na Vercel

### Passo a Passo

1. **Prepara o projeto:**
   - Garante que o código está commitado no GitHub (ou outro Git)
   - Verifica que as credenciais do Supabase estão no `src/lib/supabaseClient.js`

2. **Deploy na Vercel:**
   - Vai a [vercel.com](https://vercel.com) e faz login
   - Clica em **Add New Project**
   - Importa o repositório do GitHub
   - A Vercel detecta automaticamente que é um projeto Vite
   - Clica em **Deploy**

3. **Configuração (opcional):**
   - **Build Command:** `npm run build` (automático)
   - **Output Directory:** `dist` (automático)
   - **Install Command:** `npm install` (automático)

4. **Pronto!**
   - A Vercel faz o build automaticamente
   - O site fica online em poucos minutos
   - Cada push no GitHub faz um novo deploy automaticamente

**Nota:** O projeto funciona perfeitamente na Vercel sem configuração adicional. A Vercel detecta automaticamente que é um projeto Vite e faz tudo por ti.

## 📝 Notas Importantes

- **Segurança:** Em produção (versão publicada e usada por utilizadores reais), nunca commites (guardes no controlo de versões) as credenciais do Supabase no código. Usa variáveis de ambiente (valores configurados fora do código).
- **RLS:** Mantém o Row Level Security (sistema de segurança por linha) activo em produção para proteger os dados.
- **Card Number:** O `card_number` é usado como identificador único (valor que identifica exclusivamente cada utilizador). Garante que cada utilizador tenha um número único.
- **Responsividade:** A aplicação é totalmente responsiva (adapta-se a diferentes tamanhos de ecrã) e funciona em dispositivos móveis.

## 🤝 Contribuição

Este é um projeto educativo. Sinta-te livre para:
- Reportar problemas (issues)
- Sugerir melhorias
- Fazer fork e adaptar para as tuas necessidades

## 📄 Licença

Este projeto é fornecido "como está", sem garantias. Podes usar, modificar e distribuir livremente.

## 👨‍💻 Autor

Feito com intenção por Ricardo Kassoma e Joel Rodrigues — adapta, expande e deploya onde quiseres.

---

**Última actualização:** Novembro 2025
![Footer](./footer.png)