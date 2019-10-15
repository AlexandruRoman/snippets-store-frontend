export interface IJwt {
    user: IJwtUser
}

interface IJwtUser {
    name: string
    id?: string
    role: IJwtRole
}

interface IJwtRole {
    name: string
    permissions: IJwtPermission[]
}

interface IJwtPermission {
    name: string
}
