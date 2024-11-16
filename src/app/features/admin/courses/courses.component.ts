import { Component, OnInit } from '@angular/core';
import { Course } from '../../../core/models/courseModels';
import { MatDialog } from '@angular/material/dialog';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { selectCourses, selectIsLoadingCourses, selectLoadCoursesError } from './store/course.selectors';
import { CourseActions } from './store/course.actions';
import { Store } from '@ngrx/store';
import { selectUserProfile } from '../../../store/auth.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{

  courses$: Observable<Course[]> = of([]);
  profile$: Observable<string>;
  
  displayedColumns = [
    { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
    { columnDef: 'title', header: 'Nombre del Curso', cell: (row: any) => row.title },
    { columnDef: 'degree', header: 'Grado', cell: (row: any) => row.degree },
  ];
  actionFunctions = [
    { label: 'wysiwyg', function: (course: any) => this.goToDetail(course.id)},
  ];

  actionsDisabled=true;
  loadCoursesError$: Observable<boolean>;
  isLoadingCourses$: Observable<boolean>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ){
    this.profile$ = this.store.select(selectUserProfile);
    this.courses$ = this.store.select(selectCourses);
    this.isLoadingCourses$ = this.store.select(selectIsLoadingCourses);
    this.loadCoursesError$ = this.store.select(selectLoadCoursesError);
  }

  ngOnInit(): void {
    this.loadCourses();
    this.profile$.subscribe(profile => {
      if (profile === 'admin') {
        this.actionsDisabled = false;
        this.actionFunctions = [
          { label: 'wysiwyg', function: (course: any) => this.goToDetail(course.id) },
          { label: 'edit', function: (course: Course) => this.openForm(course) },
          { label: 'delete', function: (course: any) => this.onDelete(course.id) }
        ];
      }
    });
  }

  loadCourses():void{
    this.store.dispatch(CourseActions.loadCourses());
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.store.dispatch(CourseActions.deleteCourse({data: id}));
    }
  }

  openForm(editingCourse?: Course): void {
    this.dialog
      .open(CoursesFormComponent, {
        data: {
          editingCourse,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingCourse) {
              this.store.dispatch(CourseActions.updateCourse({id: editingCourse.id, data: result}));
            } else {
              this.store.dispatch(CourseActions.createCourse({data: result}));
            }
          }
        }
      });
  }

  goToDetail(id: string): void {
    this.router.navigate(['/admin/cursos', id]);
  }
}
