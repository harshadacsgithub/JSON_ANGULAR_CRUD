import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  apiUrl:string="https://ec2-13-201-181-61.projects.wecreateproblems.com/proxy/6000/students";
  constructor(private httpCall :HttpClient){}

  addStudent(student:Student):Observable<any>{
    return this.httpCall.post(this.apiUrl, student);
  }

  viewAllStudents():Observable<any>{
    return this.httpCall.get(this.apiUrl);
  }

  viewStudentById(id:any):Observable<any>{
    return this.httpCall.get(this.apiUrl+"/"+id);
  }

  deleteById(id:any):Observable<any>{
    return this.httpCall.delete(this.apiUrl+"/"+id);
  }

  updateById(id:any,stud:Student):Observable<any>{
    return this.httpCall.put(this.apiUrl+"/"+id,stud);
  }
  
}
