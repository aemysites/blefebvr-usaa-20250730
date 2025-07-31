/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name, exactly as in the example
  const headerRow = ['Hero (hero33)'];

  // Second row: background image (prefer desktop)
  let image = null;
  const bannerImgWrap = element.querySelector('.banner-img-wrap');
  if (bannerImgWrap) {
    image = bannerImgWrap.querySelector('img.banner-img.custom-desktop-only')
      || bannerImgWrap.querySelector('img.banner-img.custom-mobile-only')
      || bannerImgWrap.querySelector('img.banner-img');
  }
  const imageRow = [image ? image : ''];

  // Third row: content (all banner-content children, flatten .block-wrapper for CTA links)
  const bannerContent = element.querySelector('.banner-content');
  const contentElements = [];
  if (bannerContent) {
    Array.from(bannerContent.children).forEach((child) => {
      // Flatten .block-wrapper if it wraps a single element (usually CTAs)
      if (
        child.classList &&
        child.classList.contains('block-wrapper') &&
        child.children.length === 1
      ) {
        contentElements.push(child.firstElementChild);
      } else {
        contentElements.push(child);
      }
    });
  }
  const contentRow = [contentElements.length ? contentElements : ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
