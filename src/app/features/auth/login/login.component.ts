import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false; // Controla la visibilidad de la contraseña
  showLoginError: boolean = false; //controla el error de login

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; 
  }

  onSubmit() {
    this.showLoginError=false;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {  
      const formValues = this.loginForm.value;
    
      // ejecuto el servicio de login
      this.authService.login(formValues.username,formValues.password).subscribe({
        next: (result) => {
          this.router.navigate(['admin']);
        },
        error: (err) => {
          console.error(err);
          if (err instanceof Error) {
            this.showLoginError=true;
          }
        },
      }); 
    }
  }
}
