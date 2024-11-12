import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from '../../../core/models/courseModels';
import { MatDialog } from '@angular/material/dialog';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

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
  isLoading = false;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router
  ){
    this.profile$ = this.authService.getProfile();
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses():void{
    this.isLoading = true;
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
    this.courses$ = this.coursesService.getCourses();
    this.courses$.subscribe({
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
      this.coursesService.removeCourseById(id).subscribe({
        next: (courses) => {
        },
        error: (err) => {
          this.loadCourses();
        },
        complete: () => {
          this.loadCourses();
        },
      });
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
            this.isLoading = true;
            if (editingCourse) {
              this.coursesService.updateCourseById(editingCourse.id, result).subscribe({
                next: (courses) => {
                },
                error: (err) => {
                  this.loadCourses();
                },
                complete: () => {
                  this.loadCourses();
                },
              });
            } else {
              this.coursesService.createCourse(result).subscribe({
                next: (courses) => {
                },
                error: (err) => {
                  this.loadCourses();
                },
                complete: () => {
                  this.loadCourses();
                },
              });
            }
          }
        }
      });
  }

  goToDetail(id: string): void {
    this.router.navigate(['/admin/cursos', id]);
  }
}
