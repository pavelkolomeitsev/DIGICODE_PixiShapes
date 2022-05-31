import * as PIXI from "pixi.js";
import Controller from "./controller/Controller";

const app: PIXI.Application = new PIXI.Application({
    view: document.getElementById("canvas") as HTMLCanvasElement,
    width: 900,
    height: 600
});

new Controller(app);