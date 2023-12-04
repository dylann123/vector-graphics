class Square extends Body {
    constructor(x,y,radius = 5, color){
        super(x,y)

        this.radius = radius // in px
        this.color = color || "white" // color

        this.movementVector = new Vector2d("directional", 0, 0) // directional vector for position
        this.rotationVector = new Vector2d("directional", 0, 1) // rotational vector

        this.lines = [
            new Line(
                new Point(super.getX() + this.radius * Math.sin(this.rotationVector.getDirectionRad() + Math.PI/4), super.getY() + this.radius * Math.cos(this.rotationVector.getDirectionRad() + Math.PI/4)), 
                new Point(super.getX() + this.radius * Math.cos(this.rotationVector.getDirectionRad() + Math.PI/4), super.getY() - this.radius * Math.sin(this.rotationVector.getDirectionRad() + Math.PI/4))),
            new Line(
                new Point(super.getX() - this.radius * Math.sin(this.rotationVector.getDirectionRad() + Math.PI/4), super.getY() - this.radius * Math.cos(this.rotationVector.getDirectionRad() + Math.PI/4)), 
                new Point(super.getX() - this.radius * Math.cos(this.rotationVector.getDirectionRad() + Math.PI/4), super.getY() + this.radius * Math.sin(this.rotationVector.getDirectionRad() + Math.PI/4)))    
        ]
    }


    draw(ctx){
        ctx.strokeStyle = this.color
        ctx.lineWidth = "20px"

        ctx.beginPath()
        ctx.moveTo(this.lines[0].getVector1().getX(), this.lines[0].getVector1().getY())
        ctx.lineTo(this.lines[0].getVector2().getX(), this.lines[0].getVector2().getY())
        ctx.lineTo(this.lines[1].getVector1().getX(), this.lines[1].getVector1().getY())
        ctx.lineTo(this.lines[1].getVector2().getX(), this.lines[1].getVector2().getY())
        ctx.lineTo(this.lines[0].getVector1().getX(), this.lines[0].getVector1().getY())
        ctx.stroke()
        ctx.closePath()

        this.drawMovementVector(ctx)
    }

    tick(){
        this.lines = [
            new Line(
                new Point(super.getX() + this.radius * Math.sin(this.rotationVector.getDirectionRad() + Math.PI/4), super.getY() + this.radius * Math.cos(this.rotationVector.getDirectionRad() + Math.PI/4)), 
                new Point(super.getX() + this.radius * Math.cos(this.rotationVector.getDirectionRad() + Math.PI/4), super.getY() - this.radius * Math.sin(this.rotationVector.getDirectionRad() + Math.PI/4))),
            new Line(
                new Point(super.getX() - this.radius * Math.sin(this.rotationVector.getDirectionRad() + Math.PI/4), super.getY() - this.radius * Math.cos(this.rotationVector.getDirectionRad() + Math.PI/4)), 
                new Point(super.getX() - this.radius * Math.cos(this.rotationVector.getDirectionRad() + Math.PI/4), super.getY() + this.radius * Math.sin(this.rotationVector.getDirectionRad() + Math.PI/4)))    
        ]

        this.setX(this.getX() + this.movementVector.getX())
        this.setY(this.getY() + this.movementVector.getY())
    }

    faceTowardsLocation(x,y){
        this.rotationVector.setX(x-super.getX())
        this.rotationVector.setY(y-super.getY())
    }

    drawMovementVector(ctx){
        ctx.strokeStyle = "yellow"
        ctx.lineWidth = "5px"
        ctx.beginPath()
        ctx.moveTo(super.getX(), super.getY())
        ctx.lineTo(super.getX() + this.movementVector.getX()*5, super.getY() + this.movementVector.getY()*5)
        ctx.stroke()
        ctx.closePath()
    }

    getLines(){
        return this.lines
    }

    getMovementVector(){
        return this.movementVector
    }

    getRotationVector(){
        return this.rotationVector
    }

    getRadius(){
        return this.radius
    }
}