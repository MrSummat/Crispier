import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Evaluator } from '../model/evaluator/evaluator';
import { CrisprScan } from '../model/evaluator/coeficient/crisprscan';
import { CoeficientService } from '../service/coeficient.service';
import { SCC } from '../model/evaluator/coeficient/scc';
import { CrispRater } from '../model/evaluator/coeficient/crisprater';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  constructor(private coeficientService: CoeficientService, private messenger: MessageService) { }

  ngOnInit() {
    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("bigDashboardChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    // Evaluators

    this.evaluators = [
      new CrisprScan(this.coeficientService),
      new SCC(this.coeficientService),
      new CrispRater(this.coeficientService)
    ]

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
    this.lineChartGradientsNumbersLabels = this.evaluators.map(evaluator => evaluator.name)
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

  /*
  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData:Array<any>;
  public lineChartGradientsNumbersOptions:any;
  public lineChartGradientsNumbersLabels:Array<any>;
  public lineChartGradientsNumbersColors:Array<any>
  */

  submitted: boolean = false;

  evaluators: Evaluator[]

  chainSubmitted() {
    this.submitted = true;

    let scores: number[] = []
    let evaluations: [Map<number, number>] = [new Map()]
    this.evaluators.forEach((evaluator: Evaluator, i: number) => {
      [scores[i], evaluations[i]] = evaluator.evaluate(this.pre, this.n, this.post);
    })

    // Workaround to refresh the data
    // COMMENT if there were more than one
    // let clone = JSON.parse(JSON.stringify(this.lineChartGradientsNumbersData));
    let tmp = this.lineChartGradientsNumbersData[0]
    tmp.label = "Score"
    tmp.data = scores
    this.lineChartGradientsNumbersData = [tmp]

    //////////////////////////////////////////////////////////////////
    // Big Chart
    // Labels
    let label = this.pre.toLocaleUpperCase()
    // if (this.n)
      // label += this.n.toLocaleUpperCase()
    // else
    //   label += "N"
    label += "NGG"
    if (this.post)
      label += this.post.toLocaleUpperCase()

    // COMMENT Workaround for labels -.-'
    let letters = label.split("")
    this.lineBigDashboardChartLabels.length = 0;
    for (let i = 0; i < letters.length; i++)
      this.lineBigDashboardChartLabels.push(letters[i]);

    // Data
    // Eliminating evaluation of positions not introduced by the user
    for (let map of evaluations)
      for (let position of map.keys()) {
        if (position < 0 && Math.abs(position) > this.pre.length)
          map.delete(position);
        if (position == 0 && !this.n)
          map.delete(position);
        if (position > 0 && this.post && position > this.post.length)
          map.delete(position);
      }

    // Map to Array
    let chartData: [number[]] = [[]]
    let j = 0
    for (let map of evaluations) {
      let data: number[] = []
      let i = 0

      //pre
      for (let index = -this.pre.length; index < 0; index++) {
        data[i++] = map.has(index) ? map.get(index) : 0;
      }

      // NGG
      data[i++] = map.has(0) ? map.get(0) : 0;
      data[i++] = 0;
      data[i++] = 0;

      //post
      if (this.post)
        for (let index = 1; index <= this.post.length; index++) {
          data[i++] = map.has(index) ? map.get(index) : 0;
        }
      
      chartData[j++] = data;
    }

    // COMMENT Workaround for data :/
    let clone = JSON.parse(JSON.stringify(this.lineBigDashboardChartData));
    for (let i in this.evaluators) {
      clone[i].label = this.evaluators[i].name
      clone[i].data = chartData[i]
    }
    this.lineBigDashboardChartData = clone

    this.evaluationDate = new Date()
    this.messenger.info("Chain evaluated")
    this.submitted = false;
  }

}
