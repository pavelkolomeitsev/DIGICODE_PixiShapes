import { Application } from "@pixi/app";
import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import Model from "../model/Model";
import { createCircle } from "../view/Circle";
import { createEllipse } from "../view/Ellipse";
import { createHexagon } from "../view/Hexagon";
import { createPentagon } from "../view/Pentagon";
import { createRandomShape } from "../view/RandomShape";
import { createRectangle } from "../view/Rectangle";
import Shape from "../view/Shape";
import { createTriangle } from "../view/Triangle";
import { getRandomColor, getXPos } from "./utils";

export default class ShapesGenerator {
    private _interval: number = 2000;
    private _shapesAmount: number = 1;
    private _app: Application = null;
    private _model: Model = null;
    private _shapesPool: Shape[] = [];
    private _shapesSecondMinus: HTMLButtonElement = null;
    private _shapesSecondPlus: HTMLButtonElement = null;

    constructor(app: Application, model: Model) {
        this._app = app;
        this._model = model;
        this._shapesSecondMinus = document.getElementById("shapesSecondMinus") as HTMLButtonElement;
        this._shapesSecondMinus.addEventListener("click", () => {
            this._app.stage.removeChildAt(0);
        }, false);
        this._shapesSecondPlus = document.getElementById("shapesSecondPlus") as HTMLButtonElement;
        this._shapesSecondPlus.addEventListener("click", () => {
            const container: Container = this._generateShape();
            this._app.stage.addChild(container);
        }, false);
    }

    // generate first shape in 2 seconds and add it to the pool
    public create(): void {
        setInterval(() => {
            // if (this._shapesPool.length < this._shapesAmount) {
            //     const shape: Shape = this._generateShape();
            //     this._model.addShape(shape);
            //     this._app.stage.addChild(shape.shape); // add shape to the canvas element
            // }
            if (this._app.stage.children.length < this._shapesAmount) {
                const container: Container = this._generateShape();
                // console.log(container);
                // this._model.addShape(shape);
                this._app.stage.addChild(container); // add shape to the canvas element
            }
        }, this._interval);
    }

    private _generateShape(): Container {
        // get random number from 0 to 6 (Circle, Ellipse, Hexagon, etc...)
        const randomShape: number = Math.floor(Math.random() * 7) + 1;
        // const randomShape: number = 1;
        const yPos: number = -100;
        const xPos: number = getXPos(); // random x position
        const color: number = getRandomColor(); // random color
        let width: number = 0;
        let height: number = 0;
        
        switch (randomShape) {
            case 1:
                return createCircle(xPos, yPos, color, 50);
            case 2:
                width = 70;
                height = 40;
                return createEllipse(xPos, yPos, width, height, color);
            case 3:
                return createHexagon(xPos, yPos, color);
            case 4:
                return createPentagon(xPos, yPos, color);
            case 5:
                return createRandomShape(xPos, yPos, color);
            case 6:
                width = 100;
                height = 60;
                return createRectangle(xPos, yPos, width, height, color);
            case 7:
                width = 100;
                height = 50;
                return createTriangle(xPos, yPos, width, height, color, 80);
        }
    }
}