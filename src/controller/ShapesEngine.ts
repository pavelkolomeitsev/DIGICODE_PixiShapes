import { Application } from "pixi.js";
import Model from "../model/Model";
import Shape from "../view/Shape";
import { getXPos } from "./utils";

export default class ShapesEngine {
    private _app: Application = null;
    private _model: Model = null;
    private _shapesPool: Shape[] = [];
    private _previousTime: number = 0;
    private _lastTime: number = 0;
    private _gravityValue: number = 10; // base gravity value
    private _bottomBorder: number = 0;

    constructor(app: Application, model: Model) {
        this._app = app;
        this._model = model;
        this._shapesPool = this._model.getAllShapes(); // shapesEngine gets shapesPool[]
        this._bottomBorder = this._app.view.height;
    }

    public run(): void {
        this._app.ticker.add(() => {
            // make short periods measured by gravity value
            this._lastTime = Math.floor(this._app.ticker.lastTime / this._gravityValue);
            // if this period starts, change shape`s y-position
            if (this._lastTime > this._previousTime) {
                this._previousTime = this._lastTime; // update previous time
                this._shapesPool.forEach((item: Shape) => item.shape.y += 1);
            }

            this._shapesPool.forEach((item: Shape) => {
                // check if exact shape is out of canvas bottom border
                if (item.shape.y > (this._bottomBorder + item.ownHeight)) {
                    item.shape.y = -item.ownHeight;
                    item.shape.x = getXPos();
                    item.isInView = false;
                    this._model.removeArea(item);
                }
                // set flag if exact shape is in canvas
                if ((item.shape.y > 100) && (item.shape.y <= 101)) {
                    item.isInView = true;
                    this._model.addArea(item);
                }
            });
            console.log("area", this._model.getAllAreas().toFixed(2));
        });
    }
}