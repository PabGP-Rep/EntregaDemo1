///En este nuevo sistema se usan clases en la mayor parte de los casos para evitar repeticion de codigo
//Es más limpio y solo se conservan un par de funciones sueltas 


export async function AgregarProducto(element) {
    let carrito = JSON.parse(window.localStorage.getItem('carritoActivo'));
    if (carrito !=null) {
        agregarAlista(carrito.lista,element)
        let carritos = JSON.parse(window.localStorage.getItem('usuariosEnSistema'));
        let encontrar = carritos.findIndex(element =>{
            return element.id === carrito.findIndex;
        })
        carrito.total+=element.price;
        carritos[encontrar] = carrito;
        window.localStorage.setItem('carritosRegistrados',JSON.stringify(carritos))
        window.localStorage.setItem('carritoActivo',JSON.stringify(carrito));
        console.log(carrito);
    }else{
        alert('Debes iniciar sesion para empezar a comprar')
    }
    
}


async function agregarAlista(lista,element) {
    let encontrar = lista.findIndex(elemento =>{
        return element.id === elemento.id;
    })
    if (encontrar=== -1) {
        lista.push({id:element.id,nombre:element.title,price:element.price,cantidad:1,total:element.price})
    }else {
        lista[encontrar].cantidad+=1;
        lista[encontrar].total+=element.price;
    }
}

export async function eliminarProducto(element) {
    let carrito = JSON.parse(window.localStorage.getItem('carritoActivo'));
    if (carrito !=null) {
        quitarAlista(carrito.lista,element)
        let carritos = JSON.parse(window.localStorage.getItem('usuariosEnSistema'));
        let encontrar = carritos.findIndex(element =>{
            return element.id === carrito.findIndex;
        })
        carrito.total-=element.price;
        carritos[encontrar] = carrito;
        window.localStorage.setItem('carritosRegistrados',JSON.stringify(carritos))
        window.localStorage.setItem('carritoActivo',JSON.stringify(carrito));
        console.log(carrito);
    }else{
        alert('Debes iniciar sesion para empezar a comprar')
    }
}

async function quitarAlista(lista, element) {
    let encontrar = lista.findIndex(elemento =>{
        return element.id === elemento.id;
    })
    if(lista[encontrar].cantidad>1){
        lista[encontrar].cantidad-=1;
        lista[encontrar].total-=lista[encontrar].price;
    }else{
        lista.splice(encontrar,1);
    }
}

export class Conexiones {
    constructor() {

    }

    async  categorias() {
        let url = 'http://localhost:3000/categorias';
        let categoriasConsulta = await fetch(url);
        let categoriasConsulta_json = await categoriasConsulta.json();
        return categoriasConsulta_json;
    }

    async ProductosporCategoria (categoria) {
        let parametros = { id: categoria };
        let url = 'http://localhost:3000/productos_categoria';
        let resultados = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(parametros)
        });

        let resultadosJson = await resultados.json();
        let data = resultadosJson.results;
        return data;
    }
}

export class estiloTarjeta {
    constructor() {
        this.contenedorPrimario = 'height: auto; width: 300px; border:5px solid black; background: linear-gradient(to bottom, #33ccff 0%, #66ccff 100%);display:flex;justify-content:center;align-items:center;background-size:cover; border-radius:15px;margin:20px ';
        this.contenedorSecundario = 'height: auto; width: 90%;border:1px solid black; display:flex;flex-direction:column; align-content:center;justify-content:center; border-radius:15px; margin:5%';
        this.imagen = 'heigh:100px;width:100px; margin: 15px;align-self:center';
        this.titulo = 'color:black; font-weight: bolder;font-family: verdana, align:center ;margin:10px'
        this.boton = 'color:white;width: 30%; align-self:center; margin: 15px; border-radius:4px; background:linear-gradient(135deg, #6e8efb, #a777e3);'
    }
}

