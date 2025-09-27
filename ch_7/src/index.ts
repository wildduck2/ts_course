type User = { name: string }

function greetUser(this: User, greeting: string) {
  console.log(`${greeting}, ${this.name}`)
}

greetUser.call({ name: 'Alice' }, 'Hello')
