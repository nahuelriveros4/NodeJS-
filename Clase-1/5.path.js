const path = require ('node:path')


console.log(path.sep)

// unir rutas
const filePath = path.join('content','subfolder','arc.txt')
console.log(filePath)

const extension = path.extname('image.jpg')
console.log(extension)