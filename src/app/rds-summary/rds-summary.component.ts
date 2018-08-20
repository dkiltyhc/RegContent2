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
  infoEmpty:string;
  constructor(private http: HttpClient, private chRef: ChangeDetectorRef,private el: ElementRef,translate: TranslateService) {

    translate.get('table.sortAsc').subscribe((res: string) => {
      console.log(res);
      this.sortAsc=res;
    });
    translate.get('table.infoEmpty').subscribe((res: string) => {
      console.log(res);
      this.infoEmpty=res;
    });


   // "table.sortAsc": "activate for ascending sort	&#160",
      //"table.infoFilt":"(filtered from _MAX_ total entries)"
  }

  ngOnInit() {


    this.http.get('https://produits-sante.canada.ca/api/rapports-sommaires/api/regulatorydecision/?lang=en&type=json')
      .subscribe((data:any[]) => {

        this.dataVals = data;
        var $elm = $( "#table1" );
        let i18nText = {
          aria: {
            sortAscending: ( this.sortAsc),
            sortDescending: ( "sortDesc" )
          },
          emptyTable: ( "emptyTblTag" ),

          infoEmpty: ( this.infoEmpty ),
          infoFiltered: ( "infoFilt" ),

          loadingRecords: ( "load" ),
          paginate: {
            first: ( "First" ),
            last: ( "Last" ),
            next: ( "Next" ),
            previous: ( "prv" ),
            page: ( "page" )
          },
          processing: ( "process" ),
          search: ( this.filterText ),
          thousands: ( "info1000" ),
          zeroRecords: ( "infoEmpty" )
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

