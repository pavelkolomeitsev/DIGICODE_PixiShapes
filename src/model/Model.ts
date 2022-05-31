import Shape from "../view/Shape";

export default class Model {
    private _shapesPool: Shape[] = [];
    private _shapesArea: number = 0;

    public addShape(shape: Shape) {
        this._shapesPool.push(shape);
    }
    
    public getAllShapes(): Shape[] {
        return this._shapesPool;
    }

    public addArea(shape: Shape): void {
        this._shapesArea += shape.area;
    }

    public removeArea(shape: Shape): void {
        this._shapesArea -= shape.area;
    }

    public getAllAreas(): number {
        return this._shapesArea;
    }
}