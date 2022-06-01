import { Graphics } from "@pixi/graphics";
import { Container } from "pixi.js";

export function createEllipse(xPos: number, yPos: number, width: number, height: number, color: number): Container {
    const container: Container = new Container();
    container.position.set(xPos, yPos);
    container.height = 100;
    container.addChild(new Graphics().lineStyle(0).beginFill(color, 1).drawEllipse(0, 0, width, height).endFill());
    return container;
}
// this._area = Math.PI * width * height;