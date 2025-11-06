# 🔧 Como Corrigir RLS no Supabase

## Problema
Os dados não estão sendo inseridos na tabela `quizz_results` porque as políticas RLS (Row Level Security) estão bloqueando.

## Estrutura da Tabela Confirmada
A tabela `quizz_results` tem as seguintes colunas:
- `id` (int8, chave primária)
- `name` (text)
- `card_number` (numeric)
- `turma` (text)
- `ano_escolar` (int2)
- `timestamp` (timestamp)

## Solução

### Opção 1: Desabilitar RLS (mais fácil para testes)

1. Acesse o Supabase Dashboard
2. Vá em **Authentication** → **Policies** → `quizz_results`
3. Clique em **Disable RLS**

**SQL:**
```sql
ALTER TABLE quizz_results DISABLE ROW LEVEL SECURITY;
```

---

### Opção 2: Corrigir a Política RLS Existente (recomendado)

Se já tem uma política "permitir inserts" mas ainda está bloqueando:

1. Acesse o Supabase Dashboard
2. Vá em **Authentication** → **Policies** → `quizz_results`
3. Clique nos três pontos (⋮) ao lado da política "permitir inserts"
4. Selecione **Edit** ou **Delete** e recrie

**SQL para criar política correta:**
```sql
-- Deletar política antiga se existir
DROP POLICY IF EXISTS "permitir inserts" ON quizz_results;

-- Criar nova política de INSERT (permitir inserções anônimas)
CREATE POLICY "permitir inserts" ON quizz_results
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
```

#### Adicionar Política de SELECT (para poder ler os dados)
```sql
CREATE POLICY "permitir leitura" ON quizz_results
FOR SELECT
TO anon, authenticated
USING (true);
```

---

## Como Testar

Depois de aplicar as correções:

1. Execute: `npm run test:supabase`
2. Ou use: `test-supabase.bat`
3. Ou teste no navegador (F12 → Console) após preencher o quiz

---

## Estrutura da Tabela Confirmada

A tabela `quizz_results` tem a seguinte estrutura:

```sql
CREATE TABLE quizz_results (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  card_number NUMERIC,
  turma TEXT,
  ano_escolar SMALLINT, -- int2 (9, 10, 11 ou 12)
  timestamp TIMESTAMP DEFAULT NOW()
);
```

**Nota:** A tabela não tem uma coluna para armazenar o resultado do quiz. Se precisar armazenar o resultado, será necessário adicionar uma nova coluna na tabela.
