const Salida = document.querySelector("#output")
const Form = document.querySelector("#form")
const InicioInput = document.querySelector("#hrInicio")
const FinInput = document.querySelector("#hrFin")
const MonedaInput = document.querySelector("#moneda")
const Return = document.querySelector("#return")
const BtnCopy = document.querySelector("#showOuput")

Form.addEventListener("submit", (e)=>{
    e.preventDefault()    
    
    let hrInicio = InicioInput.value
    let hrFin = FinInput.value
    let moneda = MonedaInput.value

    let minutosInicio = hrInicio.split(":").map(Number).pop()
    let minutosFin = hrFin.split(":").map(Number).pop()

    let horasInicio = hrInicio.split(":").map(Number).shift()
    let horasFin = hrFin.split(":").map(Number).shift()

    if (hrInicio === "" || hrFin === "" || moneda === "" ) {
        mensaje("Todos los campos deben estar llenos");
        console.log(`Hora inicio ${hrInicio} / Hora final ${hrFin}`);
        return;
    }

    if(horasInicio > horasFin || 
        minutosInicio > minutosFin && horasInicio === horasFin){
        mensaje("La hora de inicio no puede ser mayor a la de finalización");
        // console.log("error");
        Form.reset()
        
    } else{
        let formato = `${moneda}-${hrInicio}-${hrFin}`
    
        Salida.textContent = formato
        Salida.style.display = "initial"

        // alert("Verifica el canal")
    }
})

BtnCopy.addEventListener("click", ()=>{
    navigator.clipboard.writeText(Salida.textContent)    
})


function mensaje(contenido){
    Salida.textContent = contenido
    Salida.style.display = "initial"

}
