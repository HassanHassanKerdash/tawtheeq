# 🧩 المتحكمات (Controllers)

المتحكمات هي قلب التطبيق في Kawkab، حيث تدير منطق التعامل مع الطلبات والاستجابات.

## مثال:

```typescript
import { BaseController } from "kawkab";

export default class extends BaseController {
  get() {
    return { message: "مرحباً من Kawkab!" };
  }
}
```

يمكنك تعريف دوال مثل get/post/put/delete حسب الحاجة. 