import { CoeficientEvaluator } from "./coeficient.evaluator";
import { CoeficientService } from "../../../service/coeficient.service";

export class CrisprScan extends CoeficientEvaluator {

    constructor(coeficientService: CoeficientService) {
        super("CrisprScan", '/coeficients/crisprscan', coeficientService);
    }

}
