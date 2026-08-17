// UTILITÁRIOS GLOBAIS
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

// Mostra a mensagem de exibição e notificações visuais
function mostrarMensagem(msg) {
  const box = document.createElement('div');
  box.textContent = msg;
  Object.assign(box.style, {
    position: 'fixed',
    right: '18px',
    bottom: '18px',
    background: '#222',
    color: '#fff',
    padding: '10px 14px',
    borderRadius: '8px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
    zIndex: '9999'
  });
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 1500);
}

// calcularMedia: Percorre a tabela e calcula a média das notas.
function calcularMedia() {
  const table = document.querySelector('.tabela tbody');
  if (!table) { mostrarMensagem('Tabela não encontrada.'); return; }
  
  const rows = table.querySelectorAll('tr');
  let soma = 0, cont = 0;
  
  rows.forEach(r => {
    const val = parseFloat(r.cells[3]?.textContent);
    if (!isNaN(val)) { soma += val; cont++; }
  });
  
  const media = cont ? (soma / cont).toFixed(2) : 'N/A';
  mostrarMensagem(`Média das notas: ${media}`);
  return media;
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', async () => {

  // LÓGICA PARA EXIBIR A HORA
  const elHora = document.getElementById('horaAtual');
  if (elHora) {
    const url = "https://worldtimeapi.org/api/timezone/America/Sao_Paulo";
    let agora;

    const atualizarDisplay = () => {
      if (!agora) return;
      elHora.textContent = 
        agora.toLocaleDateString("pt-BR", { year: "numeric", month: "long", day: "numeric" }) +
        " " +
        agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }) +
        " (Horário de Brasília)";
    };

    fetch(url)
      .then(r => r.json())
      .then(d => {
        agora = new Date(d.datetime);
        atualizarDisplay();
        setInterval(() => {
          agora.setSeconds(agora.getSeconds() + 1);
          atualizarDisplay();
        }, 1000);
      })
      .catch(() => elHora.textContent = "Erro ao carregar a hora.");
  }

  // BARRA DE BUSCA
  const searchInput = document.getElementById("searchInput");
  const btnBuscar = document.getElementById("btnBuscar");
  const cards = document.querySelectorAll(".card");

  if (searchInput) {
    const filtrarFilmes = () => {
      const termo = searchInput.value.trim().toLowerCase();
      let encontrou = false;

      cards.forEach(card => {
        const titulo = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const matches = !termo || titulo.includes(termo);
        
        card.style.display = matches ? "block" : "none";
        card.style.border = (termo && matches) ? "2px solid #9b4dff" : "none";
        if (matches) encontrou = true;
      });

      if (termo && !encontrou) mostrarMensagem("Nenhum filme encontrado.");
    };

    searchInput.addEventListener("input", debounce(filtrarFilmes, 300));
    if (btnBuscar) btnBuscar.addEventListener("click", filtrarFilmes);
  }

  // LÓGICA PARA O TEMA DO SITE
  const btnTema = document.getElementById("btnTema");
  if (btnTema) {
    if (localStorage.getItem("tema") === "claro") document.body.classList.add("light-mode");

    btnTema.addEventListener("click", async () => {
      const isLight = document.body.classList.toggle("light-mode");
      const temaAtual = isLight ? "claro" : "escuro";
      localStorage.setItem("tema", temaAtual);
      mostrarMensagem(`Tema ${temaAtual} ativado`);

      // Atualiza preferência no Supabase se houver usuário logado
      const { data: { session } } = await _supabase.auth.getSession();
      if (session) {
        await _supabase
          .from('perfis')
          .update({ tema_pref: temaAtual })
          .eq('id', session.user.id);
      }
    });
  }

  // FORMULÁRIOS

  // FORMULÁRIO DE AVALIAÇÃO
  const formAvaliacao = document.querySelector('.formulario:not(#formLogin):not(#formCadastro)');
  if (formAvaliacao) {
    formAvaliacao.addEventListener('submit', e => {
      e.preventDefault();
      if (typeof validarFormulario === 'function' && !validarFormulario(formAvaliacao)) return;
      mostrarMensagem('Avaliação enviada com sucesso! Obrigado.');
      formAvaliacao.reset();
    });
  }

// ==========================================
// FORMULÁRIO DO LOGIN (INTEGRADO AO SUPABASE)
// ==========================================
const formLogin = document.getElementById("formLogin");

if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const client = window._supabase || (typeof _supabase !== 'undefined' ? _supabase : null);

    if (!client) {
      mostrarMensagem("Erro de conexão com o Supabase.");
      return;
    }

    const loginInput = document.getElementById("logUser")?.value.trim();
    const pass = document.getElementById("logPass")?.value.trim();

    if (!loginInput || !pass) return mostrarMensagem("Preencha todos os campos!");

    try {
      let emailParaLogin = loginInput;

      // Se o usuário não digitou um e-mail (sem '@'), busca o e-mail na tabela 'perfis'
      if (!loginInput.includes("@")) {
        const { data: perfilData, error: perfilError } = await client
          .from("perfis")
          .select("email")
          .ilike("usuario", loginInput)
          .maybeSingle();

        if (perfilError || !perfilData) {
          return mostrarMensagem("Usuário não encontrado!");
        }

        emailParaLogin = perfilData.email;
      }

      // Garante a limpeza de sessões antigas com falha
      await client.auth.signOut();

      // Realiza a autenticação com o Supabase Auth
      const { data, error } = await client.auth.signInWithPassword({
        email: emailParaLogin,
        password: pass
      });

      if (error) {
        console.error("Erro no login:", error.message);
        return mostrarMensagem("Senha ou usuário incorretos!");
      }

      mostrarMensagem("Login realizado com sucesso!");
      setTimeout(() => window.location.href = "index.html", 1000);

    } catch (err) {
      console.error("Erro geral no login:", err);
      mostrarMensagem("Falha ao realizar login.");
    }
  });
}

