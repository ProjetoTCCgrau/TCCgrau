// BD/supabaseClient.js

const SUPABASE_URL = 'https://pplnpdwguctbsnnkjfnl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_veYUVsDYX2FAW7CuYV9x7g_OT2ica-1';

// Função para inicializar o cliente
function iniciarSupabase() {
  if (typeof supabase !== 'undefined') {
    window._supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } else {
    console.error("SDK do Supabase não encontrado no navegador.");
  }
}

// Executa a inicialização
iniciarSupabase();