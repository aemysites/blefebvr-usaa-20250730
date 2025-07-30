/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly as in the example
  const headerRow = ['Cards (cardsNoImages37)'];
  const rows = [headerRow];
  // Each card is a direct <li>
  const cards = element.querySelectorAll(':scope > li');
  cards.forEach(card => {
    // The card content (heading + desc) is in .card-header
    // Use the .card-header div directly to preserve all structure
    const content = card.querySelector('.card-header');
    // Only add if the card has content
    if (content && (content.textContent.trim() !== '')) {
      rows.push([content]);
    }
  });
  // Only replace if there's at least the header and one card
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}