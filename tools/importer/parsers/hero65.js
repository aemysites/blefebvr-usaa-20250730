/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero65)'];

  // Gather background/icon image (in its own column)
  let imageEl = null;
  const iconCol = element.querySelector('.callout-block-icon');
  if (iconCol) {
    imageEl = iconCol.querySelector('img');
  }
  const imageRow = [imageEl ? imageEl : ''];

  // Gather all text and CTA content, in source order, from the content column
  let contentCol = element.querySelector('.icon-content');
  let contentParts = [];
  if (contentCol) {
    // Grab all children (to preserve order) and flatten cta links
    Array.from(contentCol.children).forEach(child => {
      if (child.classList.contains('cta-container')) {
        // Flatten all links
        Array.from(child.querySelectorAll('a')).forEach(link => contentParts.push(link));
      } else {
        contentParts.push(child);
      }
    });
  }
  // If there is no icon-content, fall back to all children except .callout-block-icon
  if (!contentParts.length) {
    const allCols = element.querySelectorAll('.rds-layout__grid-row > div');
    Array.from(allCols).forEach(col => {
      if (!col.classList.contains('callout-block-icon')) {
        Array.from(col.children).forEach(child => contentParts.push(child));
      }
    });
  }
  const contentRow = [contentParts.length ? contentParts : ''];

  // Build and replace
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
