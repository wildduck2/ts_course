# Chapter 9: TypeScript Classes

In this chapter, we’ll explore **classes in TypeScript**, which let us build reusable blueprints for objects. Classes group **data (properties)** and **behavior (methods)** together, making code more organized, structured, and object-oriented.

---

## 1. What is a Class?

A **class** is a template for creating objects. Instead of manually creating objects, we define a class once and then instantiate (create) objects from it.

Example:

```ts
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, my name is ${this.name}.`;
  }
}

const person1 = new Person("Ahmed", 25);
console.log(person1.greet()); // Hello, my name is Ahmed.
```

---

## 2. Class Members

A class can include several members:

* **Fields (properties):** Variables attached to the class.
* **Methods:** Functions inside a class.
* **Constructor:** A special method for initializing new objects.

Example:

```ts
class Car {
  brand: string;
  year: number;

  constructor(brand: string, year: number) {
    this.brand = brand;
    this.year = year;
  }

  drive(): void {
    console.log(`${this.brand} is driving...`);
  }
}

const car = new Car("Tesla", 2023);
car.drive(); // Tesla is driving...
```

---

## 3. Access Modifiers

TypeScript provides **access control** to protect class members:

* `public` → accessible everywhere (default).
* `private` → accessible only inside the class.
* `protected` → accessible inside the class and subclasses.

```ts
class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number) {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150
// account.balance ❌ Error: 'balance' is private
```

---

## 4. Readonly and Optional Properties

* `readonly` → cannot be reassigned after initialization.
* `?` (optional) → property is not required.

```ts
class User {
  readonly id: number;
  username: string;
  email?: string; // optional

  constructor(id: number, username: string, email?: string) {
    this.id = id;
    this.username = username;
    this.email = email;
  }
}

const user = new User(1, "ahmed");
console.log(user.id); // 1
// user.id = 2 ❌ Error
```

---

## 5. Inheritance

Classes can extend other classes with the `extends` keyword. This allows **reuse and specialization**.

```ts
class Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log("Some generic sound...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog("Buddy");
dog.makeSound(); // Woof! Woof!
```

---

## 6. Abstract Classes

An **abstract class** defines a base class that cannot be instantiated directly.
They often include **abstract methods** that must be implemented by subclasses.

```ts
abstract class Shape {
  abstract getArea(): number;
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle(5);
console.log(circle.getArea()); // 78.54
```

---

## 7. Interfaces vs. Classes

Both classes and interfaces define structure, but:

* **Interfaces** are contracts (no implementation).
* **Classes** define structure **and** behavior.

```ts
interface Flyable {
  fly(): void;
}

class Bird implements Flyable {
  fly(): void {
    console.log("Flying...");
  }
}
```

---

## 8. Static Members

Use `static` to define members shared by all instances.

```ts
class MathHelper {
  static PI: number = 3.14159;

  static square(x: number): number {
    return x * x;
  }
}

console.log(MathHelper.PI); // 3.14159
console.log(MathHelper.square(4)); // 16
```

---

## 9. Summary

* Classes group properties and methods.
* Access modifiers (`public`, `private`, `protected`) control visibility.
* `readonly` and optional properties improve type safety.
* Classes support **inheritance**, **abstraction**, and **polymorphism**.
* Interfaces and classes often work together for contracts and implementations.
* `static` members are shared across all instances.

