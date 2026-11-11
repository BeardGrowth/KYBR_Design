# KYBR buyer-ready website — implementation and launch checklist (2026-11-11)

## Changes committed
- Homepage now shows the five-stage content-to-campaign demo as the primary interactive experience.
- Replaced the competing second dashboard with six concise, benefit-led capability rows linked to dedicated solution pages.
- Added an honest FAQ covering pricing, integrations, approvals, onboarding, multi-location fit, and platform vs. managed services.
- Improved plan descriptions and captured the selected service in Netlify form submissions.
- Removed the single-prospect "44-location rollout" CTA from the enterprise page.
- Kept the official KYBR wordmark and supplied brand logo artwork. Mountain View remains absent from the homepage.
- The preview remains noindex; do not publish as an indexed production property without a separate SEO go-live process.

## Release-blocking checks not completed
1. **Deploy verification**: Confirm Netlify deploys the default GitHub branch and the latest commit; the external browsing environment could not load the deployment.
2. **Real-device QA**: Test at 320, 375, 390, 430, 768, 1024, and 1440 pixels. Pay attention to navigation, overflows, demonstration tabs, brand strips, and form controls.
3. **Form processing**: Submit a real test inquiry and inspect Netlify Forms, its spam tab, follow-up notifications, and any CRM/webhook destination. Never claim receipt without confirmation.
4. **Production inventory**: Verify which functions and integrations work in production, including social publishing, customer reviews, CRM, campaign scheduling, reporting, multi-location permissions, and AI content generation. Reconcile public descriptions accordingly.
5. **Service scope and pricing**: Publish accurate implementation terms, support responsibilities, cancellation terms, limits, fees, and any baseline plan prices only after approval.
6. **Client approvals and assets**: Use original licensed logos and customer-approved evidence. The existing supplied art strip is a crop; it is not a full suite of transparent originals. Replace remote placeholder photography with verified local images.
7. **SEO production launch**: Select canonical domain, remove blanket `noindex`/robots disallow only at launch, add page-specific canonical URLs and sitemap, and validate Search Console.
8. **Privacy and security**: Add accurate privacy terms, a customer data-handling explanation, access controls, and relevant contract details after legal and engineering review.
9. **Performance**: Run Lighthouse and Web Vitals on the actual deployed URLs; consolidate accumulated CSS files and optimize verified images.
10. **Measurement**: Install approved analytics and define funnel events: CTA click, demonstration engagement, form start, form submit, meeting scheduled, qualified meeting, won customer.

## Caveat
All interactive content-to-campaign examples and KPI displays are illustrative. They are not evidence of actual customer outcomes or functioning production integrations. No real customer testimonials or savings claims should be invented.
