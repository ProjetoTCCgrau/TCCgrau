/* mostrarDataAtual: escreve data/hora atual no rodapé ao carregar */
function mostrarDataAtual(){
  const footer = document.querySelector('.site-footer');
  if(!footer) return;
  const now = new Date();
  const texto = ` ${now.toLocaleString()}`;
  footer.dataset.updated = texto;
  footer.innerHTML = footer.innerHTML + `<span style="display:block;margin-top:6px;color:#a8a0a0;font-size:0.9rem">${texto}</span>`;
}

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

/* Inicialização: liga eventos ao carregar a página */
document.addEventListener('DOMContentLoaded',()=>{
  mostrarDataAtual();

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

  // botão alternar tema, se existir
  const temaBtn = document.querySelector('#btnTema');
  if(temaBtn) temaBtn.addEventListener('click', alterarCorDeFundo);

  // botão calcular média (tabela)
  const btnCalc = document.querySelector('#btnMedia');
  if(btnCalc) btnCalc.addEventListener('click', calcularMedia);
});

// registro/login 
document.addEventListener('click',e=>{
  const auth=document.getElementById('authModal');
  if(!auth) return;
  if(e.target.id==='authBtn') auth.hidden=false;
  if(e.target.id==='closeAuth') auth.hidden=true;
  if(e.target.id==='toReg'){ document.getElementById('login').hidden=true; document.getElementById('reg').hidden=false; }
  if(e.target.id==='toLog'){ document.getElementById('reg').hidden=true; document.getElementById('login').hidden=false; }
});
document.getElementById('reg')?.addEventListener('submit',e=>{
  e.preventDefault();
  const u=e.target.u.value.trim(), p=e.target.p.value;
  if(!u||!p) return alert('preencha');
  try{ localStorage.setItem('goth_user_'+u,p); }catch(err){}
  mostrarMensagem?.('Conta criada');
  e.target.reset();
  document.getElementById('login').hidden=false; document.getElementById('reg').hidden=true;
});
document.getElementById('login')?.addEventListener('submit',e=>{
  e.preventDefault();
  const u=e.target.u.value.trim(), p=e.target.p.value;
  const pass=localStorage.getItem('goth_user_'+u);
  if(pass===p){ mostrarMensagem?.('Bem-vindo, '+u); document.getElementById('authModal').hidden=true; }
  else alert('usuário/senha inválidos');
});
document.addEventListener('click',e=>{ if(e.target.id==='authCreateBtn'){const m=document.getElementById('authModal'); if(!m) return; m.hidden=false; document.getElementById('login').hidden=true; document.getElementById('reg').hidden=false; }});


