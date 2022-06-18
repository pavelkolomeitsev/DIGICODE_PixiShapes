import CreateShape from "../interfaces";
import CalculateArea from "../interfaces";
import Shape from "./Shape";

export default class Hexagon extends Shape implements CreateShape, CalculateArea {
    create(color: number): Shape {
        return this.beginFill(color, 1)
                    .lineStyle(0, color, 1)
                    .moveTo(0, 0)
                    .lineTo(50, 25)
                    .lineTo(50, 75)
                    .lineTo(0, 100)
                    .lineTo(-50, 75)
                    .lineTo(-50, 25)
                    .lineTo(0, 0)
                    .endFill();
    }

    public static calculate(): number {
        return 56 * 56 * 6 / 4 * 0.57;
    }
}