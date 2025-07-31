/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in example: Cards (cards79)
  const cells = [['Cards (cards79)']];

  // Find all card items
  const items = element.querySelectorAll('.usaa-aem-feature-item');

  items.forEach(item => {
    // Image/Icon on the left
    let imageEl = null;
    const illustration = item.querySelector('.aem-feature-collection__illustration img');
    if (illustration) {
      imageEl = illustration;
    }

    // Text content on the right (h3 + paragraph)
    const textContainer = item.querySelector('.aem-feature-collection__text');
    let textCellContent = [];
    if (textContainer) {
      // Use all direct children (h3, div, etc.) in order, preserving semantics
      Array.from(textContainer.children).forEach(child => {
        // Only add non-empty children
        if (
          child.tagName === 'H3' ||
          child.tagName === 'DIV' ||
          child.tagName === 'P' ||
          child.tagName === 'SPAN' ||
          child.tagName === 'SUP'
        ) {
          // Also handle <div>s that wrap <p>
          if (child.tagName === 'DIV' && child.querySelector('p')) {
            Array.from(child.querySelectorAll('p')).forEach(p => {
              textCellContent.push(p);
            });
          } else {
            textCellContent.push(child);
          }
        }
      });
      // If nothing found, fallback to textContent
      if (textCellContent.length === 0) {
        textCellContent = [textContainer];
      }
    }

    cells.push([
      imageEl,
      textCellContent.length === 1 ? textCellContent[0] : textCellContent
    ]);
  });

  // Create the table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
