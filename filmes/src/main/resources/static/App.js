function showSection(sectionId) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    showSection('filme');
    document.getElementById('btn-filme').addEventListener('click', () => showSection('filme'));
    document.getElementById('btn-anoLancamento').addEventListener('click', () => showSection('anoLancamento'));
    
});

function listarFilmes() {
    fetch('/filmes')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                console.error('Resposta inesperada do servidor:', data);
                alert('Erro ao listar filmes.');
                return;
            }
            const list = document.getElementById('filmes-list');
            list.innerHTML = '';
            data.forEach(filme => {
                const item = document.createElement('div');
                item.textContent = `ID: ${filme.id} Nome: ${filme.nome}, Diretor: ${filme.diretor}, Ano de Lançamento: ${filme.anoLancamento}, Gênero: ${filme.genero}`;
                list.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Erro ao listar filmes:', error);
            alert('Erro ao listar filmes.');
        });
}

function adicionarFilme(event) {
    event.preventDefault();
    const nome = document.getElementById('filme-nome').value;
    const diretor = document.getElementById('filme-diretor').value;
    const anoLancamento = document.getElementById('filme-ano-lancamento').value;
    const genero = document.getElementById('filme-genero').value;

    fetch('/filmes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, diretor, anoLancamento, genero })
    })
        .then(response => response.json())
        .then(filme => {
            alert('Filme adicionado com sucesso!');
            listarFilmes();
        })
        .catch(error => {
            console.error('Erro ao adicionar filme:', error);
            alert('Erro ao adicionar filme.');
        });
}

function atualizarFilme() {
    const id = document.getElementById('filme-id').value;
    const nome = document.getElementById('filme-nome').value;
    const diretor = document.getElementById('filme-diretor').value;
    const anoLancamento = document.getElementById('filme-ano-lancamento').value;
    const genero = document.getElementById('filme-genero').value;

    fetch(`/filmes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, nome, diretor, anoLancamento, genero })
    })
        .then(response => response.json())
        .then(data => {
            alert('Filme atualizado com sucesso!');
            listarFilmes();
        })
        .catch(error => {
            console.error('Erro ao atualizar filme:', error);
            alert('Erro ao atualizar filme.');
        });
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
        .catch(error => {
            console.error('Erro ao deletar filme:', error);
            alert('Erro ao deletar filme.');
        });
}

function listarAtores() {
    fetch('/atores')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                console.error('Resposta inesperada do servidor:', data);
                alert('Erro ao listar atores.');
                return;
            }
            const list = document.getElementById('atores-list');
            list.innerHTML = '';
            data.forEach(ator => {
                const item = document.createElement('div');
                item.textContent = `ID: ${ator.id} Nome: ${ator.nome}, Diretor: ${ator.diretor}, Ano de Lançamento: ${ator.anoLancamento}, Gênero: ${ator.genero}`;
                list.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Erro ao listar atores:', error);
            alert('Erro ao listar atores.');
        });
}

function adicionarAtor(event) {
    event.preventDefault();
    const nome = document.getElementById('ator-nome').value;
    const diretor = document.getElementById('ator-diretor').value;
    const anoLancamento = document.getElementById('ator-ano-lancamento').value;
    const genero = document.getElementById('ator-genero').value;

    fetch('/atores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, diretor, anoLancamento, genero })
    })
        .then(response => response.json())
        .then(ator => {
            alert('Ator adicionado com sucesso!');
            listarAtores();
        })
        .catch(error => {
            console.error('Erro ao adicionar ator:', error);
            alert('Erro ao adicionar ator.');
        });
}

function atualizarAtor() {
    const id = document.getElementById('ator-id').value;
    const nome = document.getElementById('ator-nome').value;
    const diretor = document.getElementById('ator-diretor').value;
    const anoLancamento = document.getElementById('ator-ano-lancamento').value;
    const genero = document.getElementById('ator-genero').value;

    fetch(`/atores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, nome, diretor, anoLancamento, genero })
    })
        .then(response => response.json())
        .then(data => {
            alert('Ator atualizado com sucesso!');
            listarAtores();
        })
        .catch(error => {
            console.error('Erro ao atualizar ator:', error);
            alert('Erro ao atualizar ator.');
        });
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
        .catch(error => {
            console.error('Erro ao deletar ator:', error);
            alert('Erro ao deletar ator.');
        });
}

