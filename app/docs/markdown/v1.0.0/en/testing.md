# 🧪 Testing

Kawkab supports built-in testing tools to ensure code quality and stability.

## Example:

```typescript
describe("API Test", () => {
  it("should return a welcome message", async () => {
    const res = await api.get("/");
    expect(res.message).toBe("Hello from Kawkab!");
  });
});
``` 