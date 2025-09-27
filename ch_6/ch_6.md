# Chapter 6: Type Guards and Narrowing

In TypeScript, when we use **union types** or more complex combined types, we often need to figure out *what type a value really is* before safely working with it. This process is called **narrowing**.

---

## 1. What is Narrowing?

* **Narrowing**: Refining a broad type (like `string | number`) into a more specific one (`string` or `number`) using checks.
* This allows TypeScript to know which methods and properties are safe to use.

Example:

```ts
function printLength(value: string | number) {
  if (typeof value === "string") {
    console.log(value.length); // safe (string)
  } else {
    console.log(value.toFixed(2)); // safe (number)
  }
}
```

---

## 2. Type Guards

**Type guards** are expressions or functions that help TypeScript narrow down types.

### a) `typeof` Guard

Works for **primitive types**.

```ts
function log(value: string | number | boolean) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(1));
  } else {
    console.log(value ? "True" : "False");
  }
}
```

---

### b) `instanceof` Guard

Works for **class instances**.

```ts
class Dog { bark() { console.log("woof"); } }
class Cat { meow() { console.log("meow"); } }

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

---

### c) `in` Operator Guard

Checks if a property exists on an object.

```ts
type Admin = { role: "admin"; permissions: string[] };
type User = { role: "user"; email: string };

function access(account: Admin | User) {
  if ("permissions" in account) {
    console.log("Admin perms:", account.permissions);
  } else {
    console.log("User email:", account.email);
  }
}
```

---

### d) Discriminated Unions (Tag-based Guard)

A **common property** (often called `kind` or `type`) distinguishes the union members.

```ts
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Shape = Circle | Square;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
  }
}
```

---

### e) User-Defined Type Guards

You can create custom functions that return a **type predicate**.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(animal: Fish | Bird): animal is Fish {
  return (animal as Fish).swim !== undefined;
}

function move(animal: Fish | Bird) {
  if (isFish(animal)) {
    animal.swim(); // narrowed to Fish
  } else {
    animal.fly();  // narrowed to Bird
  }
}
```

---

## 3. Exhaustiveness Checking

TypeScript can warn you if you forget a case when narrowing.

```ts
function describe(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return "A circle";
    case "square":
      return "A square";
    default:
      const _exhaustive: never = shape; // Error if a new type is added
      return _exhaustive;
  }
}
```

---

**Summary**

* **Narrowing** helps us work safely with union/intersection types.
* Tools: `typeof`, `instanceof`, `in`, discriminated unions, and custom type guards.
* Use **exhaustive checks** to make your code future-proof.

