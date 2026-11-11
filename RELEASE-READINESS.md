# KYBR — Release readiness & go-live controls
Updated: November 11, 2026

## Current disposition: CODE / LOCAL BROWSER CHECKS PASS; EXTERNAL LAUNCH GATES OPEN

KYBR_Design is a marketing website and product prototype in the `main` branch. The preview at `https://newkybr.netlify.app/` is not authorized as a verified production release, and the separate `kybrmarketing.ai` production domain must not be redirected or changed until an approved launch.

### Verified in repository / GitHub Actions
- Semantic page structure, missing local assets, duplicate IDs and JavaScript syntax checked with `node scripts/check-site.mjs`.
- Automated Chromium smoke checks at 320px, 390px, 768px and 1440px check viewport overflow, interactive five-stage demonstration, mobile menu, FAQ, form validation and key page routes.
- Chromium screenshots are stored as short-lived GitHub Actions artifacts in successful CI runs.
- Homepage CSS consolidated from seven requests into one `home.bundle.css`, with focus-visible, reduced-motion, smaller-screen and fallback styles.
- Removed duplicate content section and its two fragile remotely served photo elements.
- Staging `robots.txt` and `_headers` deliberately block indexing.
- Enterprise demonstration figure is illustrative and is no longer specific to the 44-location prospect.
- Website form has Netlify-friendly static HTML, a honeypot and a thank-you route. **Delivery itself is NOT verified.**
- A preliminary staging inquiry notice is available at `privacy.html`. It **requires real legal/privacy signoff** for production.

### Launch blockers — cannot certify without external verification
1. **Netlify account/deployment.** Confirm build/publish from `BeardGrowth/KYBR_Design` `main`, publish directory `.`, latest deploy commit and route availability. Inspect actual hosted response headers and forms.
2. **Live lead capture and notifications.** In Netlify, locate detected `kybr-demo` form; enable it where needed. Submit one labeled test lead using an authorized test address. Confirm it is stored, not flagged as spam, alerts the intended recipients, and is assigned for follow-up. Do not submit real sensitive information.
3. **Commercial product accuracy.** Engineering/product owner must validate which publishing, CRM, reputation, reporting, permissions, AI generation, integrations, and multi-location operations are functional. Replace or further label any capability that cannot be demonstrated.
4. **Pricing & service commitments.** Approve available plans, feature limits, onboarding deliverables, support levels, billing terms and actual pricing or quotation process.
5. **Brand rights & accuracy.** Approve the supplied brand logos, licensed hero photography, customer permissions, and verified case studies. The current homepage artwork includes crops and external Unsplash hero images; original clean logo files and approved local media are preferred before launch.
6. **Privacy & legal.** Approve an accurate full policy identifying data controller, processing providers, sharing, data retention, requests, tracking/cookies and business contact details. The staging privacy notice does not substitute for that policy.
7. **Analytics & attribution.** Connect a privacy-appropriate analytics system and record demo CTA, demo form submission, qualified lead, scheduled meeting and won customer events.
8. **Production SEO.** After selecting the canonical domain, remove blanket noindex/robots blocking on the **production** site only, add correct canonical URLs, sitemap, search console verification and only truthful structured data.
9. **Real-device/performance review.** Compare actual iPhone Safari and desktop appearance, keyboard, contrast, Core Web Vitals and third-party media behavior to the passing Chromium screenshots.
10. **Launch procedure and rollback.** Review the Netlify deploy history, ensure a known-good previous deploy is available and require a final owner signoff before domain switch.

## Recommended prelaunch operations
- Verify Netlify form handling and real demo response ownership **first**.
- Audit all product claims and revise the privacy/legal policy **second**.
- Obtain authentic brand media, finalize service scope and evaluate final mobile UI **third**.
- Add analytic conversion events, domain-specific SEO and proceed through an approved cutover last.

## Do not mistake these for production proof
- Product demos use example data; no automated posting or CRM integration is demonstrated.
- Automated tests exercise a GitHub-hosted static site served by a temporary local HTTP server. Passing them is **not** proof of live Netlify form delivery, customer privacy practices, backend services or production uptime.
- The `newkybr.netlify.app` website has been difficult to load through external browsing tools. A separate diagnostic GitHub Action records whether its publicly served HTML can be retrieved. Investigate any failure.

## QA commands
```sh
node scripts/check-site.mjs
npm install --no-save playwright@1.58.2
npx playwright install --with-deps chromium
python3 -m http.server 4173 --bind 127.0.0.1 &
node scripts/browser-smoke.mjs
```
