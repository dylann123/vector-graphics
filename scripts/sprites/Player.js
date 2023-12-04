class Player extends Square {
    constructor(square) {
        super(square.getX(),square.getY(),square.radius,square.color)
        this.velocityScale = 0.7
        this.inputs = {}
        this.speed = 1
        this.cursor = new Cursor(100, 100, 6, "red")
    }

    fireBullet() {
        return new Bullet(new Circle(this.getX(), this.getY(), 3, "white"), 5, this.rotationVector.getUnitVector())
    }

    faceTowardsLocation(x, y) {
        super.faceTowardsLocation(x, y)
    }

    updateInputs(object) {
        this.inputs = object
    }

    draw(ctx) {
        super.draw(ctx)
        this.cursor.draw(ctx)
    }

    tick() {
        super.tick()
        super.setX(super.getX() + super.getMovementVector().getX())
        super.setY(super.getY() + super.getMovementVector().getY())

        super.getMovementVector().multiply(this.velocityScale)

        let movementVector = new Vector2d('positional', (this.inputs.d - this.inputs.a) * this.speed, (this.inputs.s - this.inputs.w) * this.speed).getUnitVector().multiply(this.speed)
        super.getMovementVector().add(movementVector)

        this.cursor.setMovement(new Vector2d('positional', (this.inputs.ArrowRight - this.inputs.ArrowLeft), (this.inputs.ArrowDown - this.inputs.ArrowUp)))
        this.faceTowardsLocation(this.cursor.getX(), this.cursor.getY())
        this.cursor.tick()
    }

    applyForce(vector) {
        super.movementVector.add(vector)
    }

    getBody() {
        return this.body
    }

    moveX(n) {
        this.xVel += n
    }

    moveY(n) {
        this.yVel += n
    }

    collidesWith(line) {
        const lines = this.getLines()
        for (let lineobj in lines)
            if (lineobj.intersectsWith(line))
                return true
        return false
    }
}