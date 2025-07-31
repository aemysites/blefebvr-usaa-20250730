/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero58)'];

  // 2. Image row: Use first desktop image (not .mobile-only), fallback to mobile if not found
  let backgroundImg = null;
  const bannerImgWrap = element.querySelector('.banner-img-wrap');
  if (bannerImgWrap) {
    backgroundImg = bannerImgWrap.querySelector('img.banner-img:not(.mobile-only)')
      || bannerImgWrap.querySelector('img.banner-img.mobile-only');
  }
  const imageRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row: gather heading, subheading, paragraph, cta button, extra link
  const content = element.querySelector('.banner-content');
  const contentNodes = [];
  if (content) {
    // Title (h1)
    const h1 = content.querySelector('h1');
    if (h1) contentNodes.push(h1);
    // Subheading (h2)
    const h2 = content.querySelector('h2');
    if (h2) contentNodes.push(h2);
    // Supporting info (p)
    const p = content.querySelector('p');
    if (p) contentNodes.push(p);
    // Primary CTA (button)
    const ctaBtn = content.querySelector('a.cta-btn');
    if (ctaBtn) contentNodes.push(ctaBtn);
    // Secondary CTA link
    const ctaWrapper = content.querySelector('.block-wrapper');
    if (ctaWrapper) {
      const ctaLink = ctaWrapper.querySelector('a');
      if (ctaLink) contentNodes.push(ctaLink);
    }
  }
  const contentRow = [contentNodes.length ? contentNodes : ''];

  // Compose the table as per spec
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
