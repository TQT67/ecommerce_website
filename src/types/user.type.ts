type Role = 'User' | 'Admin '
export interface User {
  _id: string
  roles: Role[]
  email: string
  name: string
  date_of_birth: null
  address: ''
  phone: ''
  creatAt: string
  updatedAt: string
}