import { Container, Graphics } from "pixi.js";

export function createPentagon(xPos: number, yPos: number, color: number): Container {
    const container: Container = new Container();
    container.position.set(xPos, yPos);
    container.height = 100;
    const pentagon: Graphics = new Graphics();
    pentagon.beginFill(color, 1);
    pentagon.lineStyle(0, color, 1);
    pentagon.moveTo(0, 0);
    pentagon.lineTo(50, 25);
    pentagon.lineTo(25, 81);
    pentagon.lineTo(-31, 81);
    pentagon.lineTo(-56, 25);
    pentagon.lineTo(0, 0);
    pentagon.endFill();
    container.addChild(pentagon);
    return container;
}
// this._area = (6.88 / 4) * this._side ** 2;