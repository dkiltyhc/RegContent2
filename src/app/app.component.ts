import {Component, OnInit} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {TranslateService} from '@ngx-translate/core';
import { Router, Routes } from '@angular/router';
import {SummaryDetailsComponent} from "./summary-details/summary-details/summary-details.component";

const routes: Routes = [
  { path: 'summary-details/:id', component: SummaryDetailsComponent }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'app';
  router;




  constructor(translate: TranslateService,http: HttpClient,private _router: Router) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
    this.router = _router;
  }

  ngOnInit() {

  }

}
