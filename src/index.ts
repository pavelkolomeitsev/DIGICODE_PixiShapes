import * as PIXI from "pixi.js";

const app: PIXI.Application = new PIXI.Application({
    view: document.getElementById("canvas") as HTMLCanvasElement,
    width: 900,
    height: 600
});