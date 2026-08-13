//UTILITÁRIOS GLOBAIS
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

//mostra a mensagem de exibição e notificações visuais
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

//INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  
  // Cache de estado global
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  //LOGICA PARA EXIBIR A HORA
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

  // LOGICA PARA O TEMA DO SITE
  const btnTema = document.getElementById("btnTema");
  if (btnTema) {
    if (localStorage.getItem("tema") === "claro") document.body.classList.add("light-mode");

    btnTema.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light-mode");
      const temaAtual = isLight ? "claro" : "escuro";
      localStorage.setItem("tema", temaAtual);
      mostrarMensagem(`Tema ${temaAtual} ativado`);
    });
  }

  // FORMULÁRIOS

  //FORMULÁRIO DE AVALIAÇÃO
  const formAvaliacao = document.querySelector('.formulario:not(#formLogin):not(#formCadastro)');
  if (formAvaliacao) {
    formAvaliacao.addEventListener('submit', e => {
      e.preventDefault();
      if (typeof validarFormulario === 'function' && !validarFormulario(formAvaliacao)) return;
      mostrarMensagem('Avaliação enviada com sucesso! Obrigado.');
      formAvaliacao.reset();
    });
  }

  //FORMULÁRIO DO LOGIN
  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", e => {
      e.preventDefault();
      const user = document.getElementById("logUser")?.value.trim();
      const pass = document.getElementById("logPass")?.value.trim();
      
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const valido = usuarios.find(u => u.user === user && u.pass === pass);

      if (!valido) return mostrarMensagem("Usuário ou senha incorretos!");

      localStorage.setItem("usuarioLogado", user);
      mostrarMensagem(`Bem-vindo, ${user}!`);
      setTimeout(() => window.location.href = "index.html", 1000);
    });
  }

  //FORMULÁRIO DO CADASTRO
  const formCadastro = document.getElementById("formCadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", e => {
      e.preventDefault();
      const user = document.getElementById("cadUser")?.value.trim();
      const pass = document.getElementById("cadPass")?.value.trim();

      if (!user || !pass) return mostrarMensagem("Preencha todos os campos!");

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      if (usuarios.some(u => u.user === user)) return mostrarMensagem("Este usuário já existe!");

      usuarios.push({ user, pass });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      mostrarMensagem("Conta criada com sucesso!");
      setTimeout(() => window.location.href = "login.html", 1200);
    });
  }

  //PERFIL E CABEÇALHO

  // FUNÇÃO PARA ATUALIZAR O ÍCONE E NOME NO HEADER
  function atualizarHeaderPerfil() {
    const perfilHeader = document.getElementById("perfilHeader");
    const nomeHeader = document.getElementById("perfilNomeHeader");
    const fotoHeader = document.getElementById("perfilFotoHeader");

    if (!perfilHeader) return;

    if (!usuarioLogado) {
      perfilHeader.classList.add("sem-login");
      perfilHeader.onclick = () => window.location.href = "login.html";
      return;
    }

    perfilHeader.classList.remove("sem-login");
    if (nomeHeader) nomeHeader.textContent = usuarioLogado;
    
    const foto = localStorage.getItem(`fotoPerfil_${usuarioLogado}`);
    if (fotoHeader) fotoHeader.src = foto || "img/user-default.png";

    perfilHeader.onclick = () => window.location.href = "perfil.html";
  }

  //LÓGICA DA PÁGINA DE PERFIL
  const nomePerfil = document.getElementById("nomeUsuarioPerfil");
  const fotoPerfil = document.getElementById("fotoPerfilPreview");
  const fotoInput = document.getElementById("fotoPerfilInput");
  if (nomePerfil || fotoPerfil) {
    if (!usuarioLogado) {

      // Redireciona apenas se estiver na página de perfil sem login
      if (window.location.pathname.includes("perfil.html")) {
        mostrarMensagem("Você precisa estar logado!");
        setTimeout(() => window.location.href = "login.html", 1000);
      }
    } else {
      if (nomePerfil) nomePerfil.textContent = usuarioLogado;
      const chaveFoto = `fotoPerfil_${usuarioLogado}`;
      if (fotoPerfil) fotoPerfil.src = localStorage.getItem(chaveFoto) || "img/user-default.png";

      if (fotoInput) {
        fotoInput.addEventListener("change", e => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = ev => {
            localStorage.setItem(chaveFoto, ev.target.result);
            if (fotoPerfil) fotoPerfil.src = ev.target.result;
            atualizarHeaderPerfil(); // Sincroniza o header
            mostrarMensagem("Foto atualizada!");
          };
          reader.readAsDataURL(file);
        });
      }
    }
  }
  //INICIALIZA O HEADER
  atualizarHeaderPerfil();

  //BOTÃO DE LOGOUT
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      mostrarMensagem("Você saiu da conta!");
      setTimeout(() => window.location.href = "login.html", 1000);
    });
  }
});