import { Component, OnInit } from '@angular/core';
import { EvaluatorService } from '../evaluator.service'
import { Coeficient } from '../coeficient';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  score: number
  coeficients: Coeficient[] = [new Coeficient("AA", 10, +0.1584)]

  constructor(private evaluatorService: EvaluatorService) { }

  ngOnInit() {
    this.getCoeficients()
  }

  evaluate(chain: string): void {
    if (!chain.trim()) {
      return;
    }

    let result = 0;

    this.coeficients.forEach(c => {
      if (c.string.toUpperCase() == chain.substr(c.position, c.string.length).toUpperCase() ||
          c.string.toLowerCase() == "intercept")
        result += c.value
    });

    this.score = result
  }

  getCoeficients(): void {
    this.evaluatorService.getCoeficients().subscribe(coeficients => this.coeficients = coeficients);
  }

}
