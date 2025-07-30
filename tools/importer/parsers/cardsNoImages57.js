/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we match the block header exactly as in the spec
  const headerRow = ['Cards (cardsNoImages57)'];
  const rows = [headerRow];

  // Select all top-level <li> elements, each representing a card
  const cards = element.querySelectorAll(':scope > li');
  cards.forEach((card) => {
    // Each card should have one .card-header div
    const headerDiv = card.querySelector('.card-header');
    if (headerDiv) {
      rows.push([headerDiv]); // Reference the actual element, not its HTML string or a clone
    } else if (card.firstElementChild) {
      // Fallback: if no .card-header, use the first child
      rows.push([card.firstElementChild]);
    } else {
      // Fallback: if card is empty, skip (don't create a blank card)
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
