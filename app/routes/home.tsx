import type { Route } from "./+types/home";
import {Header} from "~/header/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Proxy" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Header />;
}