// ==========================================
// FORMULÁRIO DO CADASTRO
// ==========================================
const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
  formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const client = window._supabase || (typeof _supabase !== 'undefined' ? _supabase : null);

    if (!client) {
      alert("Erro de conexão com o banco.");
      return;
    }

    const usuario = document.getElementById("cadUser")?.value.trim();
    const email = document.getElementById("cadEmail")?.value.trim();
    const senha = document.getElementById("cadPass")?.value.trim();

    try {
      // Cria a conta no Auth (a Trigger do Supabase cria a linha em public.perfis automaticamente)
      const { data, error } = await client.auth.signUp({
        email: email,
        password: senha,
        options: {
          data: {
            usuario_nome: usuario
          }
        }
      });

      if (error) throw error;

      alert("Conta criada com sucesso!");
      window.location.href = "login.html";

    } catch (err) {
      console.error("Erro no cadastro:", err);
      alert("Erro ao cadastrar: " + (err.message || "Verifique os dados digitados."));
    }
  });
}

// ==========================================
// ATUALIZAR ÍCONE E LINK DO PERFIL NO HEADER
// ==========================================
async function atualizarHeaderPerfil() {
  const client = window._supabase || (typeof _supabase !== 'undefined' ? _supabase : null);
  if (!client) return;

  const perfilHeader = document.getElementById("perfilHeader");
  const nomeHeader = document.getElementById("perfilNomeHeader");
  const fotoHeader = document.getElementById("perfilFotoHeader");

  if (!perfilHeader) return;

  // Busca a sessão do usuário logado
  const { data: { session } } = await client.auth.getSession();
  const usuario = session?.user;

  if (!usuario) {
    perfilHeader.classList.add("sem-login");
    if (nomeHeader) nomeHeader.textContent = "Entrar";
    perfilHeader.onclick = (e) => {
      e.preventDefault();
      window.location.href = "login.html";
    };
    return;
  }

  perfilHeader.classList.remove("sem-login");

  // Consulta dados do perfil no banco
  const { data: perfil } = await client
    .from('perfis')
    .select('usuario, foto_perfil')
    .eq('id', usuario.id)
    .maybeSingle();

  if (nomeHeader) nomeHeader.textContent = perfil?.usuario || usuario.email;

  const fotoPadrao = 'img/logo_obscurium1.png';
  if (fotoHeader) {
    fotoHeader.src = (perfil?.foto_perfil && perfil.foto_perfil.trim() !== '') 
      ? perfil.foto_perfil 
      : fotoPadrao;

    fotoHeader.onerror = () => { fotoHeader.src = fotoPadrao; };
  }

  perfilHeader.onclick = (e) => {
    e.preventDefault();
    window.location.href = "perfil.html";
  };
}

// ==========================================
// LÓGICA DA PÁGINA DE PERFIL (perfil.html)
// ==========================================
async function carregarPaginaPerfil() {
  const nomePerfil = document.getElementById("nomeUsuarioPerfil");
  const fotoPerfil = document.getElementById("fotoPerfilPreview");
  const fotoInput = document.getElementById("fotoPerfilInput");
  const btnSair = document.getElementById("btnSair");

  if (!nomePerfil && !fotoPerfil) return;

  const client = window._supabase || (typeof _supabase !== 'undefined' ? _supabase : null);
  if (!client) return;

  const { data: { session } } = await client.auth.getSession();
  const usuario = session?.user;

  if (!usuario) {
    mostrarMensagem("Você precisa estar logado para acessar seu perfil!");
    setTimeout(() => window.location.href = "login.html", 1200);
    return;
  }

  const { data: perfil } = await client
    .from('perfis')
    .select('usuario, foto_perfil')
    .eq('id', usuario.id)
    .maybeSingle();

  if (nomePerfil) nomePerfil.textContent = perfil?.usuario || usuario.email;

  const fotoPadrao = 'img/logo_obscurium1.png';

  if (fotoPerfil) {
    fotoPerfil.src = (perfil?.foto_perfil && perfil.foto_perfil.trim() !== '') 
      ? perfil.foto_perfil 
      : fotoPadrao;

    fotoPerfil.onerror = () => {
      fotoPerfil.src = fotoPadrao;
    };
  }

  if (btnSair) {
    btnSair.addEventListener("click", async () => {
      await client.auth.signOut();
      window.location.href = "login.html";
    });
  }

  if (fotoInput) {
    fotoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (ev) => {
        const novaFoto = ev.target.result;

        const { error } = await client
          .from('perfis')
          .update({ foto_perfil: novaFoto })
          .eq('id', usuario.id);

        if (!error) {
          if (fotoPerfil) fotoPerfil.src = novaFoto;
          atualizarHeaderPerfil();
          mostrarMensagem("Foto atualizada com sucesso!");
        } else {
          mostrarMensagem("Erro ao salvar foto no perfil!");
        }
      };
      reader.readAsDataURL(file);
    });
  }
}

// Inicializa as funções após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  atualizarHeaderPerfil();
  carregarPaginaPerfil();
});

  // Inicializa o Header
  atualizarHeaderPerfil();

  // BOTÃO DE LOGOUT
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
      await _supabase.auth.signOut();
      mostrarMensagem("Você saiu da conta!");
      setTimeout(() => window.location.href = "login.html", 1000);
    });
  }
});

// Garante o fallback do cliente Supabase
const _supabase = window._supabase;

if (!_supabase) {
  console.warn("Cliente Supabase não encontrado na janela global.");
}