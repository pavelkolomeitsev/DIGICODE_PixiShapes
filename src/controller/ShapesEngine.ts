import { Application, Container, DisplayObject, Graphics, InteractionEvent, Point, Rectangle } from "pixi.js";
import Model from "../model/Model";
import { createCircle } from "../view/Circle";
import { createEllipse } from "../view/Ellipse";
import { createHexagon } from "../view/Hexagon";
import { createPentagon } from "../view/Pentagon";
import { createRandomShape } from "../view/RandomShape";
import { createRectangle } from "../view/Rectangle";
import { createTriangle } from "../view/Triangle";
import Observer from "./Observer";
import { CONTAINERS_HEIGHT, getRandomColor, getXPos, INTERVAL, MAX_GRAVITY_VALUE, MIN_GRAVITY_VALUE, MIN_SHAPES_AMOUNT } from "./utils";

export default class ShapesEngine {
    private _app: Application = null;
    private _model: Model = null;
    private _gravityValue: number = 2; 
    private _bottomBorder: number = 0;
    private _shapesAmount: number = 0;
    private _shapesAmountObserver: Observer = null;
    private _surfaceAreaObserver: Observer = null;
    private _shapesAmountElement: HTMLSpanElement = null;
    private _surfaceArea: HTMLSpanElement = null;
    private _shapesSecondMinus: HTMLButtonElement = null;
    private _shapesSecondPlus: HTMLButtonElement = null;
    private _gravityValueMinus: HTMLButtonElement = null;
    private _gravityValuePlus: HTMLButtonElement = null;

    constructor(app: Application, model: Model) {
        this._app = app;
        this._model = model;
        this._shapesAmountObserver = new Observer();
        this._surfaceAreaObserver = new Observer();

        this._init();
        this._assignClicks();
        this._create();
    }

    public run(): void {
        this._app.ticker.add(() => {
            this._app.stage.children.forEach((container: DisplayObject) => {
                container.y += this._gravityValue;
                if (container.y > (this._bottomBorder + CONTAINERS_HEIGHT)) {
                    container.y = -CONTAINERS_HEIGHT;
                }
            });
        });
    }

    private _init(): void {
        this._bottomBorder = this._app.view.height;
        this._shapesAmountElement = document.getElementById("shapesAmount");
        this._surfaceArea = document.getElementById("surfaceArea");
        this._gravityValueMinus = document.getElementById("gravityValueMinus") as HTMLButtonElement;
        this._gravityValuePlus = document.getElementById("gravityValuePlus") as HTMLButtonElement;
        this._shapesSecondMinus = document.getElementById("shapesSecondMinus") as HTMLButtonElement;
        this._shapesSecondPlus = document.getElementById("shapesSecondPlus") as HTMLButtonElement;

        this._shapesAmountObserver.subscribe((shapesAmount: string) => this._shapesAmountElement.innerText = shapesAmount);
        this._surfaceAreaObserver.subscribe((surfaceArea: string) => this._surfaceArea.innerText = surfaceArea);
    }

    private _assignClicks(): void {
        this._app.stage.interactive = true; // stage begins to listen on clicks
        this._app.stage.hitArea = new Rectangle(0, 0, this._app.view.width, this._app.view.height); // make all stage clickable
        this._app.stage.on("pointerdown", this._onStagePointer, this); // assign callback on click

        // change speed
        this._gravityValueMinus.addEventListener("click", () => {
            if (this._gravityValue <= MIN_GRAVITY_VALUE) return;
            else --this._gravityValue;
        }, false);
        
        this._gravityValuePlus.addEventListener("click", () => {
            if (this._gravityValue >= MAX_GRAVITY_VALUE) return;
            else ++this._gravityValue;
        }, false);

        // add shapes
        this._shapesSecondMinus.addEventListener("click", () => {
            this._app.stage.removeChildAt(0);
            this._model.removeArea();
            this._shapesAmount--;
            this._shapesAmountObserver.broadcast(this._shapesAmount.toString());
            this._surfaceAreaObserver.broadcast(this._model.getAreasSurface().toFixed(2));
        }, false);
        
        this._shapesSecondPlus.addEventListener("click", () => {
            const [container, area] = this._generateShape();
            this._app.stage.addChild(container);
            this._model.addArea(area);
            this._shapesAmount++;
            this._shapesAmountObserver.broadcast(this._shapesAmount.toString());
            this._surfaceAreaObserver.broadcast(this._model.getAreasSurface().toFixed(2));
        }, false);
    }

