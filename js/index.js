var inpProduto = document.getElementById('produtoNew');
var inpQtde = document.getElementById('qtdeNew');
var inpValor = document.getElementById('valorNew');
var btnSalvar = document.getElementById('confirmaNew');
var btnSomar = document.getElementById('somarNew');
var labelItens = document.getElementById('itensNew');
var labelResult = document.getElementById('resultNew');
let listaTarefas = document.querySelector('#listaTarefas');

btnSalvar.addEventListener('click', funcSalvar)
btnSomar.addEventListener('click', somarTudo)

inpValor.addEventListener('keypress', (e) => {

    if(e.keyCode == 13) {
        funcSalvar()
    }
});

inpQtde.addEventListener('keypress', (e) => {

    if(e.keyCode == 13) {
        inpValor.focus()
    }
});

function funcSalvar(){

    if (localStorage.length == 0){
        if (inpValor.value == ""){
            alert('Campo Vazio')
        } else {
        var somaQtde = inpQtde.value * inpValor.value
        localStorage.setItem (1, somaQtde)
        criarTagLI(1, somaQtde)
        inpValor.value = ""
        inpQtde.value = "1"
        }
    } else {
        if (inpValor.value == ""){
            alert('Campo Vazio')
        } else {
        var somaQtde = inpQtde.value * inpValor.value
        localStorage.setItem (localStorage.length +1, somaQtde)
        criarTagLI(localStorage.length, somaQtde)
        inpValor.value = ""
        inpQtde.value = "1"        
        }
    }

    somarTudo()
    
}

function limparLocal(){
    localStorage.clear()
    window.location.reload();
}

function somarTudo(){
    var total = 0;
    for (var i = 1; i <= localStorage.length; i++){
        total += parseFloat((localStorage.getItem(i)));  
    }

    labelResult.innerText = 'Total: ' + (total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
}

function popularLista(){
    if (localStorage.length >= 1){
        for (var i = 1; i <= localStorage.length; i++){
            var valor = parseFloat((localStorage.getItem(i)));
            criarTagLI(i, valor)
            somarTudo()
            }
        } else {
            console.log ('Local Vazio')
        }
}


function criarTagLI(id, valor){

    let li = document.createElement('li');
    li.id = id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    let div  = document.createElement('div');

    let btnExcluir  = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+id+')');

    div.appendChild(btnExcluir);

    listaTarefas.appendChild(li)
    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function excluir(id) {
    let confirmacao = window.confirm('Tem certeza que deseja excluir? ');
    if(confirmacao) {
        let li = document.getElementById(''+ id + '');
        if(li) {
            listaTarefas.removeChild(li);
            localStorage.removeItem(id)
            somarTudo()
        } else {
            alert('Elemento HTML não encontrado!');
        }
    }
}