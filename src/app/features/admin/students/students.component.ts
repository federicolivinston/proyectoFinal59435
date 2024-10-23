import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsService } from '../../../core/services/students.service';
import { Student } from '../../../core/models/studentModels';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent  implements OnInit{
  students$: Observable<Student[]> = of([]);
  displayedColumns: string[] = ['idStudent', 'fullName', 'email', 'dni', 'actions'];

  isLoading = false;

  constructor(
      private dialog: MatDialog,
      private studentsService: StudentsService
    ){}

    ngOnInit(): void {
      this.loadStudents();
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
              this.studentsService.updateStudentById(editingStudent.idStudent, result).subscribe({
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
}
