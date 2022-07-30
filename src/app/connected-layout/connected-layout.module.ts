import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PlanningManagementComponent } from './planning-management/planning-management.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ConnectedLayoutComponent } from './connected-layout.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import {MatMenuModule} from '@angular/material/menu';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AppointmentModule } from './appointment/appointment.module';
import { LeaveModule } from './leave/leave.module';
import {MatIconModule} from '@angular/material/icon';
import { ExpensesModule } from './expenses/expenses.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SearchUserComponent } from './search-user/search-user.component';

import { Ng2SearchPipeModule } from "ng2-search-filter";
import { SearchComponent } from './search/search.component';


//import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [TeamComponent, PayrollComponent, PlanningManagementComponent, ProfileComponent,ConnectedLayoutComponent, CompanySettingsComponent, UpdateProfileComponent, SearchUserComponent, SearchComponent],
  imports: [
   
    Ng2SearchPipeModule,

    CommonModule,
   
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AppointmentModule,
    ExpensesModule,
    LeaveModule,
    DashboardModule,
    RouterModule,
    SharedModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ]
})
export class ConnectedLayoutModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
