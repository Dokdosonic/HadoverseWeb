# HADO VERSE: GitHub Secrets + private server function

This package changes the website so **NO Supabase API key appears in public JavaScript**.

## 1. Database
In Supabase > SQL Editor, run `supabase/schema.sql`. It revokes `anon` access from the registration RPCs; only `service_role` can invoke them. Before using on an existing live database, review for naming conflicts and back up any existing registration data.

## 2. GitHub Secrets
Repository > Settings > Secrets and variables > Actions > New repository secret:
- `SUPABASE_ACCESS_TOKEN`: create a **personal Supabase access token** in the Supabase account access-token settings; it is used only to deploy the function.
- `SUPABASE_PROJECT_REF`: project reference ID (not sensitive, but kept with the deploy settings).

DO NOT add `SUPABASE_SERVICE_ROLE_KEY` to GitHub or frontend files. The Supabase Edge Function runs with server-side `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment variables provided by Supabase; confirm these are available in Edge Functions > Secrets.

## 3. GitHub file deployment
- Replace root `download.html`.
- Replace `js/registration.js`.
- Replace `js/registration-config.js` and fill in the public **endpoint URL ONLY**:
  `https://YOUR_PROJECT_REF.supabase.co/functions/v1/registration`
- Add `supabase/schema.sql`, `supabase/config.toml`, `supabase/functions/registration/index.ts`.
- Add `.github/workflows/deploy-registration.yml`.
- Push to `main`, or manually run GitHub Actions > Deploy private registration API > Run workflow.
- After successful Actions deploy, open website and test counts and registration.

## IMPORTANT
- GitHub Actions Secrets never get embedded in website assets. Service role key is used inside Supabase only.
- The Edge Function endpoint and project reference are public; this is expected. CORS protects normal browser use but is NOT a security boundary against bots or scripted requests. Deploy with rate-limiting and CAPTCHA / anti-abuse before major public registration events.
- `deviceId` only limits repeats in the same browser profile; it is not verified identity.
- Supabase as a processor still receives and stores application data. This does NOT mean no information leaves the visitor's device.
- In `supabase/functions/registration/index.ts` adjust `allowedOrigins` if your deployed domain differs.
- To validate: open page source and DevTools network requests; there should be no `apikey` or Bearer token sent by browser. In Supabase SQL Editor, verify anon has no execute rights for RPCs. Do not publish an admin listing endpoint.