export class Renderizador {
    constructor() {

        this.conexiones = new Conexiones(),
        this.estilos = new estiloTarjeta()
    }

    async paraCarrusel() {

        let micategoria = await this.conexiones.categorias();
        for (let i = 0; i<3; i++) {

            let indice = Math.floor(Math.random()*micategoria.length);
            let contenedor = document.getElementById('imagencar'+i.toString());
            let productos_azar = await this.conexiones.ProductosporCategoria(micategoria[indice].id);
            contenedor.setAttribute('src',productos_azar[0].thumbnail);
            let titulo = document.getElementById('carusel'+i.toString());
            titulo.textContent = '¿Quieres ver más? \n Checa nuestra categoría '+micategoria[indice].name;
            
        };
    }

    async renderizarCategorias() {

        this.paraCarrusel();
        let division =  document.getElementById('division_principal_Index');
        division.innerHTML = "";
        let producto = this.conexiones.ProductosporCategoria('MLM1747')

        let categoriasML = await this.conexiones.categorias()

        .then((resp) =>{

            resp.forEach(async (element) => {
                let productos =await this.conexiones.ProductosporCategoria(element.id);

                let imagen  = document.createElement('img');
                imagen.setAttribute('src',productos[0].thumbnail);
                imagen.setAttribute('style', this.estilos.imagen)
                let contenedorPrimario =document.createElement('div');
                contenedorPrimario.setAttribute('style',this.estilos.contenedorPrimario);
                let contenedorSecundario = document.createElement('div');
                contenedorSecundario.setAttribute('style',this.estilos.contenedorSecundario);
                let titulo = document.createElement('p');
                titulo.setAttribute('style', this.estilos.titulo)
                titulo.innerHTML = '<h4> Categoria</h4>'+ element.name
                let boton_visitar = document.createElement('button');
                boton_visitar.textContent = 'Ver más';
                boton_visitar.setAttribute('style', this.estilos.boton);
                contenedorSecundario.appendChild(imagen);
                contenedorSecundario.appendChild(titulo);
                boton_visitar.setAttribute('target','self');
                boton_visitar.setAttribute('type','button');
                boton_visitar.addEventListener('click', () =>{
                    window.localStorage.setItem('categoria', JSON.stringify(element.id));
                    window.open('./html/productos.html','_self');
                })
                contenedorSecundario.appendChild(boton_visitar);
                contenedorPrimario.appendChild(contenedorSecundario);
                division.appendChild(contenedorPrimario);


            });
        })
    }
    
    async renderizarProductos() {
        let categoria = JSON.parse(window.localStorage.getItem('categoria'));
        this.paraCarrusel();
        let lista= [];
        let division = document.getElementById('division_principal_Productos');
        let productos_categoria = await this.conexiones.ProductosporCategoria(categoria)
        .then((resp) =>{
            resp.forEach(element => {
                console.log(element);
                lista.push(element)
                let imagen  = document.createElement('img');
                imagen.setAttribute('src',element.thumbnail);
                imagen.setAttribute('style', this.estilos.imagen)
                let contenedorPrimario =document.createElement('div');
                contenedorPrimario.setAttribute('style',this.estilos.contenedorPrimario);
                let contenedorSecundario = document.createElement('div');
                contenedorSecundario.setAttribute('style',this.estilos.contenedorSecundario);
                let titulo = document.createElement('p');
                titulo.setAttribute('style', this.estilos.titulo)
                titulo.innerHTML = '<h4>'+ element.title+'</h4>'
                let precio = document.createElement('h5');
                precio.textContent ='A tan solo: $'+element.price.toString();
                precio.setAttribute('style', this.estilos.titulo);
                let clientesFelices = document.createElement('h5');
                clientesFelices.textContent = element.sold_quantity+' Clientes satisfechos';
                clientesFelices.setAttribute('style',this.estilos.titulo);
                let quedan = document.createElement('h5');
                quedan.textContent ='Solo quedan: ' +element.available_quantity
                quedan.setAttribute('style',this.estilos.titulo);
                let boton_visitar = document.createElement('button');
                boton_visitar.textContent = 'Comprar';
                boton_visitar.setAttribute('style', this.estilos.boton);
                contenedorSecundario.appendChild(imagen);
                contenedorSecundario.appendChild(titulo);
                contenedorSecundario.appendChild(precio);
                contenedorSecundario.appendChild(clientesFelices);
                contenedorSecundario.appendChild(quedan);
                boton_visitar.setAttribute('type','button');
                boton_visitar.addEventListener('click', () =>{
                    AgregarProducto(element);
                })
                contenedorSecundario.appendChild(boton_visitar);
                contenedorPrimario.appendChild(contenedorSecundario);
                division.appendChild(contenedorPrimario);

            });
        });
        let boton_atras = document.createElement('button');
        boton_atras.setAttribute('type', 'button')
        boton_atras.textContent = 'Atras'
        boton_atras.setAttribute('style',this.estilos.boton+'height:50px;width:100px');
        division.appendChild(boton_atras)
        boton_atras.addEventListener('click',() =>{
            window.open('../index.html','_self');
        })

    }

}




