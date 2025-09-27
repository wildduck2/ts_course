function greet(user: { name: string; age: number } | null) {
  // if (!user) {
  //   return 'Hello'
  // }

  return `Hello ${user.name}, you are ${user.age}`
}
