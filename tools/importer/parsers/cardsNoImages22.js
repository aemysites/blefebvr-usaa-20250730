/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cardsNoImages22)'];

  // Each card is an <li> (direct child of the <ol>)
  const cards = element.querySelectorAll(':scope > li');
  const rows = [];

  cards.forEach((card) => {
    // Only include the .card-body content (contains heading/description), skip step number visuals
    const cardBody = card.querySelector('.card-body');
    if (cardBody) {
      rows.push([cardBody]); // Reference original element (not cloned)
    } else {
      // Edge case: if there is no .card-body, try to include the whole card
      rows.push([card]);
    }
  });

  // Assemble the table as per the block convention
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}