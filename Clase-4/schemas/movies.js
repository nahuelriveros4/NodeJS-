import z from 'zod'
const movieSchema =  z.object({
    tittle: z.string({
      require_error:'Movie title is requiresd'
    }),
    year : z.number().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate:  z.number().min(0).max(10).default(5),
    poster: z.url({
      message: 'URL invalid'
    }),
    genre: z.array(
      z.enum(['Action', 'Adventure','Crime','Comedy','Drama','Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
      {
        invalid_type_error: 'Movie genre',
        require_error:'Movie genre is requiresd'}
    )
  })

  export function validateMovie(input) {
    return movieSchema.safeParse(input)
  }

  export function validatePartialMovie (input){
    return movieSchema.partial().safeParse(input)  //partial puede modificar ciertas datos (propiedades)
  }

