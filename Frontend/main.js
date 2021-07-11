/// Esta parte trabaja solo con la pagina index

import { Carrito, Cliente } from "./js/clases.js";
import { consultar,categorias,ProductosporCategoria,productoImagenPorCategoria, renderizarCategorias, renderizarProductos, para_carrusel} from "./js/index.js";

///En la página principal se muestran las categorias usuando la funcion importada desde index.js
renderizarCategorias()

///Se agregan propiedades al boton de busqueda
var texto = "";
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    sessionStorage.setItem("textoBusqueda", inputValue);
    window.location.href = "./html/index_demo_2.html?"       
});

///console.log(JSON.parse(window.localStorage.getItem('usuarioActivo')));

///Si un usuario no ha iniciado sesion entonces no puede comprar, si lo ha hecho se toma su carrito de la lista y se 
///usa para sus compras 

if(JSON.parse(window.localStorage.getItem('usuarioActivo'))!==null) {
    let carritosRegistrados = JSON.parse(window.localStorage.getItem('carritosRegistrados'));
    let usuarioActivo = JSON.parse(window.localStorage.getItem('usuarioActivo'));
    let encontrar = carritosRegistrados.findIndex((element) => {
        return element.cliente === usuarioActivo.username;
    })
    console.log(usuarioActivo);
    let carritoActivo = carritosRegistrados[encontrar];
    window.localStorage.setItem('carritoActivo',JSON.stringify(carritoActivo));
    ///console.log(JSON.parse(window.localStorage.getItem('carritoActivo',JSON.stringify(carritoActivo))));
}

///Si es la primera vez que se entra al sistema y no hay usuarios registrados, se genneran las listas necesarias para guardarlos más adelante
if (window.localStorage.getItem('usuariosEnSistema')===null) {
    window.localStorage.setItem('usuariosEnSistema',JSON.stringify([]));
    window.localStorage.setItem('carritosRegistrados',JSON.stringify([]));
}else{
    console.log(JSON.parse(window.localStorage.getItem('usuariosEnSistema')));
    console.log(JSON.parse(window.localStorage.getItem('carritosRegistrados')));
}

///Si hay una sesion iniciada, el boton mi perfil lleva a la pagina perfil_mio.html con los datos del usuario y para que pueda modificarlos, si no entonces se le envia a login para que pueda entrar o registrarese
document.getElementById('perfil_activo').addEventListener('click',()=>{
    if (JSON.parse(window.localStorage.getItem('usuarioActivo')) === null){
        window.open('../html/login.html','_self');
    }else {
        window.open('../html/perfil_mio.html','_self');
    }
})

///Si no hay sesion iniciada, se envia al login tambien en lugar de al carrito de compras

document.getElementById('facturacionindex').addEventListener('click',()=> {
    if (JSON.parse(window.localStorage.getItem('usuarioActivo'))!==null) {
        window.open('./html/checkout_demo.html','_self')
    }else{
        alert('Para ver tus productos debes iniciar sesion')
    }
})

///Si se desea salir de sesion, simplemente se hace lo que sigue

document.getElementById('salirindex').addEventListener('click',()=> {
    if (JSON.parse(window.localStorage.getItem('usuarioActivo'))!==null){
        window.localStorage.removeItem('usuarioActivo');
        window.localStorage.removeItem('carritoActivo');
        window.open('/html/login.html','_self');
    }
})


function borrar() {
    window.localStorage.removeItem('usuarioActivo')
    window.localStorage.removeItem('usuariosEnSistema')
    window.localStorage.removeItem('carritosRegistrados')
}

