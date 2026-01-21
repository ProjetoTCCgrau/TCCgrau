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

// mostrarMensagem: exibe mensagem de sucesso (após envio validado)
function mostrarMensagem(msg){
  const box = document.createElement('div');
  box.textContent = msg;
  Object.assign(box.style,{position:'fixed',right:'18px',bottom:'18px',background:'#222',color:'#fff',padding:'10px 14px',borderRadius:'8px',boxShadow:'0 8px 20px rgba(0,0,0,0.6)'});
  document.body.appendChild(box);
  setTimeout(()=>box.remove(),1500);
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

// ==================== BUSCA ====================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const btnBuscar = document.getElementById("btnBuscar");
  const cards = document.querySelectorAll(".card");

  if (!searchInput || !btnBuscar) return;

  function filtrarFilmes() {
    const termo = searchInput.value.trim().toLowerCase();
    let encontrou = false;

    // Se o campo estiver vazio, mostra todos os filmes
    if (termo === "") {
      cards.forEach(card => {
        card.style.display = "block";
        card.style.border = "none";
      });
      return;
    }

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
  }

  // Quando apagar o texto, volta tudo automaticamente
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
      filtrarFilmes();
    }
  });
});

// Busca em tempo real sem a necessidade de apertar o botão de buscar
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".card");

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.trim().toLowerCase();

    cards.forEach(card => {
      const titulo = card.querySelector("h3")?.textContent.toLowerCase() || "";

      if (termo === "" || titulo.includes(termo)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
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