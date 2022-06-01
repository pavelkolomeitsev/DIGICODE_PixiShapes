import { Graphics } from "@pixi/graphics";
import { Container } from "pixi.js";

export function createHexagon(xPos: number, yPos: number, color: number): Container {
    const container: Container = new Container();
    container.position.set(xPos, yPos);
    container.height = 100;
    const hexagon: Graphics = new Graphics();
    hexagon.beginFill(color, 1);
    hexagon.lineStyle(0, color, 1);
    hexagon.moveTo(0, 0);
    hexagon.lineTo(50, 25);
    hexagon.lineTo(50, 75);
    hexagon.lineTo(0, 100);
    hexagon.lineTo(-50, 75);
    hexagon.lineTo(-50, 25);
    hexagon.lineTo(0, 0);
    hexagon.endFill();
    container.addChild(hexagon);
    return container;
}
// this._area = (3 * 1.73) / 2 * (this._side ** 2);