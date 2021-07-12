import { Cliente } from "./clases.js";

document.getElementById('boton_registar_actualizar1').addEventListener('click', ()=>{
    alert('Perfil actualizado');
})
document.getElementById('boton_registar_actualizar2').addEventListener('click',() =>{
    window.open('../index.html','_self');
})
document.getElementById('boton_registar_actualizar3').addEventListener('click', ()=> {
    window.open('../index.html','_self')
})

async function Countries() {
    //let country_form = document.getElementById('country');

    let url = 'http://localhost:3000/paises';
    let countriesList = await fetch(url);
    let countriesList_json = await countriesList.json();

    countriesList_json.forEach(element => {
      let option = document.createElement('option');
            option.textContent = element.name;
            country_form.appendChild(option);  
    });   
}


let persona = new Cliente()

console.log(persona);

Countries();