class Enemy extends Square {
    constructor(speed, body) {
        super(body.getX(), body.getY(), body.getRadius(), body.color)
        this.speed = speed
    }

    moveTowardsPosition(x, y) {
        super.faceTowardsLocation(x,y)
        const force = super.getRotationVector().getUnitVector().multiply(this.speed)
        // alert(force)
        super.getMovementVector().setX(force.getX())
        super.getMovementVector().setY(force.getY())
    }

    pointIsInside(x,y){
        return new Vector2d('positional',x-super.getX(),y-super.getY()).getMagnitude() < super.getRadius()
    }

    applyForce(vector) {
        this.getBody().movementVector.add(vector)
    }

    isTouching(body){
        return Math.sqrt((body.getY() - super.getY())**2 + (body.getX() - super.getX())**2) < body.getRadius() + super.getRadius()
    }
}