import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Chair } from '../../../core/models/chairModels';
import { MatDialog } from '@angular/material/dialog';
import { ChairsService } from '../../../core/services/chairs.service';
import { ChairsFormComponent } from './chairs-form/chairs-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chairs',
  templateUrl: './chairs.component.html',
  styleUrl: './chairs.component.scss'
})

export class ChairsComponent implements OnInit{
  chairs$: Observable<Chair[]> = of([]);
  displayedColumns: string[] = ['idChair', 'course', 'profesor', 'startDate', 'vacants', 'actions'];

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
              this.chairsService.updateChairById(editingChair.idChair, result).subscribe({
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
