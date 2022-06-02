import { rgb2hex } from "@pixi/utils";

export const INTERVAL: number = 2000;
export const MIN_SHAPES_AMOUNT: number = 1;
export const CONTAINERS_HEIGHT: number = 100;
export const MIN_GRAVITY_VALUE: number = 1;
export const MAX_GRAVITY_VALUE: number = 20;

export function getRandomColor(): number {
    const red: number = Math.floor(Math.random() * 255);
    const green: number = Math.floor(Math.random() * 255);
    const blue: number = Math.floor(Math.random() * 255);
    return rgb2hex([red, green, blue]);
}

export function getXPos(): number {
    return (Math.floor(Math.random() * 700) + 50);
}