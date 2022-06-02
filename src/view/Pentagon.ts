import { Graphics } from "pixi.js";

export function createPentagon(color: number): Graphics {
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
    return pentagon;
}