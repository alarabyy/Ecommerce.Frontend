import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationModalComponent } from '../../../Widgets/confirmation-modal/confirmation-modal.component';
import { Role } from '../../../../Models/Role';
import { RoleService } from '../../../../Service/role.service';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationModalComponent],
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
  roles$!: Observable<Role[]>;
  showDeleteModal = false;
  itemToDeleteId: number | null = null;
  itemToDeleteName: string = '';

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roles$ = this.roleService.getRoles();
  }

  openDeleteConfirmation(role: Role) {
    if (role.name.toLowerCase() === 'superadmin') {
      alert("The SuperAdmin role cannot be deleted.");
      return;
    }
    this.itemToDeleteId = role.id;
    this.itemToDeleteName = role.name;
    this.showDeleteModal = true;
  }

  onDeleteConfirmed(confirmed: boolean) {
    if (confirmed && this.itemToDeleteId) {
      this.roleService.deleteRole(this.itemToDeleteId).subscribe({
        next: () => {
          this.loadRoles();
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error("Deletion failed:", err);
          alert("Could not delete the role. It might be in use.");
          this.closeDeleteModal();
        }
      });
    } else {
      this.closeDeleteModal();
    }
  }

  closeDeleteModal() {
    this.itemToDeleteId = null;
    this.itemToDeleteName = '';
    this.showDeleteModal = false;
  }
}
