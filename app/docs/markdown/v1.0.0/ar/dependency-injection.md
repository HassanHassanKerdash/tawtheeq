# 🧬 الحقن التابع (Dependency Injection)

يدعم Kawkab مفهوم الحقن التابع لتسهيل إدارة الاعتمادات بين المكونات.

## مثال:

```typescript
import { Inject } from "kawkab";

export default class {
  constructor(@Inject("UserService") userService) {
    this.userService = userService;
  }
}
``` 