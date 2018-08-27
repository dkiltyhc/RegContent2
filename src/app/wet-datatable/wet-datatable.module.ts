import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WetDatatableDirective } from './wet-datatable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    WetDatatableDirective
  ],
  declarations: [WetDatatableDirective]
})
export class WetDatatableModule { }
