import { Routes } from '@angular/router';

import { EvaluatorComponent } from '../../evaluator/evaluator.component';
import { UploaderComponent } from '../../uploader/uploader.component';

export const UserLayoutRoutes: Routes = [
    { path: 'evaluator',      component: EvaluatorComponent },
    { path: 'contribute',     component: UploaderComponent},
];
