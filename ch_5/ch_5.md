# Chapter 5: Combined Types

In TypeScript, we often want to combine multiple types together to build more flexible and powerful type systems. The two main ways to do this are:

---

## 1. Union Types (`|`)

* A **union type** means a value can be *one of several types*.
* It’s like saying: "This variable could be type A **or** type B".

```ts
let value: string | number;

value = "hello"; // ok
value = 42;      // ok
value = true;    // Error: boolean not allowed
```

Union types are useful when you have multiple valid options.

### Narrowing with Type Guards

To work safely with union types, TypeScript requires you to **narrow down** the type.

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // string methods
  } else {
    console.log(id.toFixed(2));    // number methods
  }
}
```

---

## 2. Intersection Types (`&`)

* An **intersection type** means a value must satisfy *all* given types at once.
* It’s like merging multiple types into one.

```ts
type Person = { name: string };
type Employee = { id: number };

type EmployeePerson = Person & Employee;

const worker: EmployeePerson = {
  name: "Alice",
  id: 123
};
```

Here, `worker` must have both `name` and `id`.

---

## 3. Combining Union and Intersection

We can mix unions and intersections for more complex type systems.

```ts
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Shape = Circle | Square;

function area(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
  return shape.side ** 2;
}
```

This example uses a **discriminated union**, where each type has a common `kind` field to make narrowing easier.

---

## 4. Practical Example

```ts
type Admin = { role: "admin"; permissions: string[] };
type User = { role: "user"; email: string };

type Account = Admin | User;

function access(account: Account) {
  if (account.role === "admin") {
    console.log("Admin perms:", account.permissions);
  } else {
    console.log("User email:", account.email);
  }
}
```

---

**Summary**

* **Union (`|`)** -> "either this type or that type".
* **Intersection (`&`)** -> "must be both types at the same time".
* Together, they allow us to model real-world data structures with precision.

