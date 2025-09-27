# Chapter 3: TypeScript Types

TypeScript’s core power lies in its **type system**. Types let us describe how our data should look, catch mistakes before running code, and provide better autocomplete and documentation.

---

## 1. Primitive Types

### boolean

boolean is a primitive data type in TypeScript that represents a boolean value i.e. either true or false. Given below is an example of a boolean variable declaration:

```ts
let isTrue: boolean = true;
let isFalse: boolean = false;
```

---

### number

It is a primitive data type in TypeScript that represents numeric values. It includes both integer and floating-point values.

```ts
let intValue: number = 42;
let floatValue: number = 3.14;
// BigInt
let floatValue: bigint = 2341234123412; 
```

---

### string

It is a primitive data type in TypeScript that represents textual data. It is a set of elements of the 16-bit Unicode character set.

```ts
let name: string = 'John Doe';
```

---

### void

void represents the return value of functions which don’t return a value. It’s the inferred type any time a function doesn’t have any return statements, or doesn’t return any explicit value from those return statements:

```ts
// The inferred return type is void
function noop() {
  return;
}
```
In JavaScript, a function that doesn’t return any value will implicitly return the value undefined. However, void and undefined are not the same thing in TypeScript. There are further details at the end of this chapter.

---

### undefined

JavaScript has two primitive values used to signal absent or uninitialized value: null (absent) and undefined (uninitialized).

TypeScript has two corresponding types by the same names. How these types behave depends on whether you have the strictNullChecks option on.

With strictNullChecks off, values that might be null or undefined can still be accessed normally, and the values null and undefined can be assigned to a property of any type. This is similar to how languages without null checks (e.g. C#, Java) behave. The lack of checking for these values tends to be a major source of bugs; TypeScript always recommend people turn strictNullChecks on if it’s practical to do so in the codebase.

With strictNullChecks on, when a value is null or undefined, you will need to test for those values before using methods or properties on that value. Just like checking for undefined before using an optional property, we can use narrowing to check for values that might be null:

```ts
function doSomething(x: string | undefined) {
  if (x === undefined) {
    // do nothing
  } else {
    console.log('Hello, ' + x.toUpperCase());
  }
}
```

---

### null

JavaScript has two primitive values used to signal absent or uninitialized value: null (absent) and undefined (uninitialized).

TypeScript has two corresponding types by the same names. How these types behave depends on whether you have the strictNullChecks option on.

With strictNullChecks off, values that might be null or undefined can still be accessed normally, and the values null and undefined can be assigned to a property of any type. This is similar to how languages without null checks (e.g. C#, Java) behave. The lack of checking for these values tends to be a major source of bugs; TypeScript always recommend people turn strictNullChecks on if it’s practical to do so in the codebase.

With strictNullChecks on, when a value is null or undefined, you will need to test for those values before using methods or properties on that value. Just like checking for undefined before using an optional property, we can use narrowing to check for values that might be null:

```ts
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log('Hello, ' + x.toUpperCase());
  }
}
```

---

## 2. Object Types

### Interface

TypeScript allows you to specifically type an object using an interface that can be reused by multiple objects.

```ts
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return 'Hello ' + person.name;
}
```

---

### Class

In TypeScript, a class is a blueprint for creating objects with specific properties and methods. Classes are a fundamental concept in object-oriented programming. Here is an example of a simple class in TypeScript:

```ts
class Car {
  make: string;
  model: string;
  year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  drive() {
    console.log(`Driving my ${this.year} ${this.make} ${this.model}`);
  }
}
```

--- 

### Enum

Enums is not a type-level extension of JavaScript. It allows a developer to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.

Here is an example of a numeric enum in TypeScript:

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```
Above, we have a numeric enum where Up is initialized with 1. All of the following members are auto-incremented from that point on. In other words, Direction.Up has the value 1, Down has 2, Left has 3, and Right has 4.

If we left off the initializer for Up, it would have the value 0 and the rest of the members would be auto-incremented from there.

--- 

### Array

To specify the type of an array like [1, 2, 3], you can use the syntax number[]; this syntax works for any type (e.g. string[] is an array of strings, and so on). You may also see this written as Array<number>, which means the same thing.

```ts
const numbers: number[] = [1, 2, 3];
```

--- 

### Object

To define an object type, we simply list its properties and their types.

For example, here’s a function that takes a point-like object:

```ts
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 3, y: 7 });
```

---

### Tuple

A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.

```ts
type StringNumberPair = [string, number];

const pair: StringNumberPair = ['hello', 42];

const first = pair[0];
const second = pair[1];

// Error: Index out of bounds
const third = pair[2];
```

---

## 3. Top Types

### Unknown

unknown is the type-safe counterpart of any. Anything is assignable to unknown, but unknown isn’t assignable to anything but itself and any without a type assertion or a control flow based narrowing. Likewise, no operations are permitted on an unknown without first asserting or narrowing to a more specific type.

```ts
function f1(a: any) {
  a.b(); // OK
}

function f2(a: unknown) {
  // Error: Property 'b' does not exist on type 'unknown'.
  a.b();
}
```

--- 

### Never

The never type represents the type of values that never occur. For instance, never is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns. Variables also acquire the type never when narrowed by any type guards that can never be true.

The never type is a subtype of, and assignable to, every type; however, no type is a subtype of, or assignable to, never (except never itself). Even any isn’t assignable to never.

Examples of functions returning never:

```ts
// Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error('Something failed');
}

// Function returning never must not have a reachable end point
function infiniteLoop(): never {
  while (true) {}
}
```

--- 

### Any

TypeScript has a special type, any, that you can use whenever you don’t want a particular value to cause typechecking errors.

When a value is of type any, you can access any properties of it (which will in turn be of type any), call it like a function, assign it to (or from) a value of any type, or pretty much anything else that’s syntactically legal:

```ts
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = 'hello';
const n: number = obj;
```

---

