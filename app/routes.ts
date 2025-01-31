import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("dashboard/:section?/:tab?", "routes/dashboard.tsx"),
] satisfies RouteConfig;
