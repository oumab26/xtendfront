import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-notconnectedlayout',
  templateUrl: './notconnectedlayout.component.html',
  styleUrls: ['./notconnectedlayout.component.css']
})
export class NotconnectedlayoutComponent implements OnInit {
 language = 'fr';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.language);
}

changeLanguage():void {
  if(this.language === 'fr'){
    this.language = 'en';
  }
  else{
    this.language ='fr';
  }
  this.translate.use(this.language);
}

  ngOnInit(): void {
  }

  

}
