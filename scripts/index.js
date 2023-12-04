try{
const canvas = document.getElementsByTagName("canvas")[0]
const ctx = canvas.getContext('2d')

let mouse = {
    x: 0,
    y: 0
}

let move = {
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    " ": false,
    f: false
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const player = new Player(new Square(800, 400, 15, "white"))
const bullets = []
const enemies = [null]
const dummy = new Enemy(5, new Square(600, 600, 10, "red"))

enemies.push(new Enemy(3, new Square(700, 600, 10, "red")))

function gameLoop() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.fillStyle = "black"
    ctx.fillRect(Math.random(), Math.random(), window.innerWidth, window.innerHeight)

    player.updateInputs(move)
    player.tick()
    player.draw(ctx)

    ctx.fillText(player.movementVector, 100, 100)
    ctx.fillText(player.movementVector.getUnitVector(), 100, 120)

    for (let bullet in bullets) {
        if (bullets[bullet].isDead()) {
            bullets.splice(bullet, 1)
            continue
        }
        for (let enemy in enemies) {
            if (enemies[enemy].pointIsInside(bullets[bullet].getX(), bullets[bullet].getY())) {
                enemies.splice(enemy, 1)
                for(let i = 0; i < Math.floor(Math.random() * 5) + 1; i++)
                    enemies.push(new Enemy(5, new Square(Math.random() * canvas.width, Math.random() * canvas.height, (Math.random() * 10) + 5, "red")))
                break;
            }
        }
        bullets[bullet].tick()
        bullets[bullet].draw(ctx)
    }

    enemies[0] = dummy
    for (let enemy in enemies) {
        if (enemies[enemy].pointIsInside(player.cursor.getX(), player.cursor.getY()))
            bullets.push(player.fireBullet())
        enemies[enemy].moveTowardsPosition(player.getX(), player.getY())
        for(let i = 0; i < enemies.length; i++){
            if(i != enemy && enemies[enemy].isTouching(enemies[i])){
                let forceVector = new Vector2d('positional', enemies[enemy].getX(), enemies[enemy].getY())
                forceVector.setX(enemies[enemy].getX()-enemies[i].getX())
                forceVector.setY(enemies[enemy].getY()-enemies[i].getY())
                forceVector = forceVector.getUnitVector().multiply(3)
                enemies[enemy].getMovementVector().add(forceVector)
                break
            }
        }
        enemies[enemy].draw(ctx)
        // dummy.getBody().setX(mouse.x)
        // dummy.getBody().setY(mouse.y)

        player.cursor.setX(mouse.x)
        player.cursor.setY(mouse.y)
        if(enemy == 0)
            continue
        enemies[enemy].tick()
    }

    requestAnimationFrame(gameLoop)
}
gameLoop()

canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.x
    mouse.y = e.y
})


addEventListener("keydown", (e) => {
    move[e.key] = 1
    if (e.key == " ")
        player.applyForce(new Vector2d(
            'positional',
            player.movementVector.getUnitVector().getX() * 20,
            player.movementVector.getUnitVector().getY() * 20))
})

addEventListener("keyup", (e) => {
    move[e.key] = 0
})
}catch(e){alert(e.stack)}