import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/shared/services/userservice.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  user: any;
  username: any;

  constructor(private userService:UserserviceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    let username = this.route.snapshot.params['username'];
    this.getUserByUserName(username);

  }


  getUserByUserName(username){
    this.userService.getUserByUsername(username).subscribe((Response:any)=>{
      this.user=Response;
    })
  }

}
