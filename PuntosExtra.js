// 1 - Al mostrar el pais para que se seleccione en el registro de usuario mostrar tambien el continente
// 2 - Hacer un listado de cuantos usuarios hay por pais
// 3 - Hacer un listado donde se muestre el username y contraseña de cada usuario agrupado por continente

var read = require('prompt-sync')();

function crearPais(id, nombre, continente) {
    var nuevoPais = {};
    nuevoPais["id"] = id;
    nuevoPais["nombre"] = nombre;
    nuevoPais["continente"] = continente;
    nuevoPais["usuarios"] = 0;

    return nuevoPais;
};

function crearUsuario(username, pass, pais) {
    var nuevoUsuario = {};
    nuevoUsuario["username"] = username;
    nuevoUsuario["pass"] = pass;
    nuevoUsuario["pais"] = pais;

    return nuevoUsuario;
};

function mostrarPaises(listaPaises) {
    listaPaises.forEach(pais => {
        console.info(pais["id"] + ": " + pais["nombre"] + " - " + pais["continente"]);
    });
};

function mostrarUsuarioPais(listaUsuarios, listaPaises) {
    listaUsuarios.forEach(user => {
        var paisDelUsuario = obtenerPaisById(user["pais"], listaPaises);

        console.info(user["username"] + " - " + paisDelUsuario["nombre"]);
    });
};

function obtenerPaisById(idPais, listaPaises) {
    var paisEncontrado = null;

    listaPaises.forEach(pais => {
        if (pais["id"] === idPais) {
            paisEncontrado = pais;
            pais["usuarios"] += 1
        }
    });

    return paisEncontrado;
};

function menu() {
    console.info("¿A que continente pertenece?")
    console.info("")
    console.info("1: America")
    console.info("2: Europa")
    console.info("3: Africa")
    console.info("4: Asia")
    console.info("5: Oceania")
    console.info("")
    var continenteElegido = read("Ingrese un continente: ")

    return continenteElegido;
};

function main() {
    console.clear()
    var paises = [];

    for (i = 1; i <= 5; i++) {
        var nombrePais = read("Ingrese el nombre del pais: ");
        var continentePais = menu()

        if (continentePais == 1) {
            continentePais = "America"
        } else if (continentePais == 2) {
            continentePais = "Europa"
        } else if (continentePais == 3) {
            continentePais = "Africa"
        } else if (continentePais == 4) {
            continentePais = "Asia"
        } else if (continentePais == 5) {
            continentePais = "Oceania"
        }

        var nuevoPais = crearPais(i, nombrePais, continentePais);
        paises.push(nuevoPais);
        console.clear();
    }

    var usuarios = [];
    for (i = 1; i <= 5; i++) {
        var username = read("Ingrese un nombre de usuario: ");
        var pass = read("Ingrese una contraseña: ");

        console.info("Seleccione un pais: ");
        mostrarPaises(paises);
        var pais = parseInt(read(""));

        var nuevoUsuario = crearUsuario(username, pass, pais);
        usuarios.push(nuevoUsuario);
        console.clear();
    }

    mostrarUsuarioPais(usuarios, paises);

    console.info("")
    paises.forEach(pais => {
        console.info(pais["nombre"] + " tiene " + pais["usuarios"] + " usuario/s")
    });

    console.info("")


};

main();