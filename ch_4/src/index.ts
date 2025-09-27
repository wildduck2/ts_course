class Person {
  protected id: number = 0
  name: string = ''
}
interface Employee extends Person {
  role: string
}

const emp: Employee = { name: 'Sara', role: 'Manager' } // CORRECT
