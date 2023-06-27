const read = require('prompt-sync')();

function validarSoloLetras(A) {
    var pattern = /^[a-zA-Z\s]*$/;
    var result = pattern.test(A);

    if (result === false) {
        return false;
    }
    return true;
};

function validarSoloNumeros(A) {
    var pattern = /^[0-9]+$/;
    var result = pattern.test(A);

    if (result === false) {
        return false;
    }

    return true;
};

function pedirSoloNumeros(A) {
    while (validarSoloNumeros(A) === false || A === "") {
        A = read("Ingrese un numero correcto: ")
    }
    return A;
};

function pedirSoloLetras(C) {
    while (validarSoloLetras(C) === false || C === "") {
        C = read("Ingrese un dato correcto: ")
    }
    return C;
};

function pedirJugadores(selecciones) {
    
    console.info(selecciones)

    // selecciones.forEach(sel => {
    //     console.info(sel["id"] + sel["nombre"]);
    // });

    var seleccion = read("ingrese el ID de la seleccion: ")

    console.clear()
    var listaJugadores = []
    var info = []

    var jugador = pedirSoloLetras(read("Ingrese nombre de jugador: "));

    while (jugador != "0") {
        while (listaJugadores.includes(jugador) === true) {
            console.log("Ingrese un nombre que no este repetido")
            jugador = pedirSoloLetras(read("Ingrese nombre de jugador: "));
        }
        if (listaJugadores.includes(jugador) === false) {
            listaJugadores.push(jugador);
            console.clear();
        }

        var seleccion = pedirSoloLetras(read("Seleccione a que país representará " + jugador + ": "));
        var nacionalidad = pedirSoloLetras(read("Ingrese la nacionalidad de " + jugador + ": "));
        var nacimiento = pedirSoloNumeros(read("Ingrese la fecha de nacimiento de " + jugador + ": "));
        var estatura = pedirSoloNumeros(read("Ingrese la estatura en centimetros de " + jugador + ": "));
        var posicion = pedirSoloNumeros(read("Seleccione de la lista la posición en el campo de juego que ocupará " + jugador + ": "));

        var Player = {
            "Jugador": jugador,
            "Seleccion": seleccion,
            "Nacionalidad": nacionalidad,
            "Nacimiento": nacimiento,
            "Estatura": estatura,
            "Posicion": posicion,
            "Goles" : 0
        }

        info.push(Player);
        console.clear()
        console.info("Para finalizar con el alta de datos ingrese un 0")
        console.info("")
        jugador = read("Ingrese el nombre del Jugador: ")
    }
    return info
};

var jugadores = pedirJugadores();