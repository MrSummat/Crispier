import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Evaluator } from '../model/evaluator/evaluator';
import { EvaluatorService } from '../service/evaluator.service';
import { MessageService } from '../service/message.service';
import { Evaluation } from '../model/evaluation';

@Component({
  selector: 'app-evaluator',
  templateUrl: './evaluator.component.html',
  styleUrls: ['./evaluator.component.css']
})
export class EvaluatorComponent implements OnInit {

  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas: any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData: Array<any>;
  public lineBigDashboardChartOptions: any;
  public lineBigDashboardChartLabels: Array<any>;
  public lineBigDashboardChartColors: Array<any>

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType;
  public lineChartData: Array<any>;
  public lineChartOptions: any;
  public lineChartLabels: Array<any>;
  public lineChartColors: Array<any>

  public lineChartWithNumbersAndGridType;
  public lineChartWithNumbersAndGridData: Array<any>;
  public lineChartWithNumbersAndGridOptions: any;
  public lineChartWithNumbersAndGridLabels: Array<any>;
  public lineChartWithNumbersAndGridColors: Array<any>

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData: Array<any>;
  public lineChartGradientsNumbersOptions: any;
  public lineChartGradientsNumbersLabels: Array<any>;
  public lineChartGradientsNumbersColors: Array<any>

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  constructor(private evaluatorService: EvaluatorService, private messenger: MessageService) {
    this.allowedFileFormats.add("text/csv");
    this.allowedFileFormats.add("application/vnd.ms-excel");
    this.allowedFileFormats.add("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  }

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("bigDashboardChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    // Charts

    this.lineBigDashboardChartData = [
      {
        label: "Data 1",

        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,

        borderWidth: 2,
        data: []
      }, {
        label: "Data 2",

        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,

        borderWidth: 2,
        data: []
      }, {
        label: "Data 3",

        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,

        borderWidth: 2,
        data: []
      }
    ];

    this.lineBigDashboardChartColors = [
      { // black
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        pointBorderColor: this.chartColor,
        pointBackgroundColor: "#2c2c2c",
        pointHoverBackgroundColor: "#2c2c2c",
        pointHoverBorderColor: this.chartColor,
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: this.chartColor,
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: this.chartColor,
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];

    this.lineBigDashboardChartLabels = []
    this.lineBigDashboardChartOptions = {

      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 0
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      legend: {
        position: "bottom",
        fillStyle: "#FFF",
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10
          },
          gridLines: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent"
          }

        }],
        xAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            display: false,

          },
          ticks: {
            padding: 10,
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold"
          }
        }]
      }
    };

    this.lineBigDashboardChartType = 'line';

    // 

    this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


    this.lineChartGradientsNumbersData = [
      {
        label: "Score",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: []
      }
    ];
    this.lineChartGradientsNumbersColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
      }
    ];

    this.lineChartGradientsNumbersLabels = [] //this.evaluators.map(evaluator => evaluator.name)
    this.lineChartGradientsNumbersOptions = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    }

    this.lineChartGradientsNumbersType = 'bar';
  }

  /////////////////////////////////////////////////////////////////
  // FORM

  pre: string
  n: string
  post: string

  evaluationDate: Date
  evaluations: Evaluation[] = []

  public fileEvaluator: boolean = true
  file: File = null
  allowedFileFormats: Set<string> = new Set<string>();

  submitted: boolean = false;

  toggleEvaluator() {
    this.fileEvaluator = !this.fileEvaluator
  }

  chainSubmitted() {
    this.submitted = true;
    if (this.fileEvaluator) {

    } else {
      this.evaluatorService.evaluate(this.pre, this.n, this.post).subscribe(
        evaluations => { this.evaluations = evaluations; this.updateCharts(); }
      );
    }
  }



  fileChange(files: FileList) {
    let file = files.item(0);
    if (file)
      if (this.allowedFileFormats.has(file.type))
        this.file = file;
      else {
        this.file = null;
        this.messenger.error("Please select a file with an allowed format", "File format error");
      }
  }

  updateCharts() {
    //Labels
    // COMMENT Workaround for labels -.-'
    let labels = this.evaluations.map(evaluation => evaluation.evaluator)
    this.lineChartGradientsNumbersLabels.length = 0;
    labels.forEach(label => {
      this.lineChartGradientsNumbersLabels.push(label);
    });

    // Workaround to refresh the data
    // COMMENT if there were more than one
    // let clone = JSON.parse(JSON.stringify(this.lineChartGradientsNumbersData));
    let tmp = this.lineChartGradientsNumbersData[0]
    tmp.data = this.evaluations.map(evaluation => evaluation.score)
    this.lineChartGradientsNumbersData = [tmp]



    //////////////////////////////////////////////////////////////////
    // Big Chart
    // Labels
    let label = this.pre.toLocaleUpperCase()
    label += "NGG"
    if (this.post)
      label += this.post.toLocaleUpperCase()

    // COMMENT Workaround for labels -.-'
    let letters = label.split("")
    this.lineBigDashboardChartLabels.length = 0;

    letters.forEach(letter => {
      this.lineBigDashboardChartLabels.push(letter);
    });

    // Data from Map to Array
    let chartData: [number[]] = [[]]
    let j = 0

    this.evaluations.map(evaluation => evaluation.assessment)
      .forEach((assessment: Map<number, number>) => {
        let data: number[] = []
        let i = 0

        let map = new Map<number, number>()
        for (let index = 0; index < 10; index++) {
          map.set(i, i)
        }

        //pre
        for (let index = -this.pre.length; index < 0; index++) {
          data[i++] = assessment.has(index) ? assessment.get(index) : 0;
        }

        // NGG
        data[i++] = assessment.has(0) ? assessment.get(0) : 0;
        data[i++] = 0;
        data[i++] = 0;

        //post
        if (this.post)
          for (let index = 1; index <= this.post.length; index++) {
            data[i++] = assessment.has(index) ? assessment.get(index) : 0;
          }

        chartData[j++] = data;
      });


    // COMMENT Workaround for data :/
    let clone = JSON.parse(JSON.stringify(this.lineBigDashboardChartData));
    this.evaluations.forEach((evaluation: Evaluation, i: number) => {
      clone[i].label = evaluation.evaluator
      clone[i].data = chartData[i]
    });
    this.lineBigDashboardChartData = clone

    this.evaluationDate = new Date()
    this.messenger.info("Chain evaluated")
    this.submitted = false;
  }

}
