const express = require ('express')
const movies = require ('./movies.json')
const crypto = require ('node:crypto')

const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'https://localhost:1234',
]
// Todos los recursos que sean movies se identifican con /movies
app.get('/movies',(req,res) => {
  const origin = req.get('origin')    
  if (!ACCEPTED_ORIGINS.includes(origin) || !origin){
    res.header('Access-Control-Allow-Origin',origin)  
  }

  const {genre} = req.query
  if (genre){
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() == genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

// Recuperar una pelicula
app.get('/movies/:id', (req,res)=>{
  const {id} = req.params
  const movie = movies.find(movie => movie.id == id)
  if(movie) return res.json(movie)
    res.status(404).json({message: 'Movie not found'})
})

//eliminar pelicula
app.delete('/movies/:id', (req,res) => {
  if (!ACCEPTED_ORIGINS.includes(origin) || !origin){
    res.header('Access-Control-Allow-Origin',origin)  
  }
  const {id} = req.params
  const movieIndex = movies.findIndex(movie => movie.id == id)

    if (movieIndex === -1){
      return res.status(404).json({message: 'Movie not found'})
    }
    movies.splice (movieIndex, 1)
    res.status(204).end()
})


// POST Crear una pelicula
app.post('/movies', (req,res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({error: JSON.parse(result.error.message)})
  }
  const newMovie= {
    id: crypto.randomUUID(),
    ...result.data
  }

  //No seria rest, pq estamos guardando
  // el estado de la app en memoria
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

//PATCH
app.patch('/movies/:id', (req,res)=> {
  const result = validatePartialMovie(req.body)

  if(!result.success){
    return res.status(400).json({error: JSON.parse(result.error.message)})
  }

  const {id} = req.params  //se recupera el id de parametros 
  const movieIndex = movies.findIndex(movie => movie.id = id)

  if(!movieIndex == -1) return res.status(404).json({message: 'Movie not found'})

    const updateMovie={
      ...movies[movieIndex],
      ...result.data
    }

    movies[movieIndex] = updateMovie
    return res.json(updateMovie)
})

app.options('/movies:id', (req,res) => {
  if (!ACCEPTED_ORIGINS.includes(origin) || !origin){
    res.header('Access-Control-Allow-Origin',origin)  
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS')
  }

  res.end(200)
} )

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})