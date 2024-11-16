import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../../core/models/courseModels';
import { Observable, of } from 'rxjs';
import { Chair } from '../../../../core/models/chairModels';
import { select, Store } from '@ngrx/store';
import { selectChairsByCourse, selectCourseById, selectCourses, selectIsLoadingChairsById } from '../store/course.selectors';
import { CourseActions } from '../store/course.actions';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrl: './courses-detail.component.scss'
})
export class CoursesDetailComponent  implements OnInit{
  course$: Observable<Course | undefined> = of(undefined);
  chairs$: Observable<Chair[]> = of([]);
  displayedColumns = [
    { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
    { columnDef: 'Profesor', header: 'Profesor', cell: (row: any) => row.profesor },
    { columnDef: 'startDate', header: 'Comienzo', cell: (row: any) => row.startDate, pipe: new DatePipe('en-US'), pipeFormat: 'dd/MM/yyyy' },
    { columnDef: 'vacants', header: 'Vacantes', cell: (row: any) => row.vacants },
  ];
  actionFunctions = [];
  
  isLoading = false;
  isLoadingChairsById$: Observable<boolean>;
  
  constructor(
    private store:Store,
    private route: ActivatedRoute,
    private location: Location
  ){
    this.isLoadingChairsById$ = this.store.select(selectIsLoadingChairsById);
    this.chairs$ = this.store.select(selectChairsByCourse);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      if (id) {
        this.store.select(selectCourses).subscribe((courses) => {
          if (courses.length === 0) {
            this.store.dispatch(CourseActions.loadCourses());
          }
        });
        this.loadCourse(id);
        this.store.dispatch(CourseActions.loadChairsByCourse({data: id})); 
      }
    });
  }
 
  loadCourse(id: string):void{
    this.course$ = this.store.pipe(select(selectCourseById(id)));
  }

  goBack(): void {
    this.location.back(); 
  }
}
