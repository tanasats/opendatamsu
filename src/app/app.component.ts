import { AuthService } from './core/service/auth.service';
import { CurrentUserService } from './core/service/current-user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ICurrentuser } from './interface/currentuser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title:string = 'Open Data MSU';
  public sidebarToggle:boolean = false;

  islogin:boolean=false;
  user_displayname:string="";
  
  constructor( 
    private currentUserService:CurrentUserService,
    private authService:AuthService
    ){
    this.currentUserService.currentuserinfoEmitter().subscribe((currUserObject:ICurrentuser)=>{
      console.log("currentuserinfoEmitter(currUserObject) form currentUserService =",JSON.stringify(currUserObject));
      this.islogin=currUserObject.islogin;
      this.user_displayname=currUserObject.user_name;
    })
  }

  public toggleSidebar(){
    this.sidebarToggle = !this.sidebarToggle;
  }

  ngOnInit(): void {
    console.log("# app initialize-----");
      let token = localStorage.getItem("access-token");
    if(token){
      console.log("has token");
      this.authService.me().subscribe({
        next:(res) =>{
          console.log("res:",res);
        },
        error:(err) =>{ 
          console.log("err:",err);

        }
      });
    }else{
      console.log("no token");
    }  
    
    console.log(" load user state from localstorage");
    
  }
  
}
