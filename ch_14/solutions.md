# A — Exercise solutions

### 1) `DeepRequired<T>` — make nested properties required

```ts
// deep-required.ts
export type DeepRequired<T> =
  // leave functions as-is
  T extends (...args: any[]) => any ? T :
  // arrays -> deep apply to item type
  T extends Array<infer U> ? Array<DeepRequired<U>> :
  // objects -> map over keys and remove optional modifier
  T extends object ? { [K in keyof T]-?: DeepRequired<T[K]> } :
  // primitives
  T;
```

Notes:

* We handle functions first so we don't recurse into callables.
* Arrays are handled to recurse into item types.
* `-?` removes the optional modifier on keys.

---

### 2) `StringifyKeys<T>` — produce a type with stringified keys

```ts
// stringify-keys.ts
export type StringifyKeys<T> = {
  // only keys that can be turned into string or number are kept
  [K in keyof T as K extends string | number ? `${K}` : never]: T[K];
};
```

Example:

```ts
type Source = { a: number; 42: boolean; [Symbol.iterator]?: () => void };
type Str = StringifyKeys<Source>;
// Str = { "a": number; "42": boolean }
```

Notes:

* Template literal `${K}` turns `number` or `string` keys into string literal keys.
* Symbol keys are excluded because they can't be stringified into literal keys in the same way.

---

### 3) Branded `Email` type + runtime `isEmail` type guard

```ts
// branded-email.ts
export type Email = string & { readonly __brand: "Email" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(x: unknown): x is Email {
  return typeof x === "string" && EMAIL_RE.test(x);
}

// Helper to assert/convert a validated string into Email
export function asEmail(s: string): Email {
  if (!EMAIL_RE.test(s)) throw new Error("Invalid email");
  return s as Email;
}
```

Usage:

```ts
const raw: unknown = "alice@example.com";
if (isEmail(raw)) {
  // raw is typed as Email here
  const e: Email = raw;
  // use e safely as Email
} else {
  // not an email
}

const e2 = asEmail("bob@example.com"); // throws if invalid, otherwise typed Email
```

Notes:

* Branded types are compile-time only; at runtime `Email` is just a string. The guard + `as` cast is the pattern to safely produce the branded type.
* Keep the regex simple for clarity — replace with stricter validation if needed.

---

# B — Mini-project: **Type-safe API client** (sketch + example code)

Goal: small client that:

* Uses branded IDs (`UserId`, `OrderId`)
* Uses `DeepRequired` to represent server-full objects
* Uses runtime type guards to validate incoming responses
* Has a generic `request` method that returns typed responses

## File structure (suggested)

```
src/
  types.ts
  utils.ts
  validators.ts
  apiClient.ts
  example.ts
```

### `types.ts`

```ts
// types.ts
export type Brand<K, T extends string> = K & { readonly __brand: T };

export type UserId = Brand<number, "UserId">;
export type OrderId = Brand<number, "OrderId">;

export type DeepRequired<T> =
  T extends (...args: any[]) => any ? T :
  T extends Array<infer U> ? Array<DeepRequired<U>> :
  T extends object ? { [K in keyof T]-?: DeepRequired<T[K]> } :
  T;

// Example server DTOs (may contain optional fields)
export type RawUser = {
  id?: number;
  name?: string;
  email?: string | null;
  profile?: {
    bio?: string;
    avatarUrl?: string | null;
  } | null;
};

export type User = DeepRequired<{
  id: UserId;
  name: string;
  email: string;
  profile: {
    bio: string;
    avatarUrl: string | null;
  };
}>;

// Example API shapes mapping
export interface Endpoints {
  "GET /users/:id": { params: { id: string }; response: User };
  "POST /orders": { body: { productId: number; qty: number }; response: { id: OrderId } };
}
```

### `utils.ts`

```ts
// utils.ts
export function brand<K, T extends string>(value: K, _tag: T) {
  return value as Brand<K, T>;
}

import type { Brand } from "./types";
```

(Alternatively just use `value as UserId` inline; helper is convenience.)

### `validators.ts` — lightweight runtime validators (no external deps)

```ts
// validators.ts
import type { RawUser, User, UserId } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isNumber(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x);
}

export function isUserId(x: unknown): x is UserId {
  return isNumber(x); // runtime check: numeric id; casting done later
}

export function isRawUser(x: any): x is RawUser {
  return x !== null && typeof x === "object";
}

export function validateAndConvertUser(obj: unknown): User | null {
  if (!isRawUser(obj)) return null;
  // Basic presence checks
  const { id, name, email, profile } = obj as any;
  if (!isNumber(id)) return null;
  if (typeof name !== "string") return null;
  if (typeof email !== "string" || !EMAIL_RE.test(email)) return null;
  if (!profile || typeof profile !== "object") return null;
  if (typeof profile.bio !== "string") return null;

  // Build typed user (use branded id)
  return {
    id: id as UserId,
    name,
    email,
    profile: {
      bio: profile.bio,
      avatarUrl: profile.avatarUrl ?? null
    }
  };
}
```

### `apiClient.ts` — generic request wrapper

```ts
// apiClient.ts
import type { Endpoints } from "./types";
import { validateAndConvertUser } from "./validators";

export class ApiClient {
  base: string;
  constructor(base = "/api") { this.base = base; }

  private async fetchJson(url: string, opts?: RequestInit) {
    const r = await fetch(url, opts);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }

  // Example typed method for GET /users/:id
  async getUser(id: number) {
    const raw = await this.fetchJson(`${this.base}/users/${id}`);
    const user = validateAndConvertUser(raw);
    if (!user) throw new Error("Invalid user from server");
    return user; // typed User
  }

  // Example typed method for POST /orders
  async createOrder(body: { productId: number; qty: number }) {
    const raw = await this.fetchJson(`${this.base}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    // minimal validation
    if (typeof raw !== "object" || raw === null || typeof raw.id !== "number") {
      throw new Error("Invalid order response");
    }
    return { id: raw.id as import("./types").OrderId };
  }
}
```

### `example.ts` — usage

```ts
// example.ts
import { ApiClient } from "./apiClient";

async function run() {
  const c = new ApiClient("https://example.com");
  try {
    const user = await c.getUser(1);
    console.log("User name:", user.name);

    const order = await c.createOrder({ productId: 10, qty: 2 });
    console.log("Order id (branded):", order.id);
  } catch (err) {
    console.error(err);
  }
}

run();
```

## Notes & best practices for the mini project

* **Runtime validation is critical**: even if types say the server returns `User`, verify at runtime — use `validateAndConvertUser`.
* Small handwritten validators are OK, but for real projects prefer a schema/validator library (Zod, io-ts) to generate validators and types.
* The branded ID pattern prevents mixing `UserId` and `OrderId` at compile time.
* Use `DeepRequired` for types you expect to be fully available after validation.
