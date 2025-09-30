# Chapter 7: TypeScript Functions

Functions are at the heart of every TypeScript (and JavaScript) program. TypeScript enhances functions with **type annotations**, **inference**, and **advanced typing features** for safety and flexibility.

---

## 1. Function Type Annotations

You can specify parameter and return types explicitly:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

* `a: number` → parameter type
* `: number` after the parameter list → return type

If you don’t provide a return type, TypeScript **infers** it:

```ts
function greet(name: string) {
  return `Hello, ${name}`; // inferred as string
}
```

---

## 2. Optional and Default Parameters

### Optional Parameters (`?`)

Parameters can be optional.

```ts
function log(message: string, userId?: string) {
  console.log(message, userId ?? "guest");
}
```

### Default Parameters

Parameters can have default values.

```ts
function power(base: number, exponent: number = 2): number {
  return base ** exponent;
}

power(3);    // 9
power(3, 3); // 27
```

---

## 3. Rest Parameters

Collect multiple arguments into an array:

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

---

## 4. Function Types

You can describe a function’s type separately:

```ts
type MathOperation = (a: number, b: number) => number;

const multiply: MathOperation = (x, y) => x * y;
```

This is useful for callbacks and higher-order functions.

---

## 5. Anonymous & Arrow Functions

TypeScript works with arrow functions too:

```ts
const divide = (a: number, b: number): number => a / b;
```

If context is clear, TS can infer types:

```ts
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2); // n inferred as number
```

---

## 6. Function Overloads

You can define **multiple signatures** for a function:

```ts
function reverse(str: string): string;
function reverse(arr: number[]): number[];
function reverse(value: string | number[]): string | number[] {
  return typeof value === "string" 
    ? value.split("").reverse().join("")
    : value.slice().reverse();
}

reverse("hello");    // string
reverse([1, 2, 3]);  // number[]
```

---

## 7. `void` and `never`

### `void`

Used when a function doesn’t return anything:

```ts
function logMessage(msg: string): void {
  console.log(msg);
}
```

### `never`

Used when a function **never returns** (e.g., throws or loops forever):

```ts
function fail(msg: string): never {
  // throw new Error(msg);
  while(true) {}
}
```

---

## 8. `this` in Functions

You can type the `this` context explicitly (useful in OOP or DOM handlers):

```ts
type User = { name: string };

function greetUser(this: User, greeting: string) {
  console.log(`${greeting}, ${this.name}`);
}

greetUser.call({ name: "Alice" }, "Hello");
```

---

**Summary**

* Functions can have typed parameters, return types, optional/default/rest parameters.
* Function types help describe callbacks and higher-order functions.
* Use overloads for multiple signatures.
* Special return types: `void` (nothing) and `never` (doesn’t return).
* TypeScript even supports typing `this` inside functions.
