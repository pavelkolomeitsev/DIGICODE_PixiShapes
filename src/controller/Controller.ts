import Model from "../model/Model";
import View from "../view/View";

export default class Controller {
    private _model: Model = null;

    constructor() {
        this._model = new Model();
        new View(this);
    }

    public addShape(shape: string): void {
        this._model.addShapeType(shape);
    }

    public removeShape(): string {
        return this._model.removeShapeType();
    }
}