import { route, index, layout, prefix } from "@react-router/dev/routes";

export default [
  layout("./main/pages/layout.tsx", [
  index("./main/pages/page.tsx"),
  ...prefix("docs", [
  route(":slug", "./main/pages/docs/[slug].tsx")
]),
  route("*", "./main/pages/not-found.tsx")
])
];
