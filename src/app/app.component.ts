import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title:string = 'Open Data MSU';
  public sidebarToggle:boolean = false;

  public toggleSidebar(){
    this.sidebarToggle = !this.sidebarToggle;
  }

  ngOnInit(): void {
    console.log("app initialize");
  }
  
}
