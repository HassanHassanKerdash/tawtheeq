# 🧪 الاختبار (Testing)

يدعم Kawkab أدوات اختبار مدمجة لضمان جودة الكود واستقراره.

## مثال:

```typescript
describe("API Test", () => {
  it("يجب أن يرجع رسالة ترحيب", async () => {
    const res = await api.get("/");
    expect(res.message).toBe("مرحباً من Kawkab!");
  });
});
``` 