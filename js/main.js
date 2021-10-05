
/* El proceso principal del proyecto sera la simulacion de reserva de turnos mediante un form*/

//Se declara el objeto "turno"

class Turno{
    constructor(nombre, apellido, email, tel, clase, fecha, hora){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.tel = tel;
        this.clase = clase;
        this.fecha = fecha;
        this.hora = hora;
    }
}

//Se declaran las variables globales a utilizar

let formulario = document.getElementById("formularioDeTurnos");
let inputs = document.querySelectorAll("#formularioDeTurnos .campo");
let validaNombre = false;
let validaApellido = false;
let validaEmail = false;
let validaTelefono = false;
let validaFecha = false;
let validaHora = false;

//Esta funcion se utiliza para no permitir que el usuario pueda acceder al boton "submit" del form sin completar validamente los campos requeridos
function mostrarBoton(){    
    if(validaNombre && validaApellido && validaEmail && validaTelefono && validaFecha && validaHora){
        console.log("false")
        document.getElementById("btnConfirmar").disabled = false;
    }else{
        console.log("verdadero")
        document.getElementById("btnConfirmar").disabled = true;
    }
    
}

//foreach para que se ejecute en cada input de class "campo" la funcion de validacion.

inputs.forEach(verInputs)

function verInputs(input){
    input.addEventListener("keyup", validarForm);
    input.addEventListener("blur", validarForm);        
}


