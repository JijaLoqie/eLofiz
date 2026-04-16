import p5 from 'p5';

export class Particle {
    p: p5.Vector;
    temp_p: p5.Vector;
    defaultPos: p5.Vector;
    v: p5.Vector;
    a: p5.Vector;
    d: number;
    r: number;
    color: p5.Color;
    mass: number;
    noise_x: number;
    noise_y: number;

    constructor(
        private sketch: p5,
        pos: p5.Vector,
        v: p5.Vector,
        diameter: number,
        color: p5.Color
    ) {
        this.p = pos.copy();
        this.temp_p = this.p.copy();
        this.defaultPos = this.p.copy();
        this.v = v.copy();
        this.a = sketch.createVector(0, 0);
        this.d = diameter;
        this.r = diameter / 2;
        this.color = color;
        this.mass = this.r;
        this.noise_x = sketch.random(1000);
        this.noise_y = sketch.random(1000);
    }

    addForce(f: p5.Vector): void {
        this.a.add(f);
    }

    update(): void {
        this.v.add(this.a);
        this.p.add(this.v);
        this.a.mult(0);
    }

    walk(walkForce: number): void {
        this.noise_x += 0.01;
        this.noise_y += 0.01;

        const force = this.sketch.createVector(0, 0);
        const to = this.sketch.createVector(
            this.sketch.noise(this.noise_x) * this.d * 2 - this.d,
            this.sketch.noise(this.noise_y) * this.d * 2 - this.d
        );

        this.temp_p = p5.Vector.add(this.p, to);
        const toTempPos = p5.Vector.sub(this.temp_p, this.p);
        force.set(p5.Vector.mult(toTempPos, walkForce));
        this.addForce(force);
    }

    distract(mousePos: p5.Vector, radius: number, attractForce: number): void {
        const dist = p5.Vector.dist(mousePos, this.p);

        if (dist > 0 && dist < radius) {
            const force = this.sketch.createVector(0, 0);
            const toPos = p5.Vector.sub(this.p, mousePos);
            const m = toPos.mag();
            toPos.normalize();
            toPos.mult((radius / Math.pow(m, 2)) * attractForce);
            toPos.limit(5);
            this.addForce(toPos);
        }
    }

    returnPos(
        maxSpeed: number,
        maxForce: number,
        range: number
    ): void {
        const toDefault = p5.Vector.sub(this.defaultPos, this.p);
        const d = toDefault.mag();
        toDefault.normalize();

        if (d < range) {
            const m = this.sketch.map(d, 0, range, 0, maxSpeed);
            toDefault.mult(m);
        } else {
            toDefault.mult(maxSpeed);
        }

        const steer = p5.Vector.sub(toDefault, this.v);
        steer.limit(maxForce);
        this.addForce(steer);
    }

    draw(): void {
        this.sketch.noStroke();
        this.sketch.fill(this.color);
        this.sketch.ellipse(this.p.x, this.p.y, this.d, this.d);
    }
}