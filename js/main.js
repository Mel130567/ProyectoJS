
/* El proceso principal del proyecto sera la simulacion de reserva de turnos mediante un form*/


//Se declaran las variables globales a utilizar
let formulario = document.getElementById("frmTurnos");
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
        document.getElementById("btnConfirmar").disabled = false;
    }else{
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

//funcion que despliega un modal con los datos del turno el modal es de bootstrap y se encuentra en el html
function verModal(){
    let datosUsuario = JSON.parse(localStorage.getItem("turno"));
    let modal = document.getElementById("turnoModal");
    modal.classList.add("show");
    modal.style = ("display: block;")


    let contenidoModal = document.getElementById("modalBody");
    let mensaje = document.createElement("p");
    mensaje.innerHTML = `<p>${datosUsuario[datosUsuario.length - 1].nombre} tu turno para la clase de ${datosUsuario[datosUsuario.length - 1].clase} el día ${datosUsuario[datosUsuario.length - 1].fecha} a las 
    ${datosUsuario[datosUsuario.length - 1].hora} ha sido reservado con exito</p>`;    
    
    contenidoModal.appendChild(mensaje);    

    document.getElementById("btnCerrarModal").addEventListener("click", modalOff);
    document.getElementById("confirmarModal").addEventListener("click", modalOff);
    
    //funcion para cerrar el modal
    function modalOff(){ 
        modal.classList.remove("show")
        modal.style = ("display: none;")
        contenidoModal.removeChild(mensaje)        
        traerTurnos()
        formulario.reset();
    }    
}


//funcion principal del proceso, la misma recoge los datos del turno reservado y los guarda en el local storage mientras que lanza el modal con los datos del turno
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

    class AgregarDatos{
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
    //busca si existen turnos, sino lo crea
    if (localStorage.getItem("turno") === null) {
        let baseDeDatos = [];        

        baseDeDatos.push(new AgregarDatos(`${nombre}`, `${apellido}`, `${email}`, `${tel}`, `${clase}`, `${fecha}`, `${hora}`));        
        localStorage.setItem("turno", JSON.stringify(baseDeDatos));
    } else {        
        let datosAlmacenados = JSON.parse(localStorage.getItem("turno"));    

        datosAlmacenados.push(new AgregarDatos(`${nombre}`, `${apellido}`, `${email}`, `${tel}`, `${clase}`, `${fecha}`, `${hora}`));                
        localStorage.setItem("turno", JSON.stringify(datosAlmacenados)); 
    }

    verModal();

}

//seccion que muestra las promos que se encuentran en un json
const promos = "http://127.0.0.1:5500/promos.json"

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
    borrarBtn()
    for (let i = 0; i < promociones.length; i++){
        $("#contenedorPromos").prepend(`<div><h2>${promociones[i].titulo}</h2><p>${promociones[i].descripcion}</p></div>`)
    }
}

// seccion para ver los turnos reservados y borrarlos

let contenidoTurno = document.getElementById("turnosReservados");    
let bloqueTurno = document.createElement("div");

function traerTurnos(){      
    bloqueTurno.innerHTML = ""    
    if (localStorage.getItem("turno")){                                
        let turno = JSON.parse(localStorage.getItem("turno"));
        let i = -1;        

        turno.forEach(e => {
            i++;
            verTurnos(e)
        })        

        function verTurnos(e){                        
            bloqueTurno.innerHTML += `
            <div class="card turno">
                <div class="card-body">
                    <p class="card-text">${e.nombre}</p>
                    <p class="card-text">${e.clase}</p>
                    <p class="card-text">${e.fecha}</p>
                    <p class="card-text">${e.hora}</p>
                    <button class="btnColor" id="btnEliminarTurno${i}" onclick="borrarTurno(${i})">Eliminar turno</button>
                </div>
            </div>`
            contenidoTurno.appendChild(bloqueTurno);      
        }
    }else{                
        bloqueTurno.innerHTML = "<h2>Aun no se reservaron turnos</h2>"        
        contenidoTurno.appendChild(bloqueTurno);
    }
}

//esta funcion se dispara con el evento onclik en el boton creado en la funcion anterior
function borrarTurno(i){
    let datosAlmacenados = JSON.parse(localStorage.getItem("turno"));
    datosAlmacenados.splice(i, 1);
    localStorage.setItem("turno", JSON.stringify(datosAlmacenados));
    if (datosAlmacenados.length === 0) {
        localStorage.clear();
    }
    traerTurnos()
}

document.addEventListener("DOMContentLoaded", traerTurnos)

// generador de workouts 
let wod = "http://127.0.0.1:5500/wods.json"
let contenidoWod = document.getElementById("entrenamientos");
let mensajeWod = document.createElement("div");

//se traen los wods que estan guardados en un json
function pedidoWod(){
    mensajeWod.innerHTML = ""
    fetch(`${wod}`)
    .then((res) => res.json())
    .then((wod) => mostrarWod(wod))
    .catch((error) => console.log(error));
}
//funcion que trae del json el titulo y descripcion de los wod de forma aleatoria al tocar el boton
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