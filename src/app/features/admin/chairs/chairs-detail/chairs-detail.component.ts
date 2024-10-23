import { Component, OnInit } from '@angular/core';
import { Chair } from '../../../../core/models/chairModels';
import { ChairsService } from '../../../../core/services/chairs.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chairs-detail',
  templateUrl: './chairs-detail.component.html',
  styleUrl: './chairs-detail.component.scss'
})
export class ChairsDetailComponent   implements OnInit{
  chair: Chair | null = null;
  isLoading = false;
  
  constructor(
    private chairsService: ChairsService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      if (id) {
        this.loadChair(id); 
      }
    });
  }
 
  loadChair(id: string):void{
    this.isLoading = true; // Iniciar carga
    this.chairsService.getChairById(id).subscribe(chair => {
      this.chair = chair; 
      this.isLoading = false; 
    }, () => {
      this.isLoading = false; 
    });
  }

  goBack(): void {
    this.location.back(); // Método para volver a la página anterior
  }
}
