import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/notconnectedlayout/notconnectedlayout.module';
import { TimeOffResponseComponent } from './time-off-response/time-off-response.component';
import { ExitPermissionResponseComponent } from './exit-permission-response/exit-permission-response.component';
import { PurchaseResponseComponent } from './purchase-response/purchase-response.component';



@NgModule({
  declarations: [DashboardComponent, TimeOffResponseComponent, ExitPermissionResponseComponent, PurchaseResponseComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
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
export class DashboardModule { }
