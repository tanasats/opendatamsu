import { CurrentUserService } from './../../../core/service/current-user.service';
import { AuthService } from './../../../core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public form :FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private auth: AuthService,
    private router: Router,
    private currentUserService:CurrentUserService,
  ) { 
    this.form = this.formBuilder.group({ 
      username:[null,[Validators.required]],
      password:[null,[Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.form.value);
    let datas = this.form.getRawValue();
    this.auth.login(datas).subscribe({
      next: (res:any)=>{
        console.log(res);
        Swal.fire('สำเร็จ', 'ยินดีต้อนรับ '+res.username, 'success');
        this.router.navigate(['/admin/dashboard']);
        this.currentUserService.user_name=res.username;
        this.currentUserService.islogin=true;
      },
      error: (err:any)=>{
        console.log(err);
        Swal.fire('ผิดพลาด', 'Invalid Username/Password', 'error');
      }
    });
  } //onSubmit

} //class