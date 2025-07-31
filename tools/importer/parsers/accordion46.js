/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in requirements and matching the example
  const headerRow = ['Accordion (accordion46)'];

  // Find all direct .accordion-row children
  const rows = Array.from(element.querySelectorAll(':scope > .accordion-row'));

  const blockRows = rows.map(row => {
    // Title cell: get .accordion-toggle-label from inside the button
    let titleEl = null;
    const toggleBtn = row.querySelector('.accordion-toggle');
    if (toggleBtn) {
      const label = toggleBtn.querySelector('.accordion-toggle-label');
      if (label) {
        titleEl = label;
      } else {
        // fallback: use button text wrapped in a span
        const span = document.createElement('span');
        span.textContent = toggleBtn.textContent.trim();
        titleEl = span;
      }
    } else {
      // fallback: empty cell
      titleEl = '';
    }

    // Content cell: all children of .accordion-content (not a clone, use reference!)
    let contentCell = '';
    const contentWrap = row.querySelector('.accordion-content-wrap');
    if (contentWrap) {
      const content = contentWrap.querySelector('.accordion-content');
      if (content) {
        // If content has direct children, collect those
        const children = Array.from(content.childNodes);
        if (children.length > 0) {
          contentCell = children;
        } else {
          // fallback: content itself (might be text node or empty)
          contentCell = content;
        }
      } else {
        contentCell = contentWrap;
      }
    }
    return [titleEl, contentCell];
  });

  // Compose final table
  const cells = [headerRow, ...blockRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
