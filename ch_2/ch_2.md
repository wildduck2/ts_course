# Chapter 2: TypeScript Kickstart

## 1. Install TypeScript

You only need Node.js + npm installed. Then inside your project folder:

```bash
npm init -y                # create package.json
npm install --save-dev typescript
```

Check it works:

```bash
npx tsc --version
```

---

## 2. Create Your First File

Make a file `index.ts`:

```ts
function greet(name: string): string {
  return `Hello, ${name}!`
}

console.log(greet("TypeScript"))
```

---

## 3. Compile the File

```bash
npx tsc index.ts
```

This will generate `index.js`, which you can run with Node:

```bash
node index.js
```

---

## 4. Auto-Compile with Watch Mode

```bash
npx tsc index.ts --watch
```

Now every time you save `index.ts`, it re-compiles.

---

## 5. Project-Wide Setup

Instead of compiling files one by one, initialize a **tsconfig.json**:

```bash
npx tsc --init
```

This creates a config file. Now just run:

```bash
npx tsc
```

to compile all `.ts` files.

---

## 6. Understanding `tsconfig.json`

When you run:

```bash
npx tsc --init
```

TypeScript creates a `tsconfig.json` file — the compiler settings for your project.

Here are the **most important keys you’ll actually use**:

---

### **General Settings**

* **`compilerOptions`**
  The heart of the config. Contains all the compiler rules.

* **`include`**
  Which files/folders to include in compilation.

  ```json
  "include": ["src/**/*"]
  ```

* **`exclude`**
  Files/folders to skip. Default: `node_modules`.

  ```json
  "exclude": ["dist", "tests"]
  ```

---

### **Compiler Options**

#### File Management

* **`outDir`**
  Where compiled `.js` files go.

  ```json
  "outDir": "./dist"
  ```
* **`rootDir`**
  Where your source files live.

  ```json
  "rootDir": "./src"
  ```

#### Code Target

* **`target`**
  The JavaScript version output (default: `es2016`).

  ```json
  "target": "es2020"
  ```

* **`module`**
  The module system (`commonjs` for Node, `esnext`/`es2020` for modern).

  ```json
  "module": "commonjs"
  ```

#### Type Checking

* **`strict`**
  Turns on *all* strict type checks (recommended).

  ```json
  "strict": true
  ```

* **`noImplicitAny`**
  Forces you to type everything explicitly (on if `strict` is true).

* **`strictNullChecks`**
  Treats `null` and `undefined` as separate types.

#### Module Resolution

* **`moduleResolution`**
  How modules are found (`node` or `classic`). Use `"node"`.

* **`baseUrl` & `paths`**
  Configure import aliases. Example:

  ```json
  "baseUrl": "./src",
  "paths": {
    "@utils/*": ["utils/*"]
  }
  ```

  lets you do:

  ```ts
  import { helper } from "@utils/helper"
  ```

#### Other Useful Flags

* **`esModuleInterop`**
  Fixes default imports for CommonJS modules (always set this to `true`).
* **`skipLibCheck`**
  Skip type-checking `node_modules` to speed up builds.
* **`forceConsistentCasingInFileNames`**
  Prevents case mismatch errors in imports (good for cross-OS dev).

[Read More](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
