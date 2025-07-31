/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main banner section
  const bannerSection = element.querySelector('section.usaa-aem-banner');
  if (!bannerSection) return;

  // 1. Extract background image (as single <img> element)
  let bgImg = null;
  const imgWraps = bannerSection.querySelectorAll('.bg-image .adaptive-image-wrap');
  for (const wrap of imgWraps) {
    const img = wrap.querySelector('img');
    if (img && img.src) {
      bgImg = img;
      break;
    }
  }

  // 2. Extract content: headline, text, CTA
  const contentEls = [];
  // Headline
  const headline = bannerSection.querySelector('.usaa-aem-banner-headline h1');
  if (headline) contentEls.push(headline);

  // Subheading/text
  const bannerText = bannerSection.querySelector('.usaa-aem-banner-text');
  if (bannerText) contentEls.push(bannerText);

  // CTA Button
  const ctaContainer = bannerSection.querySelector('.cta-container');
  if (ctaContainer) {
    const ctaBtn = ctaContainer.querySelector('a');
    if (ctaBtn) contentEls.push(ctaBtn);
  }

  // 3. Build table array as per block requirements
  const rows = [];
  rows.push(['Hero (hero51)']);
  rows.push([bgImg ? bgImg : '']);
  rows.push([contentEls.length ? contentEls : '']);

  // 4. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
