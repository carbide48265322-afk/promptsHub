export interface Permission {
  id: string
  code: string
  name: string
}

export interface Role {
  id: string
  name: string
  description: string
  permissionIds: string[]
}

export interface RBACUser {
  id: string
  username: string
  roleIds: string[]
}
