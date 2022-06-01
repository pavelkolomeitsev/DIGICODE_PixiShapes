import { Application, DisplayObject } from "pixi.js";
import Model from "../model/Model";
import Shape from "../view/Shape";
import { getXPos } from "./utils";

export default class ShapesEngine {
    private _app: Application = null;
    private _model: Model = null;
    private _shapesPool: Shape[] = [];
    private _gravityValue: number = 2; 
    private _bottomBorder: number = 0;
    private _shapesAmount: HTMLSpanElement = null;
    private _surfaceArea: HTMLSpanElement = null;
    private _gravityValueMinus: HTMLButtonElement = null;
    private _gravityValuePlus: HTMLButtonElement = null;

    constructor(app: Application, model: Model) {
        this._app = app;
        this._model = model;
        // this._shapesPool = this._model.getAllShapes(); // shapesEngine gets shapesPool[]
        this._bottomBorder = this._app.view.height;
        this._shapesAmount = document.getElementById("shapesAmount");
        this._surfaceArea = document.getElementById("surfaceArea");
        this._gravityValueMinus = document.getElementById("gravityValueMinus") as HTMLButtonElement;
        this._gravityValueMinus.addEventListener("click", () => {
            if (this._gravityValue <= 1) return;
            else --this._gravityValue;
        }, false);
        this._gravityValuePlus = document.getElementById("gravityValuePlus") as HTMLButtonElement;
        this._gravityValuePlus.addEventListener("click", () => {
            if (this._gravityValue >= 15) return;
            else ++this._gravityValue;
        }, false);
    }

    public run(): void {
        this._app.ticker.add(() => {
            // this._shapesPool.forEach((item: Shape) => {
            //     item.shape.y += this._gravityValue;
            //     // check if exact shape is out of canvas bottom border
            //     if (item.shape.y > (this._bottomBorder + item.ownHeight)) {
            //         item.shape.y = -item.ownHeight;
            //         item.shape.x = getXPos();
            //         item.isInView = false;
            //         this._model.removeArea(item);
            //         this._model.decreaseShapesCount();

            //     }
            //     // set flag if exact shape is in canvas
            //     if ((item.shape.y > 50) && (!item.isInView)) {
            //         this._model.addArea(item);
            //         this._model.increaseShapesCount();
            //         item.isInView = true;
            //     }
            // });
            // this._shapesAmount.innerText = this._model.shapesCount.toString();
            // this._surfaceArea.innerText = this._model.getAllAreas().toFixed(2);
            this._app.stage.children.forEach((container: DisplayObject) => {
                container.y += this._gravityValue;
                if (container.y > (this._bottomBorder + 100)) {
                    container.y = -100;
                }
            });
        });
    }
}