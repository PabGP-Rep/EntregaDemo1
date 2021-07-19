import {estiloTarjeta,AgregarProducto,eliminarProducto} from './index.js'
let estilos_ = new estiloTarjeta;
let usuarioActivo = JSON.parse(window.localStorage.getItem('carritoActivo'));
console.log(usuarioActivo);
let productos = usuarioActivo.lista;

let estilos = {
    fila: "display:flex;flex-direction:row;justify-content:flex-start;border-bottom:1px solid black; margin-right: 10px ; font-size:50opx"
}

productos.forEach(element => {
    let fila = document.createElement('tr');
    let producto = document.createElement('th');
    producto.textContent = element.nombre;
    let precio = document.createElement('th');
    let precio_input = document.createElement('input');
    precio_input.value = '$'+element.total;
    precio.appendChild(document.createElement('form').appendChild(precio_input))
    let cantidad = document.createElement('th');
    let cantidad_input = document.createElement('input');
    cantidad_input.value = element.cantidad;
    cantidad.appendChild(document.createElement('form').appendChild(cantidad_input));
    let botonmas = document.createElement('button');
    botonmas.setAttribute('style',estilos_.boton+'width:50px');
    botonmas.textContent = '+';
    botonmas.onclick = () =>{
        AgregarProducto(element);
        let nuevocarrito = JSON.parse(window.localStorage.getItem('carritoActivo'));
        let elemento = nuevocarrito.lista[nuevocarrito.lista.findIndex((elemento)=>{
            return element.id === elemento.id
        })]
        precio_input.value ='$' + elemento.total;
        cantidad_input.value = elemento.cantidad;

    }
    let botonmenos = document.createElement('button');
    botonmenos.setAttribute('style',estilos_.boton+'width:50px')
    botonmenos.textContent = '-';
    botonmenos.onclick = ()=>{
        if (cantidad_input.value> 1){
            eliminarProducto(element);
            let nuevocarrito = JSON.parse(window.localStorage.getItem('carritoActivo'));
            let elemento = nuevocarrito.lista[nuevocarrito.lista.findIndex((elemento)=>{
                return element.id === elemento.id
            })]
            precio_input.value ='$' + elemento.total
            cantidad_input.value = elemento.cantidad;
        }else{
            alert('Producto eliminado');
            fila.remove();
        }

        
    }
    fila.appendChild(producto);
    fila.appendChild(cantidad);
    fila.appendChild(precio);
    fila.appendChild(botonmas);
    fila.appendChild(botonmenos);
    
    document.getElementById('tabla_checkout').appendChild(fila);
})
document.getElementById('imprimir').addEventListener('click',()=>{
    window.print();
})

document.getElementById('pagar_factura').addEventListener('clic',()=>{
    alert('tu pago se ha efectuado');
})
document.getElementById('total').textContent ='TOTAL: $' +Math.round( usuarioActivo.total*100)/100

