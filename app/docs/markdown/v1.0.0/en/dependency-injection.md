# 🧬 Dependency Injection

Kawkab supports dependency injection to make managing dependencies between components easier.

## Example:

```typescript
import { Inject } from "kawkab";

export default class {
  constructor(@Inject("UserService") userService) {
    this.userService = userService;
  }
}
``` 