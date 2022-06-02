import { Graphics } from "@pixi/graphics";

export function createEllipse(width: number, height: number, color: number): Graphics {
    return new Graphics().lineStyle(0).beginFill(color, 1).drawEllipse(0, 0, width, height).endFill();
}