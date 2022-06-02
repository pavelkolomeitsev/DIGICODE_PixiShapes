import { Graphics } from "pixi.js";

export function createTriangle(width: number, height: number, color: number, angle: number): Graphics {
    const triangle: Graphics = new Graphics();
    triangle.beginFill(color, 1);
    triangle.lineStyle(0, color, 1);
    triangle.moveTo(width, 0);
    triangle.lineTo(height, width);
    triangle.lineTo(0, 0);
    triangle.lineTo(height, 0);
    triangle.endFill();
    triangle.angle = angle;
    return triangle;
}