import { Component,OnDestroy, OnInit,AfterViewChecked,ChangeDetectionStrategy,ChangeDetectorRef,ViewChild,ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import {TranslateService} from '@ngx-translate/core';
//import $ from "jquery";

import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
//declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-rds-summary',
  templateUrl: './rds-summary.component.html',

  styleUrls: ['../../GCWeb/css/theme.css']
})

export class RdsSummaryComponent implements OnInit,OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dataTable: any;
  dataVals:any[];
  jquery: JQuery | any;
  dtOptions: DataTables.Settings = {"paging":true};
  dtTrigger = new Subject();
  filterText:string;
  sortAsc:string;
  sortDesc:string;
  emptyTbl:string;
  infoFilt:string;
  load:string;
  first:string;
  last:string;
  next:string;
  prv:string;
  page:string;
  process:string;
  info1000:string;
  infoEmpty:string;
  infoEntr:string;
  lenMenu:string;
  jsonUrl:string;
  constructor(private http: HttpClient, private chRef: ChangeDetectorRef,private el: ElementRef,translate: TranslateService) {
    /**
           translate.setTranslation('en', {
          HELLO: 'hello {{value}}'
      });
     */

    translate.get('table.sortAsc').subscribe((res: string) => {

      this.sortAsc=res;
    });
    translate.get('table.sortDesc').subscribe((res: string) => {

      this.sortDesc=res;
    });
    translate.get('table.infoEmpty').subscribe((res: string) => {

      this.infoEmpty=res;
    });

    translate.get('table.filter').subscribe((res: string) => {

      this.filterText=res;
    });
    translate.get('table.emptyTbl').subscribe((res: string) => {

      this.emptyTbl=res;
    });
    translate.get('table.infoFilt').subscribe((res: string) => {

      this.infoFilt=res;
    });
    translate.get('table.load').subscribe((res: string) => {

      this.load=res;
    });
    translate.get('table.first').subscribe((res: string) => {

      this.first=res;
    });
    translate.get('table.last').subscribe((res: string) => {

      this.last=res;
    });
    translate.get('table.next').subscribe((res: string) => {

      this.next=res;
    });
    translate.get('table.prv').subscribe((res: string) => {

      this.prv=res;
    });
    translate.get('table.page').subscribe((res: string) => {

      this.page=res;
    });
    translate.get('table.process').subscribe((res: string) => {

      this.process=res;
    });
    translate.get('table.info1000').subscribe((res: string) => {

      this.info1000=res;
    });
    translate.get('table.infoEmpty').subscribe((res: string) => {

      this.infoEmpty=res;
    });
    translate.get('table.infoEntr').subscribe((res: string) => {

      this.infoEntr=res;
    });
    translate.get('table.lenMenu').subscribe((res: string) => {
      this.lenMenu=res;
    });

    this.jsonUrl='https://produits-sante.canada.ca/api/rapports-sommaires/api/regulatorydecision/?lang='+translate.currentLang+'&type=json';
  }

  ngOnInit() {


    this.http.get(this.jsonUrl)
      .subscribe((data:any[]) => {

        this.dataVals = data;
        var $elm = $( ".ng-wt-tbl" );
        let i18nText = {
          aria: {
            sortAscending: ( this.sortAsc),
            sortDescending: ( this.sortDesc )
          },
          emptyTable: ( this.emptyTbl ),
          info: (this.infoEntr ),

          infoEmpty: ( this.infoEmpty ),
          infoFiltered: ( this.infoFilt ),
          lengthMenu: ( this.lenMenu ),
          loadingRecords: ( this.load),
          paginate: {
            first: ( this.first ),
            last: ( this.last ),
            next: ( this.next ),
            previous: ( this.prv ),
            page: ( this.page )
          },
          processing: ( this.process ),
          search: ( this.filterText ),
          thousands: ( this.info1000 ),
          zeroRecords: ( this.infoEmpty )

        };

       this.chRef.detectChanges();
        $elm.DataTable(	{
          language: i18nText,
          dom: "<'top'fil>rt<'bottom'p><'clear'>"
        });
        //sorting icons
        $elm.find( "th" ).append( "<span class='sorting-cnt'><span class='sorting-icons'></span></span>" );

       var pagination = $elm.next( ".bottom" ).find( "div:first-child" ),
          paginate_buttons = $elm.next( ".bottom" ).find( ".paginate_button" ),
          ol = document.createElement( "OL" ),
          li = document.createElement( "LI" );

        // Update Pagination List
        for ( var i = 0; i < paginate_buttons.length; i++ ) {
          var item = li.cloneNode( true );
          item.appendChild( paginate_buttons[ i ] );
          ol.appendChild( item );
        }

        ol.className = "pagination mrgn-tp-0 mrgn-bttm-0";
        pagination.empty();
        pagination.append( ol );

        // Update the aria-pressed properties on the pagination buttons
        // Should be pushed upstream to DataTables
        $elm.next( ".bottom" ).find( ".paginate_button" )
          .attr( {
            "role": "button",
            "href": "javascript:;"
          } )
          .not( ".previous, .next" )
          .attr( "aria-pressed", "false" )
          .html( function( index, oldHtml ) {
            return "<span class='wb-inv'>" + i18nText.paginate.page + " </span>" + oldHtml;
          } )
          .filter( ".current" )
          .attr( "aria-pressed", "true" );

        this.chRef.detectChanges();
      // this.dtTrigger.next();

      })
  }
  ngAfterViewInit(): void {

  }



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

