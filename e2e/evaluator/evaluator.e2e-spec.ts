import { Crispier } from './evaluator.po';

describe('Crispier - Evaluator', () => {
  let page: Crispier;

  beforeEach(() => {
    page = new Crispier();
  });

  it('should display the title for the chain evaluation form', () => {
    page.navigateTo();
    expect(page.getChainEvaluatorFormTitle()).toEqual('Chain Evaluator');
  });

  it("should display a danger warning if no chain before NGG is introduced and other is", () => {
    page.navigateTo();
  });
});
