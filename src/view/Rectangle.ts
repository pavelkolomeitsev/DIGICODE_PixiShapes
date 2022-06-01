import { Container, Graphics } from "pixi.js";

export function createRectangle(xPos: number, yPos: number, width: number, height: number, color: number): Container {
    const container: Container = new Container();
    container.position.set(xPos, yPos);
    container.height = 100;
    container.addChild(new Graphics().beginFill(color, 1).drawRect(0, 0, width, height).endFill());
    return container;
}

// this._area = width * height;