import { Coeficient } from "../coeficient";

export interface Evaluator {

    name: string

    evaluate(pre: string, n: string, post: string): [number, Map<number, number>]
}