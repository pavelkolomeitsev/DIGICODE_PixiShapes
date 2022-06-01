import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import Shape from "../view/Shape";

export default class Model {
    private _shapesPool: Container[] = [];
    // private _shapesArea: number = 0;
    // private _shapesCount: number = 0;

    public addContainer(container: Container) {
        this._shapesPool.push(container);
    }
    
    // public getAllShapes(): Shape[] {
    //     return this._shapesPool;
    // }

    // public deleteShape(): void {
    //     if (this._shapesPool.length > 1) this._shapesPool.shift();
    // }

    // public addArea(shape: Shape): void {
    //     this._shapesArea += shape.area;
    // }

    // public removeArea(shape: Shape): void {
    //     this._shapesArea -= shape.area;
    // }

    // public getAllAreas(): number {
    //     return this._shapesArea;
    // }

    // public increaseShapesCount(): void {
    //     this._shapesCount++;
    // }

    // public decreaseShapesCount(): void {
    //     this._shapesCount--;
    // }

    // public get shapesCount(): number {
    //     return this._shapesCount;
    // }
}