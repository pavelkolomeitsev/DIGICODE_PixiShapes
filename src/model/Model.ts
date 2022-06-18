export default class Model {
    private _shapes: string[] = [];
    
    public addShapeType(shapeType: string) {
        this._shapes.push(shapeType);
    }
    
    public removeShapeType(): string {
        if (this._shapes.length >= 1) return this._shapes.pop(); // remove last
    }
}