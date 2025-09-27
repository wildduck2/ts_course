function greet(name) {
    return 'Hello, ' + name;
}
// console.log(greet(42)); // ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'.
console.log(greet('Ahmed')); // ✅ Works fine
