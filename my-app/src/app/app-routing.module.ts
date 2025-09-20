import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';
import { ViewStudentByIdComponent } from './components/view-student-by-id/view-student-by-id.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';

const routes: Routes = [
  {path:'add',component:AddStudentComponent},
  {path:'view',component:ViewStudentsComponent},
  {path:'viewById/:id',component:ViewStudentByIdComponent},
  {path:'view/:id',component:ViewStudentsComponent},
  {path:'update/:id',component:UpdateStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
