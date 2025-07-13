# 🗂️ Routing

Kawkab uses file-based routing, making it easy to organize and manage your routes.

## Simple Example:

To create a new route, add a new TypeScript file in the routes folder:

```typescript
// app/routes/users.ts
export default class {
  get() {
    return { users: [] };
  }
}
```

Each file represents a route based on its name and location in the folder structure. 