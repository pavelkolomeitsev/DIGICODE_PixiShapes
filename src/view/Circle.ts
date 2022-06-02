import { Graphics } from "@pixi/graphics";

export function createCircle(color: number, radius: number): Graphics {
    return new Graphics().lineStyle(0).beginFill(color, 1).drawCircle(0, 0, radius).endFill();
}