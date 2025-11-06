# 📝 Como Adicionar a Coluna de Resultado na Tabela

## Passo 1: Adicionar a Coluna `resultado`

No Supabase Dashboard:

1. Vá em **Table Editor** → `quizz_results`
2. Clique em **Add Column** (ou no ícone +)
3. Configure:
   - **Name:** `resultado`
   - **Type:** `text`
   - **Default value:** (deixe vazio)
   - **Is nullable:** ✅ Sim (pode ser null)
4. Clique em **Save**

**Ou use SQL:**
```sql
ALTER TABLE quizz_results 
ADD COLUMN resultado TEXT;
```

## Passo 2: Tornar `card_number` Único (Opcional mas Recomendado)

Para garantir que cada usuário aparece apenas uma vez:

1. Vá em **Table Editor** → `quizz_results`
2. Clique na coluna `card_number`
3. Marque **Is unique** ✅
4. Clique em **Save**

**Ou use SQL:**
```sql
-- Criar índice único em card_number
CREATE UNIQUE INDEX IF NOT EXISTS quizz_results_card_number_key 
ON quizz_results(card_number);
```

## Passo 3: Adicionar Política de UPDATE no RLS

Para permitir atualizações de registros existentes:

1. Vá em **Authentication** → **Policies** → `quizz_results`
2. Clique em **Create policy**
3. Configure:
   - **Name:** `permitir updates`
   - **Allowed operation:** `UPDATE`
   - **Target roles:** `anon, authenticated`
   - **Policy definition:** `USING (true) WITH CHECK (true)`
4. Clique em **Save**

**Ou use SQL:**
```sql
CREATE POLICY "permitir updates" ON quizz_results
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);
```

## Passo 4: Testar

Depois de adicionar a coluna:

1. Execute: `node src/lib/testSupabase.js`
2. Ou teste no navegador preenchendo o quiz

## Estrutura Final da Tabela

A tabela `quizz_results` terá:
- `id` (int8, PK)
- `name` (text)
- `card_number` (numeric, UNIQUE) ← Único por usuário
- `turma` (text)
- `ano_escolar` (int2)
- `timestamp` (timestamp)
- `resultado` (text) ← NOVO: Tipo de amor do usuário

## Como Funciona Agora

- **Primeira vez:** Insere um novo registro com o resultado
- **Mesmo card_number:** Atualiza o registro existente com o novo resultado
- **Resultado:** Aparece apenas uma vez por `card_number` na tabela

