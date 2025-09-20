import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student';
import { ServiceService } from 'src/app/NetworkCallService/service.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit{
  fg!:FormGroup;
  constructor(private fb:FormBuilder,
              private serviceCall:ServiceService ){}
              
  ngOnInit(): void {
    this.fg=this.fb.group({
      username:['',[Validators.required,Validators.pattern(/^[A-Za-z0-9._]{3,20}$/)]], //Validators.minLength(4)
      mobilenumber:['',[Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
      email:['',[Validators.required,Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
      dateOfBirth:['',[Validators.required,this.isDateValid]],
      salary:['',[Validators.required,this.isSalaryValid]]
    })
  }

  isDateValid(cont:AbstractControl): ValidationErrors | null{
    const pat=/^\d{4}-\d{2}-\d{2}$/;
    if(!pat.test(cont.value)){
      return {retVal:true};
    }
    return null;
  }

  isSalaryValid(cont:AbstractControl): ValidationErrors | null {
    const salValue=cont.value;
    if(salValue==null || salValue==undefined || salValue==''){
      return null;
    }
    const sav1=Number(salValue);
    return sav1<0 ? {salVal:true}:null;
  }

  addData(){
    if(this.fg.valid){
      this.serviceCall.addStudent(this.fg.value).subscribe((data)=>
        {
          alert("Data inserted successfully");
          console.log(data);
          this.fg.reset();
        })
    }
    
  } 
}
