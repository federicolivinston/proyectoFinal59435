import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  
  profile$: Observable<string>; 

  constructor(private authService: AuthService, private router: Router) {
    this.profile$ = this.authService.getProfile();
  }

  logout(): void {
    this.authService.logout();
  }
}
