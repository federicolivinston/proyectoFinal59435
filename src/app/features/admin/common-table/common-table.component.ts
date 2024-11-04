import { Component, EventEmitter, Input, OnInit, Output, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

export interface TableColumn {
  columnDef: string; 
  header: string;
  cell: (row: any) => string;
  pipe?: PipeTransform;
  pipeFormat?: string | object | any[];
}

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent <Table> implements OnInit{
  @Input() columns: TableColumn[] = [];
  @Input() data!: Observable<any[]>;
  @Input() actions: { label: string; function: (row: any) => void }[] = [];

  dataSource: any[] = [];
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.data.subscribe((data) => {
      this.dataSource = data;
    });
    this.displayedColumns = this.columns.map(column => column.columnDef);
    if (this.actions.length > 0) {
      this.displayedColumns.push('actions');
    }
  }

  executeAction(action: (row: any) => void, row: any) {
    // Llama directamente a la función pasada desde el padre
    action(row); 
  }
}
