import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailsListComponent } from './mails-list.component';

describe('MailsListComponent', () => {
  let component: MailsListComponent;
  let fixture: ComponentFixture<MailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
