/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for the block
  const headerRow = ['Cards (cards67)'];

  // 2. Get all the direct li children (cards)
  const cards = Array.from(element.querySelectorAll(':scope > li'));

  // 3. Build rows for each card
  const rows = cards.map(card => {
    // Each card li should contain .card-header
    const cardHeader = card.querySelector('.card-header');
    if (!cardHeader) return null;

    // Image/Icon (first cell)
    const img = cardHeader.querySelector('img');
    // Use the img element directly if available, else fallback to ''
    const imgCell = img || '';

    // Text content (second cell):
    // Title as strong, description below
    // Reference the heading and paragraph directly, in order
    const h3 = cardHeader.querySelector('h3');
    const p = cardHeader.querySelector('p');
    // Prepare an array of elements for the cell
    const textCell = [];
    if (h3) {
      const strong = document.createElement('strong');
      strong.textContent = h3.textContent;
      textCell.push(strong);
    }
    if (p) {
      if (textCell.length > 0) {
        textCell.push(document.createElement('br'));
      }
      textCell.push(p);
    }
    return [imgCell, textCell];
  }).filter(Boolean);

  // 4. Compose the table: header and all the card rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element with the table
  element.replaceWith(table);
}
