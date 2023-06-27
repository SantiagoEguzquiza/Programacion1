var read = require('prompt-sync')();
var fecharActual;

var nombre, apellido, documento, fechaPres, nroSocio, monto, cuotas, recargo, montoTotal, montoCuota;

//PEDIR DATOS
function pedirDatos() {
    nombre = read("Ingrese nombre: ");
    apellido = read("Ingrese apellido: ");
    documento = read("Ingrese documento: ");
    fechaPres = read("Ingrese fecha ult. prestamo: ");
    nroSocio = read("Ingrese nro. de socio: ");
}
//PEDIR DATOS

//PEDIR MONTO
function pedirMonto() {
    monto = 0;
    while (validarMonto(monto) === false) {
        monto = parseInt(read("Ingrese monto: "));
    }
}

function validarMonto(monto) {
    if (monto < 15000 || monto > 50000) {
        return false;
    }
    return true;
}
//PEDIR MONTO

//PEDIR CUOTAS
function pedirCuota() {
    cuotas = 0;
    while (validarCuotas(cuotas) === false) {
        cuotas = read("Ingrese cuota: ");
    }
}

function validarCuotas(cuotas) {
    if (cuotas != 3 && cuotas != 6 && cuotas != 12) {
        return false;
    }
    return true;
}
//PEDIR CUOTAS

//OBTENER RECARGO
function obtenerRecargo(cuotas) {
    var recargoFunc;

    switch (parseInt(cuotas)) {
        case 3:
            recargoFunc = 25;
            break;

        case 6:
            recargoFunc = 30;
            break;

        case 12:
            recargoFunc = 40;
            break;
    }

    return recargoFunc;
}
//OBTENER RECARGO

//OBTENER DESCUENTO
function obtenerRecargoConDescuento(recargo){
    if (nroSocio != 0) {
        recargo -= 5;
    }
    
    // if (fechaActual - fechaPres <= 60) {
    //     recargo -= 5;
    // }

    return recargo;
}
//OBTENER DESCUENTO

//OBTENER MONTO TOTAL
function obtenerMontoTotal(){
    console.info(recargo);
    console.info(monto);
    var montoRecargo = (recargo * monto) / 100;
    montoTotal = monto + montoRecargo;
    montoCuota = montoTotal / cuotas;
}
//OBTENER MONTO TOTAL

function main(){
    console.info("EMPIEZA EL PROGRAMA");

    pedirDatos();
    pedirMonto();
    pedirCuota();
    recargo = obtenerRecargo(cuotas);
    recargo = obtenerRecargoConDescuento(recargo);
    obtenerMontoTotal();
    
    console.info("El monto total es: " + montoTotal);
    console.info("El monto por cuota es: " + montoCuota);
};

main();
