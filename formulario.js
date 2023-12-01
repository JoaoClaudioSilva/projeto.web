document.getElementById('Formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    // itens da lista
    var nome = document.getElementById('nome').value;
    var cidade = document.getElementById('cidade').value;
    var mensagem = document.getElementById('mensagem').value;

    //data e horario
    var currentDate = new Date();
    var dateString = currentDate.toLocaleString();
    var dataList = document.getElementById('dataList');

    var newItem = document.createElement('li');

    // crirar item da lista
    newItem.innerHTML = 'Nome: ' + nome + ', Cidade: ' + cidade + ', Contribuição: ' + mensagem +
        ' // Hora de envio: ' + dateString + ' <button class="excluirItem">Excluir</button>';

    // adc item lista
    dataList.appendChild(newItem);

    // salva local storage
    salvarNoLocalStorage();

    // limpar os campos do formulario depois de enviar
    document.getElementById('Formulario').reset();

    // excluir item lista
    var btnExcluir = newItem.querySelector('.excluirItem');
    btnExcluir.addEventListener('click', function () {
        excluirItem(newItem);
    });
});

// funcao excluir todos ao clicar
document.getElementById('excluirTodos').addEventListener('click', function () {
    excluirTodosItens();
});

// funcao excluir todos
function excluirTodosItens() {
    var dataList = document.getElementById('dataList');

    // remove os itens da lista
    while (dataList.firstChild) {
        dataList.removeChild(dataList.firstChild);
    }

    // remove os dados do local storage
    localStorage.removeItem('formData');
}

document.addEventListener('DOMContentLoaded', function () {
    var dataList = document.getElementById('dataList');
    var storedData = JSON.parse(localStorage.getItem('formData')) || [];

    storedData.forEach(function (itemHTML) {
        var newItem = document.createElement('li');
        newItem.innerHTML = itemHTML;

        var btnExcluir = newItem.querySelector('.excluirItem');
        btnExcluir.addEventListener('click', function () {
            excluirItem(newItem);
        });

        dataList.appendChild(newItem);
    });
});

// limpar os campos ao clicar
document.getElementById('limparCampos').addEventListener('click', function () {
    limparCampos();
});
// funcao limpa campo
function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('mensagem').value = '';
}

// excluir item da lista e do local storage
function excluirItem(item) {
    // remove da liosta
    item.remove();

    // remove do local storage
    salvarNoLocalStorage();
}

// salva os dados no local storage
function salvarNoLocalStorage() {
    var dataList = document.getElementById('dataList');
    var items = dataList.querySelectorAll('li');

    var data = [];

    // coleta dados
    items.forEach(function (item) {
        data.push(item.innerHTML);
    });

    // salva
    localStorage.setItem('formData', JSON.stringify(data));
}

// carrega os dados
document.addEventListener('DOMContentLoaded', function () {
    var dataList = document.getElementById('dataList');
    var storedData = JSON.parse(localStorage.getItem('formData')) || [];

    storedData.forEach(function (itemHTML) {
        var newItem = document.createElement('li');
        newItem.innerHTML = itemHTML;

        var btnExcluir = newItem.querySelector('.excluirItem');
        btnExcluir.addEventListener('click', function () {
            excluirItem(newItem);
        });

        dataList.appendChild(newItem);
    });
});


// botao pesquisar
document.getElementById('btnPesquisar').addEventListener('click', function () {
    pesquisarItens();
});

// funcao pesquisar
function pesquisarItens() {
    var campoPesquisa = document.getElementById('campoPesquisa').value.toLowerCase();
    var dataList = document.getElementById('dataList');
    var items = dataList.querySelectorAll('li');

    items.forEach(function (item) {
        var itemText = item.textContent.toLowerCase();
        // verifica
        if (itemText.includes(campoPesquisa)) {
            item.style.display = 'block'; //exibe o item encontrado
        } else {
            item.style.display = 'none'; // oculta se nao
        }
    });
}