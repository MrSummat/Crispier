import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLayoutRoutes } from './user-layout.routing';
import { EvaluatorComponent } from '../../evaluator/evaluator.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UploaderComponent } from '../../uploader/uploader.component';
import { MessageServiceImpl } from '../../service/message.service.impl';
import { FileParser } from '../../util/file.parser';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    EvaluatorComponent,
    UploaderComponent
  ],
  providers: [
      MessageServiceImpl,
      FileParser
  ]
})

export class UserLayoutModule {}
