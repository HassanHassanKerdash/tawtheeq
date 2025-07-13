# 🧩 Controllers

Controllers are the core of your Kawkab application, handling the logic for requests and responses.

## Example:

```typescript
import { BaseController } from "kawkab";

export default class extends BaseController {
  get() {
    return { message: "Hello from Kawkab!" };
  }
}
```

You can define methods like get/post/put/delete as needed. 