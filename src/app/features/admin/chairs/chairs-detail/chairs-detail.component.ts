import { Component, OnInit } from '@angular/core';
import { ChairDetail } from '../../../../core/models/chairModels';
import { ChairsService } from '../../../../core/services/chairs.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Student } from '../../../../core/models/studentModels';
import { Observable, of } from 'rxjs';
import { StudentsService } from '../../../../core/services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import { InscriptionFormComponent } from '../../inscription-form/inscription-form.component';
import { UserFullNamePipe } from '../../../../common/pipes/user-full-name.pipe';

@Component({
  selector: 'app-chairs-detail',
  templateUrl: './chairs-detail.component.html',
  styleUrl: './chairs-detail.component.scss'
})
export class ChairsDetailComponent   implements OnInit{
  
  id: string = '';
  chair: ChairDetail | null = null;
  students$: Observable<Student[]> = of([]);
  displayedColumns = [
    { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
    { columnDef: 'fullName', header: 'Nombre', cell: (row: any) => row, pipe: new UserFullNamePipe(), },
    { columnDef: 'email', header: 'Email', cell: (row: any) => row.email },
    { columnDef: 'dni', header: 'DNI', cell: (row: any) => row.dni },
  ];
  actionFunctions = [
    { label: 'delete', function: (student: any) => this.onDelete(student.idInscription)} 
  ];

  isLoading = false;
  isLoadingInscriptions=false;
  
  constructor(
    private studentsService: StudentsService,
    private chairsService: ChairsService,
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
        this.loadChair(id); 
      }
    });
  }
 
  loadChair(id: string):void{
    this.isLoading = true; // Iniciar carga
    this.isLoadingInscriptions=true;

    this.chairsService.getChairById(id).subscribe(chair => {
      this.chair = chair; 
      this.isLoading = false; 
    }, () => {
      this.isLoading = false; 
    });

    this.students$ = this.studentsService.getStudentsByIdChair(id);
    this.students$.subscribe({
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
    this.location.back(); // Método para volver a la página anterior
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
            this.inscriptionsService.createInscription(this.id, result.idData).subscribe({
              next: () => {
              },
              error: (err) => {
                this.loadChair(this.id);
              },
              complete: () => {
                this.loadChair(this.id);
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
          this.loadChair(this.id);
        },
        complete: () => {
          this.loadChair(this.id);
        },
      });
    }
  }
}
