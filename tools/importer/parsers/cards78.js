/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container holding the cards
  const root = element.querySelector('.usaa-aem-feature-collection__container--vertical, .usaa-aem-feature-collection__container');
  if (!root) return;

  // Select all card items
  const cards = Array.from(root.querySelectorAll('.usaa-aem-feature-item'));
  const cells = [];
  // Table header, exactly as required
  cells.push(['Cards (cards78)']);

  cards.forEach(card => {
    // Get the image (if present)
    const img = card.querySelector('.aem-feature-collection__illustration img') || '';
    // Text content (heading and description)
    const textContainer = card.querySelector('.aem-feature-collection__text');
    const textCell = [];
    if (textContainer) {
      // Heading (may include <sup>)
      const h3 = textContainer.querySelector('h3');
      if (h3) textCell.push(h3);
      // Description paragraph
      const descDiv = textContainer.querySelector('div.rds-typography__paragraph');
      if (descDiv) {
        // If <p> present, use it; otherwise, use the div itself if it has text
        const p = descDiv.querySelector('p');
        if (p) {
          textCell.push(p);
        } else if (descDiv.textContent.trim()) {
          textCell.push(descDiv);
        }
      }
    }
    cells.push([img, textCell]);
  });

  // Create and replace with table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
