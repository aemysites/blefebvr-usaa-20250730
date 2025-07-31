/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example exactly
  const headerRow = ['Cards (cardsNoImages67)'];

  // Get all direct li.card children (each is a card)
  const cards = Array.from(element.querySelectorAll(':scope > li.card'));

  // Defensive: handle case where no cards are present
  const rows = cards.length > 0
    ? cards.map((card) => {
        // Use the .card-header block as the content for each card, if present
        const header = card.querySelector('.card-header');
        // If header not found, fallback to card itself
        return [header || card];
      })
    : [];

  // Only build a table if there are cards, else do nothing
  if (rows.length) {
    const tableCells = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);
    element.replaceWith(blockTable);
  } else {
    // If the element is empty or contains no cards, remove it from DOM
    element.remove();
  }
}
