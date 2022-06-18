import CreateShape from "../interfaces";
import CalculateArea from "../interfaces";
import Shape from "./Shape";

export default class Triangle extends Shape implements CreateShape, CalculateArea {
    private static width: number = 0;
    private static height: number = 0;

    create(color: number, width: number, height: number, angle: number): Shape {
        Triangle.width = width;
        Triangle.height = height;
        this.beginFill(color, 1).lineStyle(0, color, 1).moveTo(width, 0).lineTo(height, width).lineTo(0, 0).lineTo(height, 0).endFill();
        this.angle = angle;
        return this;
    }

    public static calculate(): number {
        return (Triangle.width * Triangle.height) / 2;
    }
}