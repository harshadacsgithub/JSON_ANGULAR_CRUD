import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { ServiceService } from 'src/app/NetworkCallService/service.service';

@Component({
  selector: 'app-view-student-by-id',
  templateUrl: './view-student-by-id.component.html',
  styleUrls: ['./view-student-by-id.component.css']
})
export class ViewStudentByIdComponent implements OnInit{
  idValue!:string;
  stud$ !:Student;
  constructor(private serviceCall: ServiceService,
              private ar:ActivatedRoute){}

  ngOnInit(): void {
    this.ar.params.subscribe(para=>{
      this.idValue=para['id'];
      this.getStudentById(this.idValue);
    }
    )
    // const id= this.ar.snapshot.paramMap.get('id');
    // this.getStudentById(id);
  }

  getStudentById(id:any){
    this.serviceCall.viewStudentById(id).subscribe((data)=>{
      console.log(data);
      this.stud$=data;
    })
  }

  

}
