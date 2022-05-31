import { Graphics } from "@pixi/graphics";
import Shape from "./Shape";

export default class Hexagon extends Shape {
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
        this._shape.lineTo(50, 75);
        this._shape.lineTo(0, 100);
        this._shape.lineTo(-50, 75);
        this._shape.lineTo(-50, 25);
        this._shape.lineTo(0, 0);
        this._shape.endFill();
        this._type = "Hexagon";
        this._ownHeight = 100;
        this._area = (3 * 1.73) / 2 * (this._side ** 2);

    }
}