# 🛡️ الوسائط (Middleware)

الوسائط تتيح لك تنفيذ منطق مخصص قبل أو بعد معالجة الطلبات.

## مثال:

```typescript
export default function logger(req, res, next) {
  console.log("طلب جديد:", req.url);
  next();
}
```

يمكنك تسجيل الوسائط في التطبيق ليتم تنفيذها تلقائياً. 