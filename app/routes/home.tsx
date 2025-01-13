import type { Route } from "./+types/home";
import {Landing} from "~/landing/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Proxy" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Landing />;
}
