import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from '../../../core/models/courseModels';
import { MatDialog } from '@angular/material/dialog';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{

  courses$: Observable<Course[]> = of([]);
  displayedColumns: string[] = ['idCourse', 'title', 'degree', 'actions'];

  isLoading = false;

  constructor(
    private dialog: MatDialog,
    private coursesService: CoursesService
  ){}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses():void{
    this.isLoading = true;
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
              this.coursesService.updateCourseById(editingCourse.idCourse, result).subscribe({
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
}
