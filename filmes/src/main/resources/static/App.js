function listarFilmes() {
    fetch('/filmes')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('filme-list');
            list.innerHTML = '';
            data.forEach(filme => {
                const item = document.createElement('div');
                item.textContent = `ID: ${filme.id} Nome: ${filme.nome}, Diretor: ${filme.diretor}, Ano: ${filme.anoLancamento}, Gênero: ${filme.genero}`;
                list.appendChild(item);
            });
        })
        .catch(error => console.error('Erro ao listar filmes:', error));
}

function adicionarFilme(event) {
    event.preventDefault();
    const nome = document.getElementById('filme-nome').value;
    const diretor = document.getElementById('filme-diretor').value;
    const anoLancamento = document.getElementById('filme-ano').value;
    const genero = document.getElementById('filme-genero').value;

    fetch('/filmes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, diretor, anoLancamento, genero})
    })
    .then(response => response.json())
    .then(filme => {
        alert('Filme adicionado com sucesso!');
        listarFilmes();
    })
    .catch(error => console.error('Erro ao adicionar filme:', error));
}

function atualizarFilme() {
    const id = document.getElementById('filme-id').value;
    const nome = document.getElementById('filme-nome').value;
    const diretor = document.getElementById('filme-diretor').value;
    const anoLancamento = document.getElementById('filme-ano').value;
    const genero = document.getElementById('filme-genero').value;

    fetch(`/filmes/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, diretor, anoLancamento, genero})
    })
    .then(response => response.json())
    .then(() => {
        alert('Filme atualizado com sucesso!');
        listarFilmes();
    })
    .catch(error => console.error('Erro ao atualizar filme:', error));
}

function deletarFilme() {
    const id = document.getElementById('filme-id').value;

    fetch(`/filmes/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Filme deletado com sucesso!');
            listarFilmes();
        } else {
            alert('Falha ao deletar filme.');
        }
    })
    .catch(error => console.error('Erro ao deletar filme:', error));
}

function listarAtores() {
    fetch('/atores')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('ator-list');
            list.innerHTML = '';
            data.forEach(ator => {
                const item = document.createElement('div');
                item.textContent = `ID: ${ator.id} Nome: ${ator.nome}, Gênero: ${ator.genero}, Data de Nascimento: ${ator.nascimento}`;
                list.appendChild(item);
            });
        })
        .catch(error => console.error('Erro ao listar atores:', error));
}

function adicionarAtor(event) {
    event.preventDefault();
    const nome = document.getElementById('ator-nome').value;
    const genero = document.getElementById('ator-genero').value;
    const nascimento = document.getElementById('ator-nascimento').value;

    fetch('/atores', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, genero, nascimento})
    })
    .then(response => response.json())
    .then(ator => {
        alert('Ator adicionado com sucesso!');
        listarAtores();
    })
    .catch(error => console.error('Erro ao adicionar ator:', error));
}

function atualizarAtor() {
    const id = document.getElementById('ator-id').value;
    const nome = document.getElementById('ator-nome').value;
    const genero = document.getElementById('ator-genero').value;
    const nascimento = document.getElementById('ator-nascimento').value;

    fetch(`/atores/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, genero, nascimento})
    })
    .then(response => response.json())
    .then(() => {
        alert('Ator atualizado com sucesso!');
        listarAtores();
    })
    .catch(error => console.error('Erro ao atualizar ator:', error));
}

function deletarAtor() {
    const id = document.getElementById('ator-id').value;

    fetch(`/atores/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Ator deletado com sucesso!');
            listarAtores();
        } else {
            alert('Falha ao deletar ator.');
        }
    })
    .catch(error => console.error('Erro ao deletar ator:', error));
}
