
let input = document.querySelector('.input'),
    btn = document.querySelector('.btn'),
    timeOut = document.querySelector('.time'),
    gameBox = document.querySelector('.game__block'),
    score = 0,
    gameTime = 0,
    interval = 0;

let colors = ['red', 'green', 'blue', 'yellow', 'purple'];

btn.addEventListener('click', () => {
    if (input.value > 4) {
        gameTime = input.value
        input.value = ''
        let result = document.querySelector('.result')
        if (result) {
            result.style.display = 'none'
        }
        score = 0
        clearInterval(interval)
        start()
    }
})


gameBox.addEventListener('click', (event) => {
    if (event.target.classList.contains('ball')) {
        score++
        event.target.remove()
        createBall()
    }
})

function start() {
    timeOut.innerHTML = gameTime
    interval = setInterval(() => decrease(), 1000)
    createBall()
}

function decrease() {
    if (gameTime == 0) {
        end()
    } else {
        let currentTime = --gameTime
        timeOut.innerHTML = currentTime
    }
}

function end() {
    gameBox.innerHTML = `<h2 class="result">Вы набрали: ${score} баллов</h2>`
}

function createBall() {
    let ball = document.createElement('div')
    ball.classList.add('ball')
    let size = random(20, 100)

    let { height, width } = gameBox.getBoundingClientRect()

    let leftValue = random(0, width - size)
    let topValue = random(0, height - size)

    ball.style.width = ball.style.height = size + 'px'
    ball.style.left = leftValue + 'px'
    ball.style.top = topValue + 'px'

    let shape = random(0, 2);
    if (shape === 0) {
        ball.style.borderRadius = '50%'; // круглая
    } else if (shape === 1) {
        ball.style.borderRadius = '0'; // квадратная
    } else {
        ball.style.borderBottom = `${size}px solid transparent`; // треугольная
        ball.style.borderRight = `${size}px solid red`;
    }
  
    let colorIndex = random(0, colors.length - 1);
    ball.style.background = colors[colorIndex];

    gameBox.append(ball)
}

function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}
