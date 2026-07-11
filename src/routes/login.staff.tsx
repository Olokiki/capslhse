import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "@/components/auth/auth-panel";

export const Route = createFileRoute("/login/staff")({
  head: () => ({
    meta: [
      { title: "Staff sign in | CAPSL HSE" },
      { name: "description", content: "Sign in or register as CAPSL field staff." },
    ],
  }),
  component: () => <AuthPanel role="staff" />,
});
