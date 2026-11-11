# KYBR Website — Preview and launch notes

This repository is a standalone static prototype, separate from the existing KYBR production domain. Netlify can publish it directly from the repository root.

## Preview routes

- `/` — main KYBR Growth Operating System homepage
- `/enterprise.html` — interactive enterprise Command Center and proposed rollout framework
- `/tour.html` — guided five-step campaign workflow
- `/brand-lab.html` — personalized sample campaign mockup using a visitor's own business name, tone, colors and optional logo

## Netlify

- GitHub repository: `BeardGrowth/KYBR_Design`
- Build command: none
- Publish directory: `.`
- Production branch for the preview deployment: `main`

Existing Netlify continuous deployment should publish new pushes when configured to follow `main`. Do not point the production domain at this prototype before completing the launch checks.

## Prototype boundaries

- All enterprise metrics, locations, reports and campaign examples are **fictional demonstration values**, not customer results.
- The Enterprise Command Center and guided tour are front-end concepts, not connected to live KYBR software, integrations, users, publishing or databases.
- The brand lab creates a **browser-only template-driven mockup**. An optional uploaded logo stays in the visitor's browser session; it is not uploaded. It does not call an AI generation model. True AI-generated design, copy and asset transformation would require a secure backend, an approved model/integration, consent and suitable retention/privacy handling.
- The homepage form is now a native Netlify Forms POST (`kybr-demo`) that redirects to `thank-you.html` on successful processing. Form detection, receipt, spam filtering, notification routing, follow-up ownership, and a real test submission must be verified in Netlify before launch. There is no confirmed booking integration or CRM submission.
- Product claims, role security, tenant isolation, privacy, AI capabilities and performance outcomes need to be confirmed before commercial use.

## Prelaunch checklist

1. Verify official KYBR logo and licensed brand assets.
2. Confirm native Netlify Forms is enabled, perform an end-to-end test submission and verify notification delivery. Add scheduling only after the actual booking URL is available.
3. Replace all mock numbers with verified facts or leave them labeled as examples.
4. Test the live Netlify pages on iPhone and desktop, including role selector, tabs, tour buttons, local logo preview and contact workflow.
5. Validate accessibility, privacy and security, including file upload behavior.
6. Approve privacy/legal disclosures, configure analytics, production SEO and accurate product disclosures.
