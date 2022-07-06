class Grass {
    constructor(x, y, width, height, color = {r, g, b}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.3)`;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    draw_shadow() {
        ctx.fillStyle = `rgba(50, 50, 50, 0.5)`;
        ctx.fillRect(
            this.x,
            this.y + this.height,
            this.width,
            this.height
        );
    }
}