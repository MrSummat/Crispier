import { browser, element, by } from 'protractor';

export class Crispier {
  navigateTo() {
    return browser.get('/');
  }

  getChainEvaluatorFormTitle() {
    return element(by.name('chain_evaluator_title')).getText();
  }
}
