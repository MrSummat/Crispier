import { CoeficientEvaluator } from "./coeficient.evaluator";
import { CoeficientService } from "../../../service/coeficient.service";

export class CrispRater extends CoeficientEvaluator {

    constructor(coeficientService: CoeficientService) {
        super("CrispRater", '/coeficients/crisprater', coeficientService);
    }

}
