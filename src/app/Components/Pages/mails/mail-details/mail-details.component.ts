import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap, of } from 'rxjs';
import { Mail, MailService } from '../../../../Service/mail.service';

@Component({
  selector: 'app-mail-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.scss']
})
export class MailDetailsComponent implements OnInit {
  mail$!: Observable<Mail | null>;
  currentMailId!: number;
  replyForm: FormGroup;
  replyMessage: string | null = null;
  replyStatus: 'success' | 'error' | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mailService: MailService,
    private fb: FormBuilder
  ) {
    this.replyForm = this.fb.group({
      replyBody: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.mail$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.currentMailId = +id;
          return this.mailService.getMailById(this.currentMailId);
        }
        return of(null);
      })
    );
  }

  onSendReply() {
    if (this.replyForm.invalid) return;

    const replyBody = this.replyForm.get('replyBody')?.value;
    this.mailService.replyToMail(this.currentMailId, replyBody).subscribe({
      next: () => {
        this.replyStatus = 'success';
        this.replyMessage = 'Reply sent successfully!';
        setTimeout(() => this.router.navigate(['/home']), 1500);
      },
      error: (err) => {
        this.replyStatus = 'error';
        this.replyMessage = 'Failed to send reply.';
        console.error(err);
      }
    });
  }
}
