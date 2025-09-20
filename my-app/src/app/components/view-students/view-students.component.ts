import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Student } from 'src/app/models/student';
import { ServiceService } from 'src/app/NetworkCallService/service.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit{

  data$ : Observable<Student[]> = of([]);
  fetchData$ : Observable<Student[]> = of([]);
  idValue!:string;

  constructor(private serviceCall:ServiceService,
              private ar:ActivatedRoute,
              private route:Router
  ){}
  ngOnInit(): void {
    this.idValue=String(this.ar.snapshot.paramMap.get('id'));
    if(this.idValue){
      this.deleteById(this.idValue);
    }
    this.getData();
  }
  getData(){
    this.data$=this.serviceCall.viewAllStudents();
    this.fetchData$=this.data$.pipe(map((d)=>d.sort((a:Student,b:Student)=>
      a.username.localeCompare(b.username))));
  }
  searchValue(e:any){
    const value=e.target.value;
    if(!value){
      this.fetchData$=this.data$;
      return;
    }
    else{
      this.fetchData$=this.data$.pipe(map((students)=>{
        return students.filter((student)=>
        student.username.toString().includes(value))
      }));
    }

  }

  deleteById(id:any){
    this.serviceCall.deleteById(id).subscribe(()=>{
      alert("Student deleted successfully!");
      this.route.navigate(['/view']);
    })
      
  }

}
