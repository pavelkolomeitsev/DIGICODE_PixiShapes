import { Graphics } from "pixi.js";
import Shape from "./Shape";

export default class Rectangle extends Shape {
    constructor(xPos: number, yPos: number, width: number, height: number, color: number) {
        super();
        this._shape = new Graphics();
        this._shape.beginFill(color, 1);
        this._shape.drawRect(xPos / 2, yPos, width, height);
        this._shape.endFill();
        this._type = "Rectangle";
        this._ownHeight = 100;
        this._area = width * height;
    }
}