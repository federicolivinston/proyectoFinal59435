import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../core/models/userModels';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  showFiller = false;

  authUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }
}
