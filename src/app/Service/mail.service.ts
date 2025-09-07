import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';

export interface Mail {
  id: number;
  name: string;
  email: string;
  subject: string;
  body: string;
  isReplied: boolean;
  replyBody: string | null;
  repliedAt: string | null;
  createdAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // POST /api/mails (Public)
  sendMail(contactForm: ContactForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/mails`, contactForm, { responseType: 'text' });
  }


  // GET /api/mails (Public endpoint according to docs)
  getMails(): Observable<Mail[]> {
    return this.http.get<Mail[]>(`${this.apiUrl}/mails`);
  }

  // GET /api/mails/{id} (Public endpoint according to docs)
  getMailById(id: number): Observable<Mail> {
    return this.http.get<Mail>(`${this.apiUrl}/mails/${id}`);
  }

  // ------------------------------------

  // POST /api/dashboard/mails/{id}/reply (Protected by Interceptor)
  replyToMail(id: number, replyBody: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/dashboard/mails/${id}/reply`, { replyBody });
  }
}
