/* global WebImporter */
export default function parse(element, { document }) {
  // Find the callout-cobranded section
  const calloutSection = element.querySelector('.callout-cobranded');
  if (!calloutSection) return;

  // The left: both logos; right: all text content
  // The logos are in .callout-icon h2
  const iconDiv = calloutSection.querySelector('.callout-icon');
  let logos = null;
  if (iconDiv) {
    const h2 = iconDiv.querySelector('h2');
    if (h2) {
      logos = h2;
    } else {
      logos = iconDiv;
    }
  }

  // The right: all content paragraphs, etc.
  const contentDiv = calloutSection.querySelector('.callout-content');
  let textContent = null;
  if (contentDiv) {
    // Use all direct children (for resilience)
    const nodes = Array.from(contentDiv.childNodes).filter(n => {
      // Only keep elements or non-empty text
      return (n.nodeType === 1) || (n.nodeType === 3 && n.textContent.trim());
    });
    if (nodes.length === 1) {
      textContent = nodes[0];
    } else if (nodes.length > 1) {
      textContent = nodes;
    }
  }

  // Compose the header (single cell)
  const headerRow = ['Columns (columns53)'];
  // Compose the columns row (two columns)
  const contentRow = [logos, textContent];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
