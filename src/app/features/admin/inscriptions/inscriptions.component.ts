import { Component, Input } from '@angular/core';
import { Inscription } from '../../../core/models/inscriptionModels';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { selectInscriptions, selectIsLoadingInscriptions, selectLoadInscriptionsError } from './store/inscription.selectors';
import { InscriptionActions } from './store/inscription.actions';
import { UserFullNamePipe } from '../../../common/pipes/user-full-name.pipe';
import { DatePipe } from '@angular/common';
import { InscriptionFormComponent } from './inscription-form/inscription-form.component';

interface ColumnDef {
  columnDef: string;
  header: string;
  cell: (row: any) => string; 
  pipe?: any; 
  pipeFormat?: string;
}

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})

export class InscriptionsComponent {

  @Input() id: string ='';
  @Input() filterType: string = '';
  
  Inscriptions$: Observable<Inscription[]> = of([]);
  displayedColumns: ColumnDef[] = [];
  
  actionFunctions = [
    { label: 'delete', function: (Inscription: any) => this.onDelete(Inscription.id) },
  ];

  loadInscriptionsError$: Observable<boolean>;
  isLoadingInscriptions$: Observable<boolean>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ){
    this.Inscriptions$ = this.store.select(selectInscriptions);
    this.isLoadingInscriptions$ = this.store.select(selectIsLoadingInscriptions);
    this.loadInscriptionsError$ = this.store.select(selectLoadInscriptionsError);
  }

  ngOnInit(): void {
    if (this.filterType == 'chair') {
      this.displayedColumns = [
        { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
        { columnDef: 'fullName', header: 'Nombre', cell: (row: any) => row.student, pipe: new UserFullNamePipe(), },
        { columnDef: 'email', header: 'Email', cell: (row: any) => row.student.email },
        { columnDef: 'dni', header: 'DNI', cell: (row: any) => row.student.dni },
      ];
    } else {
      this.displayedColumns = [
        { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
        { columnDef: 'course', header: 'Nombre del Curso', cell: (row: any) => row.chair.course },
        { columnDef: 'profesor', header: 'Profesor', cell: (row: any) => row.chair.profesor },
        { columnDef: 'starDate', header: 'Comienzo', cell: (row: any) => row.chair.startDate, pipe: new DatePipe('en-US'), pipeFormat: 'dd/MM/yyyy' },
        { columnDef: 'vacants', header: 'Vacantes', cell: (row: any) => row.chair.vacants },
      ];
    }
    this.loadInscriptions(this.id,this.filterType);
  }

  loadInscriptions(id: string, tipo: string):void{
    this.store.dispatch(InscriptionActions.loadInscriptions({id:id,tipo:tipo}));
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.store.dispatch(InscriptionActions.deleteInscription({data: id}));
    }
  }

  openForm(id: string, filterType: string): void {
    this.dialog
      .open(InscriptionFormComponent, {
        data: {
          id: id,
          inscriptionType: filterType,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
              this.store.dispatch(InscriptionActions.createInscription({data: result}));
          }
        }
      });
  }
}
