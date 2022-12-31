import { RestApiService } from './../../../service/rest-api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(
    private router:Router,
    private api:RestApiService
    ) { }

  ngOnInit(): void {
    localStorage.setItem("currentpath",this.router.url);
  }

}// class