import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../../../../core/models/courseModels';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrl: './courses-detail.component.scss'
})
export class CoursesDetailComponent  implements OnInit{
  course: Course | null = null;
  isLoading = false;
  
  constructor(
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
    this.isLoading = true; // Iniciar carga
    this.coursesService.getCourseById(id).subscribe(course => {
      this.course = course; 
      this.isLoading = false; 
    }, () => {
      this.isLoading = false; 
    });
  }

  goBack(): void {
    this.location.back(); 
  }
}
