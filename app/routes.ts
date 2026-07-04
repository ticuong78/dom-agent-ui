import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/_index.tsx"),
  route("lookingforward!", "pages/pre_launch/ComingSoonPage.tsx"),
] satisfies RouteConfig;
