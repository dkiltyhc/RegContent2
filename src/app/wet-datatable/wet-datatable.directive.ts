
import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[wetDatatable]'
})
export class WetDatatableDirective implements OnDestroy, OnInit {

  /**
   * The DataTable option you pass to configure your table.
   */
  @Input()
  dtOptions: DataTables.Settings = {};

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

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.dtTrigger) {
      this.dtTrigger.subscribe(() => {
        this.displayTable();
      });
    } else {
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
          this.dt = $(this.el.nativeElement).DataTable(dtOptions);
          resolve(this.dt);
        });
      });
    });
  }
}
