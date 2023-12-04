class Cursor{
    constructor(x, y, width, color){
        this.x = x
        this.y = y
        this.movement = new Vector2d('positional', 0, 0)
        this.width = width
        this.color = color
        this.lineWidth = 3
        this.sensitivity = 10
    }

    draw(ctx){
        ctx.fillStyle = this.color
        
        ctx.fillRect(this.x-this.width, this.y - this.lineWidth/2, this.width*2, this.lineWidth)
        ctx.fillRect(this.x - this.lineWidth/2, this.y-this.width, this.lineWidth, this.width*2)
    }

    tick(){
        this.setX(this.getX() + this.movement.getX() * this.sensitivity)
        this.setY(this.getY() + this.movement.getY() * this.sensitivity)
    }

    getX(){
        return this.x
    }

    getY(){
        return this.y
    }

    setX(n){
        this.x = n
    }

    setY(n){
        this.y = n
    }

    setMovement(vector){
        this.movement = vector
    }

    getSensitivity(){
        return this.sensitivity
    }
}