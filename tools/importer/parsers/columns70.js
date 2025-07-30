/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .banner element inside the .cdo
  const banner = element.querySelector(':scope > .banner');
  let col1 = null, col2 = null;
  if (banner) {
    col1 = banner.querySelector(':scope > .banner-content');
    col2 = banner.querySelector(':scope > .banner-img-wrap');
  }
  // Fallbacks for robustness
  if (!col1 || !col2) {
    const divs = Array.from(element.querySelectorAll('div'));
    [col1, col2] = divs.slice(0,2);
  }
  // Defensive: ensure cells are valid
  if (!col1) col1 = document.createElement('div');
  if (!col2) col2 = document.createElement('div');
  // The header row is a single cell array (one column), per the example
  const cells = [
    ['Columns (columns70)'],
    [col1, col2],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
