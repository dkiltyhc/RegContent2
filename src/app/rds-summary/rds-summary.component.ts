import { Component, OnInit,AfterViewChecked,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import 'datatables.net';
//declare var $: any;
@Component({
  selector: 'app-rds-summary',
  templateUrl: './rds-summary.component.html',

  styleUrls: ['./rds-summary.component.css']
})

export class RdsSummaryComponent implements OnInit,AfterViewChecked {
  dataTable: any;
  dataVals:any[];
  constructor(private http: HttpClient, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    //$( ".wb-tables" ).trigger( "wb-init.wb-tables" );
    this.http.get('https://produits-sante.canada.ca/api/rapports-sommaires/api/regulatorydecision/?lang=en&type=json')
      .subscribe((data:any[]) => {
        this.chRef.detectChanges();
        this.dataVals = data;
        console.log(data);
        // Now you can use jQuery DataTables :
        $( ".wb-tables" ).trigger( "wb-init.wb-tables" );
        const table: any = $('#example');
        //this.dataTable = table.DataTable();
        let $table = $("example" );
        console.log($table)
      })


  }

  ngAfterViewChecked() {
    const table: any = $('#example');
    let self=this;
    $( ".wb-tables" ).trigger( "wb-init.wb-tables" );
    let $table = $("example" );
    console.log(table);
   // this.dataTable = table.DataTable();


    var  columns= [
      {"data": "drug_name"},
      {"data": "medical_ingredient"},
      {"data": "manufacturer", "type": "String"},
      {"data": "decision", "type": "String"},
      {"data": "date_decision", "type": "String"},
      {"data": "control_number", "type": "String"},
      {"data": "type_submission", "type": "String"},
      {"data": "din", "type": "String", "visible": false},
      {"data": "din_list", "type": "String", "visible": false},
      {"data": "application_number", "type": "string", "visible": false},
    ];
    //const table: any = $('#example');
    //this.dataTable = table.DataTable();
    console.log(this.dataTable)
 /*   if($table.dataTable){
    $table.dataTable({
      data: dataVals,
      "bDeferRender": false,
      "aoColumns": columns,
      "aaData": dataVals,
      "destroy": true,
      "columnDefs": [
        {
          "render": function (data, type, row) {
            if (data) {
              return data
            }
            return row.application_number
          },
          "targets": 5
        },
        {
          "render": function (data, type, row) {
            if (row.is_md) {
              return '<a href=regulatory-decision-summary-medical-device-detail.html?lang=en&linkID=' + row.link_id + '>' + data.toUpperCase() + '</a>';
            }
            else {
              if (row.summary_title == '') {
                return '<a href=regulatory-decision-summary-detail.html?lang=en&linkID=' + row.link_id + '>' + data.toUpperCase() + '</a>';
              }
              else {
                return '<a href=regulatory-decision-summary-detailTwo.html?lang=en&linkID=' + row.link_id + '>' + data.toUpperCase() + '</a>';
              }
            }
          },
          "targets": 0
        },

      ]
    });
    }*/
  }

}

