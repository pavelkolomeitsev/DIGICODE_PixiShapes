import { Graphics } from "pixi.js";
import Shape from "./Shape";

export default class Pentagon extends Shape {
    private _side: number = 56;

    constructor(xPos: number, yPos: number, color: number) {
        super();
        this._shape = new Graphics();
        this._shape.x = xPos;
        this._shape.y = yPos;
        this._shape.beginFill(color, 1);
        this._shape.lineStyle(0, color, 1);
        this._shape.moveTo(0, 0);
        this._shape.lineTo(50, 25);
        this._shape.lineTo(25, 81);
        this._shape.lineTo(-31, 81);
        this._shape.lineTo(-56, 25);
        this._shape.lineTo(0, 0);
        this._shape.endFill();
        this._type = "Pentagon";
        this._ownHeight = 100;
        this._area = (6.88 / 4) * this._side ** 2;
    }
}