export class Storage {
    constructor() {

    }

    inciarBotones(direccion) {
        var texto = "";
        const searchButton = document.getElementById('search-button');
        const searchInput = document.getElementById('search-input');

        searchButton.addEventListener('click', () => {
            const inputValue = searchInput.value;
            sessionStorage.setItem("textoBusqueda", inputValue);
            window.location.href = direcion+"./Pagina_Resultados/Resultados.html"    
        });

        document.getElementById('salirindex').addEventListener('click',()=> {
            if (JSON.parse(window.localStorage.getItem('usuarioActivo'))!==null){
                window.localStorage.removeItem('usuarioActivo');
                window.localStorage.removeItem('carritoActivo');
                window.open(direccion+'./html/login.html','_self');
            }
        })

        document.getElementById('facturacionindex').addEventListener('click',()=> {
            if (JSON.parse(window.localStorage.getItem('usuarioActivo'))!==null) {
                window.open(direccion+'./html/checkout_demo.html','_self')
            }else{
                alert('Para ver tus productos debes iniciar sesion')
            }
        })

        document.getElementById('perfil_activo').addEventListener('click',()=>{
            if (JSON.parse(window.localStorage.getItem('usuarioActivo')) === null){
                window.open(direccion+'./html/login.html','_self');
            }else {
                window.open(direccion+'./html/perfil_mio.html','_self');
            }
        })
    }

    revisarStorage() {

        if(JSON.parse(window.localStorage.getItem('usuarioActivo'))!==null) {
            let carritosRegistrados =JSON.parse(window.localStorage.getItem('carritosRegistrados'));
            let usuarioActivo = JSON.parse(window.localStorage.getItem('usuarioActivo'));
            let encontrar = carritosRegistrados.findIndex((element) => {
                return element.cliente === usuarioActivo.username;
            })
            console.log(encontrar);
            console.log(usuarioActivo);
            let carritoActivo = carritosRegistrados[encontrar];
            window.localStorage.setItem('carritoActivo',JSON.stringify(carritoActivo));
            ///console.log(JSON.parse(window.localStorage.getItem('carritoActivo')));
        }

        if (window.localStorage.getItem('usuariosEnSistema')===null) {
            window.localStorage.setItem('usuariosEnSistema',JSON.stringify([]));
            window.localStorage.setItem('carritosRegistrados',JSON.stringify([]));
        }else{
            ///console.log(JSON.parse(window.localStorage.getItem('usuariosEnSistema')));
            ///console.log(JSON.parse(window.localStorage.getItem('carritosRegistrados')));
        }
    }

    borrar() {
        window.localStorage.removeItem('usuarioActivo');
        window.localStorage.removeItem('usuariosEnSistema');
        window.localStorage.removeItem('carritosRegistrados');
    }
}



