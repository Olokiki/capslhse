import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "@/components/auth/auth-panel";

export const Route = createFileRoute("/login/admin")({
  head: () => ({
    meta: [
      { title: "Administrator sign in | CAPSL HSE" },
      { name: "description", content: "Sign in or register as a CAPSL HSE Administrator." },
    ],
  }),
  component: () => <AuthPanel role="admin" />,
});
