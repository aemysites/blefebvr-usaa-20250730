/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the block header
  const cells = [['Accordion (accordion44)']];

  // Select all accordion rows (each represents an accordion item)
  const rows = element.querySelectorAll('.accordion-row');

  rows.forEach((row) => {
    // The label/title for the accordion item (should always be present)
    const label = row.querySelector('.accordion-toggle-label');
    // The content for the accordion item (may be missing, so handle gracefully)
    const content = row.querySelector('.accordion-content');
    // Push row: always reference the existing DOM elements directly
    cells.push([
      label || document.createTextNode(''),
      content || document.createTextNode('')
    ]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
