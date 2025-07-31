/* global WebImporter */
export default function parse(element, { document }) {
  // Header row - block name matches exactly as in example
  const headerRow = ['Hero (hero70)'];

  // Background image row: This example has no background image in the HTML, so keep empty string
  const bgRow = [''];

  // Content row: gather the heading, ctas, and links in correct order
  const contentArr = [];

  // Heading (h2) if present
  const h2 = element.querySelector('h2');
  if (h2) {
    contentArr.push(h2);
  }

  // Collect all immediate .block-wrapper children (order matters)
  // Each .block-wrapper holds a CTA or link
  const wrappers = element.querySelectorAll(':scope .banner-content > .block-wrapper');
  wrappers.forEach(wrapper => {
    // Add the anchor inside, if present
    const a = wrapper.querySelector('a');
    if(a) {
      contentArr.push(a);
    }
  });

  // Content row: all gathered elements in order, in a single cell (only 1 column)
  const contentRow = [contentArr];

  // Assemble and replace
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}