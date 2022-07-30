import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesComponent } from './expenses.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { PurchasesDemandComponent } from './purchases-demand/purchases-demand.component';
import { PeriodicExpensesComponent } from './periodic-expenses/periodic-expenses.component';
import { ProvidersComponent } from './providers/providers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ExpensesComponent, PurchasesComponent, PurchasesDemandComponent, PeriodicExpensesComponent, ProvidersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
  ]
})
export class ExpensesModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}