import CreateShape from "../interfaces";
import Shape from "./Shape";

export default class Ellipse extends Shape implements CreateShape {
    private static width: number = 0;
    private static height: number = 0;

    create(color: number, width: number, height: number): Shape {
        Ellipse.width = width;
        Ellipse.height = height;
        return this.lineStyle(0).beginFill(color, 1).drawEllipse(0, 0, width, height).endFill();
    }

    public static calculate(): number {
        return Ellipse.width * Ellipse.height * Math.PI;
    }
}