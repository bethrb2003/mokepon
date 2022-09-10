const sectionReiniciar = document.getElementById("Reinciar")
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonFuego = document.getElementById("boton-fuego")
const botonAgua = document.getElementById("boton-agua")
const botonTierra = document.getElementById("boton-tierra")
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")

const sectionMensajeFinal = document.getElementById("resultado-final")

const contenedorTarjetas = document.getElementById("contenedorTarjetas")

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let resultado
let opcionDeMokepones
let inputRaccoon
let inputCapybara
let inputElGato
let vidasJugador = 3
let vidasEnemigo = 3

class mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let raccoon = new mokepon('Raccoon', './assets/Picsart_22-09-06_17-24-57-344.png', 3 )

let capybara = new mokepon('Capybara', './assets/Picsart_22-08-25_12-14-08-301.png', 3 )

let elgato = new mokepon('Elgato', './assets/Picsart_22-08-25_12-19-04-602.png', 3 )


capybara.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
)
raccoon.ataques.push(
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'}
)
elgato.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'}
)
mokepones.push(capybara,raccoon,elgato)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <div class="nombre-mascota">
                <p>${mokepon.nombre}</p>  
            </div>
            <div class="cajaFoto">
                <img src=${mokepon.foto} class="fotos" alt=${mokepon.nombre}>
            </div>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputRaccoon = document.getElementById("Raccoon")
    inputCapybara = document.getElementById("Capybara")
    inputElGato = document.getElementById("Elgato")

    })
    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
    
    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarMascotaJugador() {  
    sectionSeleccionarAtaque.style.display = "flex"
    sectionSeleccionarMascota.style.display = "none"

    if (inputRaccoon.checked) {
        spanMascotaJugador.innerHTML = inputRaccoon.id
    } else if (inputCapybara.checked) {
        spanMascotaJugador.innerHTML = inputCapybara.id
    } else if (inputElGato.checked) {
        spanMascotaJugador.innerHTML = inputElGato.id
    } else {
        alert("Selecciona una mascota")
        reiniciarJuego()
    }
    
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0,mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre

}

function ataqueFuego() {
    ataqueJugador = "FUEGO"
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = "AGUA"
    ataqueAleatorioEnemigo()
}

function ataqueTierra() {
    ataqueJugador = "TIERRA"
    ataqueAleatorioEnemigo()

}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "FUEGO"
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "AGUA"
    } else {
        ataqueEnemigo = "TIERRA"
    }
    
    combate()
    crearMensaje()
}

function combate() {
    if(ataqueJugador == ataqueEnemigo) {
        resultado = "EMPATE"
    } else if(
        (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") || 
        (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") ||
        (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA")) { 
            resultado = "GANASTE"
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        resultado = "PERDISTE"
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste 🥳🎉")
    } else if (vidasJugador == 0) {
        crearMensajeFinal("Lo siento, perdiste 😢")
    }
}

function crearMensaje() {
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadofinal) { 
    sectionMensajes.style.display= "none"

    sectionMensajeFinal.innerHTML = resultadofinal

    botonFuego.disabled = true 
    botonAgua.disabled = true
    botonTierra.disabled = true
    
    sectionReiniciar.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", iniciarJuego)