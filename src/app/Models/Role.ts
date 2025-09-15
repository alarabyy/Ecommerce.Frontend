export interface Role {
    id: number;
    name: string;
}

export interface UpdateRolePermissionsPayload {
    permissions: string[];
}
