import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityReportComponent } from './connected-layout/activity-report/activity-report.component';
import { AppointmentComponent } from './connected-layout/appointment/appointment.component';
import { AttendanceComponent } from './connected-layout/appointment/attendance/attendance.component';
import { MarkAttendanceComponent } from './connected-layout/appointment/mark-attendance/mark-attendance.component';
import { CompanySettingsComponent } from './connected-layout/company-settings/company-settings.component';
import { ConnectedLayoutComponent } from './connected-layout/connected-layout.component';
import { DashboardComponent } from './connected-layout/dashboard/dashboard.component';
import { ExitPermissionResponseComponent } from './connected-layout/dashboard/exit-permission-response/exit-permission-response.component';
import { PurchaseResponseComponent } from './connected-layout/dashboard/purchase-response/purchase-response.component';
import { TimeOffResponseComponent } from './connected-layout/dashboard/time-off-response/time-off-response.component';
import { ExpensesComponent } from './connected-layout/expenses/expenses.component';
import { PeriodicExpensesComponent } from './connected-layout/expenses/periodic-expenses/periodic-expenses.component';
import { ProvidersComponent } from './connected-layout/expenses/providers/providers.component';
import { PurchasesDemandComponent } from './connected-layout/expenses/purchases-demand/purchases-demand.component';
import { PurchasesComponent } from './connected-layout/expenses/purchases/purchases.component';
import { ExitPermissionComponent } from './connected-layout/leave/exit-permission/exit-permission.component';
import { GlobalViewComponent } from './connected-layout/leave/global-view/global-view.component';
import { LeaveResponseComponent } from './connected-layout/leave/leave-response/leave-response.component';
import { LeaveComponent } from './connected-layout/leave/leave.component';
import { TimeOffComponent } from './connected-layout/leave/time-off/time-off.component';
import { PayrollComponent } from './connected-layout/payroll/payroll.component';
import { PlanningManagementComponent } from './connected-layout/planning-management/planning-management.component';
import { ProfileComponent } from './connected-layout/profile/profile.component';
import { SearchUserComponent } from './connected-layout/search-user/search-user.component';
import { TeamComponent } from './connected-layout/team/team.component';
import { UpdateProfileComponent } from './connected-layout/update-profile/update-profile.component';
import { CompanyComponent } from './notconnectedlayout/company/company.component';

import { LoginComponent } from './notconnectedlayout/login/login.component';
import { NotconnectedlayoutComponent } from './notconnectedlayout/notconnectedlayout.component';
import { ResetpasswordComponent } from './notconnectedlayout/resetpassword/resetpassword.component';
import { AuthGuardService as AuthGuard, AuthGuardService2 as AuthGuard1} from './shared/services/guards/auth-guard.service';
import { ConsultantGuardService } from './shared/services/guards/consultant-guard.service';
import { EmployeGuardService } from './shared/services/guards/employe-guard.service';
import { ManagerGuardService as ManagerGuard } from './shared/services/guards/manager-guard.service';
import { RhGuardService } from './shared/services/guards/rh-guard.service';
import { AppComponent } from './app.component';
import { SearchComponent } from './connected-layout/search/search.component';


const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {
  path:'',component:NotconnectedlayoutComponent,children:[
    
          {path:'login',component:LoginComponent},
          {path:'company',component:CompanyComponent},
          {path:'resetPassword',component:ResetpasswordComponent},
      
        ]
    
  },
  {
    path:'',component:ConnectedLayoutComponent,canActivate: [AuthGuard] ,canActivateChild:[AuthGuard1],children:[
            {path:'dashboard',component:DashboardComponent,children:[
              {path:'search',component:SearchComponent},
             
              {path:'',redirectTo:'/dashboard/time-off-response',pathMatch:'full'},
              {path:'time-off-response',component:TimeOffResponseComponent},
             
              {path:'exit-permission-response',component:ExitPermissionResponseComponent},
              {path:'purchase-response',component:PurchaseResponseComponent},
              {path:'time-off-response',component:TimeOffResponseComponent},
             
      

           
            ]},
            {path:'appointment',component:AppointmentComponent,children:[
                          {path:'',redirectTo:'/appointment/mark-attendance',pathMatch:'full'},
                          {path:'mark-attendance',component:MarkAttendanceComponent},
                          {path:'attendance-history',component:AttendanceComponent,canActivate:[RhGuardService]},
            ]},
            {path:'activity-report',component:ActivityReportComponent,canActivate:[ConsultantGuardService]},
            {path:'team',component:TeamComponent},
            {path:'search',component:SearchComponent},
            {path:'search-user/:username',component:SearchUserComponent},
            {path:'leave',component:LeaveComponent,children:[
                          {path:'',redirectTo:'/leave/exit-permission',pathMatch:'full'},
                          {path:'timeOff',component:TimeOffComponent,canActivate:[EmployeGuardService]},
                          {path:'exit-permission',component:ExitPermissionComponent},
                          {path:'leave-response',component:LeaveResponseComponent,canActivate:[RhGuardService]},
                          {path:'global-view',component:GlobalViewComponent,canActivate:[RhGuardService]}]},
            {path:'expenses',component:ExpensesComponent,canActivate:[EmployeGuardService],children:[
                          {path:'',redirectTo:'/expenses/purchases',pathMatch:'full'},
                          {path:'purchases',component:PurchasesComponent,canActivate:[EmployeGuardService]},
                          {path:'purchases-demand',component:PurchasesDemandComponent,canActivate:[ManagerGuard]},
                          {path:'periodic-expenses',component:PeriodicExpensesComponent,canActivate:[ManagerGuard]},
                          {path:'providers',component:ProvidersComponent,canActivate:[ManagerGuard]}
            ]},
            {path:'payroll',component:PayrollComponent},
            {path:'planning',component:PlanningManagementComponent},
            {path:'profile',component:ProfileComponent},
            {path:'company-settings',canActivate: [ManagerGuard],component:CompanySettingsComponent},
            {path: 'update-profile/:userId',component:UpdateProfileComponent,canActivate:[ManagerGuard]}
          ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
