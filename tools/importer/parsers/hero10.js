/* global WebImporter */
export default function parse(element, { document }) {
  // Get the background image: Prefer the .banner__image-container-xl > img, then fallback options
  let bgImg = null;
  const xlImg = element.querySelector('.banner__image-container-xl img');
  if (xlImg) {
    bgImg = xlImg;
  } else {
    const fallbackImg = element.querySelector('.banner__image-container-default-lg img.banner__image-4-3');
    if (fallbackImg) {
      bgImg = fallbackImg;
    } else {
      // fallback to any image
      const anyImg = element.querySelector('img');
      if (anyImg) bgImg = anyImg;
    }
  }

  // Get content elements (headline, subheading, ctas)
  const contentContainer = element.querySelector('.banner__content');
  let contentEls = [];
  if (contentContainer) {
    // Headline (h1)
    const headline = contentContainer.querySelector('h1');
    if (headline) contentEls.push(headline);
    // Subheading (p)
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentEls.push(subheading);
    // CTA buttons: Could be multiple buttons in .rds-button__group
    const buttonGroup = contentContainer.querySelector('.rds-button__group');
    if (buttonGroup) {
      const buttons = buttonGroup.querySelectorAll('button');
      buttons.forEach((btn) => {
        // Convert <button> to <a> (no href available in this HTML, use #)
        const a = document.createElement('a');
        a.textContent = btn.textContent;
        a.href = '#';
        if (btn.hasAttribute('aria-label')) {
          a.title = btn.getAttribute('aria-label');
        }
        // Add relevant class for styling/context
        a.className = btn.className;
        // Wrap in a paragraph for formatting/line break
        const p = document.createElement('p');
        p.appendChild(a);
        contentEls.push(p);
      });
    }
  }

  // The block header must match exactly
  const headerRow = ['Hero (hero10)'];
  const imgRow = [bgImg ? bgImg : ''];
  const contentRow = [contentEls.length ? contentEls : ''];

  const cells = [headerRow, imgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
