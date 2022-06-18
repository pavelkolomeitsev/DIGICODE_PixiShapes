import CreateShape from "../interfaces";
import CalculateArea from "../interfaces";
import Shape from "./Shape";

export default class CustomRectangle extends Shape implements CreateShape, CalculateArea {
    private static width: number = 0;
    private static height: number = 0;

    create(color: number, width: number, height: number): Shape {
        CustomRectangle.width = width;
        CustomRectangle.height = height;
        return this.beginFill(color, 1).drawRect(0, 0, width, height).endFill();
    }

    public static calculate(): number {
        return CustomRectangle.width * CustomRectangle.height;
    }
}