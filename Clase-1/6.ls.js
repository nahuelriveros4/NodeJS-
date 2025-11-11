const fs = require('node:fs');
const { fileURLToPath } = require('node:url');

fs.readdir('.' ,(err, files)=> {
    if(err){
        console.error('Error al leer el directorio: ', err)
        return;
    }
    files.forEach(file =>{
    console.log(file)
})
} )

