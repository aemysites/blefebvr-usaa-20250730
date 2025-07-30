/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header as in the example
  const headerRow = ['Accordion (accordion7)'];

  // Get the title as an element (preserve markup if any)
  let titleCell;
  const button = element.querySelector('button.accordion-toggle');
  if (button) {
    const labelEl = button.querySelector('.accordion-toggle-label');
    if (labelEl) {
      // Use the span directly to retain any formatting (such as bold/italic)
      titleCell = labelEl;
    } else {
      // Fallback: use the button's text
      titleCell = document.createTextNode(button.textContent.trim());
    }
  } else {
    // Fallback: blank cell
    titleCell = document.createTextNode('');
  }

  // Get the content cell (preserve markup)
  let contentCell;
  const contentWrap = element.querySelector('.accordion-content-wrap');
  if (contentWrap) {
    const content = contentWrap.querySelector('.accordion-content');
    if (content) {
      const body = content.querySelector('.body-copy');
      if (body) {
        contentCell = body;
      } else {
        contentCell = content;
      }
    } else {
      contentCell = document.createTextNode('');
    }
  } else {
    contentCell = document.createTextNode('');
  }

  // Structure: header row, then one row of [title, content]
  const rows = [
    headerRow,
    [titleCell, contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
