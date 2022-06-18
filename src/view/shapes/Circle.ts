import CreateShape from "../interfaces";
import Shape from "./Shape";

export default class Circle extends Shape implements CreateShape {
    private static radius: number = 0;

    create(color: number, radius: number): Shape {
        Circle.radius = radius;
        return this.lineStyle(0).beginFill(color, 1).drawCircle(0, 0, radius).endFill();
    }

    public static calculate(): number {
        return Circle.radius * Circle.radius * Math.PI;
    }
}