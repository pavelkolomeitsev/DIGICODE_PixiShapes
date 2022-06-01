import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";

export function createCircle(xPos: number, yPos: number, color: number, radius: number): Container {
    const container: Container = new Container();
    container.position.set(xPos, yPos);
    container.height = 100;
    container.addChild(new Graphics().lineStyle(0).beginFill(color, 1).drawCircle(0, 0, radius).endFill());
    return container;
}