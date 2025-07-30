/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be a single column with the block name
  const headerRow = ['Columns (columns72)'];

  // The second row should have as many columns (cells) as there are cards
  const cards = Array.from(element.querySelectorAll(':scope > li'));

  // Each card: grab all children of .card-header as the content for that column
  const cardCells = cards.map(card => {
    const header = card.querySelector(':scope > .card-header');
    if (header) {
      // Use all child nodes (elements + meaningful text)
      return Array.from(header.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
    }
    // fallback if card-header not found
    return Array.from(card.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
  });

  // Compose two rows: header, then cards row (spread for columns)
  const rows = [
    headerRow,
    cardCells
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
