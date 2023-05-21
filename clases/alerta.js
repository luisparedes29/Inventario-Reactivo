// Clase para instanciar una alerta
class Alerta{
   constructor(mensaje, valor = null){
      this.mensaje = mensaje;
      this.valor = valor;
   }

   // Metodo o funcion para obtener el mensaje de la alerta
   crearAlerta(){
      if(this.valor !== null){
         return `${this.mensaje} ${this.valor}`
      }
      return `${this.mensaje}`
   }

}

export { Alerta }