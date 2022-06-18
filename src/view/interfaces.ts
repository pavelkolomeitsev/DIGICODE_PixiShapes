import Shape from "./shapes/Shape";

export default interface CreateShape {
    create(color: number, width?: number, height?: number, radius?: number, angle?: number): Shape;
}