import Model from "../model/Model";
import View from "../view/View";

export default class Controller {
    private _model: Model = null;

    constructor() {
        this._model = new Model();
        new View(this);
    }

    public getAllShapes(): string[] {
        return this._model.getShapes();
    }

    public addShape(shape: string): void {
        this._model.addShapeType(shape);
    }

    public removeShape(): string {
        return this._model.removeShapeType();
    }

    public removeShapeByIndex(index: number): string {
        return this._model.removeByIndex(index);
    }
}