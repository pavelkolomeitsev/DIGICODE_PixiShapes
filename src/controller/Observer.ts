export default class Observer {
    private _observers: Function[] = null;
    constructor() {
        this._observers = [];
    }

    public subscribe(fn: Function): void {
        this._observers.push(fn);
    }

    public unsubscribe(fn: Function): void {
        this._observers = this._observers.filter((subscriber: Function) => subscriber !== fn);
    }

    public broadcast(data: string): void {
        this._observers.forEach((subscriber: Function) => subscriber(data));
    }
}