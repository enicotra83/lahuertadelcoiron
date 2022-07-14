let productList = []
let carrito = []
let total = 0
let divCarrito = document.getElementById('carrito')
let precioTotal = document.getElementById('precioTotal')
let containerProductos = document.getElementById('containerProductos')

divCarrito.addEventListener('click', () => {
  verCarrito()
})

//cuando arranque la app en el index, que me haga un fetch de los productos - despues de iniciar el back
window.onload = async () => {
    await fetchProductos()
  //console.log('fetch')
  console.log(productList)
}

//si hay error se hace un fetch y se redibuja la pagina
async function fetchProductos(){
    productList = await (await fetch('/api/productos')).json()
    displayProductos()
}

let agregar = (productoId, precio) => {
  const product = productList.find((p) => p.id == productoId)
  product.stock--
  console.log(productoId, precio)
  carrito.push(productoId)
  total = total + precio
  precioTotal.innerHTML = `$ ${total}.-`
  displayProductos()
}

const displayProductos = () => {
  let productHTML = ''
  productList.forEach((p) => {
    let buttonHTML = `<button class="btn btn-warning" onClick="agregar('${p.id}', ${p.price})"><span class="material-icons">
 add_shopping_cart</span></button>`
    if (p.stock <= 0) {
      buttonHTML = `<button  disabled class="btn btn-warning" onClick="agregar('${p.id}', ${p.price})"><span class="material-icons">compost</span></button>`
    }
    productHTML += `<div class="col">
        <div class="productCard card h-100">
            <h3>${p.name}</h3>
            <img src="${p.image}"
                alt="${p.name}" class="prodImg">
            <p>${p.description}</p>
            <p>Stock: ${p.stock} unidades</p>
            <h4><strong>$ ${p.price}.-</strong></h4>
            ${buttonHTML}
            </div>
        </div>`
  })
  containerProductos.innerHTML = productHTML
}
async function verCarrito() {
  try {
    const productList = await (
      await fetch('/api/pagar', {
        method: 'post',
        body: JSON.stringify(carrito),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json()
  }
  catch {
    window.alert('Sin Stock')
  }
  carrito = []
  total = 0
  precioTotal.innerHTML = ``
  await fetchProductos()
  //alert(productosCarrito.join(", \n"))
  //console.log(productos)
  //console.log(total)
}
