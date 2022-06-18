import CreateShape from "../interfaces";
import CalculateArea from "../interfaces";
import Shape from "./Shape";

export default class RandomShape extends Shape implements CreateShape, CalculateArea {
    create(color: number): Shape {
        return this.lineStyle(0)
                    .beginFill(color, 1)
                    .bezierCurveTo(0, 0, 50, -25, 50, 25)
                    .bezierCurveTo(50, 25, 100, 50, 50, 75)
                    .bezierCurveTo(50, 75, 50, 125, 0, 100)
                    .bezierCurveTo(0, 100, -50, 125, -50, 75)
                    .bezierCurveTo(-50, 75, -100, 50, -50, 25)
                    .bezierCurveTo(-50, 25, -50, -25, 0, 0)
                    .endFill();
    }

    public static calculate(): number {
        return Math.PI * 70 * 100 / 2;
    }
}