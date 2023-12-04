class Circle extends Body{
	constructor(x,y,radius,color){
		super(x,y)
		this.radius = radius
		this.color = color

        this.movementVector = new Vector2d("positional", x, y) // directional vector for position
	}

	tick(){
		super.setX(super.getX() + this.movementVector.getX())
		super.setY(super.getY() + this.movementVector.getY())
	}

	draw(ctx){
		ctx.strokeStyle = this.color
		ctx.beginPath()
		ctx.arc(super.getX(), super.getY(), this.radius, 0, 2 * Math.PI);
		ctx.stroke()
	}

	getRadius(){
		return this.radius
	}
}