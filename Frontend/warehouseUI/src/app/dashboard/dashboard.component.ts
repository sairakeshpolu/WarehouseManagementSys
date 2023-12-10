import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  get isManager() {
    return localStorage.getItem('role') == 'Manager';
  }

  get isSalesPerson() {
    return localStorage.getItem('role') == 'SalesPerson';
  }

}
