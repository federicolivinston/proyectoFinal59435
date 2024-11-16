import { Component, OnInit } from '@angular/core';
import { ChairDetail } from '../../../../core/models/chairModels';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectChairById, selectChairs } from '../store/chair.selectors';
import { ChairActions } from '../store/chair.actions';

@Component({
  selector: 'app-chairs-detail',
  templateUrl: './chairs-detail.component.html',
  styleUrl: './chairs-detail.component.scss'
})
export class ChairsDetailComponent   implements OnInit{
  
  id: string = '';
  chair$: Observable<ChairDetail | undefined> = of(undefined);
  
  constructor(
    private store:Store,
    private route: ActivatedRoute,
    private location: Location,
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      const id = params.get('id'); 
      if (id) {
        this.store.select(selectChairs).subscribe((courses) => {
          if (courses.length === 0) {
            this.store.dispatch(ChairActions.loadChairs());
          }
        });
        this.loadChair(id); 
      }
    });
  }
 
  loadChair(id: string):void{
    this.chair$ = this.store.pipe(select(selectChairById(id)));
}

  goBack(): void {
    this.location.back();
  }
}
