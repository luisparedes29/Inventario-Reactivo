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

// Funcion para generar un ID unico utilizando la fecha actual en milisegundos con un numero aleatorio
const generarID = () => {
   const a = Date.now().toString(30)
   const b = Math.random().toString(30).substring(2)
   return a + b
}

// Funcion para agregar un nuevo Producto
// Donde:
// objProducto representa el producto que se va a crear
// inventario representa el inventario que se va a modificar
const agregarProducto = (objProducto, inventario) => {
   // Destructuracion del objeto que proviene del formulario
   const { producto, categoria, modelo, talla, marca, cantidad, precio } = objProducto
   // Genera el ID del producto
   const id = generarID()
   
   // Instanciamos un producto
   const product = new Producto(id, producto, categoria, modelo, talla, marca, cantidad, precio)

   // Utilizamos el metodo para obtener el precio total del producto en inventario
   product.obtenerTotal()

   // Agregamos el producto al inventario
   inventario.push(product)

   // Guardamos el inventario en LocalStorage
   guardarInventarioEnLS(inventario)

   // Retornamos el inventario con el producto nuevo
   return inventario
}

// Funcion para editar un Producto
// Donde:
// objProducto representa el objeto con las propiedades que se modificaran
// instancia representa la instancia o el producto que se va a modificar
// inventario representa el inventario que se va a modificar
const editarProducto = (objProducto, instancia, inventario) => {
   // Obtenemos el indice donde se encuentra el producto a modificar
   // Para obtener el indice, debe cumplirse la condicion que los ID de los productos deben ser iguales
   const index = inventario.findIndex(product => product.id === instancia.id);

   // Si se encuentra un indice procede a modificarse el inventario
   if (index !== -1) {
      // Utilizamos el metodo para Editar las propiedades de la instancia que contenga las propiedades del objeto que viene del formulario
      instancia.editarProducto(objProducto)
      
      // Utilizamos el metodo para obtener el precio total del producto en inventario
      instancia.obtenerTotal()

      // En el indice hayado se modifica el producto
      inventario[index] = instancia

      // Se guarda el inventario en LocalStorage
      guardarInventarioEnLS(inventario)

      // Retorna el inventario con el producto modificado
      return inventario
   }
}

// Funcion para crear una Alerta
// Donde:
// opcionMsg representa el tipo de mensaje que quiere enviar
// value representa si hay algun valor adicional que desea enviar, Por ejemplo: el nombre del producto
const lanzarAlerta = (opcionMsg, value = null) => {
   // Instanciamos una Alerta
   const alerta = new Alerta(mensajes[opcionMsg], value)
   
   // Utilizamos el metodo para obtener el mensaje de la alerta
   console.log(alerta.crearAlerta())
}

// Funcion para guardar el inventario en LocalStorage
// Donde:
// inventario representa el inventario que se va a modificar
const guardarInventarioEnLS = (inventario) => {
   localStorage.removeItem('Inventario')
   // Se agrega el array de Inventario al LocalStorage 
   localStorage.setItem('Inventario', JSON.stringify(inventario))
}

// Funcion para obtener el Inventario Inicial
const insertarInventarioInicial = async () => {
   const inventario = []

   // Peticion para obtener el archivo JSON
   const productosEnInventario = await fetch('./storage/storage.json')
      .then(value => value.json())
      .then(value => value.inventario)
   
   // Se recorre el array de productos en inventario
   productosEnInventario.forEach(objProducto => {
      // Destructuracion del objeto producto
      const { producto, categoria, modelo, talla, marca, cantidad, precio } = objProducto
      const id = generarID()
      
      // Instanciamos el producto
      const product = new Producto(id, producto, categoria, modelo, talla, marca, cantidad, precio)
      
      // Utilizamos el metodo para obtener el precio total del producto en inventario
      product.obtenerTotal()

      // Agregamos la instancia del producto en el arreglo de Inventario
      inventario.push(product)

   });
   // Se guarda el inventario en LocalStorage
   guardarInventarioEnLS(inventario)
}

// Funcion para obtener el inventario que hay en LocalStorage
const obtenerInventarioDeLS = () => {
   // Accedemos al item del localStorage
   const inventarioJSON = localStorage.getItem('Inventario')

   // Convertimos el texto JSON
   const inventario = JSON.parse(inventarioJSON)

   // Recorremos el array de productos en inventarios para asignarles a cada uno su instancia
   // Esto se debe a que al guardar el array de productos en LocalStorage se transforma en texto plano, elimnando asi sus metodos y por lo tanto su instancia
   const inventarioConInstancias = inventario.map(producto => Producto.instanciarObjeto(producto));

   // Retornarmos el inventario con instancias
   return inventarioConInstancias
}

// Funcion para eliminar un producto del inventario del localStorage
// Donde:
// producto representa el producto que se va a eliminar
// inventario representa el inventario que se va a modificar
const borrarProductoDeLS = (producto, inventario) => {
   // Obtenemos el indice donde se encuentra el producto a eliminar
   // Para obtener el indice, debe cumplirse la condicion que los ID de los productos deben ser iguales
   const index = inventario.findIndex(product => product.id === producto.id);

   // Si se encuentra un indice procede a eliminarlo del inventario
   if (index !== -1) {
      // En el indice hayado se elimina 1 producto
      inventario.splice(index, 1)

      // Se guarda el inventario en LocalStorage
      guardarInventarioEnLS(inventario)

      // Retorna el inventario con el producto eliminado
      return inventario
   }
}

export { agregarProducto, editarProducto, lanzarAlerta, guardarInventarioEnLS, insertarInventarioInicial, obtenerInventarioDeLS, borrarProductoDeLS }