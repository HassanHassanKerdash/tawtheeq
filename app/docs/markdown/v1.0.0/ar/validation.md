# ✅ التحقق من المدخلات (Validation)

يوفر Kawkab نظام تحقق قوي لضمان صحة البيانات المدخلة.

## مثال:

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