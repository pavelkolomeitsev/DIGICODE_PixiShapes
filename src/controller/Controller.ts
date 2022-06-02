import { Application } from "pixi.js";
import Model from "../model/Model";
import ShapesEngine from "./ShapesEngine";

export default class Controller {
    private _app: Application = null;
    private _model: Model = null;

    constructor(app: Application) {
        this._app = app;
        this._model = new Model();
        new ShapesEngine(this._app, this._model).run();
    }
}