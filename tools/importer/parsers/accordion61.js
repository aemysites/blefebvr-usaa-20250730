/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row per block requirements
  const headerRow = ['Accordion (accordion61)'];

  // Get all .accordion-row elements
  const rows = Array.from(element.querySelectorAll('.accordion-row'));

  const cells = [headerRow];
  rows.forEach((row) => {
    // --- Title cell ---
    let titleCell;
    const toggle = row.querySelector('.accordion-toggle');
    if (toggle) {
      // Use the label element if possible, maintaining its structure (role, aria-level, etc.)
      const label = toggle.querySelector('.accordion-toggle-label');
      if (label) {
        titleCell = label;
      } else {
        // Fallback to the button's text
        titleCell = document.createTextNode(toggle.textContent.trim());
      }
    } else {
      titleCell = document.createTextNode('');
    }

    // --- Content cell ---
    let contentCell;
    const contentWrap = row.querySelector('.accordion-content');
    if (contentWrap) {
      // Include all child nodes, preserving inline formatting, links, etc.
      const nodes = Array.from(contentWrap.childNodes).filter((n) => {
        if (n.nodeType === Node.TEXT_NODE) {
          return n.textContent.trim().length > 0;
        }
        return true;
      });
      if (nodes.length === 1) {
        contentCell = nodes[0];
      } else if (nodes.length > 1) {
        contentCell = nodes;
      } else {
        contentCell = document.createTextNode('');
      }
    } else {
      contentCell = document.createTextNode('');
    }

    cells.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