    // generate first shape in 2 seconds and add it to the stage
    private _create(): void {
        setInterval(() => {
            if (this._app.stage.children.length < MIN_SHAPES_AMOUNT) {
                const [container, area] = this._generateShape();
                this._model.addArea(area);
                this._app.stage.addChild(container); // add container to the stage
                this._shapesAmount++;
                this._shapesAmountObserver.broadcast(this._shapesAmount.toString());
                this._surfaceAreaObserver.broadcast(this._model.getAreasSurface().toFixed(2));
            }
        }, INTERVAL);
    }

    // returns tuple for calculating surface area also
    private _generateShape(xPos: number = getXPos(), yPos: number = -CONTAINERS_HEIGHT): [Container, number] { // random x position
        // get random number from 0 to 6 (Circle, Ellipse, Hexagon, etc...)
        const randomShape: number = Math.floor(Math.random() * 7) + 1;
        const color: number = getRandomColor(); // random color
        let width: number = 0;
        let height: number = 0;
        let container: Container = null;
        let shape: Graphics = null;

        switch (randomShape) {
            case 1:
                shape = createCircle( color, 50);
                container = this._createContainer(xPos, yPos, shape);
                return [container, this._model.circleArea];
            case 2:
                width = 70;
                height = 40;
                shape = createEllipse(width, height, color);
                container = this._createContainer(xPos, yPos, shape);
                return [container, this._model.ellipseArea];
            case 3:
                shape = createHexagon(color);
                container = this._createContainer(xPos, yPos, shape);
                return [container, this._model.hexagonArea];
            case 4:
                shape = createPentagon(color);
                container = this._createContainer(xPos, yPos, shape);
                return [container, this._model.pentagonArea];
            case 5:
                shape = createRandomShape(color);
                container = this._createContainer(xPos, yPos, shape);
                return [container, this._model.randomShapeArea];
            case 6:
                width = 100;
                height = 60;
                shape = createRectangle(width, height, color);
                container = this._createContainer(xPos, yPos, shape);
                return [container, this._model.rectangleArea];
            case 7:
                width = 100;
                height = 50;
                shape = createTriangle(width, height, color, 80);
                container = this._createContainer(xPos, yPos, shape);
                return [container, this._model.triangleArea];
        }
    }

    private _onStagePointer = (event: InteractionEvent) => {
        const position: Point = event.data.getLocalPosition(this._app.stage);
        const [container, area] = this._generateShape(position.x, position.y);
        this._model.addArea(area);
        this._app.stage.addChild(container);
        this._shapesAmount++;
        this._shapesAmountObserver.broadcast(this._shapesAmount.toString());
        this._surfaceAreaObserver.broadcast(this._model.getAreasSurface().toFixed(2));
    };

    private _createContainer(xPos: number, yPos: number, shape: Graphics): Container {
        const container: Container = new Container();
        container.position.set(xPos, yPos);
        container.height = 100;
        container.addChild(shape);
        container.interactive = true;
        const onShapePointer = (event: InteractionEvent) => {
            event.stopPropagation();
            const parent = container.parent;
            const index: number = parent.getChildIndex(container);
            parent.removeChildAt(index);
            this._model.removeAreaByIndex(index);
            this._shapesAmount--;
            this._shapesAmountObserver.broadcast(this._shapesAmount.toString());
            this._surfaceAreaObserver.broadcast(this._model.getAreasSurface().toFixed(2));
        };
        container.on("pointerdown", onShapePointer, null);
        return container;
    }
}