// في ملف src/app/pages/auth/register/register.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../Service/auth.service';

// Custom validator to disallow spaces
export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}

// Custom validator for username (letters and digits only)
export function usernameValidator(control: AbstractControl): ValidationErrors | null {
  const valid = /^[a-zA-Z0-9]+$/.test(control.value);
  return valid ? null : { 'invalidUsername': true };
}


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  passwordFieldType: 'password' | 'text' = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      // *** التعديل هنا: غيرنا 'name' إلى 'username' وأضفنا التحقق ***
      username: ['', [Validators.required, noWhitespaceValidator, usernameValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: [0, Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.successMessage = null;
    this.errorMessage = null;

    // *** التعديل هنا: نرسل 'username' بدلاً من 'name' ***
    // ونغير الاسم إلى 'name' كما يتوقعه الـ API في الجسم
    const apiPayload = {
      name: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      gender: this.registerForm.value.gender,
      birthDate: this.registerForm.value.birthDate
    };

    this.authService.register(apiPayload).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Registration successful! Please log in.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        // Handle detailed validation errors if the backend sends them
        if (err.error && err.error.errors) {
            const errorMessages = Object.values(err.error.errors).flat();
            this.errorMessage = errorMessages.join(' ');
        } else {
            this.errorMessage = err.error?.detail || err.error?.message || 'Registration failed.';
        }
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }
}
