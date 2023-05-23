import { agregarProducto, editarProducto, lanzarAlerta, render, insertarInventarioInicial, obtenerInventarioDeLS } from "./funciones.js";

// Iniciamos el inventario
// insertarInventarioInicial()
const d = document

// d.addEventListener("DOMContentLoaded", insertarInventarioInicial)
// Creamos la tabla de productos
d.addEventListener("DOMContentLoaded", render)
// Creamos la tabla de productos


// Obtenemos el Inventario
let inventario = obtenerInventarioDeLS()
// console.log(inventario)


// lanzarAlerta('agregado', productoObj.producto)

const categoria = document.getElementById('categoria')

categoria.addEventListener("change", showTallaInput)

function showTallaInput() {
  let categoria = document.getElementById("categoria").value;
  let tallaContainer = document.getElementById("tallaContainer");
  let marcaContainer = document.getElementById("marcaContainer")
  let cantidadContainer = document.getElementById("cantidadContainer")
  let precioContainer = document.getElementById("precioContainer")


  // Reiniciamos el contenido del campo de selección de talla
  document.getElementById("talla").innerHTML = "";

  if (categoria === "zapatos") {
    // Mostrar las tallas de zapatos
    tallaContainer.classList.remove("d-none");
    marcaContainer.classList.remove("d-none");
    cantidadContainer.classList.remove("d-none");
    precioContainer.classList.remove("d-none");


    let tallas = ["29", "30", "32", "34", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
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

    let tallas = ["22", "24", "26", "28", "30", "32", "34", "36", "38", "40"];
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
    option.value = tallas[i];
    tallaSelect.add(option);
  }
}

const formulario = d.getElementById('registrarProductos')

formulario.addEventListener('submit', (e) => {
  e.preventDefault()
  const producto = d.getElementById('producto').value
  const precio = d.getElementById('precio').value
  const cantidad = d.getElementById('cantidad').value
  const talla = d.getElementById('talla').value
  const marca = d.getElementById('marca').value
  const modelo= d.getElementById('modelo').value
  // let categoria = d.getElementById('categoria').value

  if(producto&&precio&&cantidad&&talla&&marca&&modelo){
    const productoObj = {
      producto: producto,
      categoria: categoria.value,
      modelo: modelo,
      talla: talla,
      marca: marca,
      cantidad: cantidad,
      precio: precio
    }
    const instanciaNuevoProducto = agregarProducto(productoObj,inventario)
    render()
    console.log(instanciaNuevoProducto)
  }else{
    return lanzarAlerta("Debe llenar todos los campos del formulario")
  }



})


d.addEventListener("DOMContentLoaded", render)



