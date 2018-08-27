import {ChangeDetectorRef, Directive, ElementRef, Input, OnDestroy, OnInit, SimpleChanges,} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Directive({
  selector: '[wetDatatable]'
})
export class WetDatatableDirective implements OnDestroy, OnInit {

  /**
   * The DataTable option you pass to configure your table.
   */
  @Input()
  dtOptions: DataTables.Settings = {};
  @Input()
  data = [];
  /**
   * This trigger is used if one wants to trigger manually the DT rendering
   * Useful when rendering angular rendered DOM
   */
  @Input()
  dtTrigger: Subject<any>;


  /**
   * The DataTable instance built by the jQuery library [DataTables](datatables.net).
   *
   * It's possible to execute the [DataTables APIs](https://datatables.net/reference/api/) with
   * this variable.
   */
  dtInstance: Promise<DataTables.Api>;

  // Only used for destroying the table when destroying this directive
  private dt: DataTables.Api;

  private elm;
  //dataVals= [];
  filterText: string = 'foo';
  sortAsc: string;
  sortDesc: string;
  emptyTbl: string;
  infoFilt: string;
  load: string;
  first: string;
  last: string;
  next: string;
  prv: string;
  page: string;
  process: string;
  info1000: string;
  infoEmpty: string;
  infoEntr: string;
  lenMenu: string;
  jsonUrl: string;
  lang: string;


  constructor(private el: ElementRef, private http: HttpClient, private chRef: ChangeDetectorRef, translate: TranslateService) {

    translate.get('table.sortAsc').subscribe((res: string) => {

      this.sortAsc = res;
    });
    translate.get('table.sortDesc').subscribe((res: string) => {

      this.sortDesc = res;
    });
    translate.get('table.infoEmpty').subscribe((res: string) => {

      this.infoEmpty = res;
    });

    translate.get('table.filter').subscribe((res: string) => {

      this.filterText = res;
    });
    translate.get('table.emptyTbl').subscribe((res: string) => {

      this.emptyTbl = res;
    });
    translate.get('table.infoFilt').subscribe((res: string) => {

      this.infoFilt = res;
    });
    translate.get('table.load').subscribe((res: string) => {

      this.load = res;
    });
    translate.get('table.first').subscribe((res: string) => {

      this.first = res;
    });
    translate.get('table.last').subscribe((res: string) => {

      this.last = res;
    });
    translate.get('table.next').subscribe((res: string) => {

      this.next = res;
    });
    translate.get('table.prv').subscribe((res: string) => {

      this.prv = res;
    });
    translate.get('table.page').subscribe((res: string) => {

      this.page = res;
    });
    translate.get('table.process').subscribe((res: string) => {

      this.process = res;
    });
    translate.get('table.info1000').subscribe((res: string) => {

      this.info1000 = res;
    });
    translate.get('table.infoEmpty').subscribe((res: string) => {

      this.infoEmpty = res;
    });
    translate.get('table.infoEntr').subscribe((res: string) => {

      this.infoEntr = res;
    });
    translate.get('table.lenMenu').subscribe((res: string) => {
      this.lenMenu = res;
    });

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      //this.dataVals=changes.data.currentValue;
      if (this.dt) this.dt.destroy();
      this.displayTable();
    }
  }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.dt) {
      this.dt.destroy(true);
    }
  }


  private displayTable(): void {
    this.dtInstance = new Promise((resolve, reject) => {
      Promise.resolve(this.dtOptions).then(dtOptions => {
        // Using setTimeout as a "hack" to be "part" of NgZone
        setTimeout(() => {

          let i18nText = {
            aria: {
              sortAscending: (this.sortAsc),
              sortDescending: (this.sortDesc)
            },
            emptyTable: (this.emptyTbl),
            info: (this.infoEntr),

            infoEmpty: (this.infoEmpty),
            infoFiltered: (this.infoFilt),
            lengthMenu: (this.lenMenu),
            loadingRecords: (this.load),
            paginate: {
              first: (this.first),
              last: (this.last),
              next: (this.next),
              previous: (this.prv),
              page: (this.page)
            },
            processing: (this.process),
            search: (this.filterText),
            thousands: (this.info1000),
            zeroRecords: (this.infoEmpty)

          };
          this.chRef.detectChanges();
          dtOptions = {
            language: i18nText,
            order: [4, 'desc'],
            dom: "<'top'fil>rt<'bottom'p><'clear'>"
          }

          this.dt = $(this.el.nativeElement).DataTable(dtOptions);
          if (!$(this.el.nativeElement).find("th").find('span').hasClass("sorting-icons")) {
            $(this.el.nativeElement).find("th").append("<span class='sorting-cnt'><span class='sorting-icons'></span></span>");
          }
          var pagination = $(this.el.nativeElement).next(".bottom").find("div:first-child"),
            paginate_buttons = $(this.el.nativeElement).next(".bottom").find(".paginate_button"),
            ol = document.createElement("OL"),
            li = document.createElement("LI");
          // Update Pagination List
          for (var i = 0; i < paginate_buttons.length; i++) {
            var item = li.cloneNode(true);
            item.appendChild(paginate_buttons[i]);
            ol.appendChild(item);
          }
          ol.className = "pagination mrgn-tp-0 mrgn-bttm-0";
          pagination.empty();
          pagination.append(ol);
          // Update the aria-pressed properties on the pagination buttons
          // Should be pushed upstream to DataTables
          $(this.el.nativeElement).next(".bottom").find(".paginate_button")
            .attr({
              "role": "button",
              "href": "javascript:;"
            })
            .not(".previous, .next")
            .attr("aria-pressed", "false")
            .html(function (index, oldHtml) {
              return "<span class='wb-inv'>" + i18nText.paginate.page + " </span>" + oldHtml;
            })
            .filter(".current")
            .attr("aria-pressed", "true");
        });
        resolve(this.dt);
      });
    });
  }


}
