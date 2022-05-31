import { Graphics } from "pixi.js";
import Shape from "./Shape";

export default class Triangle extends Shape {
    constructor(xPos: number, yPos: number, width: number, height: number, color: number, angle: number) {
        super();
        this._shape = new Graphics();
        this._shape.x = xPos;
        this._shape.y = yPos;
        this._shape.beginFill(color, 1);
        this._shape.lineStyle(0, color, 1);
        this._shape.moveTo(width, 0);
        this._shape.lineTo(height, width);
        this._shape.lineTo(0, 0);
        this._shape.lineTo(height, 0);
        this._shape.endFill();
        this._shape.angle = angle;
        this._type = "Triangle";
        this._ownHeight = 100;
        this._area = (width * height) / 2;
    }
}