class Point{
	constructor(x,y){
		this.x = x
		this.y = y
	}

	getY(){
		return this.y
	}

	getX(){
		return this.x
	}

	setY(y){
		this.y = y
	}

	setX(x){
		this.x = x
	}

	toString(){
		return `(${this.x}, ${this.y})`
	}
}