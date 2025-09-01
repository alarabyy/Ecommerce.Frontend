import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../Service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Using the shared style file
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  passwordFieldType: 'password' | 'text' = 'password'; // <-- متغير جديد

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['superadmin@ecommerce.com', [Validators.required, Validators.email]],
      password: ['superadmin', Validators.required],
      rememberMe: [true]
    });
  }

  // دالة جديدة لتبديل نوع الحقل
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.errorMessage = null;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        // Redirect to a protected page, e.g., dashboard
        this.router.navigate(['/dashboard/categories']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }

  // Helper getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
}
