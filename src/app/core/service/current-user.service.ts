import { ICurrentuser } from './../../interface/currentuser';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  public currentuser:ICurrentuser;
  @Output() currentuserinfo: EventEmitter<any> = new EventEmitter<any>();
  currentuserinfoEmitter() {
    return this.currentuserinfo;
  }
  constructor() { 
    this.currentuser=this.initCurrentUser;
   }
  private get initCurrentUser(): ICurrentuser {
    return {
      islogin: false,
      user_id:0,
      user_name: '',
      user_displayname: '',
      user_email: '',
      //role:'',
      //roles:[],
    };
  }
  get islogin() {
    return this.currentuser.islogin;
  }
  set islogin(bool: boolean) {
    this.currentuser.islogin = bool;
    this.currentuserinfo.emit(this.currentuser);
  }
  get user_name() {
    return this.currentuser.user_name;
  }
  set user_name(username) { 
    this.currentuser.user_name = username;
  }
  get user_id() {
    return this.currentuser.user_id;
  }
  set user_id(user_id) { 
    this.currentuser.user_id = user_id;
  } 
  get user_email() {
    return this.currentuser.user_email;
  }
  set user_email(email) {
    this.currentuser.user_email = email;
  }


}
