import { Evaluation } from './evaluation';

export class Sequence {

    constructor(public name: string, public chain: string, public pam: number, public evaluations: Evaluation[]) { }

}