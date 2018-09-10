import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RdsSummaryComponent } from './rds-summary/rds-summary.component';
import {DataTablesModule} from "angular-datatables";

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {WetDatatableModule} from "./wet-datatable/wet-datatable.module";
import { RouterModule, Routes } from '@angular/router';
import {SummaryDetailsComponent} from "./summary-details/summary-details/summary-details.component";
import {SummaryDetailsModule} from "./summary-details/summary-details.module";
import {routingModule}  from "./routing/routing.module";


@NgModule({
  declarations: [
    AppComponent,
    RdsSummaryComponent
  ],
  imports: [
    routingModule,
    BrowserModule,
    HttpClientModule,
    DataTablesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },

    }),

    WetDatatableModule,
    SummaryDetailsModule,



  ],
  exports: [
    TranslateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http);
  return new TranslateHttpLoader(http, '../assets/i18n/datatable/', '.json');
}
