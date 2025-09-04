import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService, LoginStep, LoginSessionResponse, PasswordValidationResponse, OtpValidationResponse } from '../../../../Service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // Form groups for different steps
  emailForm!: FormGroup;
  passwordForm!: FormGroup;
  otpForm!: FormGroup;

  // State management
  currentStep: LoginStep | null = null;
  sessionId: string | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  // UI state
  passwordFieldType: 'password' | 'text' = 'password';
  showResendOtp = false;
  resendOtpCountdown = 0;

  // Private
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    // Check if there's an existing session
    this.sessionId = this.authService.getSessionId();
    if (this.sessionId) {
      // If there's a session, we might need to handle it differently
      // For now, let's clear it and start fresh
      this.authService.clearSessionId();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForms(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.otpForm = this.fb.group({
      otpCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  // Step 1: Start login session with email
  onEmailSubmit(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const email = this.emailForm.get('email')?.value;

    this.authService.startLoginSession(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: LoginSessionResponse) => {
          console.log('Login session response:', response);
          this.isLoading = false;
          this.sessionId = response.sessionId;
          this.currentStep = response.nextStep;
          this.authService.storeSessionId(response.sessionId);

          if (response.message) {
            this.successMessage = response.message;
          }

          // Handle special cases if needed
          if (response.nextStep === LoginStep.EmailConfirmation) {
            // Show email confirmation message
          } else if (response.nextStep === LoginStep.Invalid) {
            this.handleInvalidStep(response.message);
          }
          
          console.log('Current step set to:', this.currentStep);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to start login session. Please try again.';
        }
      });
  }

  // Step 2: Validate password
  onPasswordSubmit(): void {
    if (this.passwordForm.invalid || !this.sessionId) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const password = this.passwordForm.get('password')?.value;

    this.authService.validatePassword(this.sessionId, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: PasswordValidationResponse) => {
          this.isLoading = false;
          this.currentStep = response.nextStep;

          if (response.nextStep === LoginStep.LoginSuccess && response.token) {
            this.handleLoginSuccess(response.token);
          } else if (response.nextStep === LoginStep.Otp) {
            this.showResendOtp = true;
            this.startResendOtpCountdown();
          } else if (response.nextStep === LoginStep.Invalid) {
            this.handleInvalidStep(response.message);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Password validation failed. Please try again.';
        }
      });
  }

  // Step 3: Validate OTP
  onOtpSubmit(): void {
    if (this.otpForm.invalid || !this.sessionId) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const otpCode = this.otpForm.get('otpCode')?.value;

    this.authService.validateOtp(this.sessionId, otpCode)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: OtpValidationResponse) => {
          this.isLoading = false;
          this.currentStep = response.nextStep;

          if (response.nextStep === LoginStep.LoginSuccess && response.token) {
            this.handleLoginSuccess(response.token);
          } else if (response.nextStep === LoginStep.Invalid) {
            this.handleInvalidStep(response.message);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'OTP validation failed. Please try again.';
        }
      });
  }

  // Handle different next steps
  private handleNextStep(nextStep: LoginStep): void {
    switch (nextStep) {
      case LoginStep.Password:
        // Show password form
        break;
      case LoginStep.Otp:
        // Show OTP form
        this.showResendOtp = true;
        this.startResendOtpCountdown();
        break;
      case LoginStep.EmailConfirmation:
        // Show email confirmation message
        break;
      case LoginStep.LoginSuccess:
        // This shouldn't happen here, but handle it
        break;
      case LoginStep.Invalid:
        this.handleInvalidStep();
        break;
    }
  }

  // Handle successful login
  private handleLoginSuccess(token: string): void {
    // Store the token and update authentication state
    localStorage.setItem('auth_token', token);
    this.authService['_isAuthenticated'].next(true);
    
    // Clear session data
    this.authService.clearSessionId();
    
    // Redirect to home page
    this.router.navigate(['/home']);
  }

  // Handle invalid step
  private handleInvalidStep(message?: string): void {
    this.errorMessage = message || 'Authentication failed. Please try again.';
    this.resetLoginState();
  }

  // Reset login state
  private resetLoginState(): void {
    this.currentStep = null;
    this.sessionId = null;
    this.authService.clearSessionId();
    this.emailForm.reset();
    this.passwordForm.reset();
    this.otpForm.reset();
    this.errorMessage = null;
    this.successMessage = null;
    this.showResendOtp = false;
    this.resendOtpCountdown = 0;
  }

  // Resend OTP functionality
  resendOtp(): void {
    if (!this.sessionId || this.resendOtpCountdown > 0) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.authService.resendOtp(this.sessionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.successMessage = response?.message || 'OTP resent successfully!';
          this.startResendOtpCountdown();
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to resend OTP. Please try again.';
        }
      });
  }

  private startResendOtpCountdown(): void {
    this.resendOtpCountdown = 60;
    const interval = setInterval(() => {
      this.resendOtpCountdown--;
      if (this.resendOtpCountdown <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  // Go back to previous step
  goBack(): void {
    if (this.currentStep === LoginStep.Password) {
      this.currentStep = null;
      this.sessionId = null;
      this.authService.clearSessionId();
      this.errorMessage = null;
      this.successMessage = null;
    } else if (this.currentStep === LoginStep.Otp) {
      this.currentStep = LoginStep.Password;
      this.otpForm.reset();
      this.errorMessage = null;
    }
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  // Helper getters
  get emailFormControls() {
    return this.emailForm.controls;
  }

  get passwordFormControls() {
    return this.passwordForm.controls;
  }

  get otpFormControls() {
    return this.otpForm.controls;
  }
}
