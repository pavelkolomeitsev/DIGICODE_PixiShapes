export default class Model {
    private _shapes: string[] = [];
    
    public getShapes(): string[] {
        if (this._shapes.length >= 1) return this._shapes;
    }

    public addShapeType(shapeType: string) {
        this._shapes.push(shapeType);
    }
    
    public removeShapeType(): string {
        if (this._shapes.length >= 1) return this._shapes.pop(); // remove last
    }

    public removeByIndex(index: number): string {
        if (this._shapes.length >= 1) return this._shapes.splice(index, 1)[0];
    }
}