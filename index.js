import { agregarProducto, editarProducto, lanzarAlerta, render, insertarInventarioInicial, obtenerInventarioDeLS, borrarProductoDeLS, guardarInventarioEnLS, backup, restore } from "./funciones.js";

// Iniciamos el inventario
// insertarInventarioInicial()
const d = document


// Creamos la tabla de productos
d.addEventListener("DOMContentLoaded", ()=>{
  insertarInventarioInicial()
  render()
})



// Obtenemos el Inventario
const inventario = obtenerInventarioDeLS()


const categoria = document.getElementById('categoria')

categoria.addEventListener("change", showTallaInput)

const inputBusqueda = document.getElementById('input-busqueda');
inputBusqueda.addEventListener("input", function (event) {
  event.preventDefault();
  const valorBusqueda = inputBusqueda.value.toLowerCase();
  //console.log(valorBusqueda)
  filtrarElementos(valorBusqueda);
});

// Función para filtrar la búsqueda que haga el usuario
function filtrarElementos(valorBusqueda) {
  const elementos = document.querySelectorAll('.articulos.filtro-busqueda');
  // Se itera sobre el nombre, categoria, modelo, talla y marca del producto para solo mostrar los que coincidan con lo que haya tipeado el usuario
  elementos.forEach(elemento => {
    const textoProducto = elemento.querySelector('.nombre-producto').textContent.toLowerCase();
    const textoCategoria = elemento.querySelector('.categoria-producto').textContent.toLowerCase();
    const textoModelo = elemento.querySelector('.modelo-producto').textContent.toLowerCase();
    const textoTalla = elemento.querySelector('.talla-producto').textContent.toLowerCase();
    const textoMarca = elemento.querySelector('.marca-producto').textContent.toLowerCase();

    if (textoProducto.includes(valorBusqueda) ||
      textoCategoria.includes(valorBusqueda) ||
      textoModelo.includes(valorBusqueda) ||
      textoTalla.includes(valorBusqueda) ||
      textoMarca.includes(valorBusqueda)) {
      elemento.style.display = '';
    } else {
      elemento.style.display = 'none';
    }
  });
}


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
    let inventario = obtenerInventarioDeLS()
    const nuevoInventario = agregarProducto(productoObj,inventario)
    lanzarAlerta("agregado","success")
    inventario=nuevoInventario
    render()
  }else{
    lanzarAlerta("faltanDatos","warning")
  }
})

const btnBackup = d.getElementById('btn-backup')

btnBackup.addEventListener('click', () => {
  const file = JSON.stringify(inventario);
  const filename = "storage.json";
  const link = backup(filename, file);
  d.body.appendChild(link);
  link.click();
  d.body.removeChild(link);
})

const btnRestore = d.getElementById('btn-restore')
const inputFile = d.getElementById('importar')

btnRestore.addEventListener('click', () => {
  restore(inputFile)
})

// function eliminar(producto) {
//   borrarProductoDeLS(producto,inventario)
// }

// d.addEventListener("DOMContentLoaded", render)



