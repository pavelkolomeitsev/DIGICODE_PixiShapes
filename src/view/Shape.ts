import { Graphics } from "pixi.js";

export default class Shape {
    protected _shape: Graphics = null;
    protected _type: string = "Shape";
    protected _area: number = 0;
    protected _ownHeight: number = 0;
    protected _isInView: boolean = false;

    public get shape(): Graphics {
        return this._shape;
    }
    
    public get area(): number {
        return this._area;
    }
    
    public get ownHeight(): number {
        return this._ownHeight;
    }

    public get type(): string {
        return this._type;
    }

    public get isInView(): boolean {
        return this._isInView;
    }

    public set isInView(value: boolean) {
        this._isInView = value;
    }
}