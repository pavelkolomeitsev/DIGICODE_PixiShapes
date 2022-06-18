import * as PIXI from "pixi.js";
import { Application, Container, DisplayObject, Graphics, InteractionEvent, Point, Rectangle } from "pixi.js";
import Circle from "./shapes/Circle";
import { CONTAINERS_HEIGHT, INTERVAL, MAX_GRAVITY_VALUE, MIN_GRAVITY_VALUE, MIN_SHAPES_AMOUNT } from "../controller/constants";
import Observer from "../controller/Observer";
import { getRandomColor, getXPos } from "../controller/utils";
import Shape from "./shapes/Shape";
import Ellipse from "./shapes/Ellipse";
import Hexagon from "./shapes/Hexagon";
import Pentagon from "./shapes/Pentagon";
import RandomShape from "./shapes/RandomShape";
import CustomRectangle from "./shapes/Rectangle";
import Triangle from "./shapes/Triangle";
import Controller from "../controller/Controller";

export default class View {
    private _controller: Controller = null;
    private _app: Application = null;
    private _gravityValue: number = 2; 
    private _bottomBorder: number = 0;
    private _shapesAmount: number = 0;
    private _shapesArea: number = 0;
    private _shapesPerSecond: number = 1;
    private _shapesAmountObserver: Observer = null;
    private _surfaceAreaObserver: Observer = null;
    private _shapesAmountElement: HTMLSpanElement = null;
    private _surfaceArea: HTMLSpanElement = null;
    private _shapesSecondMinus: HTMLButtonElement = null;
    private _shapesSecondPlus: HTMLButtonElement = null;
    private _gravityValueMinus: HTMLButtonElement = null;
    private _gravityValuePlus: HTMLButtonElement = null;

