import { Component, OnInit } from '@angular/core';
import { EvaluatorService } from '../service/evaluator.service';
import { MessageService } from '../service/message.service';
import { Evaluation } from '../model/evaluation';
import { FileParser } from '../util/file.reader';
import { Sequence } from '../model/chain';
import { isString } from 'util';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { SequenceError } from '../model/sequenceError';
import { finalize } from 'rxjs/operators';

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

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData: Array<any>;
  public lineChartGradientsNumbersOptions: any;
  public lineChartGradientsNumbersLabels: Array<any>;
  public lineChartGradientsNumbersColors: Array<any>

  constructor(private evaluatorService: EvaluatorService, private messenger: MessageService) {
    this.allowedFileFormats.add("text/csv");
    this.allowedFileFormats.add("application/vnd.ms-excel");
    this.allowedFileFormats.add("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  }

  ngOnInit() {
    this.initialize()
  }

  // Charts
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

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

  // Form
  fileEvaluator: boolean
  submitted: boolean = false;
  //    Text mode
  pre: string
  n: string
  post: string
  //    File mode
  file: File = null
  allowedFileFormats: Set<string> = new Set<string>();

  //    Sequences
  evaluationDate: Date
  sequences: Sequence[] = []
  shownSequence: Sequence
  sequenceErrors: SequenceError[] = []

  toggleEvaluator() {
    this.fileEvaluator = !this.fileEvaluator
  }

  onSequenceSelect(sequence: Sequence) {
    this.shownSequence = sequence
    this.updateCharts()
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

  clearSequences() {
    this.shownSequence = undefined
    this.sequences = []

    // Bar chart
    //    Labels
    this.lineChartGradientsNumbersLabels.length = 0;

    //    Data
    let tmp = this.lineChartGradientsNumbersData[0]
    tmp.data = undefined
    this.lineChartGradientsNumbersData = [tmp]

    // Big Chart
    //    Labels
    this.lineBigDashboardChartLabels.length = 0;

    //    Data
    let clone: any[] = JSON.parse(JSON.stringify(this.lineBigDashboardChartData));
    for (let i in clone) {
      clone[i].label = undefined
      clone[i].data = []
    }
    this.lineBigDashboardChartData = clone
  }

  clearErrors() {
    this.sequenceErrors.length = 0
  }

  chainFormSubmitted() {
    this.submitted = true;
    if (this.fileEvaluator) {
      this.evaluateFile()
    } else {
      this.evaluateText();
    }
  }

  private evaluateText() {
    let name = "chain" + (this.sequences.length + 1);

    let chain = this.pre;
    if (this.n)
      chain += this.n;
    if (this.post)
      chain += this.post;
    chain = chain.toLocaleUpperCase();

    let pam = this.pre.length + 1;

    this.evaluatorService.evaluate(this.pre, this.n, this.post)
      .pipe(finalize(() => this.submitted = false))
      .subscribe(evaluations => {
        let newSequence = new Sequence(name, chain, pam, evaluations);
        this.shownSequence = newSequence;
        this.sequences.push(newSequence);

        this.updateCharts();
        this.evaluationDate = new Date();
        this.messenger.info("Chain evaluated");
      });
  }

  private async evaluateFile() {
    try {
      let json = await FileParser.parseExcel(this.file);
      this.onExcelParsed(json)
    } catch (e) {
      this.onExcelParsingError(e);
    }
  }

  private onExcelParsed(json: {}[]): void {
    for (const row of json) {
      let name: string = row['Name']
      let chain: string = row['Chain']
      let pam: number = row['PAM']

      if (!this.rowDataIsOK(row['__rowNum__'], name, chain, pam))
        continue;

      let pre = chain.substr(0, pam - 1)
      let n = chain.substr(pam - 1, 1)
      let post = chain.substring(pam + 2)

      this.evaluatorService.evaluate(pre, n, post)
        .pipe(finalize(() => this.submitted = false))
        .subscribe(
          evaluations => {
            let sequence = new Sequence(name, chain, pam, evaluations);
            this.sequences.push(sequence);
            if (!this.shownSequence)
              this.shownSequence = sequence
            this.updateCharts()
            this.evaluationDate = new Date();
          }
        );
    }
    this.messenger.info("Evaluating file");
  }

  private rowDataIsOK(row: number, name: string, chain: string, pam: number): boolean {
    // Checking existence
    if (!name) {
      this.addError(row, "Cannot find value for name (Have you included headers?)");
      return false
    } if (!chain) {
      this.addError(row, "Cannot find value for chain (Have you included headers?)")
      return false
    } if (!pam) {
      this.addError(row, "Cannot find value for pam (Have you included headers?)")
      return false
    }

    // Checking for type validity
    if (!isString(name)) {
      this.addError(row, "Name is not a string")
      return false
    } if (!isString(chain)) {
      this.addError(row, "Chain is not a string")
      return false
    } if (!isNumber(pam)) {
      this.addError(row, "PAM is not a number")
      return false
    }

    let pre = chain.substr(0, pam - 1)
    let n = chain.substr(pam - 1, 1)
    let gg = chain.substr(pam, 2)
    let post = chain.substring(pam + 2)

    // Checking fields' constraints
    if (/.*[^acgtACGT].*/.test(pre.concat(n, gg, post))) {
      this.addError(row, "The chain contains unvalid characters")
      return false
    } if (pre.length < 20) {
      this.addError(row, "The chain is too short. At least 20 amino acids + PAM are required")
      return false
    } if (gg.toLocaleUpperCase() != "GG") {
      this.addError(row, "The PAM position indicated doesn't match the chain")
      return false
    }

    return true;
  }

  addError(row: number, error: string) {
    this.sequenceErrors.push(new SequenceError(this.file.name, row, error));
  }

  private onExcelParsingError(reason: any) {
    this.messenger.error("An error occurred while reading the file", "File error")
  }

  private updateCharts() {
    let pre = this.shownSequence.chain.substr(0, this.shownSequence.pam - 1)
    let post = this.shownSequence.chain.substring(this.shownSequence.pam + 2)

    //Labels
    // COMMENT Workaround for labels -.-'
    let labels = this.shownSequence.evaluations.map(evaluation => evaluation.evaluator)
    this.lineChartGradientsNumbersLabels.length = 0;
    labels.forEach(label => {
      this.lineChartGradientsNumbersLabels.push(label);
    });

    // Workaround to refresh the data
    // COMMENT if there were more than one
    // let clone = JSON.parse(JSON.stringify(this.lineChartGradientsNumbersData));
    let tmp = this.lineChartGradientsNumbersData[0]
    tmp.data = this.shownSequence.evaluations.map(evaluation => evaluation.score)
    this.lineChartGradientsNumbersData = [tmp]


    //////////////////////////////////////////////////////////////////
    // Big Chart
    // Labels
    let label = pre.toLocaleUpperCase()
    label += "NGG"
    if (post)
      label += post.toLocaleUpperCase()

    // COMMENT Workaround for labels -.-'
    let letters = label.split("")
    this.lineBigDashboardChartLabels.length = 0;

    letters.forEach(letter => {
      this.lineBigDashboardChartLabels.push(letter);
    });

    // Data from Map to Array
    let chartData: [number[]] = [[]]
    let j = 0

    for (const evaluation of this.shownSequence.evaluations) {
      let data: number[] = []
      let i = 0

      //pre
      for (let index = -pre.length; index < 0; index++)
        data[i++] = evaluation.assessment.has(index) ? evaluation.assessment.get(index) : 0;

      // NGG
      data[i++] = evaluation.assessment.has(0) ? evaluation.assessment.get(0) : 0;
      data[i++] = 0;
      data[i++] = 0;

      //post
      if (post)
        for (let index = 1; index <= post.length; index++)
          data[i++] = evaluation.assessment.has(index) ? evaluation.assessment.get(index) : 0;

      chartData[j++] = data;
    }

    // COMMENT Workaround for data :/
    let clone = JSON.parse(JSON.stringify(this.lineBigDashboardChartData));
    this.shownSequence.evaluations.forEach((evaluation: Evaluation, i: number) => {
      clone[i].label = evaluation.evaluator
      clone[i].data = chartData[i]
    });
    this.lineBigDashboardChartData = clone
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  private initialize() {
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
        pointBackgroundColor: "#19ffb2",
        pointHoverBackgroundColor: "#19ffb2",
        pointHoverBorderColor: this.chartColor,
      },
      { // dark grey
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        pointBackgroundColor: '#ffb219',
        pointBorderColor: this.chartColor,
        pointHoverBackgroundColor: '#ffb219',
        pointHoverBorderColor: this.chartColor
      },
      { // grey
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        pointBackgroundColor: '#ff19b6',
        pointBorderColor: this.chartColor,
        pointHoverBackgroundColor: '#ff19b6',
        pointHoverBorderColor: this.chartColor
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
    this.gradientFill.addColorStop(0, "rgba(127, 244, 205, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#19ffb2', 0.6));

    let gradientFillB = this.ctx.createLinearGradient(0, 170, 0, 50);
    gradientFillB.addColorStop(0, "rgba(255, 178, 25, 0)");
    gradientFillB.addColorStop(1, this.hexToRGB('#ffb219', 0.6));

    let gradientFillC = this.ctx.createLinearGradient(0, 170, 0, 50);
    gradientFillC.addColorStop(0, "rgba(255, 135, 216, 0)");
    gradientFillC.addColorStop(1, this.hexToRGB('#ff19b6', 0.6));


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
        backgroundColor: [this.gradientFill, gradientFillB, gradientFillC],
        hoverBackgroundColor: [this.gradientFill, gradientFillB, gradientFillC],
        borderColor: ["#19ffb2", "#ffb219", "#ff19b6"],
        pointBorderColor: ["#19ffb2", "#ffb219", "#ff19b6"],
        pointBackgroundColor: ["#19ffb2", "#ffb219", "#ff19b6"]
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
        caretPadding: 10,
        displayColors: false
      },
      responsive: 1,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            stepValue: 0.1,
            max: 1,
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

}
