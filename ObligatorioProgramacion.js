const read = require('prompt-sync')();

function pedirSeleccion(seleccionIngresada) {
    while (validarSeleccion(seleccionIngresada) === false || seleccionIngresada === "") {
        seleccionIngresada = read("Ingrese una seleccion valida: ")
    }
    return seleccionIngresada;
};

function validarSeleccion(A) {
    var pattern = /^[a-zA-Z\s]*$/;
    var result = pattern.test(A);

    if (result === false) {
        return false;
    }
    return true;
};

function Mundial() { // funcion para verificar que los paises ingresados sean validos (sin numeros, string vacios o paises repetidos)
    var seleccionIngresada = 0;
    var listaSelecciones = [];

    while (listaSelecciones.length <= 31) {
        seleccionIngresada = read("Ingrese una seleccion participante: ");
        seleccionIngresada = pedirSeleccion(seleccionIngresada);
        if (listaSelecciones.includes(seleccionIngresada.toUpperCase()) === false) {
            listaSelecciones.push(seleccionIngresada.toUpperCase());
        }
    }
    console.info(listaSelecciones);
    return listaSelecciones

    // var listaSeleccionesSinDuplicados = [...new Set(listaSelecciones)];
    // console.info(listaSeleccionesSinDuplicados);
};

Mundial();