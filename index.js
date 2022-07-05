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

// cuando corro la app, me da la url para porder verla
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// backend de la pagina
const productos = [
  {
    id: 001,
    name: 'Wapsipinicon Peach',
    description: 'Tomate mediano amarillo de textura aterciopelada',
    price: 500,
    image: 'media/producto1',
    stock: 50,
  },
  {
    id: 002,
    name: 'Black Keyes',
    description: 'Tomate mediano amarillo de textura aterciopelada',
    price: 500,
    image: 'media/producto1',
    stock: 50,
  },  {
    id: 003,
    name: 'Aperitivo Dulce',
    description: 'Tomate mediano amarillo de textura aterciopelada',
    price: 500,
    image: 'media/producto1',
    stock: 50,
  },  {
    id: 004,
    name: 'Bonsai',
    description: 'Tomate mediano amarillo de textura aterciopelada',
    price: 500,
    image: 'media/producto1',
    stock: 50,
  },  {
    id: 005,
    name: 'Ildi',
    description: 'Tomate mediano amarillo de textura aterciopelada',
    price: 500,
    image: 'media/producto1',
    stock: 50,
  },  {
    id: 006,
    name: 'Amarillo',
    description: 'Tomate mediano amarillo de textura aterciopelada',
    price: 500,
    image: 'media/producto1',
    stock: 50,
  },
]
//cuando la app hace un get de /api/productos, me retorna los productos
app.get('/api/productos', (req, res) => {
    res.send(productos)
  })
// cuando la app va a /, me lleva al index.html de la carpeta frontend
  app.use('/', express.static('frontend'))

