# 🛡️ Middleware

Middleware allows you to run custom logic before or after handling requests.

## Example:

```typescript
export default function logger(req, res, next) {
  console.log("New request:", req.url);
  next();
}
```

You can register middleware in your app to be executed automatically. 