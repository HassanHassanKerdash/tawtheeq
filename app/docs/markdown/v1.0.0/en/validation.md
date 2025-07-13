# ✅ Validation

Kawkab provides a powerful validation system to ensure the integrity of input data.

## Example:

```typescript
import { validate } from "kawkab";

export default class {
  post({ body }) {
    validate(body, {
      name: "string|required",
      age: "number|min:18"
    });
    return { status: "ok" };
  }
}
``` 