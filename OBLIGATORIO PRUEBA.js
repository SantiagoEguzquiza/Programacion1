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
    while (validarParticipaciones(A) === false || A === "") {
        A = read("Ingrese un numero correcto: ")
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

function selecciones(A) {
    var paises = [];

    while (A !== 0) {
        console.clear();
        var nombrePais = pedirSeleccion(nombrePais);
        var continentePais = pedirContinente(continentePais);
        var participacionesPais = pedirParticipaciones(participacionesPais);

        var nuevoPais = crearPais(paises.length + 1, nombrePais.toUpperCase(), continentePais.toUpperCase(), participacionesPais);
        paises.push(nuevoPais);
        console.clear();
        console.info("Para ingresar otra seleccion presione enter.");
        console.info("Si desea salir ingrese 0")

        A = parseInt(read(""));
    }

    return paises
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

function pedirJugadores(listaPaises) {

    console.clear();
    console.info("Ingrese el identificador numerico de la seleccion que quiera cargar jugadores");
    console.info("");
    mostrarIdnombre(listaPaises);
    console.info("");
    var x = parseInt(read("Digite el numero: "));

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
            listaJugadores.push(jugador);
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

        console.info("");
        var nacimiento = pedirSoloNumeros(read("Ingrese la fecha de nacimiento de " + jugador + ": "));
        console.info("");
        var estatura = pedirSoloNumeros(read("Ingrese la estatura en centimetros de " + jugador + ": "));
        console.info("");
        mostrarIdnombre(listaPosiciones);
        console.info("");
        var pedirposicion = parseInt(pedirSoloNumeros(read("Seleccione de la lista la posición en el campo de juego que ocupará " + jugador + ": ")));
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
        jugador = read("Ingrese el nombre del Jugador: ");

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
    console.info("Ver los grupos - ingrese un 3");
    console.info("");
    console.info("Simular mundial - ingrese 4");
    console.info("");

    var A = parseInt(read("Ingrese el numero: "));
    while (A != 1 && A != 2 && A != 3 && A != 4) {
        A = parseInt(read("Ingrese un numero valido: "));
    }
    return A
};

function mainMenu(paises, listaDeJugadores) {
    console.clear();
    var A = menu();

    while (A !== 0) {

        while (A == 1) {
            if (listaDeJugadores.length < 33) {

                paises = selecciones(A);
                break;
            };
            if (paises.length > 32) {
                console.info("LISTA DE SELECCIONES COMPLETA");
                esc = read("presione enter para regresar al menu");
                console.clear();

            };
            break;
        };

        while (A == 2) {
            listaDeJugadores = pedirJugadores(paises);
            break;
        };

        while (A == 3) {
            if (paises.length < 32) {
                console.clear();
                console.info("FALTAN CARGAR SELECCIONES");
                var r = read("Presione enter para volver");
                console.clear();
                break;
            }

            if (paises.length == 32) {
                var grupos = gruposFinales(paises);
                mostrarGrupos(grupos);
                var r = read("Presione enter para volver");
                console.clear();
            }
            break;
        };

        while (A == 4) {
            if (paises.length < 32) {
                console.clear();
                console.info("FALTAN CARGAR SELECCIONES");
                var r = read("Presione enter para volver");
                console.clear();
            }

            if (paises.length == 32) {
                main(paises, listaDeJugadores);
            }
            break;
        };

        A = menu();
    };
};

function mostrarGrupos(grupos) {
    console.clear()
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
        console.info("GRUPO " + aux + ":");
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

function fasedeGrupo(partidos, listajugadores) {

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
        partido["visitor"]["golesencontra"] += goleslocal;

        for (x = 1; x <= goleslocal; x++) {
            console.info("");
            console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
            console.info("");
            mostrarIdjugador(localid, listajugadores);
            console.info("");
            var idjugador = Number(pedirGolesJugador());
            listajugadores.forEach(jugador => {
                if (localid == jugador["id"] && idjugador == jugador["idjugador"]) {
                    jugador["goles"] += 1;
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
                    jugador["goles"] += 1;
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
            partido["local"]["puntos"] += 3;
        } else if (golesVisitor > goleslocal) {
            partido["visitor"]["puntos"] += 3;
        } else {
            partido["local"]["puntos"] += 1;
            partido["visitor"]["puntos"] += 1;
        };
        console.info("");
        var r = read("enter to continue");

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

function main(listaPaises, listajugadores) {
    var grupos = gruposFinales(listaPaises);
    var partidos = firstRoundMatches(grupos);
    fasedeGrupo(partidos, listajugadores);

    // partidos.forEach(partido => {
    //     console.clear()
    //     local = partido["local"]["nombre"];
    //     visitor = partido["visitor"]["nombre"];
    //     localid = partido["local"]["id"];
    //     visitorid = partido["visitor"]["id"];

    //     console.info(local + " VS " + visitor);
    //     console.info("");

    //     goleslocal = Number(pedirGoles(local));
    //     partido["local"]["goles"] += goleslocal;
    //     partido["visitor"]["golesencontra"] += goleslocal

    //     for (x = 1; x <= goleslocal; x++) {
    //         console.info("");
    //         console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
    //         console.info("");
    //         mostrarIdjugador(localid, listajugadores);
    //         console.info("");
    //         var idjugador = Number(pedirGolesJugador());
    //         listajugadores.forEach(jugador => {
    //             if (localid == jugador["id"] && idjugador == jugador["idjugador"]) {
    //                 jugador["goles"] += 1
    //             };
    //         });
    //         console.clear();
    //     };
    //     console.clear();
    //     golesVisitor = Number(pedirGoles(visitor));
    //     partido["visitor"]["goles"] += golesVisitor;
    //     partido["local"]["golesencontra"] += golesVisitor;

    //     for (x = 1; x <= golesVisitor; x++) {
    //         console.info("");
    //         console.info("Ingrese el identificador numerico del jugador que marco el gol " + x);
    //         console.info("");
    //         mostrarIdjugador(visitorid, listajugadores);
    //         console.info("");
    //         var idjugador = Number(pedirGolesJugador());
    //         listajugadores.forEach(jugador => {
    //             if (visitorid == jugador["id"] && idjugador == jugador["idjugador"]) {
    //                 jugador["goles"] += 1
    //             };
    //         });
    //         console.clear();
    //     };
    //     console.clear();
    //     faltaslocal = Number(pedirFaltas(local));
    //     partido["local"]["faltas"] += faltaslocal;

    //     console.clear();

    //     faltasvisitor = Number(pedirFaltas(visitor));
    //     partido["visitor"]["faltas"] += faltasvisitor;

    //     if (goleslocal > golesVisitor) {
    //         partido["local"]["puntos"] += 3
    //     } else if (golesVisitor > goleslocal) {
    //         partido["visitor"]["puntos"] += 3
    //     } else {
    //         partido["local"]["puntos"] += 1
    //         partido["visitor"]["puntos"] += 1
    //     };
    //     console.info("")
    //     var r = read("enter to continue");
    // });

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
    console.info("");
    mostrarMasGolesEnContra(listaPaises);
    console.info("");
    mostrarMejorSaldoGoles(listaPaises);
    console.info("");
    mostrarGoleador(listajugadores);
};

var paises2 = [
    { "id": 1, "nombre": "QATAR", "continente": "ASIA", "participaciones": 1, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 2, "nombre": "ALEMANIA", "continente": "EUROPA", "participaciones": 2, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 3, "nombre": "DINAMARCA", "continente": "EUROPA", "participaciones": 3, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 4, "nombre": "BRASIL", "continente": "AMERICA DEL SUR", "participaciones": 4, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 5, "nombre": "FRANCIA", "continente": "EUROPA", "participaciones": 5, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 6, "nombre": "BELGICA", "continente": "EUROPA", "participaciones": 6, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 7, "nombre": "CROACIA", "continente": "EUROPA", "participaciones": 7, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 8, "nombre": "ESPAÑA", "continente": "EUROPA", "participaciones": 8, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 9, "nombre": "SERBIA", "continente": "EUROPA", "participaciones": 9, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 10, "nombre": "INGLATERRA", "continente": "EUROPA", "participaciones": 10, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 11, "nombre": "SUIZA", "continente": "EUROPA", "participaciones": 11, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 12, "nombre": "PAISES BAJOS", "continente": "EUROPA", "participaciones": 12, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 13, "nombre": "ARGENTINA", "continente": "AMERICA DEL SUR", "participaciones": 13, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 14, "nombre": "IRAN", "continente": "ASIA", "participaciones": 14, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 15, "nombre": "COREA DEL SUR", "continente": "ASIA", "participaciones": 15, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 16, "nombre": "JAPON", "continente": "ASIA", "participaciones": 16, "goles": 3, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 17, "nombre": "ARABIA SAUDITA", "continente": "ASIA", "participaciones": 17, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 18, "nombre": "ECUADOR", "continente": "AMERICA DEL SUR", "participaciones": 18, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 19, "nombre": "URUGUAY", "continente": "AMERICA DEL SUR", "participaciones": 19, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 20, "nombre": "CANADA", "continente": "AMERICA DEL NORTE", "participaciones": 20, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 21, "nombre": "GHANA", "continente": "AFRICA", "participaciones": 21, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 22, "nombre": "SENEGAL", "continente": "AFRICA", "participaciones": 22, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 23, "nombre": "MARRUECOS", "continente": "AFRICA", "participaciones": 23, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 24, "nombre": "TUNEZ", "continente": "ASIA", "participaciones": 24, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 25, "nombre": "PORTUGAL", "continente": "EUROPA", "participaciones": 25, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 26, "nombre": "POLONIA", "continente": "EUROPA", "participaciones": 26, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 27, "nombre": "CAMERUN", "continente": "AFRICA", "participaciones": 27, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 28, "nombre": "MEXICO", "continente": "CENTRO AMERICA", "participaciones": 28, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 29, "nombre": "ESTADOS UNIDOS", "continente": "AMERICA DEL NORTE", "participaciones": 29, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 30, "nombre": "GALES", "continente": "EUROPA", "participaciones": 30, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 31, "nombre": "AUSTRALIA", "continente": "OCEANIA", "participaciones": 31, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null },
    { "id": 32, "nombre": "COSTA RICA", "continente": "CENTRO AMERICA", "participaciones": 32, "goles": 0, "golesencontra": 0, "faltas": 0, "puntos": 0, "difgoles": 0, "identificador": null }]


var listajugadores = [
    { "id": 1, "idjugador": 1, "nombre": "JUAN", "seleccion": "QATAR", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 1, "idjugador": 2, "nombre": "jhon", "seleccion": "QATAR", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 2, "idjugador": 1, "nombre": "milton", "seleccion": "ALEMANIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 2, "idjugador": 2, "nombre": "jhon", "seleccion": "ALEMANIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 3, "idjugador": 1, "nombre": "milton", "seleccion": "DINAMARCA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 3, "idjugador": 2, "nombre": "jhon", "seleccion": "DINAMARCA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 4, "idjugador": 1, "nombre": "milton", "seleccion": "BRASIL", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 4, "idjugador": 2, "nombre": "jhon", "seleccion": "BRASIL", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 5, "idjugador": 1, "nombre": "milton", "seleccion": "FRANCIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 5, "idjugador": 2, "nombre": "jhon", "seleccion": "FRANCIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 6, "idjugador": 1, "nombre": "milton", "seleccion": "BELGICA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 6, "idjugador": 2, "nombre": "jhon", "seleccion": "BELGICA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 7, "idjugador": 1, "nombre": "milton", "seleccion": "CROACIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 7, "idjugador": 2, "nombre": "jhon", "seleccion": "CROACIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 8, "idjugador": 1, "nombre": "milton", "seleccion": "ESPAÑA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 8, "idjugador": 2, "nombre": "jhon", "seleccion": "ESPAÑA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 9, "idjugador": 1, "nombre": "milton", "seleccion": "SERBIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 9, "idjugador": 2, "nombre": "jhon", "seleccion": "SERBIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 10, "idjugador": 1, "nombre": "milton", "seleccion": "INGLATERRA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 10, "idjugador": 2, "nombre": "jhon", "seleccion": "INGLATERRA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 11, "idjugador": 1, "nombre": "milton", "seleccion": "SUIZA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 11, "idjugador": 2, "nombre": "jhon", "seleccion": "SUIZA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 12, "idjugador": 1, "nombre": "milton", "seleccion": "PAISES BAJOS", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 12, "idjugador": 2, "nombre": "jhon", "seleccion": "PAISES BAJOS", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 13, "idjugador": 1, "nombre": "milton", "seleccion": "ARGENTINA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 13, "idjugador": 2, "nombre": "jhon", "seleccion": "ARGENTINA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 14, "idjugador": 1, "nombre": "milton", "seleccion": "IRAN", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 14, "idjugador": 2, "nombre": "jhon", "seleccion": "IRAN", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 15, "idjugador": 1, "nombre": "milton", "seleccion": "COREA DEL SUR", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 15, "idjugador": 2, "nombre": "jhon", "seleccion": "COREA DEL SUR", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 16, "idjugador": 1, "nombre": "milton", "seleccion": "JAPON", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 16, "idjugador": 2, "nombre": "jhon", "seleccion": "JAPON", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 17, "idjugador": 1, "nombre": "milton", "seleccion": "ARABIA SAUDITA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 17, "idjugador": 2, "nombre": "jhon", "seleccion": "ARABIA SAUDITA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 18, "idjugador": 1, "nombre": "milton", "seleccion": "ECUADOR", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 18, "idjugador": 2, "nombre": "jhon", "seleccion": "ECUADOR", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 19, "idjugador": 1, "nombre": "milton", "seleccion": "URUGUAY", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 19, "idjugador": 2, "nombre": "jhon", "seleccion": "URUGUAY", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 20, "idjugador": 1, "nombre": "milton", "seleccion": "CANADA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 20, "idjugador": 2, "nombre": "jhon", "seleccion": "CANADA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 21, "idjugador": 1, "nombre": "milton", "seleccion": "GHANA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 21, "idjugador": 2, "nombre": "jhon", "seleccion": "GHANA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 22, "idjugador": 1, "nombre": "milton", "seleccion": "SENEGAL", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 22, "idjugador": 2, "nombre": "jhon", "seleccion": "SENEGAL", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 23, "idjugador": 1, "nombre": "milton", "seleccion": "MARRUECOS", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 23, "idjugador": 2, "nombre": "jhon", "seleccion": "MARRUECOS", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 24, "idjugador": 1, "nombre": "milton", "seleccion": "TUNEZ", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 24, "idjugador": 2, "nombre": "jhon", "seleccion": "TUNEZ", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 25, "idjugador": 1, "nombre": "bichardo", "seleccion": "PORTUGAL", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 25, "idjugador": 2, "nombre": "bicho", "seleccion": "PORTUGAL", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 26, "idjugador": 1, "nombre": "milton", "seleccion": "POLONIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 26, "idjugador": 2, "nombre": "jhon", "seleccion": "POLONIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 27, "idjugador": 1, "nombre": "milton", "seleccion": "CAMERUN", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 27, "idjugador": 2, "nombre": "jhon", "seleccion": "CAMERUN", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 28, "idjugador": 1, "nombre": "milton", "seleccion": "MEXICO", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 28, "idjugador": 2, "nombre": "jhon", "seleccion": "MEXICO", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 29, "idjugador": 1, "nombre": "milton", "seleccion": "ESTADOS UNIDOS", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 29, "idjugador": 2, "nombre": "jhon", "seleccion": "ESTADOS UNIDOS", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 30, "idjugador": 1, "nombre": "milton", "seleccion": "GALES", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 30, "idjugador": 2, "nombre": "jhon", "seleccion": "GALES", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 31, "idjugador": 1, "nombre": "milton", "seleccion": "AUSTRALIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 31, "idjugador": 2, "nombre": "jhon", "seleccion": "AUSTRALIA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 32, "idjugador": 1, "nombre": "milton", "seleccion": "COSTA RICA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 },
    { "id": 32, "idjugador": 2, "nombre": "ELBICHITO", "seleccion": "COSTA RICA", "nacimiento": 22 / 10 / 2001, "estatura": 170, "posicion": "DC", "goles": 0, "faltas": 0 }
]

mainMenu(paises2, listajugadores)
