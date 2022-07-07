let carrito = []
let total = 0
let divCarrito = document.getElementById('carrito')
let precioTotal = document.getElementById('precioTotal')
let containerProductos = document.getElementById('containerProductos')

let agregar = (productoId, precio) => {
  console.log(productoId, precio)
  carrito.push(productoId)
  total = total + precio
  precioTotal.innerHTML = `$ ${total}.-`
}

async function verCarrito() {
  const productList = await (
    await fetch('/api/pagar', {
      method: 'post',
      body: JSON.stringify(carrito),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json()

  //alert(productosCarrito.join(", \n"))
  //console.log(productos)
  //console.log(total)
}

divCarrito.addEventListener('click', () => {
  verCarrito()
})

//cuando arranque la app en el index, que me haga un fetch de los productos - despues de iniciar el back
window.onload = async () => {
  //console.log('fetch')
  const productList = await (await fetch('/api/productos')).json()
  console.log(productList)
  displayProductos(productList)
}

const displayProductos = (productList) => {
  let productHTML = ''
  productList.forEach((element) => {
    productHTML += `<div class="col">
        <div class="productCard card h-100">
            <h3>${element.name}</h3>
            <img src="${element.image}"
                alt="${element.name}" class="prodImg">
            <p>${element.description}</p>
            <h4><strong>$ ${element.price}.-</strong></h4>
            <button class="btn btn-warning" onClick="agregar('${element.id}', ${element.price})"><span class="material-icons">
                    add_shopping_cart
                </span></button>
        </div>
    </div>`
  })
  containerProductos.innerHTML = productHTML
}
