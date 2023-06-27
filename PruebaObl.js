const read = require('prompt-sync')();

function crearPais(id, nombre, continente, participaciones) {
    var nuevoPais = {};
    nuevoPais["id"] = id
    nuevoPais["nombre"] = nombre;
    nuevoPais["continente"] = continente;
    nuevoPais["participaciones"] = participaciones;
    nuevoPais["goles"] = 0
    nuevoPais["golesencontra"] = 0
    nuevoPais["faltas"] = 0
    nuevoPais["puntos"] = 0
    nuevoPais["difgoles"] = 0

    return nuevoPais;
};

function validarSeleccion(A) {
    var pattern = /^[a-zA-Z\s]*$/;
    var result = pattern.test(A);

    if (result === false) {
        return false;
    }
    return true;
};

function validarParticipaciones(A) {
    var pattern = /^[0-9]+$/;
    var result = pattern.test(A);

    if (result === false) {
        return false;
    }

    return true;
};

function pedirParticipaciones(A) {
    A = read("Ingrese cuantas veces ha participado dicha seleccion en mundiales: ")
    while (validarParticipaciones(A) === false || A === "" || A < 0 || A > 21) {
        A = read("Ingrese un numero correcto (recuerde que solo se han jugado 21 mundiales): ")
    }

    return A;
};

function pedirContinente(B) {
    B = read("Ingrese a que continente pertenece dicha seleccion: ")
    while (validarSeleccion(B) === false || B === "") {
        B = read("Ingrese un continente valido: ")
    }
    return B;
};

function pedirSeleccion(C) {
    C = read("Ingrese una seleccion participante: ")
    while (validarSeleccion(C) === false || C === "") {
        C = read("Ingrese una seleccion valida: ")
    }
    return C;
};

function mostrarIdnombre(listaPaises) {
    listaPaises.forEach(pais => {
        console.info(pais["id"] + " - " + pais["nombre"]);
    });
};

function divideListaNumeros(paises, tamaño) {
    var randomPaises = paises.sort(() => 0.5 - Math.random());

    var grupos = [];
    for (i = 0; i < randomPaises.length; i += tamaño) {
        grupos.push(randomPaises.slice(i, i + tamaño));
    }
    return grupos;
};

function gruposFinales(paises) {
    var gruposFinales = divideListaNumeros(paises, 4);
    return gruposFinales;
};

function selecciones(A, listaSelecciones) {
    var paises = [];
    var aux = listaSelecciones.length + 1;

    var equipos = [...listaSelecciones, ...paises]

    while (A !== 0 && equipos.length < 32) {
        console.clear();
        var nombrePais = pedirSeleccion(nombrePais);
        var continentePais = pedirContinente(continentePais);
        var participacionesPais = pedirParticipaciones(participacionesPais);
        var nuevoPais = crearPais(aux, nombrePais.toUpperCase(), continentePais.toUpperCase(), participacionesPais);
        paises.push(nuevoPais);
        console.clear();
        console.info("Para ingresar otra seleccion presione enter.");
        console.info("Si desea salir ingrese 0");
        aux += 1
        equipos = [...listaSelecciones, ...paises]
        A = parseInt(read(""));
        console.clear();
    }

    if (equipos.length == 32) {
        console.clear();
        console.info("LIMITE DE SELECCIONES ALCANZADO");
        console.info("");
        var r = read("Presione enter para continuar ");
        console.clear();
    }
    return paises;

};

const firstRoundMatches = (groups) => {
    let matches = [];

    groups.forEach((group, indexOfgroup) => {
        group.forEach(local => {
            group.forEach(visitor => {
                if (local.id !== visitor.id) {
                    const checkMatches = matches.find(match =>
                        (((match.visitor.id === visitor.id) && (match.local.id === local.id))) ||
                        ((match.local.id === visitor.id) && (match.visitor.id === local.id)))
                    if (!checkMatches) matches.push({ local, visitor, indexOfgroup })
                }
            })
        })
    })
    return matches
};

function pedirSoloNumeros(A) {
    while (validarParticipaciones(A) === false || A === "") {
        A = read("Ingrese un numero correcto: ")
    }
    return A;
};

function pedirSoloLetras(C) {
    while (validarSeleccion(C) === false || C === "") {
        C = read("Ingrese un dato correcto: ")
    }
    return C;
};

function obtenerPaisById(idPais, listaPaises) {
    var paisEncontrado = null;

    listaPaises.forEach(pais => {
        if (pais["id"] === idPais) {
            paisEncontrado = pais["nombre"]
        }
    });

    return paisEncontrado;
};

function pedirPosicion(A) {
    while (validarParticipaciones(A) === false || A === "") {
        A = read("Ingrese un numero correcto: ")
    }

    while (A < 1 || A > 12) {
        A = read("Ingrese un numero comprendido entre 1 y 12: ")
    }
    return A;
};

function validarIdPaisJugador(A, listaPaises) {
    while (validarParticipaciones(A) === false || A === "") {
        A = read("Ingrese un numero valido: ")
    }

    while (A < 1 || A > listaPaises.length) {
        A = read("Ingrese un numero valido: ")
    }
    return A;
};

function validarFechaNacimiento(A) {
    var pattern = /^[0-9/]+$/;
    var result = pattern.test(A);

    if (result === false) {
        return false;
    }

    return true;
};

function pedirFechaNacimiento(A) {
    while (validarFechaNacimiento(A) === false || A === "") {
        A = read("Ingrese una fecha valida: ")
    }
    return A
};

