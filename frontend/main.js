let productos = []
let total = 0
let carrito = document.getElementById('carrito')
let precioTotal = document.getElementById('precioTotal')
let containerProductos = document.getElementById('containerProductos')

let agregar = (producto, precio)=>{
    console.log(producto, precio)
    productos.push(producto)
    total = total + precio
    precioTotal.innerHTML=`$ ${total}.-`
    }

let verCarrito = () =>{
    alert(productos.join(", \n"))
    console.log(productos)
    console.log(total)
}

carrito.addEventListener('click', () =>{
    verCarrito()
})

  //cuando arranque la app en el index, que me haga un fetch de los productos - despues de iniciar el back
  window.onload = async() => {
    //console.log('fetch')
    const productList = await (await fetch("/api/productos")).json()
    console.log(productList)
    displayProductos(productList)
  }

  const displayProductos= (productList)=>{
    let productHTML = ''
    productList.forEach(element => {
        productHTML+=
        `<div class="col">
        <div class="productCard card h-100">
            <h3>${element.name}</h3>
            <img src="${element.image}"
                alt="${element.image}" class="prodImg">
            <p>${element.description}</p>
            <h4><strong>$ ${element.price}.-</strong></h4>
            <button class="btn btn-warning" onClick="agregar('${element.name}', ${element.price})"><span class="material-icons">
                    add_shopping_cart
                </span></button>
        </div>
    </div>`
    });
    containerProductos.innerHTML = productHTML
  }