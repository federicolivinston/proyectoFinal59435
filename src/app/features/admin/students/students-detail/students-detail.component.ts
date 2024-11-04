import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../../core/services/students.service';
import { StudentDetail } from '../../../../core/models/studentModels';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { ChairDetail } from '../../../../core/models/chairModels';
import { Observable, of } from 'rxjs';
import { ChairsService } from '../../../../core/services/chairs.service';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import { InscriptionFormComponent } from '../../inscription-form/inscription-form.component';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrl: './students-detail.component.scss'
})
export class StudentsDetailComponent implements OnInit{
  
  id: string = '';
  student: StudentDetail | null = null;
  chairs$: Observable<ChairDetail[]> = of([]);
  displayedColumns = [
    { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
    { columnDef: 'course', header: 'Nombre del Curso', cell: (row: any) => row.course },
    { columnDef: 'profesor', header: 'Profesor', cell: (row: any) => row.profesor },
    { columnDef: 'starDate', header: 'Comienzo', cell: (row: any) => row.startDate, pipe: new DatePipe('en-US'), pipeFormat: 'dd/MM/yyyy' },
    { columnDef: 'vacants', header: 'Vacantes', cell: (row: any) => row.vacants },
  ];
  actionFunctions = [
    { label: 'delete', function: (chair: any) => this.onDelete(chair.idInscription)} 
  ];

  isLoading = false;
  isLoadingInscriptions=false;
  
  constructor(
    private chairsService: ChairsService,
    private studentsService: StudentsService,
    private inscriptionsService: InscriptionsService,
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
    this.isLoadingInscriptions = true;

    this.studentsService.getStudentById(id).subscribe(student => {
      this.student = student; 
      this.isLoading = false; 
    }, () => {
      this.isLoading = false; 
    });

    this.isLoadingInscriptions=true;
    this.chairs$ = this.chairsService.getChairsByIdStudent(id);
      this.chairs$.subscribe({
        next: () => {
        },
        error: (err) => {
          console.error(err);
          this.isLoadingInscriptions = false;
        },
        complete: () => {
          this.isLoadingInscriptions = false;
        },
      });
  }

  goBack(): void {
    this.location.back(); 
  }

  openForm(tipo: string): void {
    this.dialog
      .open(InscriptionFormComponent, {
        data: tipo,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.inscriptionsService.createInscription(result.idData,this.id).subscribe({
              next: () => {
              },
              error: (err) => {
                this.loadStudent(this.id);
              },
              complete: () => {
                this.loadStudent(this.id);
              },
            });
          }
        }
      });
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.inscriptionsService.removeInscriptionById(id).subscribe({
        next: () => {
        },
        error: (err) => {
          this.loadStudent(this.id);
        },
        complete: () => {
          this.loadStudent(this.id);
        },
      });
    }
  }
}
