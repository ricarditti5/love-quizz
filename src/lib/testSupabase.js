import { supabase } from './supabaseClient.js';

async function testSupabase() {
  console.log('🔌 Testando conexão com Supabase...\n');

  // Teste 1: Verificar se consegue ler dados existentes
  console.log('📖 Teste 1: Lendo dados existentes da tabela quizz_results...');
  const { data: existingData, error: readError } = await supabase
    .from('quizz_results')
    .select('*')
    .limit(10);

  if (readError) {
    console.error('❌ Erro ao ler dados:', readError);
    console.error('   Mensagem:', readError.message);
    console.error('   Código:', readError.code);
    console.error('   Detalhes:', readError.details);
    console.error('   Hint:', readError.hint);
    console.log('\n⚠️  Possível problema: RLS (Row Level Security) bloqueando leitura ou tabela não existe\n');
  } else {
    console.log('✅ Leitura bem-sucedida!');
    console.log(`   Encontrados ${existingData.length} registros`);
    if (existingData.length > 0) {
      console.log('   Primeiro registro:', JSON.stringify(existingData[0], null, 2));
    }
    console.log('');
  }

  // Teste 2: Tentar inserir um usuário de teste
  console.log('📝 Teste 2: Tentando inserir um usuário de teste...');
  
  // Estrutura da tabela confirmada:
  // - id (int8, PK)
  // - name (text)
  // - card_number (numeric, UNIQUE) - usado para identificar usuário único
  // - turma (text)
  // - ano_escolar (int2)
  // - timestamp (timestamp)
  // - resultado (text) - tipo de amor do usuário
  const testUser = {
    name: 'Teste Usuário',
    card_number: 123, // NUMERIC - deve ser único
    turma: 'Teste', //por exermplo nós sendo 11p2
    ano_escolar: 10, // int2 (ano escolar que pertence)
    resultado: 'O Romântico' // Resultado do quiz
  };

  console.log('   Dados a inserir/atualizar:', JSON.stringify(testUser, null, 2));

  // UPSERT: Se card_number já existe, atualiza. Senão, insere.
  const { data: insertData, error: insertError } = await supabase
    .from('quizz_results')
    .upsert(
      [testUser],
      {
        onConflict: 'card_number',
        ignoreDuplicates: false
      }
    )
    .select();

  if (insertError) {
    console.error('❌ Erro ao inserir dados:', insertError);
    console.error('   Mensagem:', insertError.message);
    console.error('   Código:', insertError.code);
    console.error('   Detalhes:', insertError.details);
    console.error('   Hint:', insertError.hint);
    console.log('\n⚠️  Possíveis problemas:');
    console.log('   1. RLS (Row Level Security) bloqueando inserção');
    console.log('   2. Nomes de colunas incorretos');
    console.log('   3. Tipos de dados incorretos');
    console.log('   4. Colunas obrigatórias faltando\n');
  } else {
    console.log('✅ Inserção bem-sucedida!');
    console.log('   Dados inseridos:', JSON.stringify(insertData, null, 2));
    console.log('');
  }

  // Teste 3: Verificar estrutura da tabela (tentando ler com select *)
  console.log('🔍 Teste 3: Verificando estrutura da tabela...');
  const { data: structureData, error: structureError } = await supabase
    .from('quizz_results')
    .select('*')
    .limit(1);

  if (structureError) {
    console.error('❌ Erro ao verificar estrutura:', structureError);
    console.error('   Isso pode indicar que algumas colunas não existem na tabela');
  } else {
    console.log('✅ Estrutura da tabela verificada!');
    if (structureData && structureData.length > 0) {
      console.log('   Colunas encontradas:', Object.keys(structureData[0]).join(', '));
      console.log('   Exemplo de registro:', JSON.stringify(structureData[0], null, 2));
    } else {
      console.log('   Tabela vazia - não foi possível verificar colunas diretamente');
      console.log('   Tentando descobrir colunas através de uma inserção de teste...');
    }
    console.log('');
  }

  // Resumo final
  console.log('📊 Resumo dos testes:');
  console.log(`   Leitura: ${readError ? '❌ Falhou' : '✅ OK'}`);
  console.log(`   Inserção: ${insertError ? '❌ Falhou' : '✅ OK'}`);
  console.log(`   Estrutura: ${structureError ? '❌ Falhou' : '✅ OK'}`);
  
  if (readError || insertError || structureError) {
    console.log('\n🔧 Próximos passos:');
    console.log('   1. Verifique as políticas RLS no Supabase Dashboard');
    console.log('   2. Verifique se a tabela quizz_results existe');
    console.log('   3. Verifique se os nomes das colunas estão corretos');
    console.log('   4. Consulte o arquivo SUPABASE_RLS_FIX.md para mais informações');
  } else {
    console.log('\n🎉 Todos os testes passaram! A base de dados está funcionando corretamente.');
  }
}

testSupabase();