    constructor(controller: Controller) {
        this._controller = controller;
        this._app = new PIXI.Application({
            view: document.getElementById("canvas") as HTMLCanvasElement,
            width: 900,
            height: 600
        });
        this._shapesAmountObserver = new Observer();
        this._surfaceAreaObserver = new Observer();
        this._init();
        this._assignClicks();
        this._create();
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
            for (let i = 0; i < this._shapesPerSecond; i++) {
                if (this._app.stage.children.length >= 1) {
                    this._app.stage.removeChildAt(this._app.stage.children.length - 1); // remove last
                    this._shapesAmount--;
                    this._shapesAmountObserver.broadcast(this._shapesAmount.toString());
                    const shapeType: string = this._controller.removeShape();
                    this._shapesArea -= this._getArea(shapeType);
                    this._surfaceAreaObserver.broadcast(this._shapesArea.toFixed(2).toString());
                }
            }
            if (this._shapesPerSecond <= 1) return;
            --this._shapesPerSecond;
        }, false);
        
        this._shapesSecondPlus.addEventListener("click", () => {
            ++this._shapesPerSecond;
            for (let i = 0; i < this._shapesPerSecond; i++) {
                const [container, area, shape] = this._generateShape();
                this._controller.addShape(shape);
                this._shapesArea += area;
                this._app.stage.addChild(container);
                this._shapesAmount++;
                this._shapesAmountObserver.broadcast(this._shapesAmount.toString());
                this._surfaceAreaObserver.broadcast(this._shapesArea.toFixed(2).toString());
            }
        }, false);
    }

    private _create(): void {
        let nextCheck: number = this._app.ticker.lastTime + INTERVAL;
        this._app.ticker.add(() => { // generate first shape in 2 seconds and add it to the stage
            if (nextCheck < this._app.ticker.lastTime) {
                if (this._app.stage.children.length < MIN_SHAPES_AMOUNT) {
                    const [container, area, shape] = this._generateShape();
                    this._controller.addShape(shape);
                    this._shapesArea += area;
                    this._app.stage.addChild(container); // add container to the stage
                    this._shapesAmount++;
                    this._shapesAmountObserver.broadcast(this._shapesAmount.toString());
                    this._surfaceAreaObserver.broadcast(this._shapesArea.toFixed(2).toString());
                }
                nextCheck = this._app.ticker.lastTime + INTERVAL;
            }
            this._app.stage.children.forEach((container: DisplayObject) => {
                container.y += this._gravityValue;
                if (container.y > (this._bottomBorder + CONTAINERS_HEIGHT)) {
                    container.y = -CONTAINERS_HEIGHT;
                }
            });
        });
    }

    // returns tuple for calculating surface area also
    private _generateShape(xPos: number = getXPos(), yPos: number = -CONTAINERS_HEIGHT): [Container, number, string] { // random x position
        // get random number from 0 to 6 (Circle, Ellipse, Hexagon, etc...)
        const randomShape: number = Math.floor(Math.random() * 7) + 1;
        const color: number = getRandomColor(); // random color
        let width: number = 0;
        let height: number = 0;
        let container: Container = null;
        let shape: Shape = null;
        let shapeType: string = "";

        switch (randomShape) {
            case 1:
                shape = new Circle().create(color, 50);
                container = this._createContainer(xPos, yPos, shape);
                shapeType = "Circle";
                return [container, Circle.calculate(), shapeType];
            case 2:
                width = 70;
                height = 40;
                shape = new Ellipse().create(color, width, height);
                container = this._createContainer(xPos, yPos, shape);
                shapeType = "Ellipse";
                return [container, Ellipse.calculate(), shapeType];
            case 3:
                shape = new Hexagon().create(color);
                container = this._createContainer(xPos, yPos, shape);
                shapeType = "Hexagon";
                return [container, Hexagon.calculate(), shapeType];
            case 4:
                shape = new Pentagon().create(color);
                container = this._createContainer(xPos, yPos, shape);
                shapeType = "Pentagon";
                return [container, Pentagon.calculate(), shapeType];
            case 5:
                shape = new RandomShape().create(color);
                container = this._createContainer(xPos, yPos, shape);
                shapeType = "RandomShape";
                return [container, RandomShape.calculate(), shapeType];
            case 6:
                width = 100;
                height = 60;
                shape = new CustomRectangle().create(color, width, height);
                container = this._createContainer(xPos, yPos, shape);
                shapeType = "CustomRectangle";
                return [container, CustomRectangle.calculate(), shapeType];
            case 7:
                width = 100;
                height = 50;
                shape = new Triangle().create(color, width, height, 80);
                container = this._createContainer(xPos, yPos, shape);
                shapeType = "Triangle";
                return [container, Triangle.calculate(), shapeType];
        }
    }

    private _onStagePointer = (event: InteractionEvent) => {
        const position: Point = event.data.getLocalPosition(this._app.stage);
        const [container, area, shape] = this._generateShape(position.x, position.y);
        this._controller.addShape(shape);
        this._shapesArea += area;
        this._app.stage.addChild(container);
        this._shapesAmount++;
        this._shapesAmountObserver.broadcast(this._shapesAmount.toString());
        this._surfaceAreaObserver.broadcast(this._shapesArea.toFixed(2).toString());
    };

    private _createContainer(xPos: number, yPos: number, shape: Graphics): Container {
        const container: Container = new Container();
        container.position.set(xPos, yPos);
        container.height = CONTAINERS_HEIGHT;
        container.addChild(shape);
        container.interactive = true;
        container.on("pointerdown", this._onShapePointer(container), this);
        return container;
    }

    private _onShapePointer = (container: Container) => {
        return (event: InteractionEvent) => {
            event.stopPropagation();
            const parent = container.parent;
            const index: number = parent.getChildIndex(container);
            // note object type
            // const areaType: number = this._model.getAreaByIndex(index);
            parent.removeChildAt(index);
            this._shapesAmount--;
            this._shapesAmountObserver.broadcast(this._shapesAmount.toString());
            // this._surfaceAreaObserver.broadcast(this._model.getAreasSurface().toFixed(2));
            // check if exist
            // if (this._model.isInArray(areaType)) {
            //     // get all indexes
            //     const indexes: number[] = this._getAllIndexes(areaType);
            //     // create new shape
            //     const shape: Graphics = this._createNewShape(areaType);
            //     // push into containers
            //     this._replaceShapes(indexes, shape);
            // }

            // const shapeType: string = this._controller.removeShape();
            // this._shapesArea -= this._getArea(shapeType);
            // this._surfaceAreaObserver.broadcast(this._shapesArea.toFixed(2).toString());
        };
    };

    private _getAllIndexes(areaType: number): number[] {
        const indexes: number[] = [];
        // for (let i = 0; i < this._model.getAreaArray().length; i++) {
        //     if (this._model.getAreaArray()[i] === areaType) indexes.push(i);
        // }
        return indexes;
    }

    private _getArea(shapeType: string): number {
        switch (shapeType) {
            case "Circle":
                return Circle.calculate();
            case "Ellipse":
                return Ellipse.calculate();
            case "Hexagon":
                return Hexagon.calculate();
            case "Pentagon":
                return Pentagon.calculate();
            case "RandomShape":
                return RandomShape.calculate();
            case "CustomRectangle":
                return CustomRectangle.calculate();
            case "Triangle":
                return Triangle.calculate();
        }
    }

    private _replaceShapes(indexes: number[], shape: Graphics): void {
        const container: Container = (this._app.stage.getChildAt(indexes[0])) as Container;
        container.removeChildAt(0);
        container.addChild(shape);
    }
}