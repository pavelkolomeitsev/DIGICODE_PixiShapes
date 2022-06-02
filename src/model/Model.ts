export default class Model {
    private _areas: number[] = [];
    private _circleArea: number = 7850;
    private _ellipseArea: number = 8792;
    private _hexagonArea: number = 8137.92;
    private _pentagonArea: number = 5393.92;
    private _randomShapeArea: number = 8252.63;
    private _rectangleArea: number = 6000;
    private _triangleArea: number = 2500;

    public addArea(area: number) {
        this._areas.push(area);
    }
    
    public removeArea(): void {
        if (this._areas.length >= 1) this._areas.shift(); // remove from start
    }

    public removeAreaByIndex(index: number): void {
        if (this._areas.length >= 1) this._areas.splice(index, 1); // remove exact element
    }

    public getAreasSurface(): number {
        return (this._areas.length >= 1) ? this._areas.reduce((sum: number, current: number) => sum + current, 0) : 0;
    }

    public get circleArea(): number {
        return this._circleArea;
    }

    public get ellipseArea(): number {
        return this._ellipseArea;
    }

    public get hexagonArea(): number {
        return this._hexagonArea;
    }
    
    public get pentagonArea(): number {
        return this._pentagonArea;
    }

    public get randomShapeArea(): number {
        return this._randomShapeArea;
    }

    public get rectangleArea(): number {
        return this._rectangleArea;
    }
    
    public get triangleArea(): number {
        return this._triangleArea;
    }
}