document.getElementById('boton_entrar_login').addEventListener('click', ()=>{
    let usuariosRegistrados = JSON.parse(window.localStorage.getItem('usuariosEnSistema'));
    let buscar = usuariosRegistrados.findIndex(element =>{
        return element.username === document.getElementById('UsuarioInputLogin').value
    })
    if (buscar !== -1 && usuariosRegistrados[buscar].password === document.getElementById('UsuarioPasswordLogin').value){
        window.open('../index.html','_self')
    }else{
        alert('USUARIO O CONTRASEÑA NO VALIDOS \n Si quieres registrarte, puedes hacerlo con el botón señalado')
    }
    console.log(usuariosRegistrados);
    console.log(document.getElementById('UsuarioPasswordInput').value);
    console.log(document.getElementById('UsuarioInputLogin').value);
})

document.getElementById('registrarse').addEventListener('click', ()=>{
    window.open('../html/perfil_registrar.html','_self')
})

