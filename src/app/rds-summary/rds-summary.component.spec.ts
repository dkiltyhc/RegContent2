import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdsSummaryComponent } from './rds-summary.component';

describe('RdsSummaryComponent', () => {
  let component: RdsSummaryComponent;
  let fixture: ComponentFixture<RdsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
