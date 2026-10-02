# KN Construction and Builders: Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase (Auth and PostgreSQL).

## Quick start

```bash
npm install
cp .env.example .env.local      # then fill in the values (Step 2)
npm run dev                     # http://localhost:3000
```

Checks: `npm run typecheck`, `npm run lint`, `npm run build`.

The public website works without Supabase. Without it, the enquiry form tells visitors that storage is unavailable and offers Call and WhatsApp buttons. It never pretends an enquiry was saved.

## Step 2: Set up Supabase

1. Create a project at https://supabase.com.
2. Open **SQL Editor**, paste all of `supabase/schema.sql`, and run it. This creates the `enquiries` and `admins` tables, the `updated_at` trigger, and Row Level Security policies.
3. In **Project Settings, API**, copy the Project URL and the `anon` public key into `.env.local`:
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. In **Authentication, Users**, click **Add user** and create the owner's email and password. Turn off public sign-ups under **Authentication, Providers, Email** (disable "Allow new users to sign up") so nobody else can register.
5. Make that user an administrator by running this in the SQL Editor:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'owner@example.com';
   ```
6. Restart `npm run dev`, open `/admin/login`, and sign in.

## Security model

- Visitors can only INSERT a new enquiry (status must be `New`, no admin notes). They cannot read, update or delete anything.
- Only users listed in `public.admins` can read, update or delete enquiries, enforced by RLS in the database and by `requireAdmin()` on every admin page and server action.
- `middleware.ts` refreshes sessions and redirects unauthenticated visitors away from `/admin`.
- No service-role key is used anywhere. Only the public anon key is in the code.
- The enquiry API validates input with Zod, uses a honeypot field and a basic per-instance rate limit. For stronger spam protection, add Cloudflare Turnstile or reCAPTCHA in `components/EnquiryForm.tsx` and verify the token in `app/api/enquiries/route.ts`.

## Changing content

| What | Where |
| --- | --- |
| Company name, phone, WhatsApp, address, map link, tagline, email, services, navigation, hero text | `config/company.ts` |
| Every image | `config/images.ts` (put files in `public/images`) |
| Colours and fonts | `tailwind.config.ts`, `app/layout.tsx` |

- **Email:** leave `email` empty in `config/company.ts`. Email links appear automatically once you set it.
- **Images:** every image currently shipped is a clearly labelled SVG placeholder. Replace entries in `config/images.ts` with real photographs (JPG, WebP or PNG). Gallery items are placeholders and are labelled as such on the site. Do not present them as completed projects.
- **Open Graph image:** none is configured, because no real brand image exists yet. Add `app/opengraph-image.png` when you have one.

## Admin dashboard

- `/admin`: totals by status and the five most recent enquiries.
- `/admin/enquiries`: search by name or phone, filter by service and status, newest first, pagination (10 per page), call and WhatsApp buttons.
- `/admin/enquiries/[id]`: full enquiry, change status, internal notes, delete with confirmation.
- `/admin/projects`, `/admin/services`, `/admin/settings`: read-only views of what is in the config files. Editing these through the dashboard is not built; they are edited in `config/` and redeployed.

## Deploying

Deploy to Vercel (or any Node host). Set the three environment variables from `.env.example`, including `NEXT_PUBLIC_SITE_URL` with your real domain.

## Verification status

This project was written without the ability to run `npm install`, so **`typecheck`, `lint` and `build` have not been run**. Run them after installing, and fix anything they report.
