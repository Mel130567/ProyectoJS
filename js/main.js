
/* El proceso principal del proyecto sera la simulacion de reserva de turnos mediante un form*/

//se declara una estructura tipo "json" para incluir promociones
const promociones = [
    {
        id: 1,
        titulo: "Promo 2x1",
        descripcion: "¡Entrenan 2 y paga 1! Promo valida para el primer mes, para 2 socios nuevos o 1 socio activo y 1 nuevo" 
    },

    {
        id: 2,
        titulo: "Promo grupos",
        descripcion: "Aquellas personas que vengan a entrenar en grupos de 3 o + tendran un descuento adicional en el arancel" 
    },
    {
        id: 3,
        titulo: "Promo ahorro",
        descripcion: "¡Pagando 2 meses juntos entrenas 3 y pagando 3 meses juntoa entrenas 6!"
    },
    {
        id: 4,
        titulo: "Promo turno mañana",
        descripcion: "Aquellas personas que entrenen en los turnos de  7, 8, 9, y 10 am tendran un 20% de descuento en el arancel" 
    }
]

//funcion para crear el elemento que contendra las promos
function mostrarPromos(promociones){ 
    let cardPromos = document.createElement("div");
    cardPromos.classList.add("contenedorPromos")
    cardPromos.innerHTML = `<h2>${promociones.titulo}</h2><p>${promociones.descripcion}</p>`;
    document.body.appendChild(cardPromos);
}
//recorremos y creamos las promos con la funcion anterior
for (const promos of promociones){
    mostrarPromos(promos);
}

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

let btnConfirmar = document.getElementById("btnConfirmar");
btnConfirmar.addEventListener("click", recogerDatos);
 
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

    let btnCerrar = document.getElementById("btnCerrarModal").addEventListener("click", modalOff);
    let confirmarModal = document.getElementById("confirmarModal").addEventListener("click", modalOff);
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







