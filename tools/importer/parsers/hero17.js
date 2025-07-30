/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: exact block name
  const headerRow = ['Hero (hero17)'];

  // 2. Second row: background image (prefer desktop if available)
  let bgImg = null;
  const imgWrap = element.querySelector('.banner-img-wrap');
  if (imgWrap) {
    bgImg = imgWrap.querySelector('.banner-img.custom-desktop-only') || imgWrap.querySelector('img');
  }
  const bgImgRow = [bgImg || ''];

  // 3. Third row: Title, Subheading, Paragraph, CTA Button(s).
  const contentDiv = element.querySelector('.banner-content');
  const contentArray = [];
  if (contentDiv) {
    // Title
    const title = contentDiv.querySelector('.banner-accent-heading');
    if (title) contentArray.push(title);

    // Subheading
    const subheading = contentDiv.querySelector('.banner-sub-heading');
    if (subheading) contentArray.push(subheading);

    // Paragraph (including any <sup> with legal note)
    const para = contentDiv.querySelector('.banner-sub-info');
    if (para) contentArray.push(para);

    // All CTAs
    // Button
    const ctaBtn = contentDiv.querySelector('a.cta-btn');
    if (ctaBtn) contentArray.push(ctaBtn);
    // Link
    const ctaLink = contentDiv.querySelector('a.cta-link');
    if (ctaLink) contentArray.push(ctaLink);
  }
  const contentRow = [contentArray];

  // Build table array
  const cells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(table);
}
