import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RoleService } from '../../../../Service/role.service';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  roleForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.roleForm.invalid) return;
    const roleName = this.roleForm.get('roleName')?.value;
    this.roleService.addRole(roleName).subscribe({
      next: () => this.router.navigate(['/admin/roles']),
      error: (err) => this.errorMessage = err.error?.message || 'Failed to create role.'
    });
  }
}
