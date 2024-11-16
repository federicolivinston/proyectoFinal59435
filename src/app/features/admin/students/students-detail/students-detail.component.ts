import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../../core/services/students.service';
import { StudentDetail } from '../../../../core/models/studentModels';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChairsService } from '../../../../core/services/chairs.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrl: './students-detail.component.scss'
})
export class StudentsDetailComponent implements OnInit{
  
  id: string = '';
  student: StudentDetail | null = null;
  isLoading = false;
  
  constructor(
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