function validarjugador(A) {
    while (A === "") {
        console.info("ingrese un nombre valido");
        console.info("");
        A = read("Ingrese el nombre de otro jugador");
    };
    return A;
};

function pedirJugadores(listaPaises) {

    console.clear();
    console.info("Ingrese el identificador numerico de la seleccion que quiera cargar jugadores");
    console.info("");
    mostrarIdnombre(listaPaises);
    console.info("");
    var x = parseInt(validarIdPaisJugador(read("Digite el numero: "), listaPaises));

    var pais = obtenerPaisById(x, listaPaises);

    var listaJugadores = [];
    var info = [];
    console.clear();
    console.info("JUGADORES DE " + pais);
    console.info("")
    var jugador = pedirSoloLetras(read("Ingrese nombre de jugador: "));

    while (jugador != "0") {
        while (listaJugadores.includes(jugador) === true) {
            console.log("Ingrese un nombre que no este repetido");
            jugador = pedirSoloLetras(read("Ingrese nombre de jugador: "));
        };
        if (listaJugadores.includes(jugador) === false) {
            listaJugadores.push(jugador.toUpperCase());
        };

        var listaPosiciones = [
            { "id": 1, "nombre": "Portero" },
            { "id": 2, "nombre": "Defensa Central" },
            { "id": 3, "nombre": "Lateral" },
            { "id": 4, "nombre": "Carrilero" },
            { "id": 5, "nombre": "Libero" },
            { "id": 6, "nombre": "Pivote" },
            { "id": 7, "nombre": "Interior" },
            { "id": 8, "nombre": "Media Punta" },
            { "id": 9, "nombre": "Volante" },
            { "id": 10, "nombre": "Extremo" },
            { "id": 11, "nombre": "Segundo Delantero" },
            { "id": 12, "nombre": "Delantero Centro" }]

        jugador = jugador.toUpperCase();
        console.info("");
        var nacimiento = pedirFechaNacimiento(read("Ingrese la fecha de nacimiento de " + jugador + ": "));
        console.info("");
        var estatura = pedirSoloNumeros(read("Ingrese la estatura en centimetros de " + jugador + ": "));
        console.info("");
        mostrarIdnombre(listaPosiciones);
        console.info("");
        var pedirposicion = parseInt(pedirPosicion(read("Seleccione de la lista la posición en el campo de juego que ocupará " + jugador + ": ")));
        var posicion = obtenerPaisById(pedirposicion, listaPosiciones);

        var Player = {
            "id": x,
            "idjugador": x,
            "nombre": jugador,
            "seleccion": pais,
            "nacimiento": nacimiento,
            "estatura": estatura,
            "posicion": posicion,
            "goles": 0,
            "faltas": 0
        };

        info.push(Player);
        console.clear();
        console.info("Para finalizar con el alta de datos ingrese un 0");
        console.info("");
        jugador = validarjugador(read("Ingrese el nombre del Jugador: "));
        console.clear();

    };
    return info
};

function menu() {
    console.info("MENU DEL GESTIONADOR");
    console.info("");
    console.info("");
    console.info("Cargar una seleccion - ingrese un 1");
    console.info("")
    console.info("Cargar jugadores a una seleccion - ingrese un 2");
    console.info("");
    console.info("Ver los grupos y simular mundial - ingrese un 3");
    console.info("");
    console.info("");

    var A = parseInt(read("Ingrese el numero: "));
    while (A != 1 && A != 2 && A != 3) {
        A = parseInt(read("Ingrese un numero valido: "));
    }
    return A
};

