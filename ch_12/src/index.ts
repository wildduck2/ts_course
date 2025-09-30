type Person = {
  id: string
  name: string
  age: number
}

type Employee = Person & {
  role: string
}

const permissions = {
  read: 'READ',
  write: 'WRITE',
  delete: 'DELETE',
  share: 'SHARE',
} as const

type PermissionsKeys = keyof typeof permissions
type PermissionsValues = (typeof permissions)[PermissionsKeys]

function addPermission<TType extends { id: string }, U extends PermissionsValues>(user: TType, permission: U) {}

addPermission({ id: '1' }, 'DELETE')
