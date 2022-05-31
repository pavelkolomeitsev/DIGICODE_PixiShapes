import { Graphics } from "@pixi/graphics";
import Shape from "./Shape";

export default class Ellipse extends Shape {
    constructor(xPos: number, yPos: number, width: number, height: number, color: number) {
        super();
        this._shape = new Graphics();
        this._shape.lineStyle(0);
        this._shape.beginFill(color, 1);
        this._shape.drawEllipse(xPos, yPos, width, height);
        this._shape.endFill();
        this._type = "Ellipse";
        this._ownHeight = 130;
        this._area = Math.PI * width * height;
    }
}