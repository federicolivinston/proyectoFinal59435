import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsService } from '../../../core/services/students.service';
import { Student, StudentDetail } from '../../../core/models/studentModels';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserFullNamePipe } from '../../../common/pipes/user-full-name.pipe';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent  implements OnInit{
  students$: Observable<StudentDetail[]> = of([]);
  profile$: Observable<string>;
  
  displayedColumns = [
    { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
    { columnDef: 'fullName', header: 'Nombre', cell: (row: any) => row, pipe: new UserFullNamePipe(), },
    { columnDef: 'email', header: 'Email', cell: (row: any) => row.email },
    { columnDef: 'dni', header: 'DNI', cell: (row: any) => row.dni },
    { columnDef: 'province', header: 'Provincia', cell: (row: any) => row.province },
  ];

  actionFunctions = [
    { label: 'wysiwyg', function: (student: any) => this.goToDetail(student.id)},
  ];

  actionsDisabled=true;
  isLoading = false;
  

  constructor(
      private authService: AuthService,
      private dialog: MatDialog,
      private studentsService: StudentsService,
      private router: Router
    ){
      this.profile$ = this.authService.getProfile();
    }

    ngOnInit(): void {
      this.loadStudents();
      this.profile$.subscribe(profile => {
        if(profile=='admin'){
          this.actionsDisabled=false;
          this.actionFunctions = [
            { label: 'wysiwyg', function: (student: any) => this.goToDetail(student.id)},
            { label: 'edit', function: (student: Student) => this.openForm(student)},
            { label: 'delete', function: (student: any) => this.onDelete(student.id)} 
          ];
        }
      });  
    }

    loadStudents():void{
      this.isLoading = true;
      this.students$ = this.studentsService.getStudents();
      this.students$.subscribe({
        next: () => {
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.studentsService.removeStudentById(id).subscribe({
        next: (students) => {
        },
        error: (err) => {
          this.loadStudents();
        },
        complete: () => {
          this.loadStudents();
        },
      });
    }
  }

  openForm(editingStudent?: Student): void {
    this.dialog
      .open(StudentsFormComponent, {
        data: {
          editingStudent,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.isLoading = true;
            if (editingStudent) {
              this.studentsService.updateStudentById(editingStudent.id, result).subscribe({
                next: (students) => {
                },
                error: (err) => {
                  this.loadStudents();
                },
                complete: () => {
                  this.loadStudents();
                },
              });
            } else {
              this.studentsService.createStudent(result).subscribe({
                next: (students) => {
                },
                error: (err) => {
                  this.loadStudents();
                },
                complete: () => {
                  this.loadStudents();
                },
              });
            }
          }
        }
      });
  }

  goToDetail(id: string): void {
    this.router.navigate(['/admin/alumnos', id]);
  }
}
