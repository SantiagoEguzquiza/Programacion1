const read = require('prompt-sync')()

const min = 1; //numero minimo
const max = 100; //numero maximo

function conversionPositivo(A, B) {// Esta funcion convierte a positivo la distancia, para dar las pistas
    var dist = 0
    if (A > B) {
        dist = A - B;
        return dist
    }
    else {
        dist = B - A;
        return dist
    }
}

function valChequeo(A) { // funcion para validar que el numero a adivinar se encuentre dentro de los parametros
    while (chequeoNum1(A) === false) {
        A = parseInt(read("Ingrese un numero: "));
        console.clear();
    }
    return A
}

function chequeoNum1(A) {// funcion para validar que el numero a adivinar se encuentre dentro de los parametros
    if (isNaN(A)) {
        console.log("Debe ingresar un numero entre " + min + " y " + max);
        return false
    }
    if (A < min || A > max) {
        console.log("Debe ingresar un numero entre " + min + " y " + max);
        return false
    }

    return true
}

function Game(A, B) {//Pistas del juego y contador de puntos
    var dist; //distancia del j1 adivinando el numero de j2
    var intent = 0
    while (A != B) {

        dist = conversionPositivo(A, B);

        while (dist > 15) {
            console.clear()
            console.log("Estas lejos");
            intent++;
            break
        } while (dist >= 10 && dist <= 15) {
            console.clear()
            console.log("Te estas acercando");
            intent++;
            break

        } while (dist >= 5 && dist <= 9) {
            console.clear()
            console.log("Cada vez mas cerca");
            intent++;
            break

        } while (dist >= 1 && dist <= 4) {
            console.clear()
            console.log("tortafrita");
            intent++;
            break

        }
        A = parseInt(read("Intentelo nuevamente: "));

    }
    console.log("Acertaste! ")
    intent++
    return intent
}

function main() {
    console.clear();
    console.info("Bienvenidos a 'GameNum'");
    console.info();
    console.info("Este juego trata sobre adivinar el número secreto que ingrese tu contricante,");
    console.info("Consta de 3 rondas y ganará aquel jugador que consiga menos puntos.");
    console.info();
    console.info();
    var clear = read("Presiona enter para comenzar");
    console.clear();
    var player1 = read("Jugador 1 bienvenido a 'GameNum', ingrese su nombre: ");
    console.clear()
    var player2 = read("Jugador 2 bienvenido a 'GameNum', ingrese su nombre: ");
    console.clear()
    var num1; //es el numero que ingersa j1 para que j2 adivine
    var num2; // es el numero que ingresa j2 para que j1 adivine
    var adiv1; // numero que ingresa j1 para adivinar el numero j2
    var adiv2; // numero que ingresa j2 para adivinar el numero j1
    var intent1 = 0; // contador intentos j1
    var intent2 = 0; // contador intentos j2

    for (ronda = 1; ronda < 4; ronda++) {
        console.clear()
        console.info("RONDA " + ronda);
        console.info();
        num1 = parseInt(read(player1 + ", ingrese un numero entre " + min + " y " + max + ": "));
        console.clear();

        num1 = valChequeo(num1);
        console.info("RONDA " + ronda);
        console.info();
        adiv2 = parseInt(read(player2 + ", adivine el numero "));

        intent2 = intent2 + Game(adiv2, num1);

        num2 = parseInt(read(player2 + ", ingrese un numero entre " + min + " y " + max + ": "));
        console.clear()

        num2 = valChequeo(num2);

        adiv1 = parseInt(read(player1 + ", adivine el numero "));

        intent1 = intent1 + Game(adiv1, num2);
        console.info()
        clear = read("Presiona enter para continuar")
    }
    console.clear();
    if (intent2 > intent1) {
        console.log(player1 + " ha ganado la guerra con " + intent1 + " puntos!, " + player2 + " hizo " + intent2 + " puntos, suerte la proxima! ")

    }
    else if (intent1 > intent2) {
        console.log(player2 + " ha ganado la guerra con " + intent2 + " puntos!, " + player1 + " hizo " + intent1 + " puntos, suerte la proxima! ")

    }
    else {
        console.log("Esto es un empate! ambos hicieron " + intent1 + " puntos! ")
    }
}

main();