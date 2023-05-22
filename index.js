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


const categoria= document.getElementById('categoria')

categoria.addEventListener("change",showTallaInput)

function showTallaInput() {
   let categoria = document.getElementById("categoria").value;
   let tallaContainer = document.getElementById("tallaContainer");
   let marcaContainer= document.getElementById("marcaContainer")
   let cantidadContainer= document.getElementById("cantidadContainer")
   let precioContainer= document.getElementById("precioContainer")

   
   // Reiniciamos el contenido del campo de selección de talla
   document.getElementById("talla").innerHTML = "";
   
   if (categoria === "zapatos") {
     // Mostrar las tallas de zapatos
     tallaContainer.classList.remove("d-none");
     marcaContainer.classList.remove("d-none");
     cantidadContainer.classList.remove("d-none");
     precioContainer.classList.remove("d-none");

     
     let tallas = ["29","30","32","34","36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
     addTallaOptions(tallas);
   } else if (categoria === "franelas") {
     // Mostrar las tallas de franelas
     tallaContainer.classList.remove("d-none");
     marcaContainer.classList.remove("d-none");
     cantidadContainer.classList.remove("d-none");
     precioContainer.classList.remove("d-none");
     
     let tallas = ["S", "M", "L", "XL", "XXL"];
     addTallaOptions(tallas);
   } else if (categoria === "pantalones") {
     // Mostrar las tallas de pantalones
     tallaContainer.classList.remove("d-none");
     marcaContainer.classList.remove("d-none");
     cantidadContainer.classList.remove("d-none");
     precioContainer.classList.remove("d-none");
     
     let tallas = ["22","24","26","28", "30", "32", "34", "36", "38", "40"];
     addTallaOptions(tallas);
   } else {
     // Ocultar el campo de selección de talla
     tallaContainer.classList.add("d-none");
     marcaContainer.classList.add("d-none");
     cantidadContainer.classList.add("d-none");
     precioContainer.classList.add("d-none");
   }
 }
 
 function addTallaOptions(tallas) {
   let tallaSelect = document.getElementById("talla");
   
   for (var i = 0; i < tallas.length; i++) {
     var option = document.createElement("option");
     option.text = tallas[i];
     option.value= tallas[i];
     tallaSelect.add(option);
   }
 }
