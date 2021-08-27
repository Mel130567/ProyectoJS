
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

let btnConfirmar = document.getElementById("btnConfirmar");
btnConfirmar.addEventListener("click", recogerDatos);
 

function verModal(){
    let modal = document.getElementById("turnoModal");
    modal.classList.add("show");
    modal.style = ("display: block;")
    let mensaje = document.createElement("p");
    mensaje.innerHTML = `<p>Tu turno ha sido reservado con exito</p>`;
    document.getElementById("modalBody").appendChild(mensaje);

    let btnCerrar = document.getElementById("btnCerrarModal");
    btnCerrar.addEventListener("click", modalOff)
    function modalOff(){ 
        modal.classList.remove("show")
        modal.style = ("display: none;")
    }
}


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







