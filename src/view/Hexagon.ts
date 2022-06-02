import { Graphics } from "@pixi/graphics";

export function createHexagon(color: number): Graphics {
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
    return hexagon;
}