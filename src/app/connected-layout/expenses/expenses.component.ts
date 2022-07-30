import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  permission: number;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.permission=parseInt(localStorage.getItem("permission")) ;
  }

}
