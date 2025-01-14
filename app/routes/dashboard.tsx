import type { Route } from "./+types/home";
import {Dashboard} from "~/dashboard/dashboard";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "ηProxy | Dashboard" },
        { name: "description", content: "Welcome to dashboard!" },
    ];
}

export default function Home() {
    return <Dashboard />;
}
