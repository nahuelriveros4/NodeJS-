const fs= require ('node:fs')

// SINCRONO

//console.log('Leyendo el primer archivo ...')
//const text = fs.readFileSync('./archivo.txt', 'utf-8')

//console.log(text)

//console.log('Leyendo el primer archivo ...')
//const text2 =fs.readFileSync('./archivo2.txt', 'utf-8')

//console.log(text2)

// ASINCRONO

console.log('Leyendo el primer archivo ...')
fs.readFile('./archivo.txt', 'utf-8', (err,text) => {
    console.log(text)
})

console.log('Haciendo cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo ...')
fs.readFile('./archivo2.txt', 'utf-8', (err,text) => {
    console.log(text)
})