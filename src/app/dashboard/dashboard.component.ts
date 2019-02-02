import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http:HttpClient) { }
  data:any;
  users:[] = [];
  ngOnInit() {
    this.scall();
  }
  scall(){
    this.http.get("http://localhost:3000/signup/").subscribe((res)=>{
      
      this.data=res;
      this.users=this.data;
      
      

    },(err)=>{
      console.log(err); 
    });
  }

}
