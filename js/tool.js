/**
 * @file tool.js
 * @description Módulo de la calculadora auxiliar (herramienta matemática) de UCalculadora.
 * Provee la interfaz y lógica para una calculadora básica interactiva en pantalla que permite 
 * realizar operaciones matemáticas rápidas y calcular proyecciones manuales multiplicadas por 
 * el token "UC", aplicando limpieza y evaluación de las expresiones matemáticas introducidas por el usuario.
 */

/** Parametros de mantenimiento y estado global de este modulo propio de UCalculadora. */
/** Valor UC visible usado por la calculadora auxiliar cuando el usuario escribe el token UC. */
let UC;


/**
 * Añade un carácter a la secuencia matemática temporal en la calculadora auxiliar.
 * Se emplea para construir progresivamente la expresión que el usuario desea calcular antes de evaluarla.
 * 
 * @param {string|number} simb - Carácter ingresado desde el teclado en pantalla (número, operador matemático o la constante "UC").
 * @returns {void} Actualiza el estado del visor de la calculadora (el DOM) para concatenar el nuevo símbolo.
 */
function add(simb) {
    //si esta un 0 >> primer digito
    if (document.getElementsByClassName("cal")[0].textContent == '0')
        clean(false);

    document.getElementsByClassName("cal")[0].innerHTML += simb;
}


/**
 * Elimina el último carácter o token ingresado en el visor de la calculadora auxiliar.
 * Si el usuario borra la variable de negocio "UC", elimina ambos caracteres ("U" y "C") en una sola acción para evitar errores de sintaxis en la expresión.
 * 
 * @returns {void} Actualiza la cadena en el visor borrando el último elemento introducido. Retorna el visor a '0' si queda vacío.
 */
function clean() {
    let str = document.getElementsByClassName("cal")[0].textContent;
    let nstr;

    //Al eliminar UC
    if (str[str.length - 1] == 'C') {
        nstr = str.substring(0, str.length - 1);
        nstr = nstr.substring(0, nstr.length - 1);
    } else {
        nstr = str.substring(0, str.length - 1);
    }

    //si queda vacio >> poner 0
    if (!(str == 0) && nstr == '') {
        nstr = '0';
    }

    document.getElementsByClassName("cal")[0].textContent = nstr;
}


/**
 * Limpia por completo la expresión matemática temporal y su resultado calculado.
 * Útil para reiniciar operaciones aritméticas manuales sin afectar el cálculo general de la matrícula del estudiante.
 * 
 * @returns {void} Devuelve ambos visores de la herramienta auxiliar (operación y resultado) a su estado neutral ('0').
 */
function cleanAll() {
    document.getElementsByClassName("cal")[0].innerHTML = '0';
    document.getElementById('result').innerHTML = '0';
}


/**
 * Acondiciona la cadena matemática ingresada por el usuario para poder ser evaluada nativamente por Javascript.
 * Convierte expresiones abreviadas válidas en el negocio (ej. "5UC") en multiplicaciones explícitas ("5*UC") para que el motor evalúe correctamente la constante.
 * 
 * @param {string} allOpe - La expresión matemática cruda introducida por el usuario a través de los botones de la UI (ej. "2+4UC").
 * @returns {string} La misma expresión matemática preformateada con los operadores de multiplicación inyectados donde sea necesario (ej. "2+4*UC").
 */
function preformatUC(allOpe) {
    let start = 0;
    let i = allOpe.indexOf("UC");

    //Encontramos / Verificamos a Der e Izq
    while (i != -1) {
        i = allOpe.indexOf("UC", start);


        //DER
        let der = allOpe.substring(i - 1, i);
        if (der.match(/([0-9])/g)) {
            //Hay numero
            allOpe = allOpe.substring(0, i) + "*" + allOpe.substring(i, allOpe.length);
        }
        //IZQ
        let izq = allOpe.substring(i + 2, i + 3);
        if (izq.match(/([0-9])/g)) {
            //Hay numero
            allOpe = allOpe.substring(0, i + 2) + "*" + allOpe.substring(i + 2, allOpe.length + 1);
        }
        start = i + 2;
    }
    // Para propósitos de mantenimiento: Descomentar la siguiente línea para depurar el iterador de la calculadora
    //console.log(i, allOpe, der.match(/([0-9])/g), izq.match(/([0-9])/g));
    return allOpe;
}


/**
 * Ejecuta el cálculo final de la expresión ingresada en la calculadora auxiliar.
 * Toma la cadena matemática construida, la formatea, y evalúa el resultado inyectando el valor vigente de la constante UC.
 * 
 * @returns {void} Imprime el resultado total de la operación (formateado con divisas y decimales) en el panel de resultados de la herramienta.
 */
function calcular() {
    // Para propósitos de mantenimiento: Descomentar para visualizar el texto extraído del DOM de la calculadora
    //console.log(document.getElementsByClassName("cal")[0].textContent);
    let operations = preformatUC(document.getElementsByClassName("cal")[0].textContent);
    document.getElementById('result').innerHTML = formatNumber.new(eval(operations));
}
