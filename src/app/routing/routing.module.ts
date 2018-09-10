import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { RdsSummaryComponent } from "../rds-summary/rds-summary.component";
import {SummaryDetailsComponent} from "../summary-details/summary-details/summary-details.component";
const routes: Routes = [
  { path: "products", component: RdsSummaryComponent },
  { path: "summary-details/:id", component: SummaryDetailsComponent },
  { path: "", redirectTo: "/products", pathMatch: "full" }
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
