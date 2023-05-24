// Clase para instanciar una alerta
class Alerta{
   constructor(mensaje,icon, valor = null){
      this.mensaje = mensaje;
      this.icon=icon;
      this.valor = valor;
   }

   // Metodo o funcion para obtener el mensaje de la alerta
   crearAlerta(){
      if(this.valor !== null){
         return `${this.mensaje} ${this.valor}`
      }
      console.log(this.icon)
      Swal.fire({
         position: "top-center",
         icon: `${this.icon}`,
         title: this.mensaje,
         showConfirmButton: false,
         timer: 2000,
       });
   }

}

export { Alerta }