const HomeForm = document.querySelector("#homeForm")
const Options = document.querySelector("#opciones")


HomeForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    redireccionar(Options.value)
})

function redireccionar (valor) {
    location.href = valor
}