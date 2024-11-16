import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../../core/services/students.service';
import { StudentDetail } from '../../../../core/models/studentModels';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChairsService } from '../../../../core/services/chairs.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectStudentById, selectStudents } from '../store/student.selectors';
import { StudentActions } from '../store/student.actions';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrl: './students-detail.component.scss'
})
export class StudentsDetailComponent implements OnInit{
  
  id: string = '';
  student: StudentDetail | null = null;
  student$: Observable<StudentDetail | undefined> = of(undefined);
  isLoading = false;
  
  constructor(
    private store:Store,
    private chairsService: ChairsService,
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,

  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      const id = params.get('id'); 
      if (id){

        this.store.select(selectStudents).subscribe((students) => {
          if (students.length === 0) {
            this.store.dispatch(StudentActions.loadStudents());
          }
        });

        this.loadStudent(id);
      }
    });
  }
 
  loadStudent(id: string):void{
    this.student$ = this.store.pipe(select(selectStudentById(id)));
  }

  goBack(): void {
    this.location.back(); 
  }
}
