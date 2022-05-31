import { Graphics } from "@pixi/graphics";
import Shape from "./Shape";

export default class Circle extends Shape {
    constructor(xPos: number, yPos: number, color: number, radius: number) {
        super();
        this._shape = new Graphics();
        this._shape.lineStyle(0);
        this._shape.beginFill(color, 1);
        this._shape.drawCircle(xPos, yPos, radius);
        this._shape.endFill();
        this._type = "Circle";
        this._ownHeight = 130;
        this._area = Math.PI * radius * radius;
    }
}                                                                              