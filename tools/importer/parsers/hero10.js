/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name
  const headerRow = ['Hero (hero10)'];

  // 2. Background image: use the best/primary image for visual design
  let bgImg = null;
  // Prefer img.banner__image-16-9 from .banner__image-container-xl
  const xlImg = element.querySelector('.banner__image-container-xl img.banner__image-16-9');
  if (xlImg) {
    bgImg = xlImg;
  } else {
    // fallback: first image in .banner__image-container-default-lg
    const defaultImg = element.querySelector('.banner__image-container-default-lg img');
    if (defaultImg) {
      bgImg = defaultImg;
    } else {
      // fallback: any first <img> in the section
      const anyImg = element.querySelector('img');
      if (anyImg) bgImg = anyImg;
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content (heading, subheading, CTA): from .banner__content
  const content = element.querySelector('.banner__content');
  const contentRowEls = [];
  if (content) {
    // Extract heading (h1)
    const heading = content.querySelector('h1');
    if (heading) contentRowEls.push(heading);
    // Extract paragraph (subheading)
    const para = content.querySelector('p');
    if (para) contentRowEls.push(para);
    // Extract CTAs (buttons)
    // The order should match visual order: primary, then tertiary (etc)
    const buttonNodes = content.querySelectorAll('button');
    buttonNodes.forEach(btn => {
      // For import, convert each button into a styled anchor
      const a = document.createElement('a');
      a.textContent = btn.textContent;
      a.href = '#';
      // Optionally, copy class for style context
      if (btn.classList.contains('rds-button__primary')) {
        a.className = 'cta-primary';
      } else if (btn.classList.contains('rds-button__tertiary')) {
        a.className = 'cta-tertiary';
      }
      contentRowEls.push(a);
    });
  }

  // Defensive fallback: if .banner__content is missing, try to extract from element
  if (contentRowEls.length === 0) {
    const heading = element.querySelector('h1');
    if (heading) contentRowEls.push(heading);
    const para = element.querySelector('p');
    if (para) contentRowEls.push(para);
    const buttonNodes = element.querySelectorAll('button');
    buttonNodes.forEach(btn => {
      const a = document.createElement('a');
      a.textContent = btn.textContent;
      a.href = '#';
      contentRowEls.push(a);
    });
  }

  const contentRow = [contentRowEls];

  // Build table structure
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
