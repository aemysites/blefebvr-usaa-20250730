/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: must match example precisely
  const headerRow = ['Accordion (accordion69)'];

  // Gather all accordion rows
  const accordionRows = element.querySelectorAll('.accordion-row');
  const rows = [];

  accordionRows.forEach((row) => {
    // Title cell: label inside button.accordion-toggle .accordion-toggle-label
    let titleCell = '';
    const titleBtn = row.querySelector('.accordion-toggle');
    if (titleBtn) {
      const label = titleBtn.querySelector('.accordion-toggle-label');
      if (label) {
        titleCell = label;
      } else if (titleBtn.textContent) {
        // fallback: use button text
        titleCell = document.createElement('span');
        titleCell.textContent = titleBtn.textContent.trim();
      }
    }
    // Content cell: .accordion-content-wrap > .accordion-content
    let contentCell = '';
    const contentWrap = row.querySelector('.accordion-content-wrap');
    if (contentWrap) {
      const contentDiv = contentWrap.querySelector('.accordion-content');
      if (contentDiv) {
        // All direct children, excluding empty text nodes
        const children = Array.from(contentDiv.childNodes).filter(node => {
          return !(node.nodeType === 3 && !node.textContent.trim());
        });
        if (children.length === 1) {
          contentCell = children[0];
        } else if (children.length > 1) {
          contentCell = children;
        } else {
          contentCell = '';
        }
      }
    }
    rows.push([titleCell, contentCell]);
  });

  // Compose table and replace
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
