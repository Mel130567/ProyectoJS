
/* El proceso principal del proyecto sera la simulacion de reserva de turnos mediante un form*/ 
function saludar (){
    let nombre = prompt("Porfavor ingresa tu nombre");
    alert(`¡Bienvenid@ ${nombre} en nuestra web podras reservar turno para entrenar con nosotros!`);
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
    reservar (opcion){
        if(opcion == "si"){
            console.log(` ${this.nombre} tu turno para la clase de ${this.clase} el día ${this.fecha} a las ${this.hora} ha sido reservado con exito! `);
        }else{
            console.log(`No has reservado un turno`);
        }
    }
}

const turno1 = new Turno ("Melanie", "Benedito", "Mel@mel.com", 111111, "crossfit", "01/09/2021", "10HS");

turno1.reservar ("si");

