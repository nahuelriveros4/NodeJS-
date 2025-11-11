const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const desiredPort = process.env.PORT ?? 1234

const ProcessRequest = (req, res) => {
  res.setHeader ('Content-Type', 'text/html; charset=utf-8')
  if (req.url == '/') {
    res.statusCode = 200 // OK
    res.end('Bienvenido a mi página de inicio')
  } 
  else if (req.url == '/imagen-uno') {

    const imagePath = path.join(__dirname, 'imagen.png')

    fs.readFile(imagePath , (err,data) => {
      if (err){
        console.error('Error al leer la imagen: ', err)
        res.statusCode = 500
        res.end('Error 500')
      } else {
        res.setHeader ('Content-Type', 'image/png')
        res.end(data)
      }
    })
  }

  else if (req.url == '/contacto') {
    res.statusCode = 200 // OK
    res.end('Contacto')
  } else {
    res.statusCode = 404 // Not found
    res.end(' 404 error')
  }
}

const server = http.createServer(ProcessRequest)


server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
