import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Mail, MailService } from '../../../../Service/mail.service';

@Component({
  selector: 'app-mails-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mails-list.component.html',
  styleUrls: ['./mails-list.component.scss']
})
export class MailsListComponent implements OnInit {
  mails$!: Observable<Mail[]>;

  constructor(private mailService: MailService) {}

  ngOnInit(): void {
    this.mails$ = this.mailService.getMails();
  }
}
