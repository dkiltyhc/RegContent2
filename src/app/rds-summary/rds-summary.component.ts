import { Component,OnDestroy, OnInit,AfterViewChecked,ChangeDetectionStrategy,ChangeDetectorRef,ViewChild,ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
//import $ from "jquery";

import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
//declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-rds-summary',
  templateUrl: './rds-summary.component.html',

  styleUrls: ['./rds-summary.component.css']
})

export class RdsSummaryComponent implements OnInit,OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dataTable: any;
  dataVals:any[];
  jquery: JQuery | any;


  dtOptions: DataTables.Settings = {"paging":true};
  dtTrigger = new Subject();

  constructor(private http: HttpClient, private chRef: ChangeDetectorRef,private el: ElementRef) { }

  ngOnInit() {

    this.http.get('https://produits-sante.canada.ca/api/rapports-sommaires/api/regulatorydecision/?lang=en&type=json')
      .subscribe((data:any[]) => {
        this.chRef.detectChanges();
        this.dataVals = data;
        console.log(this.dtTrigger)
        this.dtTrigger.next();
      })
  }
  ngAfterViewInit(): void {
    //this.dtTrigger.next();
  /*  this.zone.runOutsideAngular(()=>{
      this.$carousel = $(this.el.nativeElement);
    });*/
  }


  onClickMe(){
    console.log("i clicked")
   console.log($(document));
   console.log( jQuery("#table1").DataTable().showId());
    $( "#table1" ).addClass( "wb-tables wb-init" );
    $( "#table1" ).trigger( "wb-init.wb-tables" );

    /**
     // var $table = $( "#example" );
     // $table.removeClass( "wb-tables-inited" ).addClass( "wb-init wb-tables" ).trigger( "wb-init.wb-tables" );
     //$( ".wb-tables" ).trigger( "wb-init.wb-tables" );
     // var $table = $( "#example" );
     //  $table.removeClass( "wb-tables-inited" ).addClass( "wb-init wb-tables" ).trigger( "wb-init.wb-tables" );
     //var link=https://hpr-rps.hres.ca/reg-content/regulatory-decision-summary-medical-device-detail.php?lang=en&linkID=RDS10001

     */


  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    console.log( jQuery("#table1").DataTable());
    jQuery("#table1").DataTable().init();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      var $table = $( "#table1" );
      console.log($)
    //  console.log($("#table1").wbTables());
      // Destroy the table first
//      // Call the dtTrigger to rerender again
      //$table.addClass( "wb-tables wb-init" );

      //$table.trigger( "wb-init.wb-tables" );
     //this.dtTrigger.next();
     // $( "#table1" ).trigger( "wb-init.wb-tables" );
    });
  }
}

