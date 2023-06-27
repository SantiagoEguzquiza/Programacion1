const read = require('prompt-sync')();

function pedirDias() {
    while (validar(dias) === false) {
        dias = parseInt(read("Ingrese la cantidad de dias: "));
    };
};

function pedirHoras() {
    while (validar(horas) === false) {
        horas = parseInt(read("Ingrese la cantidad de horas: "));
    };
};

function validar(num) {

    if (isNaN(parseInt(num)) === false) {

        if (num > 0) {
            return true;
        }
        return false;
    }

    return false;

};

function salarioAsistente(user, horas, dias) {
    if (user === true) {
        salarioA = (150 * horas);
        salarioA = (salarioA * dias);
    };
};

function salarioElectricista(user, horas, dias) {
    salarioE = (200 * horas);
    salarioE = (salarioE * dias);
};

function costoMateriales(costo) {
    costo = costo + ((costo * 10) / 100);
    return costo;
};

function validarCosto(costo) {
    while (validar(costo) === false) {
        costo = parseInt(read("Ingrese el costo de los materiales: "));
    };
};

function validarAsist(num) {
    while (validar(num) === false) {
        num = parseInt(read("Debe ingresar un 1 (si) o un 2 (no): "));
    };
};

var dias = parseInt(read("Ingrese cantidad de dias: "));
pedirDias(dias);

var horas = parseInt(read("Ingrese cantidad de horas: "));
pedirHoras(horas);

var salarioE = (200 * horas);
salarioE = (salarioE * dias);

var salarioA = (150 * horas);
salarioA = (salarioA * dias);
var asist = parseInt(read("¿Habrá asistente? Ingrese 1 si es correcto, ingrese 2 si es incorrecto: "));

while (asist != 1 && asist != 2) {
    asist = parseInt(read("Debe ingresar un 1 (si) o un 2 (no): "));
};

validar(asist);

if (asist == 1) {
    var salarioA = (150 * horas);
    salarioA = (salarioA * dias);
}

if (asist == 2) {
    salarioA = 0;
}

var materiales = parseInt(read("Ingrese el costo de los materiales: "));
materiales = costoMateriales(materiales);

var costoTotal = salarioE + salarioA + materiales

console.info("El costo total del trabajo es: " + costoTotal);