import { Graphics } from "@pixi/graphics";

export function createRandomShape(color: number): Graphics {
    const randomShape: Graphics = new Graphics();
    randomShape.lineStyle(0);
    randomShape.beginFill(color, 1);
    randomShape.bezierCurveTo(0, 0, 50, -25, 50, 25);
    randomShape.bezierCurveTo(50, 25, 100, 50, 50, 75);
    randomShape.bezierCurveTo(50, 75, 50, 125, 0, 100);
    randomShape.bezierCurveTo(0, 100, -50, 125, -50, 75);
    randomShape.bezierCurveTo(-50, 75, -100, 50, -50, 25);
    randomShape.bezierCurveTo(-50, 25, -50, -25, 0, 0);
    randomShape.endFill();
    return randomShape;
}