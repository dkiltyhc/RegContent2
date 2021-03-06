import { Component, OnInit,AfterViewInit,Renderer} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rds-summary',
  templateUrl: './rds-summary.component.html',

  styleUrls: ['../../GCWeb/css/theme.css']
})

export class RdsSummaryComponent implements OnInit,AfterViewInit {
/*  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;*/
  lang: string;
  jsonUrl:string;
  dataVals=[];
  linkId="";

  constructor(private http: HttpClient, private translate: TranslateService, private route: ActivatedRoute) {
    this.lang = translate.currentLang;
    this.jsonUrl = 'https://produits-sante.canada.ca/api/rapports-sommaires/api/regulatorydecision/?lang=' + this.lang + '&type=json';
    this.linkId=route.snapshot.params['id']
  }

  ngOnInit() {

    this.http.get(this.jsonUrl)
      .subscribe((data: any[]) => {

        setTimeout(() => {
         this._processData(data, this.lang);
          this.dataVals = data;
          console.log(this.dataVals);
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
     // let temp = '<a  href="#/summary-details?lang=' + lang + '&amp;linkID=' + rec.link_id + '">' + rec.drug_name + ' </a>';
      //let temp = '<a   routerLink="/summary-details"  routerLinkActive="active">' + rec.drug_name + ' </a>';
    // console.log(temp)
     // rec.drug_name = temp;
      //https://hpr-rps.hres.ca/reg-content/regulatory-decision-summary-detail.php?lang=en&linkID=RDS00401
    });
  }

    ngAfterViewInit(): void {
    /*  this.renderer.listenGlobal('document', 'click', (event) => {
     console.log(event.target)
      if (event.target.hasAttribute("summary-details")) {
        console.warn("view"+event.target.getAttribute("foo"));
       // this.router.navigate(["/person/" + event.target.getAttribute("view-person-id")]);
      }
    });*/
  }
  /*public gotoProductDetailsV2(url, id) {
    var myurl = `${url}/${id}`;
    console.log(myurl);

    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }*/

}

