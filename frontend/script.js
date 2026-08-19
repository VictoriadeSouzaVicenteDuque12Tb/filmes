async function buscarFilmes() {
    // através do acesso a rota GET, trazer os filmes e mostrar na tela
    const resposta = await fetch("http://localhost:3333")
    const filmes = await resposta.json()
    const sectionFilmes = document.querySelector(".filmes")
    
    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.nome}</h2>
                <p><strong>Gênero:</strong> ${filme.gênero}</p>
                <p><strong>Duração:</strong> ${filme.duração} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.classificação > 0 ? filme.classificação + ' anos' : 'Livre'}</p>
            </div>
        `
    })
}

buscarFilmes()