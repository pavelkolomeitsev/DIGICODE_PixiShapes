import { Graphics } from "pixi.js";

export function createRectangle(width: number, height: number, color: number): Graphics {
    return new Graphics().beginFill(color, 1).drawRect(0, 0, width, height).endFill();
}