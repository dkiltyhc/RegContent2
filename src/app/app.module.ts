import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { RdsSummaryComponent } from './rds-summary/rds-summary.component';
import {DataTablesModule} from "angular-datatables";

@NgModule({
  declarations: [
    AppComponent,
    RdsSummaryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
