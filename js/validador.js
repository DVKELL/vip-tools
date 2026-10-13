const input = document.querySelector("#tpf");
const formulario = document.querySelector("#form");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = input.value;
    let inputLimpio = inputValue.trim();

    console.log(inputLimpio, inputLimpio.length);
    try {
        if (inputLimpio.length === 18) {
            let arrayInput = inputLimpio.split("-");

            // console.log(arrayInput);

            let position0 = arrayInput[0];
            let position1 = arrayInput[1].indexOf(":");
            let position2 = arrayInput[2].indexOf(":");

            // console.log(`
            // position 0: "${position0}"
            // position 1: "${position1}"
            // position 2: "${position2}"
            // `);

            if (
                position0 === "VIPCLP" ||
                position0 === "VIPVES" ||
                position0 === "VIPUSD" ||
                position0 === "VIPPEN" ||
                position0 === "VIPCRC"
            ) {
                // alert("Primer campo correcto");
                if (position1 === 2 && position2 === 2) {
                    if (
                        validarHora24(arrayInput[1]) &&
                        validarHora24(arrayInput[2])
                    ) {
                        alert("Felicidades! tipificacion perfecta");
                    } else {
                        alert("Hora erronea");
                    }
                } else {
                    alert("Error con los guiones o el formato de horas");
                }
            } else {
                alert("Error al comienzo de la tipificacion");
            }
        } else {
            alert("No hay 18 caracteres");
        }
    } catch (error) {
        alert("Algo ha salido mal, valida la tipificacion");
        console.log(error);
    }
});

function validarHora24(hora) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(hora);
}


/*Correcciones de codigo de la IA
1. Extrae y nombra bloques de lógica como funciones reutilizables
function esPrefijoValido(prefijo) {
  const prefijosValidos = ["VIPCLP", "VIPVES", "VIPUSD", "VIPPEN", "VIPCRC"];
  return prefijosValidos.includes(prefijo);
}

2. Crea una función principal de validación con early returns
function validarTipificacion(valor) {
  const limpio = valor.trim();

  if (limpio.length !== 18) {
    alert("No hay 18 caracteres");
    return;
  }

  const partes = limpio.split("-");
  if (partes.length !== 3) {
    alert("Formato inválido: faltan guiones");
    return;
  }

  const [prefijo, hora1, hora2] = partes;

  if (!esPrefijoValido(prefijo)) {
    alert("Error al comienzo de la tipificación");
    return;
  }

  if (hora1.indexOf(":") !== 2 || hora2.indexOf(":") !== 2) {
    alert("Error con el formato de horas");
    return;
  }

  if (!validarHora24(hora1) || !validarHora24(hora2)) {
    alert("Hora errónea");
    return;
  }

  alert("¡Felicidades! Tipificación perfecta");
}

3. Reduce el código del listener a una línea clara
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  validarTipificacion(input.value);
});

4. Mantén las funciones como herramientas reutilizables
*/