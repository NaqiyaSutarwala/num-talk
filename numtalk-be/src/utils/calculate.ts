// src/utils/calculate.ts
import { ApiError } from "./ApiError";

export const calculate = (a: number, op: string, b: number) => {
    if (op === "/" && b === 0) {
        throw new ApiError(400, "Division by zero");
    }

    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        default: throw new ApiError(400, "Invalid operation");
    }
};