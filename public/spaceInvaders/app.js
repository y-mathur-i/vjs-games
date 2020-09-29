document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const resultDisplay = document.querySelector('#result')
    const resetBtn = document.querySelector('#reset')
    let width = 20
    let currentShooterIndex = 361
    let currentInvaderIndex = 0
    let alienInvadersDown = []
    let result = 0
    let direction = 1
    let InvaderId
    // defining alien invaders 
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
        40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
    ]
    // drawing aliens
    alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'))
    squares[currentShooterIndex].classList.add('shooter')

    // moving the shooter
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter')
        switch (e.keyCode) {
            case 37:
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
                break
            case 39:
                if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
                break
        }
        squares[currentShooterIndex].classList.add('shooter')
    }
    document.addEventListener('keydown', moveShooter)

    // moving alien invaders
    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1

        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width
        } else if (direction == width) {
            if (leftEdge) direction = 1
            else direction = -1
        }
        for (let i = 0; i < alienInvaders.length; i++) {
            squares[alienInvaders[i]].classList.remove('invader')
        }
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction
        }
        for (let i = 0; i < alienInvaders.length; i++) {
            if (!alienInvadersDown.includes(i)) {
                squares[alienInvaders[i]].classList.add('invader')
            }
        }
        if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            resultDisplay.textContent = 'Game Over'
            squares[currentShooterIndex].classList.add('boom')
            clearInterval(InvaderId)
        }
        for (let i = 0; i < alienInvaders.length; i++) {
            if (alienInvaders[i] > (squares.length - (width - 1))) {
                resultDisplay.textContent = 'Game Over'
                clearInterval(InvaderId)
            }
        }
        // deciding win !!!!!
        if (alienInvadersDown.length === alienInvaders.length) {
            resultDisplay.textContent = 'You win'
            clearInterval(InvaderId)
        }
    }
    InvaderId = setInterval(moveInvaders, 500)
    // shoot
    function shoot(e) {
        let laserId
        let currentLaserIndex = currentShooterIndex

        // function moving laser
        function moveLaser() {
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')
            if (squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('boom')
                setTimeout(() => {
                    squares[currentLaserIndex].classList.remove('boom')
                }, 250)
                clearInterval(laserId)
                const alienDownIndex = alienInvaders.indexOf(currentLaserIndex)
                alienInvadersDown.push(alienDownIndex)
                result++
                resultDisplay.textContent = result
            } else if (currentLaserIndex < width) {
                clearInterval(laserId)
                setTimeout(() => { squares[currentLaserIndex].classList.remove('laser') }, 100)
            }
        }
        //     document.addEventListener('keyup', () => {
        //         if (e.keyCode === 32) {
        //             laserId = setInterval(moveLaser, 100)
        //         }
        //     })
        switch (e.keyCode) {
            case 32:
                laserId = setInterval(moveLaser, 100)
                break
        }

    }
    document.addEventListener('keyup', shoot)
    resetBtn.addEventListener('click', reload)
    function reload(e) {
        window.location.reload();
    }
})
