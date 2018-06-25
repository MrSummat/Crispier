export class Evaluation {

    public assessment: Map<number, number>

    constructor(public evaluator: string, public score: number, assessment: Map<number, number>) {
        this.assessment = new Map<number, number>()
        Object.keys(assessment).forEach(key => {
            this.assessment.set(parseInt(key), assessment[key]);
        });
    }
}