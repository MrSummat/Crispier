import { Component, OnInit } from '@angular/core';
import { EvaluatorService } from '../evaluator.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  score: number

  constructor(private evaluatorService: EvaluatorService) { }

  ngOnInit() {
  }

  evaluate(chain: string): void {
    this.evaluatorService.evaluate(chain).subscribe(score => this.score = score);
  }

}