//exp regulares para validar form
function validarForm(e){
    switch (e.target.name) {
        case "nombre":
        case "apellido":
            if((/^[a-zA-ZÀ-ÿ\s]{1,40}$/).test(e.target.value)){
                e.target.classList.remove("error");
                validaNombre = true;                
                validaApellido = true;
                mostrarBoton()
            }else{
                e.target.classList.add("error");
                validaNombre = false;
                validaApellido = false;
                mostrarBoton()
            }
        break;
        case "email":
            if((/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(e.target.value)){
                e.target.classList.remove("error");
                validaEmail = true;
                mostrarBoton()
            }else{
                e.target.classList.add("error");
                validaEmail = false;
                mostrarBoton()
            }
        break;
        case "telefono":
            if((/^\d{7,14}$/).test(e.target.value)){
                e.target.classList.remove("error");
                validaTelefono = true;
                mostrarBoton()
            }else{
                e.target.classList.add("error");
                validaTelefono = false;
                mostrarBoton()
            }
        break;
        case "fecha":
            let fechas = document.getElementById("fechaForm");
            if(e.target.value !== ""){
                fechas.classList.remove("error");
                validaFecha = true;
                mostrarBoton()
            }else{
                fechas.classList.add("error");                
                validaFecha = false;
                mostrarBoton()
            }
        break;
        case "horarios":
            let horas = document.getElementById("horariosForm");
            if(e.target.value !== "0"){
                horas.classList.remove("error");
                validaHora = true;
                mostrarBoton()
            }else{                                
                validaHora = false;
                mostrarBoton()
            }
        break;        
    }
}

//esta funcion no permite que el usuario pueda seleccionar un día anterior a la fecha actual para reservar turno.
function fechaActual(){
    let fecha = new Date();
    let dia;
    let mes;
    let anio = fecha.getFullYear();
    let _dia = fecha.getDate();
    let _mes = fecha.getMonth();
    _mes = _mes + 1;

    if (_mes < 10){ 
        mes = "0" + _mes;
    }else{ 
        mes = _mes;
    }

    if (_dia < 10){ 
        dia = "0" + _dia;
    }else{ 
        dia = _dia;
    }
    document.getElementById("fechaForm").min = anio+'-'+mes+'-'+dia;
}

document.addEventListener("DOMContentLoaded", fechaActual);

//funcion que despliega un modal con los datos del turno
function verModal(){
    let modal = document.getElementById("turnoModal");
    modal.classList.add("show");
    modal.style = ("display: block;")

    let datosUsuario = JSON.parse(localStorage.getItem("turno"));

    let mensaje = document.createElement("p");
    mensaje.innerHTML = `<p>${datosUsuario.nombre} tu turno para la clase de ${datosUsuario.clase} el día ${datosUsuario.fecha} a las 
    ${datosUsuario.hora} ha sido reservado con exito</p>`;
    let contenidoModal = document.getElementById("modalBody");
    contenidoModal.appendChild(mensaje);

    console.log(mensaje);


    let btnCerrar = document.getElementById("btnCerrarModal").addEventListener("click", modalOff);
    let confirmarModal = document.getElementById("confirmarModal").addEventListener("click", modalOff);
    //funcion para cerrar el modal
    function modalOff(){ 
        modal.classList.remove("show")
        modal.style = ("display: none;")
        contenidoModal.removeChild(mensaje)
    }
}


//funcion principal del proceso, la misma recoge los datos del turno reservado y los guarda en el local storage mientras que lanza el modal con datos del turno
formulario.addEventListener("submit", recogerDatos);

function recogerDatos(e){
    e.preventDefault();
    let nombre = document.getElementById("nombreForm").value;
    let apellido = document.getElementById("apellidoForm").value;
    let email = document.getElementById("emailForm").value;
    let tel = document.getElementById("telForm").value;
    let clase;
    if (document.getElementById("radioCross").checked){
        clase = document.getElementById("radioCross").value;
    } else if (document.getElementById("radioFun").checked){
     clase = document.getElementById("radioFun").value;
    } 
    let fecha = document.getElementById("fechaForm").value;
    let hora = document.getElementById("horariosForm").value; 

    const turno1 = new Turno (`${nombre}`, `${apellido}`, `${email}`, `${tel}`, `${clase}`, `${fecha}`, `${hora}`);
    const turno1Json = JSON.stringify(turno1);

    localStorage.setItem("turno", turno1Json);

    verModal();

}

//ajax con fetch para mostrar promos

const promos = "promos.json"

//el evento click en el boton de promos desencadena la siguiente funcion ("onclick" se encuentra en el html)
function pedidoFetch(){
    fetch(`${promos}`)
    .then((res) => res.json())
    .then((res) => mostrarPromos(res))
    .catch((error) => console.log(error));
}

function borrarBtn(){
    document.getElementById("btnPromos").style.display = "none";
}

function mostrarPromos(promociones){
    console.log(promociones);
    borrarBtn()
    for (let i = 0; i < promociones.length; i++){
        $("#contenedorPromos").prepend(`<div><h2>${promociones[i].titulo}</h2><p>${promociones[i].descripcion}</p></div>`)
    }
}

// seccion para ver los turnos reservados 

function verTurnos(turno){
    let contenido = `
    <div class="card turno">
        <div class="card-body">
        <p class="card-text">${turno.nombre}</p>
        <p class="card-text">${turno.clase}</p>
        <p class="card-text">${turno.fecha}</p>
        <p class="card-text">${turno.hora}</p>
        </div>
    </div>`
    $("#turnosReservados").append(contenido);
}

function traerTurnos(){
    if (localStorage.getItem("turno")){
        let turno = JSON.parse(localStorage.getItem("turno"));
        verTurnos(turno)
    }else if(localStorage.getItem("turno") === null){
        $("#turnosReservados").append('<h2>Aun no se reservaron turnos</h2>');
    }
}

document.addEventListener("DOMContentLoaded", traerTurnos)

// generador de workouts
let wod = "wods.json"
let contenidoWod = document.getElementById("entrenamientos");
let mensajeWod = document.createElement("div");

function pedidoWod(){
    mensajeWod.innerHTML = ""
    fetch(`${wod}`)
    .then((res) => res.json())
    .then((wod) => mostrarWod(wod))
    .catch((error) => console.log(error));
}

function mostrarWod(wod){    
    
    let ordenWod = generateRandomInt(4)

    mensajeWod.innerHTML = (`<h2>${wod[ordenWod].titulo}</h2>`)
    
    for (let i = 0; i < wod[ordenWod].descripcion.length; i++){        
        mensajeWod.innerHTML += (`<p>${wod[ordenWod].descripcion[i]}</p>`);
    }    

    contenidoWod.appendChild(mensajeWod);
        
}

function generateRandomInt(max){
    return Math.floor(Math.random() * max);
}

document.addEventListener("DOMContentLoaded", pedidoWod)

document.getElementById("btnWods").addEventListener("click", pedidoWod);




