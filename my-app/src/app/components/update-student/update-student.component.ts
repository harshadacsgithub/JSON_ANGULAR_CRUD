import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/NetworkCallService/service.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent {
  fg!:FormGroup;
  idValue!:string;
  constructor(private fb:FormBuilder,
              private serviceCall:ServiceService ,
              private ar:ActivatedRoute,
              private route:Router){}
              
  ngOnInit(): void {
    this.fg=this.fb.group({
      username:['',[Validators.required,Validators.pattern(/^[A-Za-z0-9._]{3,20}$/)]], //Validators.minLength(4)
      mobilenumber:['',[Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
      email:['',[Validators.required,Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
      dateOfBirth:['',[Validators.required,this.isDateValid]],
      salary:['',[Validators.required,this.isSalaryValid]]
    })
    this.idValue=String(this.ar.snapshot.paramMap.get('id'));
    alert(this.idValue);
    if(this.idValue){
      this.serviceCall.viewStudentById(this.idValue).subscribe((data)=>{
        this.fg.patchValue(data);
      })
    }
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

  updateData(){
    if(this.fg.valid){
      this.serviceCall.updateById(this.idValue,this.fg.value).subscribe((data)=>
        {
          alert("Data updated successfully");
          this.fg.reset();
          this.route.navigate(['/view'])
        })
    }
    
  } 
}