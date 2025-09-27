# Chapter 4: TypeScript Interfaces and Compatibility

Interfaces are one of TypeScript’s most powerful features. They let you **describe the shape of objects**, enforce contracts, and enable flexible code through structural typing.

This chapter also covers **type compatibility**, which answers the question: *“Can this value be assigned to that type?”*

---

## 1. Declaring Interfaces

An interface defines the structure of an object:

```ts
interface User {
  id: number;
  name: string;
  isAdmin?: boolean; // optional property
}

const u1: User = { id: 1, name: "Ahmed" }; // CORRECT
```

---

## 2. Readonly Properties

Mark properties that should not change:

```ts
interface Config {
  readonly apiKey: string;
}

const c: Config = { apiKey: "123" };
// c.apiKey = "456"; Error
```

---

## 3. Function Types in Interfaces

Interfaces can also describe functions:

```ts
interface AddFn {
  (a: number, b: number): number;
}

const add: AddFn = (x, y) => x + y;
```

---

## 4. Index Signatures

When you don’t know property names in advance:

```ts
interface Dictionary {
  [key: string]: string;
}

const dict: Dictionary = { hello: "world", foo: "bar" };
```

---

## 5. Extending Interfaces

Interfaces can **inherit** from each other:

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  role: string;
}

const e: Employee = { name: "Sara", role: "Manager" };
```

---

## 6. Interface vs Type

* **Interface**: Great for describing object shapes and can be extended multiple times (declaration merging).
* **Type alias**: More flexible (can define unions, primitives, intersections).

```ts
// Interface merging:
interface Car { brand: string; }
interface Car { year: number; }
const car: Car = { brand: "BMW", year: 2023 }; // CORRECT
```

---

## 7. Structural Typing

TypeScript uses **structural typing**: two types are compatible if their structures match, not if their names match.

```ts
interface Point { x: number; y: number; }
interface Coords { x: number; y: number; }

const p: Point = { x: 1, y: 2 };
const c: Coords = p; // Compatible
```

---

## 8. Type Compatibility Rules

### Objects

Extra properties are not allowed unless explicitly handled:

```ts
interface Animal { name: string; }

const a: Animal = { name: "Dog" }; // CORRECT
const b: Animal = { name: "Cat", age: 3 }; // Error
```

But assignment between variables works (because of structural typing):

```ts
let animal: Animal;
let obj = { name: "Bird", age: 2 };

animal = obj; // Allowed
```

---

### Functions

Compatibility depends on:

1. **Parameters** → fewer parameters can be assigned to more (but not vice versa).
2. **Return types** → must be compatible.

```ts
type Fn1 = (a: number) => void;
type Fn2 = (a: number, b: number) => void;

let f1: Fn1 = (x) => {};
let f2: Fn2 = (x, y) => {};

// f2 = f1 (f1 doesn’t accept two arguments)
// f1 = f2 (extra params can be ignored)
```

---

### Classes

Class compatibility is based on their instance shape, not their name.

```ts
class A { id: number = 1; }
class B { id: number = 2; }

let x: A = new B(); // Compatible
```

---

## 9. Interface Best Practices

* Use **interface** for objects, especially if you expect extensions.
* Use **type** for unions, intersections, or primitive aliases.
* Always prefer **explicit typing** for APIs and contracts.

---

### What’s left 

1. **Excess Property Checks**

   * When assigning a literal object directly, TypeScript checks for extra properties more strictly:

   ```ts
   interface User { name: string; }
   const u: User = { name: "Ahmed", age: 25 }; // Error
   const obj = { name: "Ahmed", age: 25 };
   const u2: User = obj; // Allowed
   ```

2. **Hybrid Types** (interface as object + function)

   ```ts
   interface Counter {
     (start: number): string;
     count: number;
   }

   const c: Counter = (start: number) => `Count: ${start}`;
   c.count = 0;
   ```

3. **Interface Extending Classes**

   * An interface can extend a class, capturing only the **public** members:

   ```ts
   class Person { protected id: number = 0; name: string = ""; }
   interface Employee extends Person { role: string; }

   const emp: Employee = { name: "Sara", role: "Manager" }; // CORRECT
   ```


