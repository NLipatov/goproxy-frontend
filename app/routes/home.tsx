import type { Route } from "./+types/home";
import {Landing} from "~/landing/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ηProxy" },
    { name: "description", content: "Welcome to ηProxy!" },
  ];
}

export default function Home() {
  return <Landing />;
}
