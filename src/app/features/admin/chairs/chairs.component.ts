import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Chair, ChairDetail } from '../../../core/models/chairModels';
import { MatDialog } from '@angular/material/dialog';
import { ChairsFormComponent } from './chairs-form/chairs-form.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectChairs, selectIsLoadingChairs, selectLoadChairsError } from './store/chair.selectors';
import { ChairActions } from './store/chair.actions';
import { selectUserProfile } from '../../../store/auth.selectors';

@Component({
  selector: 'app-chairs',
  templateUrl: './chairs.component.html',
  styleUrl: './chairs.component.scss'
})

export class ChairsComponent implements OnInit{
  chairs$: Observable<ChairDetail[]> = of([]);
  profile$: Observable<string>;

  displayedColumns = [
    { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
    { columnDef: 'course', header: 'Nombre del Curso', cell: (row: any) => row.course },
    { columnDef: 'profesor', header: 'Profesor', cell: (row: any) => row.profesor },
    { columnDef: 'starDate', header: 'Comienzo', cell: (row: any) => row.startDate, pipe: new DatePipe('en-US'), pipeFormat: 'dd/MM/yyyy' },
    { columnDef: 'vacants', header: 'Vacantes', cell: (row: any) => row.vacants },
  ];
  actionFunctions = [
    { label: 'wysiwyg', function: (chair: any) => this.goToDetail(chair.id)},
  ];

  actionsDisabled=true;
  loadChairsError$: Observable<boolean>;
  isLoadingChairs$: Observable<boolean>;

  constructor(
      private store: Store,
      private dialog: MatDialog,
      private router: Router
    ){
      this.profile$ = this.store.select(selectUserProfile);
      this.chairs$ = this.store.select(selectChairs);
      this.isLoadingChairs$ = this.store.select(selectIsLoadingChairs);
      this.loadChairsError$ = this.store.select(selectLoadChairsError);
    }

    ngOnInit(): void {
      this.loadChairs();
      this.profile$.subscribe(profile => {
        if (profile === 'admin') {
          this.actionsDisabled = false;
          this.actionFunctions = [
            { label: 'wysiwyg', function: (chair: any) => this.goToDetail(chair.id) },
            { label: 'edit', function: (chair: Chair) => this.openForm(chair) },
            { label: 'delete', function: (chair: any) => this.onDelete(chair.id) }
          ];
        }
      });
    }

    loadChairs():void{
      this.store.dispatch(ChairActions.loadChairs());
    }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.store.dispatch(ChairActions.deleteChair({data: id}));
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
            if (editingChair) {
              this.store.dispatch(ChairActions.updateChair({id: editingChair.id, data: result}));
            } else {
              this.store.dispatch(ChairActions.createChair({data: result}));
            }
          }
        }
      });
  }

  goToDetail(id: string): void {
    this.router.navigate(['/admin/catedras', id]);
  }
}
