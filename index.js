import { agregarProducto, editarProducto, lanzarAlerta } from "./funciones.js";

// Objeto que simula los datos que proviene del fomulario (Agregar Producto)
const productoObj = {
   producto: 'Jogger',
   categoria: 'Pantalon',
   modelo: 'Negro',
   talla: 18,
   marca: 'Nike',
   cantidad: 20,
   precio: 18 
}

const instanciaNuevoProducto = agregarProducto(productoObj)
// console.log(instanciaNuevoProducto)

lanzarAlerta('agregado', productoObj.producto)

// Objeto que simula los datos que proviene del fomulario (Editar Producto)
const productoObj2 = {
   producto: 'Blu-Jean',
   modelo: 'Azul',
   marca: 'Uniqlo',
   cantidad: 15,
}

const instanciaEditada = editarProducto(productoObj2, instanciaNuevoProducto)
// console.log(instanciaEditada)

lanzarAlerta('editado', productoObj.producto)