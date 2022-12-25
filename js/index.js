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

function separarValores(chave){
    var separarString = localStorage.getItem(chave);
    const quebraTexto = separarString.split('-');
    var moeda = parseFloat(quebraTexto[2])
    console.log (moeda)
    criarTagLI(chave, (quebraTexto[0]), (quebraTexto[1]),(moeda))
}

function funcSalvar(){
    if (localStorage.length == 0){
        if (inpValor.value == ""){
            alert('Campo Vazio')
        } else {
            var somaQtde = inpQtde.value * inpValor.value
            localStorage.setItem(1, inpProduto.value+'-'+inpQtde.value+'-'+ somaQtde.toFixed(2))
            separarValores(1)
            inpProduto.value = ""
            inpValor.value = ""
            inpQtde.value = "1"
        }
    } else {
        if (inpValor.value == ""){
            alert('Campo Vazio')
        } else {
            var somaQtde = inpQtde.value * inpValor.value;
            localStorage.setItem(localStorage.length +1, inpProduto.value+'-'+inpQtde.value+'-'+somaQtde.toFixed(2))
            separarValores(localStorage.length)
            inpProduto.value = ""
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
        var valor = localStorage.getItem(i).split('-')
        total += parseFloat(valor[2]);
    }

    labelResult.innerText = 'Total: ' + (total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
}

function popularLista(){
    if (localStorage.length >= 1){
        for (var i = 1; i <= localStorage.length; i++){
            var valorChave = localStorage.getItem(i).split('-')
            criarTagLI(i, valorChave[0], valorChave[1], parseFloat(valorChave[2]))
            somarTudo()
            }
        } else {
            console.log ('Local Vazio')
        }
}


function criarTagLI(id, prodTex, qtdeTex, valor){
    let li = document.createElement('li');
    li.id = id;
    var textoSpan = prodTex + ' '+'('+qtdeTex+')'+ ' ' + valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let spanP = document.createElement('span');
    let spanQ = document.createElement('span');
    let spanV = document.createElement('span');
    
    spanP.classList.add('textoTarefa');
    spanP.innerHTML = prodTex;

    spanQ.classList.add('textoTarefa');
    spanQ.innerHTML = '('+qtdeTex+')';
    
    spanV.classList.add('textoTarefa');
    spanV.innerHTML = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    let div  = document.createElement('div');

    let btnExcluir  = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+id+')');

    div.appendChild(btnExcluir);

    listaTarefas.appendChild(li)
    li.appendChild(spanP);
    li.appendChild(spanQ);
    li.appendChild(spanV);
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