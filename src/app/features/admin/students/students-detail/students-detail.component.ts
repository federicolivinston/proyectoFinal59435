import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../../core/services/students.service';
import { Student } from '../../../../core/models/studentModels';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrl: './students-detail.component.scss'
})
export class StudentsDetailComponent implements OnInit{

  student: Student | null = null;
  isLoading = false;
  
  constructor(
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      if (id) {
        this.loadStudent(id);
      }
    });
  }
 
  loadStudent(id: string):void{
    this.isLoading = true; 
    this.studentsService.getStudentById(id).subscribe(student => {
      this.student = student; 
      this.isLoading = false; 
    }, () => {
      this.isLoading = false; 
    });
  }

  goBack(): void {
    this.location.back(); 
  }
}
