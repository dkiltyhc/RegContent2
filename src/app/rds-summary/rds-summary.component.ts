import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataTableDirective} from 'angular-datatables';
import {TranslateService} from '@ngx-translate/core';

//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-rds-summary',
  templateUrl: './rds-summary.component.html',

  styleUrls: ['../../GCWeb/css/theme.css']
})

export class RdsSummaryComponent implements OnInit {
/*  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;*/
  lang: string;
  jsonUrl:string;
  dataVals=[];

  constructor(private http: HttpClient, private chRef: ChangeDetectorRef, private el: ElementRef, translate: TranslateService) {
    this.lang = translate.currentLang;
    this.jsonUrl = 'https://produits-sante.canada.ca/api/rapports-sommaires/api/regulatorydecision/?lang=' + this.lang + '&type=json';
  }

  ngOnInit() {

    this.http.get(this.jsonUrl)
      .subscribe((data: any[]) => {

        setTimeout(() => {
         this._processData(data, this.lang);
          this.dataVals = data;
        })
      })
  }



  /**
   * Add the hyperlink to the drug name to get the details page
   * @param data
   * @param lang
   * @private
   */
  _processData(data, lang) {
    data.forEach(function (rec) {
      let temp = '<a href="regulatory-decision-summary-medical-device-detail.php?lang=' + lang + '&amp;linkID=' + rec.link_id + '">' + rec.drug_name + '</a>';
      rec.drug_name = temp;
    });


  }


}

