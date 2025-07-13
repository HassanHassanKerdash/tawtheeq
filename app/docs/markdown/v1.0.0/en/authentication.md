# 🔐 Authentication

Kawkab provides an integrated authentication system to protect your app and manage user permissions.

## Example:

```typescript
import { Auth } from "kawkab";

export default class {
  @Auth()
  get() {
    return { status: "Authenticated user" };
  }
}
``` 