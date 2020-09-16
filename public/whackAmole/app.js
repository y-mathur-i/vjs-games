const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')
const playBtn = document.getElementById('playBtn')
let result = 0
let currTime = timeLeft.textContent
let resetButn = document.getElementById('resetBtn')
resetButn.disabled = true;

function randomSquare() {
    square.forEach(className => {
        className.classList.remove('mole')
    })
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')
    // assign the random id position to hit position to be used later
    hitPosition = randomPosition.id
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id === hitPosition) {
            result = result + 1
            score.textContent = result

        }
    })
})


function moveMole() {
    let timerid = null
    timerid = setInterval(randomSquare, 1000)
}


function countDown() {
    currTime--
    timeLeft.textContent = currTime
    if (currTime === 0) {
        clearInterval(timerid)
        playBtn.textContent = "GAME OVER"
        playBtn.disabled = true;
        resetButn.disabled = false
        alert("THE GAME IS OVER!! SCORE : " + score.textContent)
    }
}

function callfns(e) {
    e.preventDefault()
    // playBtn.disabled = True;
    currTime = timeLeft.textContent
    moveMole()
    timerid = setInterval(countDown, 1000)

}
function reload(e) {
    e.preventDefault()
    window.location.reload()
}
playBtn.addEventListener('click', callfns)

resetButn.addEventListener('click', reload)