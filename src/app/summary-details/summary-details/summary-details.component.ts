import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-summary-details',
  templateUrl: './summary-details.component.html',
  styleUrls: ['./summary-details.component.css']
})
export class SummaryDetailsComponent implements OnInit {

  private detail_id:string;
  private jsonUrl:string;
  private lang:string='en';
  public detailData={};
  constructor(private route: ActivatedRoute,private http: HttpClient, private translate: TranslateService) {
    this.lang = translate.currentLang;
    this.jsonUrl = 'https://health-products.canada.ca/api/dhpr/controller/dhprController.ashx?lang=' + this.lang ;
    this.route.params.subscribe( params => console.log(params) );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("params")
      console.log(params)
      console.log(params.id)
      this.detail_id=params.id;
      console.log(this._getPType(params.id));
      this.jsonUrl+= ("&pType="+this._getPType(this.detail_id)+ '&linkID=');
      console.log(this.jsonUrl)
      this.http.get(this.jsonUrl+this.detail_id)
        .subscribe((data: any[]) => {
          setTimeout(() => {
           // this._processData(data, this.lang);
            //this.dataVals = data;
            console.log(data);
            this.detailData=data;
          })
        })
    });
  }

  private _getPType(id:string):string{

    if(id.match(/rds/gi)){
      return'rds'
    }else if(id.match(/sbd/gi)){
      return 'sbd';
    }
    return null;
  }

}