function mainMenu() {
    console.clear();
    var A = menu();
    // var listaPaises = [];
    // var listajugadores = [];
    var grupos = [];

    var paises2 = [
        { "id": 1, "nombre": "QATAR", "continente": "ASIA", "participaciones": 1, "goles": 1, "golesencontra": 0, "faltas": 1, "puntos": 3, "difgoles": 0, "identificador": null },
        { "id": 2, "nombre": "ALEMANIA", "continente": "EUROPA", "participaciones": 2, "goles": 1, "golesencontra": 0, "faltas": 2, "puntos": 5, "difgoles": 0, "identificador": null },
        { "id": 3, "nombre": "DINAMARCA", "continente": "EUROPA", "participaciones": 3, "goles": 2, "golesencontra": 0, "faltas": 3, "puntos": 2, "difgoles": 0, "identificador": null },
        { "id": 4, "nombre": "BRASIL", "continente": "AMERICA DEL SUR", "participaciones": 4, "goles": 4, "golesencontra": 0, "faltas": 4, "puntos": 6, "difgoles": 0, "identificador": null },
        { "id": 5, "nombre": "FRANCIA", "continente": "EUROPA", "participaciones": 5, "goles": 6, "golesencontra": 0, "faltas": 5, "puntos": 8, "difgoles": 0, "identificador": null },
        { "id": 6, "nombre": "BELGICA", "continente": "EUROPA", "participaciones": 6, "goles": 3, "golesencontra": 0, "faltas": 6, "puntos": 9, "difgoles": 0, "identificador": null },
        { "id": 7, "nombre": "CROACIA", "continente": "EUROPA", "participaciones": 7, "goles": 1, "golesencontra": 0, "faltas": 6, "puntos": 1, "difgoles": 0, "identificador": null },
        { "id": 8, "nombre": "ESPAÑA", "continente": "EUROPA", "participaciones": 8, "goles": 6, "golesencontra": 0, "faltas": 7, "puntos": 3, "difgoles": 0, "identificador": null },
        { "id": 9, "nombre": "SERBIA", "continente": "EUROPA", "participaciones": 9, "goles": 8, "golesencontra": 0, "faltas": 8, "puntos": 6, "difgoles": 0, "identificador": null },
        { "id": 10, "nombre": "INGLATERRA", "continente": "EUROPA", "participaciones": 10, "goles": 8, "golesencontra": 0, "faltas": 9, "puntos": 6, "difgoles": 0, "identificador": null },
        { "id": 11, "nombre": "SUIZA", "continente": "EUROPA", "participaciones": 11, "goles": 9, "golesencontra": 0, "faltas": 0, "puntos": 3, "difgoles": 0, "identificador": null },
        { "id": 12, "nombre": "PAISES BAJOS", "continente": "EUROPA", "participaciones": 12, "goles": 2, "golesencontra": 0, "faltas": 10, "puntos": 9, "difgoles": 0, "identificador": null },
        { "id": 13, "nombre": "ARGENTINA", "continente": "AMERICA DEL SUR", "participaciones": 13, "goles": 3, "golesencontra": 0, "faltas": 11, "puntos": 5, "difgoles": 15, "identificador": null },
        { "id": 14, "nombre": "IRAN", "continente": "ASIA", "participaciones": 14, "goles": 6, "golesencontra": 4, "faltas": 12, "puntos": 3, "difgoles": 0, "identificador": null },
        { "id": 15, "nombre": "COREA DEL SUR", "continente": "ASIA", "participaciones": 15, "goles": 4, "golesencontra": 2, "faltas": 13, "puntos": 6, "difgoles": 15, "identificador": null },
        { "id": 16, "nombre": "JAPON", "continente": "ASIA", "participaciones": 16, "goles": 3, "golesencontra": 7, "faltas": 14, "puntos": 5, "difgoles": 0, "identificador": null },
        { "id": 17, "nombre": "ARABIA SAUDITA", "continente": "ASIA", "participaciones": 17, "goles": 4, "golesencontra": 0, "faltas": 15, "puntos": 7, "difgoles": 0, "identificador": null },
        { "id": 18, "nombre": "ECUADOR", "continente": "AMERICA DEL SUR", "participaciones": 18, "goles": 7, "golesencontra": 6, "faltas": 16, "puntos": 5, "difgoles": 0, "identificador": null },
        { "id": 19, "nombre": "URUGUAY", "continente": "AMERICA DEL SUR", "participaciones": 19, "goles": 3, "golesencontra": 4, "faltas": 17, "puntos": 4, "difgoles": 0, "identificador": null },
        { "id": 20, "nombre": "CANADA", "continente": "AMERICA DEL NORTE", "participaciones": 20, "goles": 5, "golesencontra": 2, "faltas": 18, "puntos": 3, "difgoles": 0, "identificador": null },
        { "id": 21, "nombre": "GHANA", "continente": "AFRICA", "participaciones": 21, "goles": 2, "golesencontra": 2, "faltas": 20, "puntos": 6, "difgoles": 0, "identificador": null },
        { "id": 22, "nombre": "SENEGAL", "continente": "AFRICA", "participaciones": 22, "goles": 0, "golesencontra": 50, "faltas": 21, "puntos": 5, "difgoles": 0, "identificador": null },
        { "id": 23, "nombre": "MARRUECOS", "continente": "AFRICA", "participaciones": 23, "goles": 0, "golesencontra": 50, "faltas": 22, "puntos": 4, "difgoles": 0, "identificador": null },
        { "id": 24, "nombre": "TUNEZ", "continente": "ASIA", "participaciones": 24, "goles": 0, "golesencontra": 15, "faltas": 23, "puntos": 3, "difgoles": 0, "identificador": null },
        { "id": 25, "nombre": "PORTUGAL", "continente": "EUROPA", "participaciones": 25, "goles": 0, "golesencontra": 0, "faltas": 24, "puntos": 3, "difgoles": 0, "identificador": null },
        { "id": 26, "nombre": "POLONIA", "continente": "EUROPA", "participaciones": 26, "goles": 0, "golesencontra": 0, "faltas": 25, "puntos": 4, "difgoles": 0, "identificador": null },
        { "id": 27, "nombre": "CAMERUN", "continente": "AFRICA", "participaciones": 27, "goles": 0, "golesencontra": 0, "faltas": 26, "puntos": 5, "difgoles": 0, "identificador": null },
        { "id": 28, "nombre": "MEXICO", "continente": "CENTRO AMERICA", "participaciones": 28, "goles": 0, "golesencontra": 0, "faltas": 27, "puntos": 4, "difgoles": 0, "identificador": null },
        { "id": 29, "nombre": "ESTADOS UNIDOS", "continente": "AMERICA DEL NORTE", "participaciones": 29, "goles": 0, "golesencontra": 0, "faltas": 28, "puntos": 3, "difgoles": 0, "identificador": null },
        { "id": 30, "nombre": "GALES", "continente": "EUROPA", "participaciones": 30, "goles": 0, "golesencontra": 0, "faltas": 29, "puntos": 5, "difgoles": 0, "identificador": null },
        { "id": 31, "nombre": "AUSTRALIA", "continente": "OCEANIA", "participaciones": 31, "goles": 15, "golesencontra": 0, "faltas": 30, "puntos": 5, "difgoles": 0, "identificador": null },
        // { "id": 32, "nombre": "COSTA RICA", "continente": "CENTRO AMERICA", "participaciones": 32, "goles": 15, "golesencontra": 0, "faltas": 31, "puntos": 5, "difgoles": 0, "identificador": null }]
    ]


    var jugadores2 = [
        { "id": 1, "idjugador": 0, "nombre": "JUAN", "seleccion": "QATAR", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 15, "faltas": 0 },
        { "id": 1, "idjugador": 0, "nombre": "jhon", "seleccion": "QATAR", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 2, "idjugador": 0, "nombre": "milton", "seleccion": "ALEMANIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 2, "idjugador": 0, "nombre": "jhon", "seleccion": "ALEMANIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 3, "idjugador": 0, "nombre": "milton", "seleccion": "DINAMARCA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 3, "idjugador": 0, "nombre": "jhon", "seleccion": "DINAMARCA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 4, "idjugador": 0, "nombre": "milton", "seleccion": "BRASIL", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 4, "idjugador": 0, "nombre": "jhon", "seleccion": "BRASIL", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 5, "idjugador": 0, "nombre": "milton", "seleccion": "FRANCIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 5, "idjugador": 0, "nombre": "jhon", "seleccion": "FRANCIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 6, "idjugador": 0, "nombre": "milton", "seleccion": "BELGICA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 6, "idjugador": 0, "nombre": "jhon", "seleccion": "BELGICA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 7, "idjugador": 0, "nombre": "milton", "seleccion": "CROACIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 7, "idjugador": 0, "nombre": "jhon", "seleccion": "CROACIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 8, "idjugador": 0, "nombre": "milton", "seleccion": "ESPAÑA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 8, "idjugador": 0, "nombre": "jhon", "seleccion": "ESPAÑA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 9, "idjugador": 0, "nombre": "milton", "seleccion": "SERBIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 9, "idjugador": 0, "nombre": "jhon", "seleccion": "SERBIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 10, "idjugador": 0, "nombre": "milton", "seleccion": "INGLATERRA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 10, "idjugador": 0, "nombre": "jhon", "seleccion": "INGLATERRA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 11, "idjugador": 0, "nombre": "milton", "seleccion": "SUIZA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 11, "idjugador": 0, "nombre": "jhon", "seleccion": "SUIZA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 12, "idjugador": 0, "nombre": "milton", "seleccion": "PAISES BAJOS", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 12, "idjugador": 0, "nombre": "jhon", "seleccion": "PAISES BAJOS", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 13, "idjugador": 0, "nombre": "milton", "seleccion": "ARGENTINA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 13, "idjugador": 0, "nombre": "jhon", "seleccion": "ARGENTINA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 14, "idjugador": 0, "nombre": "milton", "seleccion": "IRAN", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 14, "idjugador": 0, "nombre": "jhon", "seleccion": "IRAN", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 15, "idjugador": 0, "nombre": "milton", "seleccion": "COREA DEL SUR", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 15, "idjugador": 0, "nombre": "jhon", "seleccion": "COREA DEL SUR", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 16, "idjugador": 0, "nombre": "milton", "seleccion": "JAPON", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 16, "idjugador": 0, "nombre": "jhon", "seleccion": "JAPON", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 17, "idjugador": 0, "nombre": "milton", "seleccion": "ARABIA SAUDITA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 17, "idjugador": 0, "nombre": "jhon", "seleccion": "ARABIA SAUDITA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 18, "idjugador": 0, "nombre": "milton", "seleccion": "ECUADOR", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 18, "idjugador": 0, "nombre": "jhon", "seleccion": "ECUADOR", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 19, "idjugador": 0, "nombre": "milton", "seleccion": "URUGUAY", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 19, "idjugador": 0, "nombre": "jhon", "seleccion": "URUGUAY", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 20, "idjugador": 0, "nombre": "milton", "seleccion": "CANADA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 20, "idjugador": 0, "nombre": "jhon", "seleccion": "CANADA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 21, "idjugador": 0, "nombre": "milton", "seleccion": "GHANA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 21, "idjugador": 0, "nombre": "jhon", "seleccion": "GHANA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 22, "idjugador": 0, "nombre": "milton", "seleccion": "SENEGAL", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 22, "idjugador": 0, "nombre": "jhon", "seleccion": "SENEGAL", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 23, "idjugador": 0, "nombre": "milton", "seleccion": "MARRUECOS", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 23, "idjugador": 0, "nombre": "jhon", "seleccion": "MARRUECOS", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 24, "idjugador": 0, "nombre": "milton", "seleccion": "TUNEZ", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 24, "idjugador": 0, "nombre": "jhon", "seleccion": "TUNEZ", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 25, "idjugador": 0, "nombre": "bichardo", "seleccion": "PORTUGAL", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 25, "idjugador": 0, "nombre": "bicho", "seleccion": "PORTUGAL", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 26, "idjugador": 0, "nombre": "milton", "seleccion": "POLONIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 26, "idjugador": 0, "nombre": "jhon", "seleccion": "POLONIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 27, "idjugador": 0, "nombre": "milton", "seleccion": "CAMERUN", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 27, "idjugador": 0, "nombre": "jhon", "seleccion": "CAMERUN", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 28, "idjugador": 0, "nombre": "milton", "seleccion": "MEXICO", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 28, "idjugador": 0, "nombre": "jhon", "seleccion": "MEXICO", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 29, "idjugador": 0, "nombre": "milton", "seleccion": "ESTADOS UNIDOS", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 29, "idjugador": 0, "nombre": "jhon", "seleccion": "ESTADOS UNIDOS", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 30, "idjugador": 0, "nombre": "milton", "seleccion": "GALES", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 30, "idjugador": 0, "nombre": "jhon", "seleccion": "GALES", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 31, "idjugador": 0, "nombre": "milton", "seleccion": "AUSTRALIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 31, "idjugador": 0, "nombre": "jhon", "seleccion": "AUSTRALIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 32, "idjugador": 0, "nombre": "milton", "seleccion": "COSTA RICA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
        { "id": 32, "idjugador": 0, "nombre": "ELBICHITO", "seleccion": "COSTA RICA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 15, "faltas": 0 }
    ]

    while (A !== 0) {
        console.clear();
        while (A == 1) {
            if (paises2.length < 32) {
                var aux = selecciones(A, paises2)
                paises2 = [...paises2, ...aux]
                break;
            };
            if (paises2.length == 32) {
                console.info("LISTA DE SELECCIONES COMPLETA");
                esc = read("presione enter para regresar al menu");
                console.clear();
            };
            break;
        };

        while (A == 2) {
            if (paises2.length < 1) {
                console.clear();
                console.info("NO HAY SELECCIONES CARGADAS");
                var r = read("Presione enter para volver");
                console.clear();
                break;
            }
            if (paises2.length > 0) {
                var aux1 = pedirJugadores(paises2);
                jugadores2 = [...jugadores2, ...aux1];
                break;
            }
        };

        while (A == 3) {

            if (paises2.length < 32) {
                console.clear();
                console.info("FALTAN CARGAR SELECCIONES");
                var r = read("Presione enter para volver");
                console.clear();
            }

            if (paises2.length == 32) {
                var players = JugxSelec(jugadores2);
                console.clear();
                grupos = gruposFinales(paises2);
                mostrarGrupos(grupos);
                console.info("");
                var r = read("Presione enter para simular mundial");
                console.clear();
                main(paises2, players, grupos);
            }
            break;
        };
        A = menu();
    }
};

function mostrarGrupos(grupos) {
    console.clear();
    var letras = [
        { "id": 0, "nombre": "A" },
        { "id": 1, "nombre": "B" },
        { "id": 2, "nombre": "C" },
        { "id": 3, "nombre": "D" },
        { "id": 4, "nombre": "E" },
        { "id": 5, "nombre": "F" },
        { "id": 6, "nombre": "G" },
        { "id": 7, "nombre": "H" },
    ];

    var aux = null

    grupos.forEach(grupo => {
        var indice = grupos.indexOf(grupo);
        aux = obtenerPaisById(indice, letras);
        console.info("GRUPO " + aux);
        grupo.forEach(pais => {
            console.info(pais["nombre"]);
        });
        console.info("");
    });
};

function pedirGoles(B) {
    A = read("Ingrese los goles de " + B + ": ");
    while (validarParticipaciones(A) === false || A === "") {
        A = read("Ingrese un numero correcto: ");
    };
    return A;
};

function pedirGolesJugador() {
    A = read("Digite el numero del jugador: ");
    while (validarParticipaciones(A) === false || A === "") {
        A = read("Ingrese un numero correcto: ");
    };
    return A;
};

function pedirFaltas(B) {
    A = read("Ingrese las faltas que cometió " + B + ": ");
    while (validarParticipaciones(A) === false || A === "") {
        A = read("Ingrese un numero correcto: ");
    };
    return A;
};

function mostrarIdjugador(idpais, listajugadores) {
    listajugadores.forEach(jugador => {
        if (idpais == jugador["id"]) {
            console.info(jugador["idjugador"] + " - " + jugador["nombre"]);
        };
    });
};

function mostrarMasGolesEnContra(listaSelecciones) {
    listaSelecciones.sort((a, b) => {
        if (a.golesencontra > b.golesencontra) {
            return -1
        }
        if (a.golesencontra < b.golesencontra) {
            return 1
        }
        return 0;
    })

    if (listaSelecciones[0]["golesencontra"] == listaSelecciones[1]["golesencontra"]) {
        console.info(listaSelecciones[0]["nombre"] + " y " + listaSelecciones[1]["nombre"] + " empataron en goles recibidos")
        console.info("con " + listaSelecciones[0]["golesencontra"] + " goles")
    } else {
        console.info(listaSelecciones[0]["nombre"] + " es la seleccion que mas goles recibio")
        console.info("con " + listaSelecciones[0]["golesencontra"] + " goles en contra")
    }

};

function mostrarMasGolesaFavor(listaSelecciones) {
    listaSelecciones.sort((a, b) => {
        if (a.goles > b.goles) {
            return -1
        }
        if (a.goles < b.goles) {
            return 1
        }
        return 0;
    })

    if (listaSelecciones[0]["goles"] == listaSelecciones[1]["goles"]) {
        console.info(listaSelecciones[0]["nombre"] + " y " + listaSelecciones[1]["nombre"] + " empataron en goles")
        console.info("con " + listaSelecciones[0]["goles"] + " goles")
    } else {
        console.info(listaSelecciones[0]["nombre"] + " es la seleccion que mas goles convirtio")
        console.info("con " + listaSelecciones[0]["goles"] + " goles")
    }
};

function mostrarMejorSaldoGoles(listaSelecciones) {
    listaSelecciones.sort((a, b) => {
        if (a.difgoles > b.difgoles) {
            return -1
        }
        if (a.difgoles < b.difgoles) {
            return 1
        }
        return 0;
    })

    if (listaSelecciones[0]["difgoles"] == listaSelecciones[1]["difgoles"]) {
        console.info(listaSelecciones[0]["nombre"] + " y " + listaSelecciones[1]["nombre"] + " empataron en diferencia de goles")
        console.info("con " + listaSelecciones[0]["difgoles"] + " goles")
    } else {
        console.info(listaSelecciones[0]["nombre"] + " es la seleccion que tiene mejor diferencia de goles")
        console.info("con " + listaSelecciones[0]["difgoles"] + " goles")
    }
};

function mostrarGoleador(listaJugadores) {
    listaJugadores.sort((a, b) => {
        if (a.goles > b.goles) {
            return -1
        }
        if (a.goles < b.goles) {
            return 1
        }
        return 0;
    })
    if (listaJugadores[0]["goles"] == listaJugadores[1]["goles"]) {
        console.info(listaJugadores[0]["nombre"] + " y " + listaJugadores[1]["nombre"] + " empataron en goles")
        console.info("con " + listaJugadores[0]["goles"] + " goles")
    } else {
        console.info(listaJugadores[0]["nombre"] + " es el pichichi del torneo")
        console.info("con " + listaJugadores[0]["goles"] + " goles")
    }
};

function JugxSelec(listajugadores) {
    var aux = [];
    var pais = 1;
    var cont = 1

    while (pais < 33) {
        listajugadores.forEach(jugador => {
            if (jugador.id === pais) {
                jugador.idjugador = cont
                aux.push(jugador);
                cont += 1
            }

        });
        cont = 1
        pais += 1
    };
    return aux;

};

function main(listaPaises, listajugadores, grupos) {

    var partidos = firstRoundMatches(grupos);

    partidos.forEach(partido => {
        console.clear()
        local = partido["local"]["nombre"];
        visitor = partido["visitor"]["nombre"];
        localid = partido["local"]["id"];
        visitorid = partido["visitor"]["id"];

        console.info(local + " VS " + visitor);
        console.info("");

        goleslocal = Number(pedirGoles(local));
        partido["local"]["goles"] += goleslocal;
        partido["visitor"]["golesencontra"] += goleslocal

        for (x = 1; x <= goleslocal; x++) {
            console.info("");
            console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
            console.info("");
            mostrarIdjugador(localid, listajugadores);
            console.info("");
            var idjugador = Number(pedirGolesJugador());
            listajugadores.forEach(jugador => {
                if (localid == jugador["id"] && idjugador == jugador["idjugador"]) {
                    jugador["goles"] += 1
                };
            });
            console.clear();
        };
        console.clear();
        golesVisitor = Number(pedirGoles(visitor));
        partido["visitor"]["goles"] += golesVisitor;
        partido["local"]["golesencontra"] += golesVisitor;

        for (x = 1; x <= golesVisitor; x++) {
            console.info("");
            console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
            console.info("");
            mostrarIdjugador(visitorid, listajugadores);
            console.info("");
            var idjugador = Number(pedirGolesJugador());
            listajugadores.forEach(jugador => {
                if (visitorid == jugador["id"] && idjugador == jugador["idjugador"]) {
                    jugador["goles"] += 1
                };
            });
            console.clear();
        };
        console.clear();
        faltaslocal = Number(pedirFaltas(local));
        partido["local"]["faltas"] += faltaslocal;

        console.clear();

        faltasvisitor = Number(pedirFaltas(visitor));
        partido["visitor"]["faltas"] += faltasvisitor;

        if (goleslocal > golesVisitor) {
            partido["local"]["puntos"] += 3
        } else if (golesVisitor > goleslocal) {
            partido["visitor"]["puntos"] += 3
        } else {
            partido["local"]["puntos"] += 1
            partido["visitor"]["puntos"] += 1
        };
        console.info("")
        var r = read("enter to continue");
    });

    grupos.forEach(grupo => {
        grupo.forEach(pais => {
            pais.difgoles = pais.goles - pais.golesencontra
        });
        grupo.sort((a, b) => {
            if (a.puntos > b.puntos) {
                return -1
            }
            if (a.puntos < b.puntos) {
                return 1
            }
            if (a.puntos == b.puntos) {
                if (a.difgoles > b.difgoles) {
                    return -1
                }
                if (a.difgolesa < b.difgolesb) {
                    return 1
                }
                if (a.difgoles == b.difgoles) {
                    if (a.faltas > b.faltas) {
                        return 1
                    }
                    if (a.faltas < b.faltas) {
                        return -1
                    }
                    return 0
                };
            };

        });
        grupo.splice(-1);
        grupo.splice(-1);
    });

    grupos.forEach(grupo => {
        var letras = [
            { "id": 0, "nombre": "A" },
            { "id": 1, "nombre": "B" },
            { "id": 2, "nombre": "C" },
            { "id": 3, "nombre": "D" },
            { "id": 4, "nombre": "E" },
            { "id": 5, "nombre": "F" },
            { "id": 6, "nombre": "G" },
            { "id": 7, "nombre": "H" }
        ];
        var indice = grupos.indexOf(grupo)
        var aux = obtenerPaisById(indice, letras)
        grupo[0]["identificador"] = "1" + aux
        grupo[1]["identificador"] = "2" + aux
    });

    var octavos = [];
    for (e = 0; e < grupos.length; e += 2) {
        const local = grupos[e]
        const visitor = grupos[e + 1]

        octavos.push({ local: local[0], visitor: visitor[1] })
        octavos.push({ local: local[1], visitor: visitor[0] })
    };

    var cuartosDeFinal = [];
    octavos.forEach(partido => {
        console.clear()
        local = partido["local"]["nombre"];
        visitor = partido["visitor"]["nombre"];
        localid = partido["local"]["id"];
        visitorid = partido["visitor"]["id"];

        console.info("OCTAVOS DE FINAL")
        console.info("")

        console.info(local + " VS " + visitor);
        console.info("");

        goleslocal = Number(pedirGoles(local));
        partido["local"]["goles"] += goleslocal;
        partido["visitor"]["golesencontra"] += goleslocal

        for (x = 1; x <= goleslocal; x++) {
            console.info("");
            console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
            console.info("");
            mostrarIdjugador(localid, listajugadores);
            console.info("");
            var idjugador = Number(pedirGolesJugador());
            listajugadores.forEach(jugador => {
                if (localid == jugador["id"] && idjugador == jugador["idjugador"]) {
                    jugador["goles"] += 1
                };
            });
            console.clear();
        };
        console.clear();
        golesVisitor = Number(pedirGoles(visitor));
        partido["visitor"]["goles"] += golesVisitor;
        partido["local"]["golesencontra"] += golesVisitor;

        for (x = 1; x <= golesVisitor; x++) {
            console.info("");
            console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
            console.info("");
            mostrarIdjugador(visitorid, listajugadores);
            console.info("");
            var idjugador = Number(pedirGolesJugador());
            listajugadores.forEach(jugador => {
                if (visitorid == jugador["id"] && idjugador == jugador["idjugador"]) {
                    jugador["goles"] += 1
                };
            });
            console.clear();
        };
        console.clear();
        faltaslocal = Number(pedirFaltas(local));
        partido["local"]["faltas"] += faltaslocal;

        console.clear();

        faltasvisitor = Number(pedirFaltas(visitor));
        partido["visitor"]["faltas"] += faltasvisitor;

        var siguienteRonda = null;
        if (goleslocal > golesVisitor) {
            cuartosDeFinal.push(partido.local)
        } else if (golesVisitor > goleslocal) {
            cuartosDeFinal.push(partido.visitor)
        } else {
            console.info("Hubo empate en goles, ¿quien avanza a la siguiente fase?")
            console.info("1 - " + partido.local.nombre)
            console.info("2 - " + partido.visitor.nombre)
            siguienteRonda = read("Ingrese un numero: ")
        }

        if (siguienteRonda == 1) {
            cuartosDeFinal.push(partido.local)
        } else if (siguienteRonda == 2) {
            cuartosDeFinal.push(partido.visitor)
        }
    });

    var cuartos = [
        { "local": cuartosDeFinal[0], "visitor": cuartosDeFinal[1] },
        { "local": cuartosDeFinal[2], "visitor": cuartosDeFinal[3] },
        { "local": cuartosDeFinal[4], "visitor": cuartosDeFinal[5] },
        { "local": cuartosDeFinal[6], "visitor": cuartosDeFinal[7] }
    ];

    var semifinal = [];
    cuartos.forEach(partido => {
        console.clear()
        local = partido["local"]["nombre"];
        visitor = partido["visitor"]["nombre"];
        localid = partido["local"]["id"];
        visitorid = partido["visitor"]["id"];

        console.info("CUARTOS DE FINAL")
        console.info("")

        console.info(local + " VS " + visitor);
        console.info("");

        goleslocal = Number(pedirGoles(local));
        partido["local"]["goles"] += goleslocal;
        partido["visitor"]["golesencontra"] += goleslocal

        for (x = 1; x <= goleslocal; x++) {
            console.info("");
            console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
            console.info("");
            mostrarIdjugador(localid, listajugadores);
            console.info("");
            var idjugador = Number(pedirGolesJugador());
            listajugadores.forEach(jugador => {
                if (localid == jugador["id"] && idjugador == jugador["idjugador"]) {
                    jugador["goles"] += 1
                };
            });
            console.clear();
        };
        console.clear();
        golesVisitor = Number(pedirGoles(visitor));
        partido["visitor"]["goles"] += golesVisitor;
        partido["local"]["golesencontra"] += golesVisitor;

        for (x = 1; x <= golesVisitor; x++) {
            console.info("");
            console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
            console.info("");
            mostrarIdjugador(visitorid, listajugadores);
            console.info("");
            var idjugador = Number(pedirGolesJugador());
            listajugadores.forEach(jugador => {
                if (visitorid == jugador["id"] && idjugador == jugador["idjugador"]) {
                    jugador["goles"] += 1
                };
            });
            console.clear();
        };
        console.clear();
        faltaslocal = Number(pedirFaltas(local));
        partido["local"]["faltas"] += faltaslocal;

        console.clear();

        faltasvisitor = Number(pedirFaltas(visitor));
        partido["visitor"]["faltas"] += faltasvisitor;

        var siguienteRonda = null;
        if (goleslocal > golesVisitor) {
            semifinal.push(partido.local)
        } else if (golesVisitor > goleslocal) {
            semifinal.push(partido.visitor)
        } else {
            console.info("Hubo empate en goles, ¿quien avanza a la siguiente fase?");
            console.info("");
            console.info("1 - " + partido.local.nombre)
            console.info("2 - " + partido.visitor.nombre)
            console.info("");
            siguienteRonda = read("Ingrese un numero: ")
        }

        if (siguienteRonda == 1) {
            semifinal.push(partido.local)
        } else if (siguienteRonda == 2) {
            semifinal.push(partido.visitor)
        }
    });


    var semis = [
        { "local": semifinal[0], "visitor": semifinal[1] },
        { "local": semifinal[2], "visitor": semifinal[3] },
    ];

    var final = [];
    semis.forEach(partido => {
        console.clear()
        local = partido["local"]["nombre"];
        visitor = partido["visitor"]["nombre"];
        localid = partido["local"]["id"];
        visitorid = partido["visitor"]["id"];

        console.info("SEMIFINALES")
        console.info("")

        console.info(local + " VS " + visitor);
        console.info("");

        goleslocal = Number(pedirGoles(local));
        partido["local"]["goles"] += goleslocal;
        partido["visitor"]["golesencontra"] += goleslocal

        for (x = 1; x <= goleslocal; x++) {
            console.info("");
            console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
            console.info("");
            mostrarIdjugador(localid, listajugadores);
            console.info("");
            var idjugador = Number(pedirGolesJugador());
            listajugadores.forEach(jugador => {
                if (localid == jugador["id"] && idjugador == jugador["idjugador"]) {
                    jugador["goles"] += 1
                };
            });
            console.clear();
        };
        console.clear();
        golesVisitor = Number(pedirGoles(visitor));
        partido["visitor"]["goles"] += golesVisitor;
        partido["local"]["golesencontra"] += golesVisitor;

        for (x = 1; x <= golesVisitor; x++) {
            console.info("");
            console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
            console.info("");
            mostrarIdjugador(visitorid, listajugadores);
            console.info("");
            var idjugador = Number(pedirGolesJugador());
            listajugadores.forEach(jugador => {
                if (visitorid == jugador["id"] && idjugador == jugador["idjugador"]) {
                    jugador["goles"] += 1
                };
            });
            console.clear();
        };
        console.clear();
        faltaslocal = Number(pedirFaltas(local));
        partido["local"]["faltas"] += faltaslocal;

        console.clear();

        faltasvisitor = Number(pedirFaltas(visitor));
        partido["visitor"]["faltas"] += faltasvisitor;

        var siguienteRonda = null;
        if (goleslocal > golesVisitor) {
            final.push(partido.local)
        } else if (golesVisitor > goleslocal) {
            final.push(partido.visitor)
        } else {
            console.info("Hubo empate en goles, ¿quien avanza a la siguiente fase?");
            console.info("");
            console.info("1 - " + partido.local.nombre);
            console.info("2 - " + partido.visitor.nombre);
            console.info("");
            siguienteRonda = read("Ingrese un numero: ");
        }

        if (siguienteRonda == 1) {
            final.push(partido.local)
        } else if (siguienteRonda == 2) {
            final.push(partido.visitor)
        }
    });

    var laFinal = [
        { "local": final[0], "visitor": final[1] }
    ];

    laFinal.forEach(partido => {
        console.clear()
        local = partido["local"]["nombre"];
        visitor = partido["visitor"]["nombre"];
        localid = partido["local"]["id"];
        visitorid = partido["visitor"]["id"];

        console.info("FINAL")
        console.info("")

        console.info(local + " VS " + visitor);
        console.info("");

        goleslocal = Number(pedirGoles(local));
        partido["local"]["goles"] += goleslocal;
        partido["visitor"]["golesencontra"] += goleslocal

        for (x = 1; x <= goleslocal; x++) {
            console.info("");
            console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
            console.info("");
            mostrarIdjugador(localid, listajugadores);
            console.info("");
            var idjugador = Number(pedirGolesJugador());
            listajugadores.forEach(jugador => {
                if (localid == jugador["id"] && idjugador == jugador["idjugador"]) {
                    jugador["goles"] += 1
                };
            });
            console.clear();
        };
        console.clear();
        golesVisitor = Number(pedirGoles(visitor));
        partido["visitor"]["goles"] += golesVisitor;
        partido["local"]["golesencontra"] += golesVisitor;

        for (x = 1; x <= golesVisitor; x++) {
            console.info("");
            console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
            console.info("");
            mostrarIdjugador(visitorid, listajugadores);
            console.info("");
            var idjugador = Number(pedirGolesJugador());
            listajugadores.forEach(jugador => {
                if (visitorid == jugador["id"] && idjugador == jugador["idjugador"]) {
                    jugador["goles"] += 1
                };
            });
            console.clear();
        };
        console.clear();
        faltaslocal = Number(pedirFaltas(local));
        partido["local"]["faltas"] += faltaslocal;

        console.clear();

        faltasvisitor = Number(pedirFaltas(visitor));
        partido["visitor"]["faltas"] += faltasvisitor;

        var siguienteRonda = null;
        if (goleslocal > golesVisitor) {
            console.info("¡" + partido.local.nombre + " CAMPEON!")
        } else if (golesVisitor > goleslocal) {
            console.info("¡" + partido.visitor.nombre + " CAMPEON!")
        } else {
            console.info("Hubo empate en goles, ¿quien avanza a la siguiente fase?");
            console.info("");
            console.info("1 - " + partido.local.nombre);
            console.info("2 - " + partido.visitor.nombre);
            console.info("");
            siguienteRonda = read("Ingrese un numero: ");
        }

        if (siguienteRonda == "1") {
            console.info("¡" + partido.local.nombre + " CAMPEON!");
        } else if (siguienteRonda == "2") {
            console.info("¡" + partido.visitor.nombre + " CAMPEON!");
        }
    });

    var r = read("Presione enter para ver estadisticas");
    console.clear();

    mostrarMasGolesaFavor(listaPaises);
    mostrarMasGolesEnContra(listaPaises);
    mostrarMejorSaldoGoles(listaPaises);
    mostrarGoleador(listajugadores);
};

mainMenu();