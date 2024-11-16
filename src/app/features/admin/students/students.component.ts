import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from './students-form/students-form.component';
import { Student, StudentDetail } from '../../../core/models/studentModels';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserFullNamePipe } from '../../../common/pipes/user-full-name.pipe';
import { Store } from '@ngrx/store';
import { selectIsLoadingStudents, selectLoadStudentsError, selectStudents } from './store/student.selectors';
import { StudentActions } from './store/student.actions';
import { selectUserProfile } from '../../../store/auth.selectors';

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
  loadStudentError$: Observable<boolean>;
  isLoadingStudent$: Observable<boolean>;
  

  constructor(
      private store: Store,
      private dialog: MatDialog,
      private router: Router
    ){
      this.profile$ = this.store.select(selectUserProfile);
      this.students$ = this.store.select(selectStudents);
      this.isLoadingStudent$ = this.store.select(selectIsLoadingStudents);
      this.loadStudentError$ = this.store.select(selectLoadStudentsError);
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
      this.store.dispatch(StudentActions.loadStudents());
    }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.store.dispatch(StudentActions.deleteStudent({data: id}));
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
              this.store.dispatch(StudentActions.updateStudent({id: editingStudent.id, data: result}));
            } else {
              this.store.dispatch(StudentActions.createStudent({data: result}));
            }
          }
        }
      });
  }

  goToDetail(id: string): void {
    this.router.navigate(['/admin/alumnos', id]);
  }
}
