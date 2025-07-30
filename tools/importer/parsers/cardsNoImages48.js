/* global WebImporter */
export default function parse(element, { document }) {
  // The header row as per block name
  const headerRow = ['Cards (cardsNoImages48)'];

  // Find all card <li> elements directly under the <ul>
  const cards = Array.from(element.querySelectorAll(':scope > li.card'));

  // Build rows: each card becomes a single cell containing heading and description, preserving original elements
  const rows = cards.map(card => {
    const cardHeader = card.querySelector('.card-header');
    const cellContent = [];
    // Heading (h3), if present
    const heading = cardHeader.querySelector('h3');
    if (heading) cellContent.push(heading);
    // Description (p), if present (sometimes there could be more than one)
    const paragraphs = cardHeader.querySelectorAll('p');
    paragraphs.forEach(p => cellContent.push(p));
    // If no heading and no paragraphs, leave the cell empty
    return [cellContent.length > 0 ? cellContent : ''];
  });

  // Assemble the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
