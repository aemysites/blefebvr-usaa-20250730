/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header row
  const headerRow = ['Cards (cards80)'];

  // Find all direct card columns
  const cardColumns = element.querySelectorAll(':scope > div');
  const rows = [];

  cardColumns.forEach(cardCol => {
    // Card image (always in div > img)
    const imageDiv = cardCol.querySelector(':scope > div');
    const img = imageDiv ? imageDiv.querySelector('img') : null;

    // Title (p with class rds-typography__headline-4)
    const title = cardCol.querySelector('p.rds-typography__headline-4');
    // Description (p with class rds-typography__paragraph)
    const desc = cardCol.querySelector('p.rds-typography__paragraph');
    // CTA link (a)
    const cta = cardCol.querySelector('a');

    // Compose text cell, only add if they exist
    const textContents = [];
    if (title) textContents.push(title);
    if (desc) textContents.push(desc);
    if (cta) textContents.push(cta);

    rows.push([
      img ? img : '',
      textContents.length === 1 ? textContents[0] : textContents
    ]);
  });

  // Build the cards table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
