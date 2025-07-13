# 🔐 المصادقة (Authentication)

يوفر Kawkab نظام مصادقة متكامل لحماية تطبيقك وإدارة صلاحيات المستخدمين.

## مثال:

```typescript
import { Auth } from "kawkab";

export default class {
  @Auth()
  get() {
    return { status: "مستخدم موثّق" };
  }
}
``` 