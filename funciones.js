import { Producto } from './clases/producto.js';
import { Alerta } from './clases/alerta.js';

// Objeto con los diferentes mensajes disponibles
const mensajes = {
   agregado: 'Has agregado el producto',
   editado: 'Has editado el producto',
   confirmar: 'Estas seguro que quieres eliminar el producto',
   eliminado: 'Has eliminado el producto',
   errorDeBusqueda: 'Ha ocurrido un error!',
   errorAlBuscar: 'No se han encontrado resultados para tu búsqueda:',
   sinExistencia: 'Sin Existencias',
   restore: 'Restore del inventario completado',
   backup: 'Backup del inventario en descarga',
}

// Funcion para agregar un nuevo Producto
const agregarProducto = (objProducto) => {
   // Destructuracion del objeto que proviene del formulario
   let { producto, categoria, modelo, talla, marca, cantidad, precio } = objProducto
   
   // Instanciamos un producto
   const product = new Producto(producto, categoria, modelo, talla, marca, cantidad, precio)

   // Utilizamos el metodo para obtener el precio total del producto en inventario
   product.obtenerTotal()

   // Retornamos la instancia del producto nuevo
   return product
}

// Funcion para editar un Producto
const editarProducto = (objProducto, instancia) => {
   // Utilizamos el metodo para Editar las propiedades de la instancia que contenga las propiedades del objeto que viene del formulario
   instancia.editarProducto(objProducto)
   
   // Utilizamos el metodo para obtener el precio total del producto en inventario
   instancia.obtenerTotal()

   // Retornamos la instancia del producto editado
   return instancia
}

// Funcion para crear una Alerta
const lanzarAlerta = (opcionMsg, value = null) => {
   // Instanciamos una Alerta
   const alerta = new Alerta(mensajes[opcionMsg], value)
   
   // Utilizamos el metodo para obtener el mensaje de la alerta
   console.log(alerta.crearAlerta())
}

export { agregarProducto, editarProducto, lanzarAlerta }