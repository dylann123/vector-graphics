class Bullet extends Circle {
    constructor(circle, speed, vector) {
        super(circle.getX(),circle.getY().circle.getRadius(), circle.color)
        super.getMovementVector().setX(vector.getX())
        super.getMovementVector().setY(vector.getY())
        super.getMovementVector().multiply(10)
        this.speed = speed
        this.lifetime = 300
    }

    isDead(){
        return this.lifetime <= 0
    }

    tick(){
        super.tick()
        this.lifetime--
    }

    // https://stackoverflow.com/questions/37224912/circle-line-segment-collision
    checkCollisionLine(lineobj){
        let circle = {
            radius: super.getRadius(),
            center: {
                x: super.getX(),
                y: super.getY()
            }
        }

        let line = {
            p1: {
                x: lineobj.getVector1().getX(),
                y: lineobj.getVector1().getY()
            },
            p2: {
                x: lineobj.getVector2().getX(),
                y: lineobj.getVector2().getY()
            }
        }

        var a, b, c, d, u1, u2, ret, retP1, retP2, v1, v2;
        v1 = {};
        v2 = {};
        v1.x = line.p2.x - line.p1.x;
        v1.y = line.p2.y - line.p1.y;
        v2.x = line.p1.x - circle.center.x;
        v2.y = line.p1.y - circle.center.y;
        b = (v1.x * v2.x + v1.y * v2.y);
        c = 2 * (v1.x * v1.x + v1.y * v1.y);
        b *= -2;
        d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
        if(isNaN(d)){ // no intercept
            return [];
        }
        u1 = (b - d) / c;  // these represent the unit distance of point one and two on the line
        u2 = (b + d) / c;    
        retP1 = {};   // return points
        retP2 = {}  
        ret = []; // return array
        if(u1 <= 1 && u1 >= 0){  // add point if on the line segment
            retP1.x = line.p1.x + v1.x * u1;
            retP1.y = line.p1.y + v1.y * u1;
            ret[0] = retP1;
        }
        if(u2 <= 1 && u2 >= 0){  // second add point if on the line segment
            retP2.x = line.p1.x + v1.x * u2;
            retP2.y = line.p1.y + v1.y * u2;
            ret[ret.length] = retP2;
        }       
        return ret;
    }

    checkCollisionCircle(circle){
        return Math.sqrt((circle.getX() - super.getX())**2 + (circle.getY() - super.getY())**2)
    }

    toString(){
        return `x: ${super.getX()} y: ${super.getY()} speed: ${this.speed}`
    }
}