let productos = []
let total = 0
let carrito = document.getElementById('carrito')
let precioTotal = document.getElementById('precioTotal')

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