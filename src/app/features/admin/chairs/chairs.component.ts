import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Chair } from '../../../core/models/chairModels';
import { MatDialog } from '@angular/material/dialog';
import { ChairsService } from '../../../core/services/chairs.service';
import { ChairsFormComponent } from './chairs-form/chairs-form.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chairs',
  templateUrl: './chairs.component.html',
  styleUrl: './chairs.component.scss'
})

export class ChairsComponent implements OnInit{
  chairs$: Observable<Chair[]> = of([]);
  displayedColumns = [
    { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
    { columnDef: 'course', header: 'Nombre del Curso', cell: (row: any) => row.course },
    { columnDef: 'profesor', header: 'Profesor', cell: (row: any) => row.profesor },
    { columnDef: 'starDate', header: 'Comienzo', cell: (row: any) => row.startDate, pipe: new DatePipe('en-US'), pipeFormat: 'dd/MM/yyyy' },
    { columnDef: 'vacants', header: 'Vacantes', cell: (row: any) => row.vacants },
  ];
  actionFunctions = [
    { label: 'wysiwyg', function: (chair: any) => this.goToDetail(chair.id)},
    { label: 'edit', function: (chair: Chair) => this.openForm(chair)},
    { label: 'delete', function: (chair: any) => this.onDelete(chair.id)} 
  ];

  isLoading = false;

  constructor(
      private dialog: MatDialog,
      private chairsService: ChairsService,
      private router: Router
    ){}

    ngOnInit(): void {
      this.loadChairs();
    }

    loadChairs():void{
      this.isLoading = true;
      this.chairs$ = this.chairsService.getChairs();
      this.chairs$.subscribe({
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
      this.chairsService.removeChairById(id).subscribe({
        next: (chairs) => {
        },
        error: (err) => {
          this.loadChairs();
        },
        complete: () => {
          this.loadChairs();
        },
      });
    }
  }

  openForm(editingChair?: Chair): void {
    this.dialog
      .open(ChairsFormComponent, {
        data: {
          editingChair,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.isLoading = true;
            if (editingChair) {
              this.chairsService.updateChairById(editingChair.id, result).subscribe({
                next: (chairs) => {
                },
                error: (err) => {
                  this.loadChairs();
                },
                complete: () => {
                  this.loadChairs();
                },
              });
            } else {
              this.chairsService.createChair(result).subscribe({
                next: (chairs) => {
                },
                error: (err) => {
                  this.loadChairs();
                },
                complete: () => {
                  this.loadChairs();
                },
              });
            }
          }
        }
      });
  }

  goToDetail(id: string): void {
    this.router.navigate(['/admin/catedras', id]);
  }
}
