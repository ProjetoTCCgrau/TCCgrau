

document.addEventListener('DOMContentLoaded', () => {
  
  // ==================== 1. HORA ATUAL (API) ====================
  const elHora = document.getElementById('horaAtual');
  if (elHora) {
    const url = "https://worldtimeapi.org/api/timezone/America/Sao_Paulo";
    let agora;
    
    fetch(url)
      .then(r => r.json())
      .then(d => {
        agora = new Date(d.datetime);
        atualizarHora();
        setInterval(() => {
          agora.setSeconds(agora.getSeconds() + 1);
          atualizarHora();
        }, 1000);
      })
      .catch(() => elHora.textContent = "Erro ao carregar hora.");

    function atualizarHora() {
      elHora.textContent =
        agora.toLocaleDateString("pt-BR", { year: "numeric", month: "long", day: "numeric" }) +
        " " +
        agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }) +
        " (Horário de Brasília)";
    }
  }

  // ==================== 2. TEMA (CLARO/ESCURO) ====================
  const btnTema = document.getElementById("btnTema");
  if (btnTema) {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "claro") {
      document.body.classList.add("light-mode");
    }
    btnTema.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const temaAtual = document.body.classList.contains("light-mode") ? "claro" : "escuro";
      localStorage.setItem("tema", temaAtual);
    });
  }

  // ==================== 3. SISTEMA DE NAVEGAÇÃO E AUTH ====================

  // --- Botão de Perfil (No Header) ---
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const usuarioLogado = localStorage.getItem("usuarioLogado");
      if (usuarioLogado) {
        // Se já está logado, vai para o perfil
        window.location.href = "perfil.html";
      } else {
        // Se não está logado, vai para criar conta (conforme seu pedido)
        // ou login.html. Vamos mandar para login, que tem link para criar conta.
        window.location.href = "login.html"; 
      }
    });
  }

  // --- Página de Cadastro (cadastro.html) ---
  const formCadastro = document.getElementById("formCadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("cadUser").value;
      const pass = document.getElementById("cadPass").value;

      const bancoUsuarios = JSON.parse(localStorage.getItem("usersDB")) || [];
      
      if(bancoUsuarios.find(u => u.user === user)) {
        alert("Usuário já existe!");
        return;
      }

      bancoUsuarios.push({ user, pass });
      localStorage.setItem("usersDB", JSON.stringify(bancoUsuarios));
      
      alert("Conta criada com sucesso! Redirecionando para Login...");
      window.location.href = "login.html";
    });
  }

  // --- Página de Login (login.html) ---
  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("logUser").value;
      const pass = document.getElementById("logPass").value;

      const bancoUsuarios = JSON.parse(localStorage.getItem("usersDB")) || [];
      const usuarioValido = bancoUsuarios.find(u => u.user === user && u.pass === pass);

      if (usuarioValido) {
        localStorage.setItem("usuarioLogado", user);
        alert(`Bem-vindo, ${user}!`);
        window.location.href = "index.html"; // Vai para o Index após logar
      } else {
        alert("Usuário ou senha incorretos.");
      }
    });
  }

  // --- Página de Perfil (perfil.html) ---
  const nomeUsuarioDisplay = document.getElementById("nomeUsuarioDisplay");
  if (nomeUsuarioDisplay) {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      nomeUsuarioDisplay.textContent = usuarioLogado;
    } else {
      window.location.href = "login.html"; // Proteção: se não logado, expulsa
    }
  }

  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      alert("Você saiu da conta.");
      window.location.href = "index.html";
    });
  }

  // ==================== 4. FUNCIONALIDADES GERAIS ====================

  // Busca de Filmes
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".card");
  if (searchInput && cards.length > 0) {
    searchInput.addEventListener("input", () => {
      const termo = searchInput.value.trim().toLowerCase();
      cards.forEach(card => {
        const h3 = card.querySelector("h3");
        if (h3) {
           const titulo = h3.textContent.toLowerCase();
           card.style.display = (termo === "" || titulo.includes(termo)) ? "block" : "none";
        }
      });
    });
  }

  // Formulário de Comentário
  const contactForm = document.getElementById("contactForm");
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mensagem enviada com sucesso!');
      contactForm.reset();
    });
  }

  // Cálculo de Média (Ranking)
  const btnMedia = document.getElementById("btnMedia");
  if(btnMedia){
      btnMedia.addEventListener('click', () => {
        const table = document.querySelector('.tabela tbody');
        if(!table) return;
        const rows = table.querySelectorAll('tr');
        let soma=0, cont=0;
        rows.forEach(r => {
          const val = parseFloat(r.cells[3]?.textContent);
          if(!isNaN(val)){ soma+=val; cont++; }
        });
        const media = cont ? (soma/cont).toFixed(2) : 'N/A';
        alert(`Média das notas: ${media}`);
      });
  }

});