/* global WebImporter */
export default function parse(element, { document }) {
  // Table header should exactly match the example
  const headerRow = ['Cards (cardsNoImages64)'];

  // Handle empty or missing cards
  const cardLis = element.querySelectorAll(':scope > li.card');
  if (!cardLis.length) {
    // If no cards, replace with just the header row
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // Each card li contains a .card-header div with h3 and p (and possible links/sup)
  const rows = Array.from(cardLis).map((li) => {
    const cardHeader = li.querySelector('.card-header');
    // Defensive: if card-header is missing, use the li itself
    if (cardHeader) {
      return [cardHeader];
    } else {
      return [li];
    }
  });

  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
