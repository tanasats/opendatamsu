import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/service/rest-api.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import  Swal  from "sweetalert2";

@Component({
  selector: 'app-tagmanager',
  templateUrl: './tagmanager.component.html',
  styleUrls: ['./tagmanager.component.css'],
})
export class TagmanagerComponent implements OnInit {
  public form1: FormGroup;
  get f1(): { [key: string]: AbstractControl } {
    return this.form1.controls;
  }
  public spareinfo:any;
  public studentinfo:any;
  public nowsubmit:boolean=false;

  constructor(
    private formBuilder: FormBuilder, 
    private api: RestApiService,
    private router:Router,
    private route: ActivatedRoute
    ) {
    this.form1 = this.formBuilder.group({
      spareid: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      orderid: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      rfid: [null, [Validators.required]],
      old_rfid:[null, [Validators.required]],
      comments: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe( url =>{
      console.log("current route:"+url);
    })
    console.log("url:"+this.router.url);
    localStorage.setItem("currentpath",this.router.url);

  } //ngOnInit

  getSpareTagByid(event:any) {
    if(this.f1['spareid'].valid){
       let id = event.target.value;
      this.api.getSpareByid(id).subscribe(([data]) => {
        if(data){
          console.log(data);
          this.spareinfo=data;
          if(!data.old_rfid){
            this.form1.patchValue({rfid:data.rfid});
          }else{
            this.form1.patchValue({rfid:null});
          }
        } else {
          this.spareinfo=null;
        }
      });
    }
  }
  
  getStudentByOrderid(event:any) {   
    if(this.f1['orderid'].valid){
      let id = event.target.value;
      this.api.getStudentByOrderid(id).subscribe((data) => {
        if(data){
           [this.studentinfo]=data;
           this.form1.patchValue({old_rfid:this.studentinfo.rfid})
        }else{
          this.studentinfo=null;
        }
      });
    }
  }

  onSubmit() {
    if(this.form1.valid){
      console.log(this.form1.value);
      this.nowsubmit=true;
      let datas = this.form1.value;
      this.api.sparerfid(datas).subscribe((res) => {
          if(res){
            console.log("data=",res);
            if(res.error==0){
              // success
              Swal.fire('สำเร็จ', 'ลำดับที่ '+datas.orderid + ' ได้เปลี่ยน RFID เป็น '+ datas.spareid + ' เรียบร้อยแล้ว', 'success');
              console.log("success");
              this.onClear();
            }else{
              // not success
              Swal.fire('ผิดพลาด', 'โปรดตรวจสอบความถูกต้อง', 'error');
              console.log("not success");
            }
          }else{
            console.log("no data response --- data=",res);
          }
          this.nowsubmit=false;
      });
    }
  }

  onClear(){
    this.spareinfo=null;
    this.studentinfo=null;
    this.form1.reset();
    this.form1.clearValidators();
    this.nowsubmit=false;
  }
}