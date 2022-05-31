import * as PIXI from "pixi.js";
import Model from "../model/Model";
import ShapesEngine from "./ShapesEngine";
import ShapesGenerator from "./ShapesGenerator";

export default class Controller {
    private _app: PIXI.Application = null;
    private _model: Model = null;

    constructor(app: PIXI.Application) {
        this._app = app;
        this._model = new Model();
        new ShapesGenerator(this._app, this._model).create();
        new ShapesEngine(this._app, this._model).run();
    }
}