
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

//Traemos el boton "submit" del form y se declaran la funcion a ejecutar con el evento "click"

let btnConfirmar = $("#btnConfirmar").on("click", recogerDatos); // se modifico a un metodo de jquery
 
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

    // se modifico a un metodo de jquery
    let btnCerrar = $("#btnCerrarModal").click(modalOff);
    let confirmarModal = $("#confirmarModal").click(modalOff);
    //funcion para cerrar el modal
    function modalOff(){ 
        modal.classList.remove("show")
        modal.style = ("display: none;")
        contenidoModal.removeChild(mensaje)
    }
}

let error;

// funcion para validar que los campos del form no se encuentren vacios
function validarCampos(nombre, apellido, email, tel, fecha, hora){
    if (nombre === "") {
        error = "nombreForm"
        return false;
    } else if(apellido === ""){
        error = "apellidoForm"
        return false;
    } else if(email === ""){
        error = "emailForm"
        return false;
    } else if(tel === ""){
        error = "telForm"
        return false;
    } else if(fecha === ""){
        error = "fechaForm"
        return false;
    } else if(hora == "-"){
        error = "horariosForm"
        return false;
    } else{
        return true;
    }
}

function quitarClase(campoError){
    document.getElementById(campoError).classList.remove("error")
}

//funcion principal del proceso, se ejecuta con el evento "click" sobre el boton submit del form
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
    
    const validar = validarCampos(nombre, apellido, email, tel, fecha, hora)

    if(validar == true){
        quitarClase("nombreForm");
        quitarClase("apellidoForm");
        quitarClase("emailForm");
        quitarClase("telForm");
        quitarClase("fechaForm");
        quitarClase("horariosForm");

        const turno1 = new Turno (`${nombre}`, `${apellido}`, `${email}`, `${tel}`, `${clase}`, `${fecha}`, `${hora}`);
        const turno1Json = JSON.stringify(turno1);
    
        localStorage.setItem("turno", turno1Json);
    
        verModal();

    }else{
        document.getElementById(error).classList.add("error")
    }
}

 //animaciones con jquery

$(document).ready(() =>{
    $("#home").append('<h3 class="animacion" style="display: none" >¡Entrena con nosotros!</h3>');
    $("#home").append('<a class="animacion" href="#formularioDeTurnos"  style="display: none" >¡Reserva tu turno online!</a>');
    $("h3").fadeIn(3000);
    $("a").fadeIn(7000, ()=> $("h3").fadeOut(3000));
} );

//ajax con fetch

const promos = "promos.json"

function borrarBtn(){
    document.getElementById("btnPromos").style.display = "none";
}

function mostrarPromos(promociones){
    borrarBtn()
    for (let i = 0; i < promociones.length; i++){
        $("#contenedorPromos").prepend(`<div><h2>${promociones[i].titulo}</h2><p>${promociones[i].descripcion}</p></div>`)
    }
}

function pedidoFetch(){
    fetch(`${promos}`)
    .then((res) => res.json())
    .then((res) => mostrarPromos(res))
    .catch((error) => console.log(error));
}


//  Aca no funciona el click (lo ejecuta antes de que se lleve a cabo el evento)

// $("#btnPromos").click(pedidoFetch()) 






