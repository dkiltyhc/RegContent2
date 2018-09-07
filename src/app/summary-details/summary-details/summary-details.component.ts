import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-summary-details',
  templateUrl: './summary-details.component.html',
  styleUrls: ['./summary-details.component.css']
})
export class SummaryDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe( params => console.log(params) );
  }

  ngOnInit() {
  }

}
