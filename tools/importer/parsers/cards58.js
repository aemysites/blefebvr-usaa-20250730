/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the guidelines and matches the example
  const headerRow = ['Cards (cards58)'];
  const rows = [];

  // Select all top-level card elements
  const cardDivs = element.querySelectorAll(':scope > div.usaa-aem-card-ac');

  cardDivs.forEach((card) => {
    // --- First cell: Image/Icon ---
    let iconDiv = card.querySelector('.usaa-aem-card-ac__icon');
    let imgEl = iconDiv ? iconDiv.querySelector('img') : null;
    let firstCell = imgEl ? imgEl : '';

    // --- Second cell: Content ---
    const textContentArr = [];
    // Title (should be heading)
    let title = card.querySelector('.rds-layout--bottom-3 h3, .rds-layout--bottom-3 h2, .rds-layout--bottom-3 h4, .rds-layout--bottom-3 h5, .rds-layout--bottom-3 h6');
    if (title) textContentArr.push(title);
    // Description (can be p or br-text)
    let textDiv = card.querySelector('.usaa-aem-card-ac__text');
    if (textDiv) {
      // Add all child nodes (including text, <p>, <br>, etc) to maintain formatting
      Array.from(textDiv.childNodes).forEach((node) => {
        if (
          (node.nodeType === Node.ELEMENT_NODE && (node.tagName !== 'BR' || node.textContent.trim() !== '')) ||
          (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
        ) {
          textContentArr.push(node);
        }
      });
    }
    // CTA button (optional)
    let actionBlock = card.querySelector('.usaa-aem-card-ac__action-block');
    if (actionBlock) {
      let anchor = actionBlock.querySelector('a');
      if (anchor) textContentArr.push(anchor);
    }

    // Add the row for this card
    rows.push([firstCell, textContentArr]);
  });

  // Create and insert the table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
