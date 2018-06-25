import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UploaderComponent } from './uploader/uploader.component';
import { KeepReuseStrategy } from './route.reuse.strategy';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: KeepReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
