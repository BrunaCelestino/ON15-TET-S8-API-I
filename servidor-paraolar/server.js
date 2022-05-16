const filmes = require("./data/filmes.json")
const series = require("./data/series.json")

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
    response.status(200).json([
        {
            "mensagem": "API de filmes e series ON15"
        }
    ])
})

app.get("/filmes", (request, response) => {
    response.status(200).send(filmes)
})

app.get("/series", (request, response) => {
    response.status(200).send(series)
})
app.get("/filmes/buscar/:id", (request, response) => {
    let idRequest = request.params.id

    let filmeEncontrado = filmes.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)

})
app.get("/series/buscar/:id", (request, response) => {
    let idRequest = request.params.id

    let serieEncontrada = series.find(serie => serie.id == idRequest)
    response.status(200).send(serieEncontrada)

})
// app.get("/filmes/filtro", (request, response) => {
//     let nomeRequest = request.query.titulo.toLocaleLowerCase()

//     let filmeEncontrado = filmes.filter(filme => filme.title.toLowerCase().includes(nomeRequest))
//     response.status(200).send(filmeEncontrado)
// })

app.post("/filmes/cadastrar", (request, response) => {
    let bodyRequest = request.body

    let novoFilme = {
        id: (filmes.length) + 1,
        Title: bodyRequest.Title,
        Year: bodyRequest.Year,
        Rated: bodyRequest.Rated,
        Released: bodyRequest.Released,
        Runtime: bodyRequest.Runtime,
        Genre: bodyRequest.Genre,
        Director: bodyRequest.Director,
        Writer: bodyRequest.Writer,
        Actors: bodyRequest.Actors,
        Plot: bodyRequest.Plot,
        Language: bodyRequest.Language,
        Country: bodyRequest.Country,
        Awards: bodyRequest.Awards

    }

    filmes.push(novoFilme)
    response.status(201).send({
        "mensagem": "Filme cadastrado com sucesso",
        novoFilme
    })
})

app.post("/series/cadastrar", (request, response) => {
    let bodyRequest = request.body

    let novaSerie = {
        id: (series.length) + 1,
        title: bodyRequest.title,
        totalSeasons: bodyRequest.totalSeasons,
        genre: bodyRequest.genre,
        writers: bodyRequest.writers,
        poster: bodyRequest.poster,
        actors: bodyRequest.actors,
        ratings: bodyRequest.ratings

    }

    series.push(novaSerie)
    response.status(201).send({
        "mensagem": "Série cadastrada com sucesso",
        novaSerie
    })
})

app.listen(8099, () => {
    console.log(" TOC TOC! Quem bate? É a porta! Que porta? A Porta 8099")
}) 