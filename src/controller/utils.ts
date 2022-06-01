import { rgb2hex } from "@pixi/utils";

export function getRandomColor(): number {
    const red: number = Math.floor(Math.random() * 255);
    const green: number = Math.floor(Math.random() * 255);
    const blue: number = Math.floor(Math.random() * 255);
    return rgb2hex([red, green, blue]);
}

export function getXPos(): number {
    return (Math.floor(Math.random() * 700) + 50);
}