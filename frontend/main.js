let productList = []
let carrito = []
let total = 0
let pedido = { items: [] }
let global = document.getElementById('global')
let verCarrito = document.getElementById('verCarrito')
let precioTotal = document.getElementById('precioTotal')
let containerProductos = document.getElementById('containerProductos')
let orden = document.getElementById('orden')
let ordenTable = document.getElementById('ordenTable')
let btnTotal = document.getElementById('btnTotal')
let divCarrito = document.getElementById('carrito')
let btnVolver = document.getElementById('btnVolver')

verCarrito.addEventListener('click', () => {
  mostrarCarrito()
})
divCarrito.addEventListener('click', () => {
  pagarCarrito()
})
btnVolver.addEventListener('click', () => {
  displayProductos()
  containerProductos.style.display = 'flex'
  orden.style.display = 'none'
})

//cuando arranque la app en el index, que me haga un fetch de los productos - despues de iniciar el back
window.onload = async () => {
  await fetchProductos()
  //console.log('fetch')
  console.log(productList)
}

//si hay error se hace un fetch y se redibuja la pagina
async function fetchProductos() {
  productList = await (await fetch('/api/productos')).json()
  displayProductos()
}

let agregar = (productoId, precio) => {
  const product = productList.find((p) => p.id == productoId)
  product.stock--
  console.log(productoId, precio)
  carrito.push(productoId)
  pedido.items.push(productList.find((p) => p.id == productoId))
  console.log(pedido)
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

async function pagarCarrito() {
  try {
    const preference = await (
      await fetch('/api/pagar', {
        method: 'post',
        body: JSON.stringify(carrito),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json()

    var script = document.createElement('script')
    script.src =
      'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js'
    script.type = 'text/javascript'
    script.dataset.preferenceId = preference.preferenceId
    script.setAttribute('data-button-label', 'Pagar con Mercado Pago')
    //global.innerHTML = ''
    global.style.display = 'flex'
    global.style.flexDirection = 'column'
    global.style.alignItems = 'center'
    orden.style.width = '100vw'
    document.querySelector('#global').appendChild(script)
  } catch {
    window.alert('Sin Stock')
  }
  carrito = []
  pedido = { items: [] }
  total = 0
  precioTotal.innerHTML = ``
  //await fetchProductos()
  //alert(productosCarrito.join(", \n"))
  //console.log(productos)
  //console.log(total)
}

async function mostrarCarrito() {
  containerProductos.style.display = 'none'
  orden.style.display = 'flex'
  btnTotal.innerHTML = `Total: $ ${total}.- `
  let thPedidoHTML = `<tr>
  <th>Cantidad</th>
  <th>Detalle</th>
  <th> </th>
  <th>Subtotal</th>
  </tr>`
  let pedidoHTML = ''
  pedido.items.forEach((p) => {
    pedidoHTML += `<tr>
    <td>1</td>
    <td>${p.name}</td>
    <td>$</td>
    <td>${p.price}</td>
</tr>`
  })
  ordenTable.innerHTML = thPedidoHTML + pedidoHTML
}
