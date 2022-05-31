import { Application } from "@pixi/app";
import Model from "../model/Model";
import Circle from "../view/Circle";
import Ellipse from "../view/Ellipse";
import Hexagon from "../view/Hexagon";
import Pentagon from "../view/Pentagon";
import RandomShape from "../view/RandomShape";
import Rectangle from "../view/Rectangle";
import Shape from "../view/Shape";
import Triangle from "../view/Triangle";
import { getRandomColor, getXPos } from "./utils";

export default class ShapesGenerator {
    private _interval: number = 4000;
    private _app: Application = null;
    private _model: Model = null;
    private _shapesPool: Shape[] = [];

    constructor(app: Application, model: Model) {
        this._app = app;
        this._model = model;
        this._shapesPool = this._model.getAllShapes();
    }

    // generate random shape every 4 second and add it to the pool
    public create(): void {
        setInterval(() => {
            if (this._shapesPool.length < 5) {
                const shape: Shape = this._generateShape();
                this._model.addShape(shape);
                // console.log("NEW", shape.type, shape.shape.x);
                this._app.stage.addChild(shape.shape); // add shape to the canvas element
            }
            // if (this._shapesPool.length > 20) this._model.deleteFirstShape();
        }, this._interval);
    }

    private _generateShape(): Shape {
        // get random number from 0 to 6 (Circle, Ellipse, Hexagon, etc...)
        const randomShape: number = Math.floor(Math.random() * 7) + 1;
        const yPos: number = -100;
        const xPos: number = getXPos(); // random x position
        const color: number = getRandomColor(); // random color
        let width: number = 0;
        let height: number = 0;
        let radius: number = 0;

        switch (randomShape) {
            case 1:
                radius = 50;
                return new Circle(xPos, yPos, color, radius);
            case 2:
                width = 70;
                height = 40;
                return new Ellipse(xPos, yPos, width, height, color);
            case 3:
                return new Hexagon(xPos, yPos, color);
            case 4:
                return new Pentagon(xPos, yPos, color);
            case 5:
                return new RandomShape(xPos, yPos, color);
            case 6:
                width = 100;
                height = 60;
                return new Rectangle(xPos, yPos, width, height, color);
            case 7:
                width = 100;
                height = 50;
                radius = 80;
                return new Triangle(xPos, yPos, width, height, color, radius);
        }
    }
}