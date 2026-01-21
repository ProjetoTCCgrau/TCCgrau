// Lógica para exibir a hora
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('horaAtual');
  if (!el) return;

  const url = "https://worldtimeapi.org/api/timezone/America/Sao_Paulo";
  let agora;

  fetch(url)
    .then(r => r.json())
    .then(d => {
      agora = new Date(d.datetime);
      atualizar();
      setInterval(() => {
        agora.setSeconds(agora.getSeconds() + 1);
        atualizar();
      }, 1000);
    })
    .catch(() => el.textContent = "Erro ao carregar a hora.");

  function atualizar() {
    el.textContent =
      agora.toLocaleDateString("pt-BR", {
        year: "numeric", month: "long", day: "numeric"
      }) +
      " " +
      agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
      }) +
      " (Horário de Brasília)";
  }
});

/* alterarCorDeFundo: alterna tema (escuro / mais roxo) — chamada por botão */
function alterarCorDeFundo(){
  const body = document.body;
  if(body.classList.toggle('alt-theme')){
    body.style.background = 'linear-gradient(180deg,#2b0b1f,#2b0b1f)';
  } else {
    body.style.background = 'linear-gradient(180deg,#0b0b0d,#161418)';
  }
}

/* validarFormulario: checa campos obrigatórios e notas válidas; retorna boolean */
function validarFormulario(form){
  const nome = form.querySelector('[name="nome"]');
  if(!nome || !nome.value.trim()){
    alert('Por favor, preencha seu nome (obrigatório).');
    nome.focus();
    return false;
  }
  const nota = form.querySelector('[name="nota"]');
  if(nota && (nota.value < 0 || nota.value > 10)){
    alert('Nota deve estar entre 0 e 10.');
    nota.focus();
    return false;
  }
  return true;
}

/* mostrarMensagem: exibe mensagem de sucesso (após envio validado) */
function mostrarMensagem(msg){
  const box = document.createElement('div');
  box.textContent = msg;
  Object.assign(box.style,{position:'fixed',right:'18px',bottom:'18px',background:'#222',color:'#fff',padding:'10px 14px',borderRadius:'8px',boxShadow:'0 8px 20px rgba(0,0,0,0.6)'});
  document.body.appendChild(box);
  setTimeout(()=>box.remove(),3500);
}

/* calcularMedia: percorre tabela com classe .tabela e calcula média da coluna Nota */
function calcularMedia(){
  const table = document.querySelector('.tabela tbody');
  if(!table) { mostrarMensagem('Tabela não encontrada.'); return; }
  const rows = table.querySelectorAll('tr');
  let soma=0,cont=0;
  rows.forEach(r=>{
    const val = parseFloat(r.cells[3]?.textContent);
    if(!isNaN(val)){ soma+=val; cont++; }
  });
  const media = cont? (soma/cont).toFixed(2) : 'N/A';
  mostrarMensagem(`Média das notas: ${media}`);
  return media;
}


  // formulário: valida/mostra mensagem e previne envio real (ex.: sem backend)
  const form = document.querySelector('.formulario');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(!validarFormulario(form)) return;
      mostrarMensagem('Avaliação enviada com sucesso! Obrigado.');
      form.reset();
    });
  }


//login/cadastro inicial
function alternarTema() {
  document.body.classList.toggle('tema-alternativo');
}

function abrirModal() {
  document.getElementById('authModal').hidden = false;
}

function fecharModal() {
  document.getElementById('authModal').hidden = true;
}

function mostrarCadastro() {
  document.getElementById('loginForm').hidden = true;
  document.getElementById('registerForm').hidden = false;
}

function mostrarLogin() {
  document.getElementById('registerForm').hidden = true;
  document.getElementById('loginForm').hidden = false;
}

//cadastro
function cadastrarUsuario(evento) {
  evento.preventDefault();

  const usuario = document.getElementById('regUser').value.trim();
  const senha = document.getElementById('regPass').value.trim();

  if (!usuario || !senha) {
    alert('Preencha todos os campos.');
    return;
  }

  localStorage.setItem(`usuario_${usuario}`, senha);
  alert('Conta criada com sucesso!');

  evento.target.reset();
  mostrarLogin();
}

//login
function fazerLogin(evento) {
  evento.preventDefault();

  const usuario = document.getElementById('loginUser').value.trim();
  const senha = document.getElementById('loginPass').value.trim();

  const senhaSalva = localStorage.getItem(`usuario_${usuario}`);

  if (senhaSalva === senha) {
    alert(`Bem-vindo, ${usuario}!`);
    fecharModal();
  } else {
    alert('Usuário ou senha inválidos.');
  }
}

//inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Tema
 

  // Modal
  document.getElementById('loginBtn')
    ?.addEventListener('click', abrirModal);

  document.getElementById('closeAuth')
    ?.addEventListener('click', fecharModal);

  // Troca login / cadastro
  document.getElementById('goRegister')
    ?.addEventListener('click', mostrarCadastro);

  document.getElementById('goLogin')
    ?.addEventListener('click', mostrarLogin);

  // Formulários
  document.getElementById('registerForm')
    ?.addEventListener('submit', cadastrarUsuario);

  document.getElementById('loginForm')
    ?.addEventListener('submit', fazerLogin);
});
// ==================== BUSCA ====================
  document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const btnBuscar = document.getElementById("btnBuscar");

  if (!searchInput || !btnBuscar) return;

  btnBuscar.addEventListener("click", () => {
    const termo = searchInput.value.trim().toLowerCase();

    if (!termo) {
      mostrarMensagem("Digite algo para buscar.");
      return;
    }

    const cards = document.querySelectorAll(".card");
    let encontrou = false;

    cards.forEach(card => {
      const titulo = card.querySelector("h3")?.textContent.toLowerCase() || "";

      if (titulo.includes(termo)) {
        card.style.display = "block";
        card.style.border = "2px solid #9b4dff";
        encontrou = true;
      } else {
        card.style.display = "none";
      }
    });

    if (!encontrou) {
      mostrarMensagem("Nenhum filme encontrado.");
    }
  });
});
//  tema
document.addEventListener("DOMContentLoaded", () => {
  const btnTema = document.getElementById("btnTema");
  if (!btnTema) return;

  // Restaurar tema salvo
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "claro") {
    document.body.classList.add("light-mode");
  }

  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const temaAtual = document.body.classList.contains("light-mode")
      ? "claro"
      : "escuro";

    localStorage.setItem("tema", temaAtual);
    mostrarMensagem(`Tema ${temaAtual} ativado`);
  });
});