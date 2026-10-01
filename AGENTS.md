<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Conventions

- Every auth error path must pass through `normalizeAuthError(error, fallback)` in `src/lib/auth-store.ts`, and `signIn` / `signUp` keep their `try/catch` wrappers returning `{ ok: false, error: string }`. Why: the forms render `res.error` straight into a red box, and a raw thrown object or non-`Error` rejection surfaced there as a literal "{}" on the live signup page.
- Confirmation-required staff signups navigate to the public `/signup/confirmation` route with only the email query parameter. Why: all signup entry points share one safe, dedicated completion experience without exposing credentials.
