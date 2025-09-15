import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RoleService } from '../../../../Service/role.service';

@Component({
  selector: 'app-edit-role-permissions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-role-permissions.component.html',
  styleUrls: ['./edit-role-permissions.component.scss']
})
export class EditRolePermissionsComponent implements OnInit {
  permissionsForm!: FormGroup;
  roleId!: number;
  roleName = '';
  allPermissions: string[] = [];
  errorMessage: string | null = null;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.permissionsForm = this.fb.group({
      permissions: this.fb.array([])
    });
  }

  get permissionsArray(): FormArray {
    return this.permissionsForm.get('permissions') as FormArray;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.router.navigate(['/admin/roles']);
      return;
    }
    this.roleId = +idParam;

    forkJoin({
      allPermissions: this.roleService.getAllPermissions(),
      rolePermissions: this.roleService.getRolePermissions(this.roleId),
      roles: this.roleService.getRoles()
    }).subscribe({
      next: ({ allPermissions, rolePermissions, roles }) => {
        this.allPermissions = allPermissions;
        const role = roles.find(r => r.id === this.roleId);
        this.roleName = role ? role.name : 'Unknown Role';

        this.allPermissions.forEach(permission => {
          const isEnabled = rolePermissions.includes(permission);
          this.permissionsArray.push(new FormControl(isEnabled));
        });

        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = "Failed to load role data.";
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.permissionsForm.invalid) return;

    const selectedPermissions = this.permissionsForm.value.permissions
      .map((checked: boolean, i: number) => checked ? this.allPermissions[i] : null)
      .filter((permission: string | null): permission is string => permission !== null);

    this.roleService.updateRolePermissions(this.roleId, { permissions: selectedPermissions })
      .subscribe({
        next: () => this.router.navigate(['/admin/roles']),
        error: (err) => {
          this.errorMessage = "Failed to update permissions.";
          console.error(err);
        }
      });
  }
}
