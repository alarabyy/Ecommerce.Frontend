import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../Service/auth.service';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  isLoading = true;
  isSuccess = false;
  message = '';
  userId: string | null = null;
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Extract userId and token from URL query parameters
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.token = params['token'];

      if (!this.userId || !this.token) {
        this.isLoading = false;
        this.isSuccess = false;
        this.message = 'Invalid confirmation link. Missing required parameters.';
        return;
      }

      // Call the backend to confirm email
      this.confirmEmail();
    });
  }

  private confirmEmail(): void {
    if (!this.userId || !this.token) {
      return;
    }

    this.authService.confirmEmail(this.userId, this.token).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isSuccess = true;
        this.message = response.message || 'Email confirmed successfully! You can now log in.';
      },
      error: (error) => {
        this.isLoading = false;
        this.isSuccess = false;
        this.message = error.error?.message || 'Email confirmation failed. Please try again or contact support.';
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
