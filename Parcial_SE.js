var read = require('prompt-sync')();


function pedirNombres() {

    var nombres = read("Ingrese nombre de trabajador: ");
    console.clear()
    var listaTrabajadores = [nombres]

    while (nombres != "0") {
        nombres = read("Ingrese nombre de trabajador: ");

        while (listaTrabajadores.includes(nombres) === true) {
            console.log("Ingrese un nombre que no este repetido")
            nombres = read("Ingrese nombre de trabajador: ")
        }
        if (listaTrabajadores.includes(nombres) === false) {
            listaTrabajadores.push(nombres)
            console.clear()
        }

    };
    listaTrabajadores.splice(-1)
    return listaTrabajadores

}

function pedirSueldo(nombres) {
    var sueldo = [];

    nombres.forEach(nombre => {
        var nuevoSueldo;

        do {
            nuevoSueldo = read("Ingrese el sueldo para " + nombre + ": ");
        } while (validarSueldo(nuevoSueldo) === false)

        sueldo.push(Number(nuevoSueldo));
        console.clear()

    })
    return sueldo;
}

function validarSueldo(nuevoSueldo) {
    var valido = true;

    if (isNaN(Number(nuevoSueldo)) === true) {
        valido = false;
    }

    if (Number(nuevoSueldo) < 25000 || Number(nuevoSueldo) > 50000) {
        valido = false;
    }

    return valido;
}

function pedirHoras(nombres) {
    var horas = [];

    nombres.forEach(nombre => {
        var nuevohoras;

        do {
            nuevohoras = read("Ingrese las horas extras para " + nombre + ": ");
        } while (validarhoras(nuevohoras) === false)
        nuevohoras = nuevohoras * 500
        horas.push(Number(nuevohoras));
        console.clear()

    })
    return horas;
}

function validarhoras(nuevohoras) {
    var valido = true;

    if (isNaN(Number(nuevohoras)) === true) {
        valido = false;
    }

    if (Number(nuevohoras) < 0 || Number(nuevohoras) > 10) {
        valido = false;
    }

    return valido;
}

function horaFaltadas(nombres) {
    var horas = [];

    nombres.forEach(nombre => {
        var nuevohoras;

        do {
            nuevohoras = read("Ingrese las horas faltadas para " + nombre + ": ");
        } while (validarhorasfaltadas(nuevohoras) === false)

        nuevohoras = nuevohoras * 400
        horas.push(Number(nuevohoras));
        console.clear()

    })
    return horas;
}

function validarhorasfaltadas(nuevohoras) {
    var valido = true;

    if (isNaN(Number(nuevohoras)) === true) {
        valido = false;
    }

    if (Number(nuevohoras) < 0 || Number(nuevohoras) > 20) {
        valido = false;
    }

    return valido;
}

function mostrarSueldos(nombres, sueldos, horasExtras, horasFaltadas) {
    for (i = 0; i < nombres.length; i++) {
        console.info(nombres[i] + " - Sueldo a cobrar:  " + (sueldos[i] + horasExtras[i] - horasFaltadas[i]));
    }
}

function mostrarHorasExtras(horasExtras) {
    var suma = horasExtras.reduce(function (a, b) {
        return a + b;
    }, 0);
    suma = suma / 500

    console.info("se trabajaron un total de " + suma + " horas extras. ")

    suma = suma * 500

    console.info("El monto de las horas extras totales es: $" + suma)
}

function sumarSueldos(nombres, sueldos, horasExtras, horasFaltadas) {
    suma = 0
    for (i = 0; i < nombres.length; i++) {
        suma = suma + sueldos[i] + horasExtras[i] - horasFaltadas[i];
    }
    suma = suma / nombres.length
    console.log("El promedio total de sueldos pagados es: $" + suma)
}

function sueldoAlto(sueldos) {
    var aux = 0
    var suma = 0

    for (x = 0; x < sueldos.length; x++) {
        suma = sueldos[x]

        if (suma > aux) {
            aux = suma
        }

    }
    console.info("El salario base mas alto es: $" + aux)
}

function Main(){

var nombres = pedirNombres()

var sueldos = pedirSueldo(nombres)

var horasExtras = pedirHoras(nombres) //me devuelve cuanto le pagan

var horasFaltadas = horaFaltadas(nombres) // me devuelve cuanto le descuentan 

mostrarSueldos(nombres, sueldos, horasExtras, horasFaltadas)

mostrarHorasExtras(horasExtras)

sumarSueldos(nombres, sueldos, horasExtras, horasFaltadas)

sueldoAlto(sueldos)

}
console.clear()
Main();




