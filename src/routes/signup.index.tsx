import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "@/components/auth/auth-panel";

export const Route = createFileRoute("/signup/")({
  head: () => ({
    meta: [
      { title: "Create account | CAPSL HSE" },
      { name: "description", content: "Create a CAPSL staff account with your @capslgas.com email." },
      { property: "og:title", content: "Create account | CAPSL HSE" },
      { property: "og:description", content: "Create a CAPSL staff account with your @capslgas.com email." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <AuthPanel role="staff" initialMode="signup" />,
});
