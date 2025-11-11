const https = require ('node:http')

const dittoJSON = require ('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const {method, url} = req

  switch (method) {
    case 'GET':
      switch (url){
        case '/pokemon/ditto':
          res.setHeader ('Content-Type' , 'text/html; charset = utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type' , 'text/html; charset = utf-8')
          return res.end('404')
      }
    
    case 'POST':
      switch(url){
        case '/pokemon': {
        let body = ''
        // eescuchar el evento data
          req.on('data', chunk => {  //buffer chunk
          body += chunk ,toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // lamar auna BD para guardar la info
            res.writeHead(201, ('Content-Type' , 'application/json; charset = utf-8'))
            res.end(JSON.stringify(data))
          })
          break
        }

        default:
          res.statusCode = 404
          res.setHeader('Content-Type' , 'text/html; charset = utf-8')
          return res.end('404')
      }
  }
}

const server = https.createServer(processRequest)

server.listen(1234, () => {
  console.log('server listenin on port http://localhost:1234')
})