// generar el array

function randomColor() {
    let r = Math.floor(Math.random() * (255))
    let g = Math.floor(Math.random() * (255))
    let b = Math.floor(Math.random() * (255))
    return ("rgb(" + r + ", " + g + ", " + b + ")")
}

function generateRandomColors(num) {
    let i = 0
    let a = []
    while (i <= (num - 1)) {
        a.unshift(randomColor())
        i++
    }
    return a
}

// generar color ganador

let spanColor = document.querySelector("#colorDisplay")

function pickColor(array, top) {
    let e = Math.floor(Math.random() * (top - 1))
    spanColor.textContent = array[e]
    return array[e]
}

// xa cambiarle el color a todas al ganar

function changeColors(color) {
    squares.forEach(square => {
        square.style.backgroundColor = color
    });
}

// selectores 

let squares = document.querySelectorAll(".square")
let message = document.querySelector("#message")
let h1 = document.querySelector("h1")
let botonReset = document.querySelector("#reset")
let botonEasy = document.querySelector("#easy")
let botonHard = document.querySelector("#hard")
let botonDificultad = document.getElementsByClassName("button")
let colors
let pickedColor
let numberOfSquares = 6
let clickedColor

// funcion del juego

function playGame(dif) {
    colors = generateRandomColors(dif)
    pickedColor = pickColor(colors, dif)
    for (let i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = colors[i]
        squares[i].addEventListener("click", function () {
            clickedColor = squares[i].style.backgroundColor
            if (clickedColor == pickedColor) {
                message.textContent = "¡Correct!"
                h1.style.backgroundColor = pickedColor
                changeColors(pickedColor)
                botonReset.textContent = "Play again?"
                // Tengo que encontrar una manera de que no cambie más el color al clickear
            }
            else {
                squares[i].style.backgroundColor = "#232323"
                // ver si agrego que cambie el color del border
                message.textContent = "Try again"
            }
        })
    }
}

// reset de textos del juego

function resetGame() {
    h1.style.backgroundColor = "#606060"
    botonReset.textContent = "New colors"
    message.textContent = "Pick a color"
}

// boton Play Again

function buttonChange (NOS) {
    playGame(NOS)
    for (let i = 0; i < 6; i++) {
        if (colors[i] == undefined) {
            squares[i].style.display = "none"
        }
        else if (colors[i] != undefined) {
            squares[i].style.display = "initial"
        }
    }
    numberOfSquares = NOS
}

// boton dificultad

function buttonDificultad() {
    for (let i = 0; i < botonDificultad.length; i++) {
        botonDificultad[i].addEventListener("click", function () {
            if (botonDificultad[i] == botonDificultad[0]) {
                botonDificultad[0].classList.add("selected")
                botonDificultad[1].classList.remove("selected")
                buttonChange(3)
            }
            else if (botonDificultad[i] == botonDificultad[1]){
                botonDificultad[1].classList.add("selected")
                botonDificultad[0].classList.remove("selected")
                buttonChange(6)
            }
            resetGame()

        })
    }
}

// juego abajo

playGame(6)
botonReset.addEventListener("click", function () {
    resetGame()
    playGame(numberOfSquares)
})
buttonDificultad()