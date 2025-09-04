import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { EmailConfirmationComponent } from './email-confirmation.component';
import { AuthService } from '../../../../Service/auth.service';

describe('EmailConfirmationComponent', () => {
  let component: EmailConfirmationComponent;
  let fixture: ComponentFixture<EmailConfirmationComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['confirmEmail']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      queryParams: of({ userId: 'test-user-id', token: 'test-token' })
    });

    await TestBed.configureTestingModule({
      imports: [EmailConfirmationComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailConfirmationComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract userId and token from query parameters', () => {
    fixture.detectChanges();
    expect(component.userId).toBe('test-user-id');
    expect(component.token).toBe('test-token');
  });

  it('should call confirmEmail when valid parameters are provided', () => {
    mockAuthService.confirmEmail.and.returnValue(of({ message: 'Success' }));
    fixture.detectChanges();
    expect(mockAuthService.confirmEmail).toHaveBeenCalledWith('test-user-id', 'test-token');
  });

  it('should navigate to login on success', () => {
    mockAuthService.confirmEmail.and.returnValue(of({ message: 'Success' }));
    fixture.detectChanges();
    component.goToLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to register on error', () => {
    mockAuthService.confirmEmail.and.returnValue(of({ message: 'Success' }));
    fixture.detectChanges();
    component.goToRegister();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/register']);
  });
});
