import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  
  profile: string = ''; 

  constructor(private authService: AuthService, private router: Router) {
    this.profile = this.authService.getProfile();
  }

  logout(): void {
    this.authService.logout();
  }
}
