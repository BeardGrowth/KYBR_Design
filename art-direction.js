(() => {
 // Progressive enhancement: static content remains visible when motion is unsupported.
 const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if (reduceMotion || !('IntersectionObserver' in window)) return;
 const targets = document.querySelectorAll('.hero-product, .section-intro, .visual-feature, .case-card, .creative-intro, .goal-step, .onboard-grid article, .delivery-card, .enterprise-band');
 const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
   if (!entry.isIntersecting) return;
   entry.target.classList.add('revealed');
   observer.unobserve(entry.target);
  });
 }, { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });
 targets.forEach((element,index) => {
  element.classList.add('reveal-ready');
  element.style.transitionDelay = (index % 3) * 70 + 'ms';
  observer.observe(element);
 });
})();