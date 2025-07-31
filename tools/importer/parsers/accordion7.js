/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as in the example
  const rows = [['Accordion (accordion7)']];

  // Try to locate the button with the title
  const button = element.querySelector('button.accordion-toggle');
  let titleCell = '';
  if (button) {
    // Prefer label span, fallback to button
    const label = button.querySelector('.accordion-toggle-label');
    if (label) {
      titleCell = label;
    } else {
      titleCell = button;
    }
  }

  // Try to get the accordion content
  let contentCell = '';
  const contentWrap = element.querySelector('.accordion-content-wrap');
  if (contentWrap) {
    const content = contentWrap.querySelector('.accordion-content');
    if (content) {
      // Prefer .body-copy, fallback to content
      const bodyCopy = content.querySelector('.body-copy');
      if (bodyCopy) {
        contentCell = bodyCopy;
      } else {
        contentCell = content;
      }
    } else {
      contentCell = contentWrap;
    }
  }

  // Add row: [title, content]
  rows.push([
    titleCell,
    contentCell
  ]);

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
