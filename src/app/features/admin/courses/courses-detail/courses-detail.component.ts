import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../../../../core/models/courseModels';
import { Observable, of } from 'rxjs';
import { Chair } from '../../../../core/models/chairModels';
import { ChairsService } from '../../../../core/services/chairs.service';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrl: './courses-detail.component.scss'
})
export class CoursesDetailComponent  implements OnInit{
  course: Course | null = null;
  chairs$: Observable<Chair[]> = of([]);
  displayedColumns = [
    { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
    { columnDef: 'Profesor', header: 'Profesor', cell: (row: any) => row.profesor },
    { columnDef: 'startDate', header: 'Comienzo', cell: (row: any) => row.startDate, pipe: new DatePipe('en-US'), pipeFormat: 'dd/MM/yyyy' },
    { columnDef: 'vacants', header: 'Vacantes', cell: (row: any) => row.vacants },
  ];
  actionFunctions = [];

  isLoading = false;
  isLoadingChairs = false;
  
  constructor(
    private chairsService: ChairsService,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      if (id) {
        this.loadCourse(id); 
      }
    });
  }
 
  loadCourse(id: string):void{
    this.isLoading = true; 
    this.isLoadingChairs = true;
    this.coursesService.getCourseById(id).subscribe(course => {
      this.course = course; 
      this.isLoading = false; 
    }, () => {
      this.isLoading = false; 
    });

    this.chairs$ = this.chairsService.getChairsByIdCourse(id);
      this.chairs$.subscribe({
        next: () => {
        },
        error: (err) => {
          console.error(err);
          this.isLoadingChairs = false;
        },
        complete: () => {
          this.isLoadingChairs = false;
        },
      });
  }

  goBack(): void {
    this.location.back(); 
  }
}
