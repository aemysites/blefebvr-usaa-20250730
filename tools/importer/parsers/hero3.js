/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Hero (hero3)'];

  // No image present in HTML, so use empty cell for bg image row
  const bgImageRow = [''];

  // Extract content from the element
  const bannerContent = element.querySelector('.banner-content');
  const contentCell = [];

  if (bannerContent) {
    // Find heading
    const heading = bannerContent.querySelector('h2, h1, h3, h4, h5, h6');
    if (heading) {
      contentCell.push(heading);
    }

    // Find all direct .block-wrapper children in order
    const wrappers = bannerContent.querySelectorAll(':scope > .block-wrapper');
    wrappers.forEach((wrapper) => {
      // Add a line break if cell is not empty
      if (contentCell.length > 0) {
        contentCell.push(document.createElement('br'));
      }
      // Push all child elements (so we get links, spans, etc.)
      Array.from(wrapper.childNodes).forEach((n) => contentCell.push(n));
    });
  }

  // Always provide a cell, even if empty
  const contentRow = [contentCell];

  // Compose the table
  const cells = [headerRow, bgImageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  
  element.replaceWith(block);
}
