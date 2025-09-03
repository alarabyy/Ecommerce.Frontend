import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from '../../../Service/mail.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  contactForm: FormGroup;
  formMessage: string | null = null;
  formStatus: 'success' | 'error' | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private mailService: MailService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.formMessage = null;
    this.formStatus = null;

    this.mailService.sendMail(this.contactForm.value).subscribe({
      next: (response) => {
        this.formStatus = 'success';
        this.formMessage = response; // API returns a string message
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.formStatus = 'error';
        this.formMessage = "Sorry, we couldn't send your message. Please try again later.";
        this.isSubmitting = false;
        console.error(err);
      }
    });
  }
}
