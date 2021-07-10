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
    
    let countriesList = await fetch('https://api.mercadolibre.com/classified_locations/countries');
    let countriesList_json = await countriesList.json()
    .then((resp) => {
        resp.forEach((element) => {
            let option = document.createElement('option');
            option.textContent = element.name;
            country_form.appendChild(option);          
        });
    })
}


let persona = new Cliente()

console.log(persona);

Countries();