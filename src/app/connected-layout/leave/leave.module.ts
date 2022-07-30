import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveComponent } from './leave.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TimeOffComponent } from './time-off/time-off.component';
import { ExitPermissionComponent } from './exit-permission/exit-permission.component';
import { LeaveResponseComponent } from './leave-response/leave-response.component';
import { GlobalViewComponent } from './global-view/global-view.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [LeaveComponent, TimeOffComponent, ExitPermissionComponent, LeaveResponseComponent, GlobalViewComponent],
  imports: [BrowserModule, FormsModule, MatListModule, MatExpansionModule, 
    MatSortModule, BrowserAnimationsModule, FlexLayoutModule, MatPaginatorModule,
    MatSliderModule,
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
export class LeaveModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
