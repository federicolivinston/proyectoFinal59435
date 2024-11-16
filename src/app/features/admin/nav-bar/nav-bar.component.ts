import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserProfile } from '../../../store/auth.selectors';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  
  profile$: Observable<string>; 

  constructor(
      private authService: AuthService, 
      private router: Router, 
      private authStore: Store) {
    this.profile$ = this.authStore.select(selectUserProfile);
  }

  logout(): void {
    this.authService.logout();
  }
}
