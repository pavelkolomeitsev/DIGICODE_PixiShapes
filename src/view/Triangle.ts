import { Container, Graphics } from "pixi.js";

export function createTriangle(xPos: number, yPos: number, width: number, height: number, color: number, angle: number): Container {
    const container: Container = new Container();
    container.position.set(xPos, yPos);
    container.height = 100;
    const triangle: Graphics = new Graphics();
    triangle.beginFill(color, 1);
    triangle.lineStyle(0, color, 1);
    triangle.moveTo(width, 0);
    triangle.lineTo(height, width);
    triangle.lineTo(0, 0);
    triangle.lineTo(height, 0);
    triangle.endFill();
    triangle.angle = angle;
    container.addChild(triangle);
    return container;
}

// this._area = (width * height) / 2;