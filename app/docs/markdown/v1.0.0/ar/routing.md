# 🗂️ التوجيه (Routing)

نظام التوجيه في Kawkab يعتمد على هيكلية الملفات (File-Based Routing)، مما يسهل تنظيم المسارات وإدارتها.

## مثال بسيط:

لإنشاء مسار جديد، أضف ملف TypeScript جديد في مجلد المسارات:

```typescript
// app/routes/users.ts
export default class {
  get() {
    return { users: [] };
  }
}
```

كل ملف يمثل مساراً بناءً على اسمه وموقعه في المجلد. 