/* global WebImporter */
export default function parse(element, { document }) {
  // Find the ordered list of steps
  const ol = element.querySelector('ol.usaa-step-list');
  if (!ol) return;
  const lis = Array.from(ol.children).filter(li => li.tagName === 'LI');

  // Each li is a column: grab the .usaa-step-list-item block or fallback to li
  const cols = lis.map(li => {
    const stepItem = li.querySelector('.usaa-step-list-item');
    return stepItem || li;
  });

  // Correct header row: exactly one column
  const table = [
    ['Columns (columns17)'],
    cols
  ];

  // Construct and replace
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
