//para iniciar el backend
//requiere express como framework
const express = require('express')
// inicializa la aplicacion
const app = express()
//el puerto en el que se va a iniciar
const port = 3000
// mensaje de prueba: cuando la app hace un get del / retorna Hello World
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// para traer los productos desde el google Sheets
const repository = require('./archivosDeConfiguracion/repository')

// para leer el post de pagar como json
app.use(express.json())

// backend de la pagina
// let productos = [
//   {
//     id: 1,
//     name: 'Wapsipinicon Peach',
//     description: 'Tomate mediano amarillo de textura aterciopelada',
//     price: 500,
//     image: 'media/laHuertaLogo.jpg',
//     stock: 4,
//   },
//   {
//     id: 2,
//     name: 'Black Keyes',
//     description: 'Tomate mediano amarillo de textura aterciopelada',
//     price: 500,
//     image: 'media/laHuertaLogo.jpg',
//     stock: 2,
//   },
//   {
//     id: 3,
//     name: 'Aperitivo Dulce',
//     description: 'Tomate mediano amarillo de textura aterciopelada',
//     price: 500,
//     image: 'media/laHuertaLogo.jpg',
//     stock: 3,
//   },
//   {
//     id: 4,
//     name: 'Bonsai',
//     description: 'Tomate mediano amarillo de textura aterciopelada',
//     price: 500,
//     image: 'media/laHuertaLogo.jpg',
//     stock: 5,
//   },
//   {
//     id: 5,
//     name: 'Ildi',
//     description: 'Tomate mediano amarillo de textura aterciopelada',
//     price: 500,
//     image: 'media/laHuertaLogo.jpg',
//     stock: 2,
//   },
//   {
//     id: 6,
//     name: 'Amarillo',
//     description: 'Tomate mediano amarillo de textura aterciopelada',
//     price: 500,
//     image: 'media/laHuertaLogo.jpg',
//     stock: 1,
//   },
// ]
//cuando la app hace un get de /api/productos, me retorna los productos

app.get('/api/productos', async (req, res) => {
  res.send(await repository.read())
})
//traigo con post el detalle de productos agregados al carrito
// npm install body-parser para poder leer el body del req como json
app.post('/api/pagar', async (req, res) => {
  //   console.log(req.body)
  const ids = req.body
  const productosCopia = await repository.read()
  let error = false
  ids.forEach((id) => {
    const product = productosCopia.find((p) => p.id == id)
    if (product.stock > 0) {
      product.stock--
    } else {
      error = true
    }
  })
  if (error) {
    res.send('Sin Stock').statusCode(400)
  } else {
    await repository.write(productosCopia)
    res.send(productosCopia)
  }
})
// cuando la app va a /, me lleva al index.html de la carpeta frontend
app.use('/', express.static('frontend'))

// cuando corro la app, me da la url para porder verla
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
