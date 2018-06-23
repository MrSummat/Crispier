import { Evaluator } from "../evaluator";
import { Coeficient } from "../../coeficient";
import { CoeficientService } from "../../../service/coeficient.service";

export abstract class CoeficientEvaluator implements Evaluator {

    coeficients: Coeficient[]

    constructor(public name: string, protected path: string, private coeficientService: CoeficientService) {
        this.getCoeficients()
    }

    evaluate(pre: string, n: string, post: string): [number, Map<number, number>] {

        let result = 0;
        let evaluation = new Map<number, number>();
        let maxIndex = Math.max(...this.coeficients.map(coeficient => coeficient.position));
        let minIndex = Math.min(...this.coeficients.map(coeficient => coeficient.position));

        while (pre.length < Math.abs(minIndex))
            pre = "X" + pre

        while (post && post.length < maxIndex)
            post = post + "X"

        this.coeficients.forEach(c => {

            let string: string
            let position: number = c.position

            if (c.position)
                evaluation.set(c.position, 0)

            if (c.position < 0)
                string = pre
            else if (c.position > 0) {
                if (post) {
                    string = post
                    position = position - 1
                } else
                    return;
            } else if (n)
                string = n
            else
                return

            // COMMENT
            // console.log(this.name + " C.String: " + c.string + " - String: " + string + " - Position: " + position)

            if (c.string.toLowerCase() == "intercept" ||
                c.string.toUpperCase() == string.substr(position, c.string.length).toUpperCase()) {
                result += c.value
                evaluation.set(c.position, c.value)
            }
        });

        return [result, evaluation];
    }

    getCoeficients(): void {
        this.coeficientService.getCoeficients(this.path).subscribe(coeficients => this.coeficients = coeficients);
    }

}