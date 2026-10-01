# CAPSL post-signup confirmation

## Implementation
- Add `/signup/confirmation` as a public, branded confirmation page with responsive CAPSL authentication-page styling.
- Accept an optional `email` query parameter, validate it as text, and only render the email line when present.
- Update the shared signup form so only `needsConfirmation: true` navigates to the confirmation page with the registered email.
- Preserve the current immediate-session behavior, staff-only registration, validation, error normalization, and confirmation redirect URL.
- Add route-specific title, description, Open Graph, and Twitter metadata.

## Validation
- Run the production build, which also verifies route generation and TypeScript compilation.
- Check the confirmation page at desktop and mobile widths, including a direct visit without an email.

## Technical details
- The email is passed in a URL query parameter; no password or other credential is included.
- The new route file will be `src/routes/signup.confirmation.tsx`, matching TanStack Router’s `/signup/confirmation` route ID.
