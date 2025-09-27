# Chapter 8: TypeScript Generics

Generics let us create **reusable, flexible, and type-safe** components. Instead of locking a function, class, or interface to a specific type, we can write code that works with **any type**, while still preserving type safety.

---

## 1. Why Generics?

Without generics, we lose type safety:

```ts
function identity(value: any): any {
  return value;
}

const result = identity("hello"); 
// result is ANY, we lose string-specific behavior
```

With **generics**:

```ts
function identity<T>(value: T): T {
  return value;
}

const str = identity("hello"); // inferred as string
const num = identity(42);      // inferred as number
```

Generics preserve the input type for the output.

---

## 2. Generic Functions

```ts
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const numbers = wrapInArray(5);     // number[]
const strings = wrapInArray("hi");  // string[]
```

TypeScript can **infer** `T` automatically, or you can explicitly pass it:

```ts
identity<string>("hello");
```

---

## 3. Generic Interfaces & Types

Generics work in interfaces and type aliases:

```ts
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 123 };
```

---

## 4. Generic Classes

Classes can be parameterized too:

```ts
class Container<T> {
  constructor(public item: T) {}
}

const stringContainer = new Container("text");  // T = string
const numberContainer = new Container(99);      // T = number
```

---

## 5. Constraining Generics (`extends`)

Sometimes you want a generic to work only with certain types:

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("hello");       // string has length
getLength([1, 2, 3]);     // array has length
getLength(42);            // number has no length
```

---

## 6. Default Generic Types

You can assign default types if none are provided:

```ts
interface Response<T = string> {
  data: T;
}

const res1: Response = { data: "ok" };    // defaults to string
const res2: Response<number> = { data: 1 };
```

---

## 7. Multiple Generics

Functions can use more than one type parameter:

```ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const entry = pair("id", 123); // [string, number]
```

---

## 8. Generics with Constraints & Utility Types

A common use is working with object keys:

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 25 };

const name = getProperty(person, "name"); // string
const age = getProperty(person, "age");   // number
// getProperty(person, "salary"); Error: salary not in person
```

---

## 9. Real-World Example

```ts
type ApiResponse<T> = {
  status: number;
  data: T;
};

function fetchUser(): ApiResponse<{ id: number; name: string }> {
  return {
    status: 200,
    data: { id: 1, name: "Alice" }
  };
}
```

---

**Summary**

* Generics = reusable, type-safe templates for functions, classes, and interfaces.
* They preserve type info and prevent `any` leaks.
* You can **constrain** (`extends`), **default**, and use **multiple** generics.
* Very powerful for APIs, data structures, and utilities.

