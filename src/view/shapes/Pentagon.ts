import CreateShape from "../interfaces";
import CalculateArea from "../interfaces";
import Shape from "./Shape";

export default class Pentagon extends Shape implements CreateShape, CalculateArea {
    create(color: number): Shape {
        return this.beginFill(color, 1)
                    .lineStyle(0, color, 1)
                    .moveTo(0, 0)
                    .lineTo(50, 25)
                    .lineTo(25, 81)
                    .lineTo(-31, 81)
                    .lineTo(-56, 25)
                    .lineTo(0, 0)
                    .endFill();
    }

    public static calculate(): number {
        return (25 * 50 / 2) * 5;
    }
}