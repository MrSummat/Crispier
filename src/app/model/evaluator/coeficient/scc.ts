import { CoeficientEvaluator } from "./coeficient.evaluator";
import { CoeficientService } from "../../../service/coeficient.service";

export class SCC extends CoeficientEvaluator {

    constructor(coeficientService: CoeficientService) {
        super("SCC", '/coeficients/scc', coeficientService);
    }    

}