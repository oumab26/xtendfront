import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginserviceService } from './services/loginservice.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotconnectedlayoutModule } from '../notconnectedlayout/notconnectedlayout.module';
import { RouterModule } from '@angular/router';
import { HeaderConnectedComponent } from './components/header-connected/header-connected.component';
import { ManagerSidebarComponent } from './components/manager-sidebar/manager-sidebar.component';
import { ImageComponent } from './components/image/image.component';
import { FormsModule } from '@angular/forms';
import {Interceptor} from './services/interceptors/interceptor';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, HeaderConnectedComponent, ManagerSidebarComponent, ImageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  exports :[
    FooterComponent,
    HeaderComponent,
    ManagerSidebarComponent,
    HeaderConnectedComponent,
    ImageComponent,

    
  ],
  providers: [LoginserviceService,{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }]
})
export class SharedModule { }
