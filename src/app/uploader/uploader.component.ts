import { Component, OnInit } from '@angular/core';
import { ContributionServiceImpl } from '../service/contribution.service.impl';
import { MessageServiceImpl } from '../service/message.service.impl';
import { SequenceError } from '../model/sequenceError';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ContributionService } from '../service/contribution.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  providers: [
    { provide: ContributionService, useClass: ContributionServiceImpl },
    { provide: MessageService, useClass: MessageServiceImpl }
  ]
})
export class UploaderComponent implements OnInit {

  file: File = null
  allowedFileFormats: Set<string> = new Set<string>();
  fileErrors: SequenceError[] = []
  submitted: boolean

  constructor(private messenger: MessageService, private uploader: ContributionService) {
    this.allowedFileFormats.add("text/csv");
    this.allowedFileFormats.add("application/vnd.ms-excel");
    this.allowedFileFormats.add("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  }

  ngOnInit() {
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

  uploadFile() {
    this.submitted = true;
    let upload = this.uploader.postFile(this.file)

    upload.pipe(finalize(() => this.submitted = false))
      .subscribe(errors => {
        if (errors.length == 0)
          this.messenger.success("File uploaded successfully");
        else {
          this.fileErrors = errors;
          this.messenger.error("Error(s) occurred while evaluating the file")
        }
      }, error => {
        this.messenger.error("An error occurred while uploading the file");
      });
  }

  clearErrors() {
    this.fileErrors.length = 0
  }

}
