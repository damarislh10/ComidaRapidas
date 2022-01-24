const formulario = document.getElementById("formulario");

let comidas = [];

let btnBuscar = document.getElementById("btnBuscar");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  capturarDatos();
});

// capturar datos

const capturarDatos = () => {
  let nombre = document.getElementById("nombre").value;
  let ingredientes = document.getElementById("ingredientes").value;
  let precio = document.getElementById("precio").value;
  let imagen = document.getElementById("imagen").value;

  let registroComida = {
    id: Math.round(Math.random() * (100 - 1) + 1),
    nombre,
    ingredientes,
    precio,
    imagen,
  };

  const liComida = JSON.parse(localStorage.getItem("comida"));
  if (liComida !== null) {
    liComida.unshift(registroComida);
    sendLocalStorage(liComida);
  } else {
    comidas.unshift(registroComida);
    sendLocalStorage(comidas);
  }
  getLocalStorage();
};

const sendLocalStorage = (comida) => {
  localStorage.setItem("comida", JSON.stringify(comida));
};

let listarComida = document.getElementById("listarComida");

const getLocalStorage = () => {
  listarComida.innerHTML = "";

  let comidaLocal = JSON.parse(localStorage.getItem("comida"));

  comidaLocal.map((comida) => {
    const { id, nombre, ingredientes, precio, imagen } = comida;

    listarComida.innerHTML += `
        <td>${nombre}</td>
        <td>${ingredientes}</td>
        <td>${precio}</td>
        <td><img style=width:280px src= "${imagen}"></td>
        <td><button class="btn btn-danger eliminar" id="${id}">Eliminar</button></td>
        `;
  });
};

listarComida.addEventListener("click", (e) => {
  let btnEliminar = e.target.classList.contains("eliminar");

  let idClick = e.target.id;
  let getLocal = JSON.parse(localStorage.getItem("comida"));

  let buscado = getLocal.find((data) => data.id == Number(idClick));

  if (btnEliminar) {
    getLocal.forEach((comida, index) => {
      if (comida.id == buscado.id) {
        getLocal.splice(index, 1);
        localStorage.setItem("comida", JSON.stringify(getLocal));
        getLocalStorage();
      }
    });
  }
});

const buscador = () => {
  btnBuscar.addEventListener("click", () => {
    let getData = JSON.parse(localStorage.getItem("comida"));
    let inputBuscar = document.getElementById("inputBuscar").value;

    let filtroData = getData.filter((comida) =>
      comida.nombre.toLowerCase().includes(inputBuscar.toLowerCase())
    );
    let divBusqueda = document.getElementById("busqueda");
    divBusqueda.innerHTML = "";

    filtroData.length === 0
      ? (divBusqueda.innerHTML += `<div style="color:white;">El nombre ${inputBuscar} no existe</div>`)
      : filtroData.map((comida) => {
          const { nombre, ingredientes, precio, imagen } = comida;
          divBusqueda.innerHTML += `
                <h2  class="mt-3" style=color:#fff>El nombre es: <span style=color:#e27982>${nombre}</span></h2>
                <h3  style= color:#fff>Los ingredientes son: <span style=color:#e27982>${ingredientes}</span></h3>
                <h4  style= color:#fff>El precio es: <span style=color:#e27982>${precio}</span></h4>
                <img style=width:380px src= ${imagen}>
                                             
                `;
        });
  });
};

buscador();

document.addEventListener("DOMContentLoaded", getLocalStorage);
