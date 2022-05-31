import { Graphics } from "@pixi/graphics";
import Shape from "./Shape";

export default class RandomShape extends Shape {
    private _side: number = 56;

    constructor(xPos: number, yPos: number, color: number) {
        super();
        this._shape = new Graphics();
        this._shape.x = xPos;
        this._shape.y = yPos;
        this._shape.lineStyle(0);
        this._shape.beginFill(color, 1);
        this._shape.bezierCurveTo(0, 0, 50, -25, 50, 25);
        this._shape.bezierCurveTo(50, 25, 100, 50, 50, 75);
        this._shape.bezierCurveTo(50, 75, 50, 125, 0, 100);
        this._shape.bezierCurveTo(0, 100, -50, 125, -50, 75);
        this._shape.bezierCurveTo(-50, 75, -100, 50, -50, 25);
        this._shape.bezierCurveTo(-50, 25, -50, -25, 0, 0);
        this._shape.endFill();
        this._type = "RandomShape";
        this._ownHeight = 70;
        this._area = (6 * this._side * this._side) / (4 * 0.57);
    }
}